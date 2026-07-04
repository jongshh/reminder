import { difficultySuggestion } from "../../data/mockData";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

function DifficultySuggestionCard() {
  return (
    <Card className="suggestion-card">
      <div className="suggestion-card__header">
        <Tag tone="recovery">{difficultySuggestion.recommendedLevel}</Tag>
        <span>AI 재설계 후보</span>
      </div>
      <h3>{difficultySuggestion.title}</h3>
      <p>{difficultySuggestion.message}</p>
    </Card>
  );
}

export default DifficultySuggestionCard;
