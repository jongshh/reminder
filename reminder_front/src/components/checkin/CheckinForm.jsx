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
  const { checkinOptions, failureReasonOptions, saveCheckin, todayStatus } = useAppData();
  const [mode, setMode] = useState("am");
  const [energyLevel, setEnergyLevel] = useState("normal");
  const [busyLevel, setBusyLevel] = useState("normal");
  const [primaryFocus, setPrimaryFocus] = useState(todayStatus.primaryFocus);
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

    if (mode === "am") {
      saveCheckin("am", { energyLevel, busyLevel, primaryFocus, completedToday: false, failureReasons: [] });
    } else {
      saveCheckin("pm", {
        energyLevel,
        busyLevel,
        primaryFocus,
        completedToday,
        failureReasons: completedToday ? [] : failureReasons,
      });
    }

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
          <EnergyCheck onChange={setEnergyLevel} options={checkinOptions.energyLevels} value={energyLevel} />
          <BusyLevelSelect onChange={setBusyLevel} options={checkinOptions.busyLevels} value={busyLevel} />
          <TodayFocusInput onChange={setPrimaryFocus} value={primaryFocus} />
        </>
      ) : (
        <>
          <label className="check-toggle">
            <input checked={completedToday} onChange={(event) => setCompletedToday(event.target.checked)} type="checkbox" />
            <span>오늘 목표를 완료했어요</span>
          </label>
          {!completedToday ? (
            <FailureReasonTags onToggle={toggleFailureReason} options={failureReasonOptions} selected={failureReasons} />
          ) : null}
        </>
      )}

      <div className="checkin-form__footer">
        <div>
          <Tag tone="main">{mode === "am" ? "계획" : "회고"}</Tag>
          <span>룰 기반 조정</span>
        </div>
        <Button type="submit">저장</Button>
      </div>

      {submitted ? <p className="form-feedback">저장 완료</p> : null}
    </Card>
  );
}

export default CheckinForm;
