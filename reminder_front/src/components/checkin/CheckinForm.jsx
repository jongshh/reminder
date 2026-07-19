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
  { value: "empty", emoji: "◔", label: "방전", message: "오늘은 쉬어가기" },
  { value: "tired", emoji: "☁", label: "지침", message: "10분으로 낮추기" },
  { value: "okay", emoji: "◐", label: "괜찮음", message: "하나만 가볍게" },
  { value: "good", emoji: "☀", label: "좋음", message: "지금 페이스 유지" },
];

function CheckinForm() {
  const { checkinOptions, failureReasonOptions, todayStatus, updateTodayStatus } = useAppData();
  const [mode, setMode] = useState("am");
  const [energy, setEnergy] = useState("normal");
  const [busyLevel, setBusyLevel] = useState("normal");
  const [focus, setFocus] = useState(todayStatus.primaryFocus);
  const [completedToday, setCompletedToday] = useState(false);
  const [failureReasons, setFailureReasons] = useState(["시간"]);
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
    setEnergy(option.value === "good" ? "high" : option.value === "okay" ? "normal" : "low");
    updateTodayStatus((current) => ({
      ...current,
      condition: option.label,
      checkinProgress: current.checkinTotal,
      quickCheckin: {
        value: option.value,
        label: option.label,
        recordedAt: new Date().toISOString(),
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    updateTodayStatus((current) => ({
      ...current,
      condition: checkinOptions.energyLevels.find((option) => option.value === energy)?.label ?? current.condition,
      primaryFocus: focus,
      checkinProgress: current.checkinTotal,
    }));
  };

  return (
    <Card as="form" className="checkin-form" onSubmit={handleSubmit}>
      <div className="quick-checkin__header">
        <div>
          <Tag tone="success">3초 체크인</Tag>
          <h2>지금, 몸과 마음은 어때요?</h2>
          <p>한 번만 누르면 바로 기록돼요. 설명은 필요 없어요.</p>
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
        <span>{showDetails ? "상세 체크인 접기" : "조금 더 자세히 기록하기 (선택)"}</span>
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
              <EnergyCheck onChange={setEnergy} options={checkinOptions.energyLevels} value={energy} />
              <BusyLevelSelect onChange={setBusyLevel} options={checkinOptions.busyLevels} value={busyLevel} />
              <TodayFocusInput onChange={setFocus} value={focus} />
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
            <div><Tag tone="main">선택 기록</Tag><span>원할 때만 남겨요</span></div>
            <Button type="submit">상세 저장</Button>
          </div>
          {submitted ? <p className="form-feedback">상세 기록도 저장했어요.</p> : null}
        </div>
      ) : null}
    </Card>
  );
}

export default CheckinForm;
