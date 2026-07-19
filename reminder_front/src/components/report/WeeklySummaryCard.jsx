import Card from "../ui/Card";
import Tag from "../ui/Tag";

function WeeklySummaryCard({ report }) {
  return (
    <Card className="weekly-summary" tone="accent">
      <Tag tone="main">룰 요약</Tag>
      <h3>이번 주</h3>
      <p>{report.summary}</p>
    </Card>
  );
}

export default WeeklySummaryCard;
