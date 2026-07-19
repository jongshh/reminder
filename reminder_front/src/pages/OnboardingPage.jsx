import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";

function OnboardingPage({ onNavigate }) {
  const { completeOnboarding, onboardingSteps } = useAppData();
  const [targetGoal, setTargetGoal] = useState("매일 영어 공부");
  const [availableMinutes, setAvailableMinutes] = useState(25);
  const [energyLevel, setEnergyLevel] = useState("normal");
  const [preference, setPreference] = useState("steady");

  const handleSubmit = (event) => {
    event.preventDefault();
    completeOnboarding({ targetGoal, availableMinutes, energyLevel, preference });
    onNavigate("quests");
  };

  return (
    <div className="page">
      <section className="page-hero">
        <Tag tone="main">시작</Tag>
        <h2>목표를 퀘스트로 바꾸기</h2>
        <p>지금 가능한 크기로 오늘의 첫 루틴을 만들어요.</p>
      </section>

      <Card as="form" className="checkin-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>목표</span>
          <input onChange={(event) => setTargetGoal(event.target.value)} value={targetGoal} />
        </label>
        <label className="form-field">
          <span>오늘 가능한 시간</span>
          <input min="5" onChange={(event) => setAvailableMinutes(event.target.value)} type="number" value={availableMinutes} />
        </label>
        <label className="form-field">
          <span>컨디션</span>
          <select onChange={(event) => setEnergyLevel(event.target.value)} value={energyLevel}>
            <option value="low">낮음</option>
            <option value="normal">보통</option>
            <option value="high">높음</option>
          </select>
        </label>
        <label className="form-field">
          <span>선호 성향</span>
          <select onChange={(event) => setPreference(event.target.value)} value={preference}>
            <option value="steady">꾸준히</option>
            <option value="challenge">도전적으로</option>
          </select>
        </label>
        <Button type="submit">오늘 퀘스트 만들기</Button>
      </Card>

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
    </div>
  );
}

export default OnboardingPage;
