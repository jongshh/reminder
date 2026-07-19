import { useAppData } from "../../data/AppDataProvider";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

function DifficultySuggestionCard() {
  const { difficultySuggestion } = useAppData();

  return (
    <Card className="suggestion-card">
      <div className="suggestion-card__header">
        <Tag tone="recovery">{difficultySuggestion.recommendedLevel}</Tag>
        <span>제안</span>
      </div>
      <h3>{difficultySuggestion.title}</h3>
      <p>{difficultySuggestion.message}</p>
    </Card>
  );
}

export default DifficultySuggestionCard;
