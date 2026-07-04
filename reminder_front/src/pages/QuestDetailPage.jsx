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
      <SectionTitle
        description="빈도, 수행 시간대, 미니 행동, 실패 시 복구 행동을 한 화면에서 확인하는 기본 틀입니다."
        eyebrow="Quest Detail"
        title="퀘스트 상세"
      />

      <div className="detail-layout">
        <Card className="quest-detail-card">
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
            <h3>실행 단계</h3>
            <ol>
              {quest.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="detail-section">
            <h3>실패 시 복구 행동</h3>
            <p>{quest.recoveryAction}</p>
          </div>
          <Button onClick={() => onToggleQuest(quest.id)} variant={quest.completed ? "secondary" : "primary"}>
            {quest.completed ? "완료 취소" : "퀘스트 완료"}
          </Button>
        </Card>

        <DifficultySuggestionCard />
      </div>
    </div>
  );
}

export default QuestDetailPage;
