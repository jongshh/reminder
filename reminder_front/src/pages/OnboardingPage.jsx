import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";
import { generateOnboardingQuests } from "../services/questGenerationService";

const goalExamples = [
  "매일 영어 단어를 외우고 싶어요",
  "퇴근 후 20분 운동 루틴을 만들고 싶어요",
  "시험 전까지 매일 복습하는 습관을 만들고 싶어요",
  "아침에 책을 10쪽씩 읽고 싶어요",
];

const timeOptions = [
  { value: 10, label: "10분", description: "가볍게" },
  { value: 20, label: "20분", description: "부담 없이" },
  { value: 30, label: "30분", description: "기본" },
  { value: "custom", label: "직접 입력", description: "내 일정에 맞게" },
];

const energyOptions = [
  { value: "low", label: "낮음", description: "회복 우선" },
  { value: "normal", label: "보통", description: "무리 없이" },
  { value: "high", label: "좋음", description: "조금 더" },
];

const preferenceOptions = [
  { value: "steady", label: "꾸준히", description: "작게 반복" },
  { value: "challenge", label: "도전적으로", description: "성취감 있게" },
  { value: "recovery", label: "회복 중심", description: "끊기지 않게" },
];

function QuickOptionGroup({ label, options, value, onChange }) {
  return (
    <fieldset className="onboarding-options">
      <legend>{label}</legend>
      <div className="onboarding-options__grid">
        {options.map((option) => (
          <button
            aria-pressed={value === option.value}
            className="onboarding-option"
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            <strong>{option.label}</strong>
            <span>{option.description}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function OnboardingPage({ onNavigate }) {
  const { completeOnboarding, onboardingSteps } = useAppData();
  const [targetGoal, setTargetGoal] = useState("");
  const [timeMode, setTimeMode] = useState(20);
  const [customMinutes, setCustomMinutes] = useState(45);
  const [energyLevel, setEnergyLevel] = useState("normal");
  const [preference, setPreference] = useState("steady");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [typedExample, setTypedExample] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isQuestDialogOpen, setIsQuestDialogOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const activeExample = goalExamples[exampleIndex];
  const normalizedGoal = targetGoal.trim();
  const availableMinutes = timeMode === "custom" ? Math.max(5, Number(customMinutes) || 5) : timeMode;
  const submitLabel = isGenerating ? "퀘스트 만드는 중..." : "오늘 퀘스트 만들기";

  const selectedSummary = useMemo(() => {
    const energy = energyOptions.find((option) => option.value === energyLevel)?.label;
    const style = preferenceOptions.find((option) => option.value === preference)?.label;
    return `${availableMinutes}분 · 컨디션 ${energy} · ${style}`;
  }, [availableMinutes, energyLevel, preference]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (targetGoal) return undefined;
    if (prefersReducedMotion) {
      setTypedExample(activeExample);
      return undefined;
    }

    let isDeleting = false;
    let letterIndex = 0;
    let timeoutId;

    const tick = () => {
      setTypedExample(activeExample.slice(0, letterIndex));

      if (!isDeleting && letterIndex < activeExample.length) {
        letterIndex += 1;
        timeoutId = window.setTimeout(tick, 45);
        return;
      }

      if (!isDeleting && letterIndex >= activeExample.length) {
        isDeleting = true;
        timeoutId = window.setTimeout(tick, 1200);
        return;
      }

      if (isDeleting && letterIndex > 0) {
        letterIndex -= 1;
        timeoutId = window.setTimeout(tick, 26);
        return;
      }

      setExampleIndex((currentIndex) => (currentIndex + 1) % goalExamples.length);
    };

    timeoutId = window.setTimeout(tick, 80);
    return () => window.clearTimeout(timeoutId);
  }, [activeExample, prefersReducedMotion, targetGoal]);

  useEffect(() => {
    if (!isQuestDialogOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isGenerating) setIsQuestDialogOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isGenerating, isQuestDialogOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      targetGoal: normalizedGoal || activeExample,
      availableMinutes,
      energyLevel,
      preference,
    };

    setIsGenerating(true);
    setStatusMessage("AI 생성 커넥터를 확인하고 있어요.");
    const generated = await generateOnboardingQuests(payload);

    completeOnboarding(
      generated
        ? { ...payload, generatedQuests: generated.quests, profilePatch: generated.profilePatch }
        : payload,
    );

    setStatusMessage(generated?.message || "현재는 룰 기반으로 오늘의 퀘스트를 만들었어요.");
    setIsGenerating(false);
    setIsQuestDialogOpen(false);
    onNavigate("quests");
  };

  return (
    <div className="page">
      <section className="page-hero onboarding-hero">
        <Tag tone="main">시작</Tag>
        <h2>목표를 오늘의 퀘스트로</h2>
        <p>하고 싶은 일을 적으면, 지금 가능한 크기로 시작할 루틴을 준비합니다.</p>
        <div className="onboarding-hero__actions">
          <Button onClick={() => setIsQuestDialogOpen(true)}>퀘스트 만들기</Button>
          <Button onClick={() => onNavigate("home")} variant="ghost">
            나중에 하기
          </Button>
        </div>
      </section>

      <section className="onboarding-flow">
        <SectionTitle description="4단계" title="시작 흐름" />
        <div className="step-grid">
          {onboardingSteps.map((step, index) => (
            <Card className="step-card" key={step.id}>
              <span>{step.icon ?? String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {isQuestDialogOpen ? (
        <div className="quest-dialog" role="presentation">
          <button
            aria-label="퀘스트 생성 창 닫기"
            className="quest-dialog__backdrop"
            disabled={isGenerating}
            onClick={() => setIsQuestDialogOpen(false)}
            type="button"
          />
          <Card
            aria-labelledby="quest-dialog-title"
            aria-modal="true"
            as="form"
            className="onboarding-builder quest-dialog__panel"
            onSubmit={handleSubmit}
            role="dialog"
          >
            <div className="onboarding-builder__header">
              <div>
                <Tag tone="success">빠른 설정</Tag>
                <h3 id="quest-dialog-title">오늘 시작할 목표</h3>
                <p>{selectedSummary}</p>
              </div>
              <span className="onboarding-builder__connector">AI 커넥터 준비됨</span>
            </div>

            <label className="form-field onboarding-goal-field">
              <span>목표</span>
              <textarea
                autoFocus
                onChange={(event) => setTargetGoal(event.target.value)}
                placeholder={typedExample || "매일 이어가고 싶은 목표를 적어보세요"}
                rows="4"
                value={targetGoal}
              />
            </label>

            <QuickOptionGroup label="오늘 가능한 시간" onChange={setTimeMode} options={timeOptions} value={timeMode} />

            {timeMode === "custom" ? (
              <label className="form-field onboarding-custom-time">
                <span>직접 입력</span>
                <div>
                  <input min="5" onChange={(event) => setCustomMinutes(event.target.value)} type="number" value={customMinutes} />
                  <span>분</span>
                </div>
              </label>
            ) : null}

            <QuickOptionGroup label="컨디션" onChange={setEnergyLevel} options={energyOptions} value={energyLevel} />
            <QuickOptionGroup label="선호 성향" onChange={setPreference} options={preferenceOptions} value={preference} />

            {statusMessage ? <p className="form-feedback">{statusMessage}</p> : null}

            <div className="onboarding-builder__actions">
              <Button disabled={isGenerating} type="submit">
                {submitLabel}
              </Button>
              <Button disabled={isGenerating} onClick={() => setIsQuestDialogOpen(false)} type="button" variant="ghost">
                닫기
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default OnboardingPage;
