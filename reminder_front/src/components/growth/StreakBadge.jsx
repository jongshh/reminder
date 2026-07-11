import Card from "../ui/Card";
import Tag from "../ui/Tag";

function StreakBadge({ streak }) {
  return (
    <Card className="stat-card">
      <Tag tone="warning">연속 달성</Tag>
      <strong>{streak}일</strong>
      <span>연속</span>
    </Card>
  );
}

export default StreakBadge;
