import { useAppData } from "../../data/AppDataProvider";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

function DifficultySuggestionCard() {
  const { applyRecoveryPlan, difficultySuggestion, todayStatus } = useAppData();
  const isApplied = Boolean(todayStatus.aiPlanApplied);

  return (
    <Card className="suggestion-card">
      <div className="suggestion-card__header">
        <Tag tone="recovery">{difficultySuggestion.recommendedLevel}</Tag>
        <span>제안</span>
      </div>
      <h3>{isApplied ? "라이트 모드 적용 완료" : difficultySuggestion.title}</h3>
      <p>{isApplied ? "오늘 할 일에 바로 반영했어요. 다시 설정할 필요 없어요." : difficultySuggestion.message}</p>
      <Button disabled={isApplied} onClick={applyRecoveryPlan}>
        {isApplied ? "오늘 할 일에 반영됨 ✓" : "AI 제안대로 바로 조정"}
      </Button>
    </Card>
  );
}

export default DifficultySuggestionCard;
