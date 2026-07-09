import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

function CompletionRateCard({ report }) {
  return (
    <Card className="completion-card">
      <div className="completion-card__header">
        <div>
          <span>달성률</span>
          <strong>{report.completionRate}%</strong>
        </div>
        <div>
          <span>완료</span>
          <strong>
            {report.completedCount}/{report.totalCount}
          </strong>
        </div>
      </div>
      <ProgressBar label="전체" value={report.completionRate} />
      <div className="day-bars" aria-label="요일별 달성률">
        {report.days.map((day) => (
          <div className="day-bars__item" key={day.day}>
            <span style={{ height: `${day.rate}%` }} />
            <strong>{day.day}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default CompletionRateCard;
