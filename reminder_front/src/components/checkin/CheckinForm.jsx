import { useState } from "react";
import { useAppData } from "../../data/AppDataProvider";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Tag from "../ui/Tag";
import BusyLevelSelect from "./BusyLevelSelect";
import EnergyCheck from "./EnergyCheck";
import FailureReasonTags from "./FailureReasonTags";
import TodayFocusInput from "./TodayFocusInput";

function CheckinForm() {
  const { checkinOptions, failureReasonOptions, todayStatus } = useAppData();
  const [mode, setMode] = useState("am");
  const [energy, setEnergy] = useState("normal");
  const [busyLevel, setBusyLevel] = useState("normal");
  const [focus, setFocus] = useState(todayStatus.primaryFocus);
  const [completedToday, setCompletedToday] = useState(false);
  const [failureReasons, setFailureReasons] = useState(["시간 부족"]);
  const [submitted, setSubmitted] = useState(false);

  const toggleFailureReason = (reason) => {
    setFailureReasons((currentReasons) =>
      currentReasons.includes(reason)
        ? currentReasons.filter((currentReason) => currentReason !== reason)
        : [...currentReasons, reason],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card as="form" className="checkin-form" onSubmit={handleSubmit}>
      <div className="segmented-control" aria-label="체크인 시간대">
        <button aria-pressed={mode === "am"} onClick={() => setMode("am")} type="button">
          AM
        </button>
        <button aria-pressed={mode === "pm"} onClick={() => setMode("pm")} type="button">
          PM
        </button>
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
            <input
              checked={completedToday}
              onChange={(event) => setCompletedToday(event.target.checked)}
              type="checkbox"
            />
            <span>핵심 완료</span>
          </label>
          {!completedToday ? (
            <FailureReasonTags
              onToggle={toggleFailureReason}
              options={failureReasonOptions}
              selected={failureReasons}
            />
          ) : null}
        </>
      )}

      <div className="checkin-form__footer">
        <div>
          <Tag tone="main">{mode === "am" ? "계획" : "회고"}</Tag>
          <span>AI 조정값</span>
        </div>
        <Button type="submit">저장</Button>
      </div>

      {submitted ? <p className="form-feedback">저장 완료</p> : null}
    </Card>
  );
}

export default CheckinForm;
