import DifficultySuggestionCard from "../components/coach/DifficultySuggestionCard";
import QuestTypeBadge from "../components/quest/QuestTypeBadge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";

function QuestDetailPage({ onToggleQuest, quest }) {
  if (!quest) {
    return null;
  }

  return (
    <div className="page">
      <SectionTitle description="실행과 회복" eyebrow="퀘스트 상세" title="상세" />

      <div className="detail-layout">
        <Card className="quest-detail-card">
          <div className={`quest-detail-card__visual quest-card--${quest.color}`} aria-hidden="true">
            {quest.visual}
          </div>
          <div className="quest-card__topline">
            <QuestTypeBadge type={quest.type} />
            <span>{quest.time}</span>
          </div>
          <h2>{quest.title}</h2>
          <p>{quest.description}</p>
          <div className="quest-card__meta">
            <Tag>{quest.category}</Tag>
            <Tag tone="warning">{quest.difficulty}</Tag>
            <Tag tone="success">+{quest.xp} XP</Tag>
          </div>
          <div className="detail-section">
            <h3>순서</h3>
            <ol>
              {quest.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="detail-section">
            <h3>회복</h3>
            <p>{quest.recoveryAction}</p>
          </div>
          <Button onClick={() => onToggleQuest(quest.id)} variant={quest.completed ? "secondary" : "primary"}>
            {quest.completed ? "취소" : "완료"}
          </Button>
        </Card>

        <DifficultySuggestionCard />
      </div>
    </div>
  );
}

export default QuestDetailPage;
