import Button from "../ui/Button";
import Card from "../ui/Card";
import Tag from "../ui/Tag";
import QuestCompleteButton from "./QuestCompleteButton";
import QuestTypeBadge from "./QuestTypeBadge";

function QuestCard({ onOpen, onToggle, quest }) {
  return (
    <Card className={`quest-card quest-card--${quest.color} ${quest.completed ? "is-complete" : ""}`}>
      <div className="quest-card__visual" aria-hidden="true">
        {quest.visual}
      </div>
      <div className="quest-card__topline">
        <QuestTypeBadge type={quest.type} />
        <span>{quest.time}</span>
      </div>
      <h3>{quest.title}</h3>
      <p>{quest.description}</p>
      <div className="quest-card__meta">
        <Tag>{quest.category}</Tag>
        <Tag tone="warning">{quest.difficulty}</Tag>
        <Tag tone="success">+{quest.xp} XP</Tag>
      </div>
      <div className="quest-card__actions">
        <QuestCompleteButton completed={quest.completed} onToggle={() => onToggle(quest.id)} />
        <Button onClick={() => onOpen(quest.id)} size="sm" variant="ghost">
          상세
        </Button>
      </div>
    </Card>
  );
}

export default QuestCard;
