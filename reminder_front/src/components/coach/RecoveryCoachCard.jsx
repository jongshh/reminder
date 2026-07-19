import { useAppData } from "../../data/AppDataProvider";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

function RecoveryCoachCard({ compact = false }) {
  const { applyRecoveryPlan, difficultySuggestion, todayStatus } = useAppData();
  const isApplied = Boolean(todayStatus.aiPlanApplied);

  return (
    <section className={`recovery-coach ${compact ? "recovery-coach--compact" : ""}`}>
      <div className="recovery-coach__icon" aria-hidden="true">✦</div>
      <div className="recovery-coach__copy">
        <div className="recovery-coach__label">
          <Tag tone="recovery">AI 라이트 모드</Tag>
          <span>{isApplied ? "반영됨" : "한 번에 적용"}</span>
        </div>
        <h3>{isApplied ? "오늘 루틴을 가볍게 바꿨어요" : difficultySuggestion.title}</h3>
        <p>
          {isApplied
            ? "메인 퀘스트 하나를 부담 없는 미니 퀘스트로 낮췄어요. 오늘은 하나면 충분해요."
            : difficultySuggestion.message}
        </p>
      </div>
      <Button disabled={isApplied} onClick={applyRecoveryPlan} size={compact ? "sm" : "md"}>
        {isApplied ? "적용 완료 ✓" : "10분 루틴으로 낮추기"}
      </Button>
    </section>
  );
}

export default RecoveryCoachCard;
