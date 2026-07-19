import { useState } from "react";
import { useAppData } from "../../data/AppDataProvider";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Tag from "../ui/Tag";
import BusyLevelSelect from "./BusyLevelSelect";
import EnergyCheck from "./EnergyCheck";
import FailureReasonTags from "./FailureReasonTags";
import TodayFocusInput from "./TodayFocusInput";

const quickOptions = [
  { value: "empty", energyLevel: "low", emoji: "◔", label: "방전", message: "오늘은 쉬어가기" },
  { value: "tired", energyLevel: "low", emoji: "☁", label: "지침", message: "10분으로 낮추기" },
  { value: "okay", energyLevel: "normal", emoji: "◐", label: "괜찮음", message: "하나만 가볍게" },
  { value: "good", energyLevel: "high", emoji: "☀", label: "좋음", message: "지금 페이스 유지" },
];

function CheckinForm() {
  const { checkinOptions, failureReasonOptions, saveCheckin, saveQuickCheckin, todayStatus } = useAppData();
  const [mode, setMode] = useState("am");
  const [energyLevel, setEnergyLevel] = useState("normal");
  const [busyLevel, setBusyLevel] = useState("normal");
  const [primaryFocus, setPrimaryFocus] = useState(todayStatus.primaryFocus);
  const [completedToday, setCompletedToday] = useState(false);
  const [failureReasons, setFailureReasons] = useState(["시간 부족"]);
  const [submitted, setSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [quickChoice, setQuickChoice] = useState(todayStatus.quickCheckin?.value ?? "");

  const toggleFailureReason = (reason) => {
    setFailureReasons((currentReasons) =>
      currentReasons.includes(reason)
        ? currentReasons.filter((currentReason) => currentReason !== reason)
        : [...currentReasons, reason],
    );
  };

  const handleQuickCheckin = (option) => {
    setQuickChoice(option.value);
    setEnergyLevel(option.energyLevel);
    saveQuickCheckin({
      busyLevel: option.value === "empty" || option.value === "tired" ? "busy" : "normal",
      energyLevel: option.energyLevel,
      label: option.label,
      primaryFocus,
      value: option.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveCheckin(mode, {
      energyLevel,
      busyLevel,
      primaryFocus,
      completedToday: mode === "pm" ? completedToday : false,
      failureReasons: mode === "pm" && !completedToday ? failureReasons : [],
    });
    setSubmitted(true);
  };

  return (
    <Card as="form" className="checkin-form" onSubmit={handleSubmit}>
      <div className="quick-checkin__header">
        <div>
          <Tag tone="success">3초 체크인</Tag>
          <h2>지금, 몸과 마음은 어때요?</h2>
          <p>한 번만 누르면 오늘 AM 기록으로 바로 저장돼요. 설명은 필요 없어요.</p>
        </div>
        {quickChoice ? <span className="auto-save-state">✓ 자동 저장됨</span> : null}
      </div>

      <div className="quick-checkin-grid">
        {quickOptions.map((option) => (
          <button
            aria-pressed={quickChoice === option.value}
            key={option.value}
            onClick={() => handleQuickCheckin(option)}
            type="button"
          >
            <span aria-hidden="true">{option.emoji}</span>
            <strong>{option.label}</strong>
            <small>{option.message}</small>
          </button>
        ))}
      </div>

      {quickChoice ? (
        <div className="quick-checkin-result" role="status">
          <span aria-hidden="true">✦</span>
          <div>
            <strong>체크인 끝. 나머지는 AI가 도울게요.</strong>
            <p>{quickOptions.find((option) => option.value === quickChoice)?.message} 기준으로 오늘 루틴을 추천했어요.</p>
          </div>
        </div>
      ) : null}

      <button
        aria-expanded={showDetails}
        className="details-toggle"
        onClick={() => setShowDetails((current) => !current)}
        type="button"
      >
        <span>{showDetails ? "상세 체크인 접기" : "AM·PM을 조금 더 자세히 기록하기 (선택)"}</span>
        <b>{showDetails ? "−" : "+"}</b>
      </button>

      {showDetails ? (
        <div className="detailed-checkin">
          <div className="segmented-control" aria-label="체크인 시간대">
            <button aria-pressed={mode === "am"} onClick={() => setMode("am")} type="button">AM · 계획</button>
            <button aria-pressed={mode === "pm"} onClick={() => setMode("pm")} type="button">PM · 돌아보기</button>
          </div>

          {mode === "am" ? (
            <>
              <EnergyCheck onChange={setEnergyLevel} options={checkinOptions.energyLevels} value={energyLevel} />
              <BusyLevelSelect onChange={setBusyLevel} options={checkinOptions.busyLevels} value={busyLevel} />
              <TodayFocusInput onChange={setPrimaryFocus} value={primaryFocus} />
            </>
          ) : (
            <>
              <label className="check-toggle">
                <input checked={completedToday} onChange={(event) => setCompletedToday(event.target.checked)} type="checkbox" />
                <span>오늘의 작은 행동을 해냈어요</span>
              </label>
              {!completedToday ? (
                <FailureReasonTags onToggle={toggleFailureReason} options={failureReasonOptions} selected={failureReasons} />
              ) : null}
            </>
          )}

          <div className="checkin-form__footer">
            <div><Tag tone="main">{mode === "am" ? "계획" : "회고"}</Tag><span>날짜별로 안전하게 저장돼요</span></div>
            <Button type="submit">상세 저장</Button>
          </div>
          {submitted ? <p className="form-feedback">상세 기록도 저장했어요.</p> : null}
        </div>
      ) : null}
    </Card>
  );
}

export default CheckinForm;
