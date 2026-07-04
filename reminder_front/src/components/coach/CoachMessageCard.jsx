import { coachMessage } from "../../data/mockData";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

function CoachMessageCard() {
  return (
    <Card className="coach-card" tone="accent">
      <div className="coach-card__label">
        <Tag tone="main">AI 코치</Tag>
        <span>{coachMessage.adjustment}</span>
      </div>
      <h3>{coachMessage.title}</h3>
      <p>{coachMessage.message}</p>
    </Card>
  );
}

export default CoachMessageCard;
