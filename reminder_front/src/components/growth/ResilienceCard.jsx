import Card from "../ui/Card";
import Tag from "../ui/Tag";

function ResilienceCard({ comebackCount = 0, recoveryRate = 0 }) {
  return (
    <Card className="stat-card stat-card--resilience">
      <Tag tone="success">회복력</Tag>
      <strong>{recoveryRate}%</strong>
      <span>48시간 안에 다시 돌아온 비율</span>
      <small>지금까지 {comebackCount}번 다시 시작했어요</small>
    </Card>
  );
}

export default ResilienceCard;
