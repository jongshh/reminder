import CompletionRateCard from "../components/report/CompletionRateCard";
import FailurePatternList from "../components/report/FailurePatternList";
import NextWeekSuggestion from "../components/report/NextWeekSuggestion";
import WeeklySummaryCard from "../components/report/WeeklySummaryCard";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { weeklyReport } from "../data/mockData";

function WeeklyReportPage() {
  return (
    <div className="page">
      <SectionTitle
        description="성공률 · 패턴"
        eyebrow="Weekly Report"
        title="주간"
      />
      <div className="report-grid">
        <WeeklySummaryCard report={weeklyReport} />
        <CompletionRateCard report={weeklyReport} />
        <Card className="stat-card">
          <Tag tone="success">최적</Tag>
          <strong>{weeklyReport.bestTimeSlot}</strong>
          <span>집중 시간</span>
        </Card>
        <Card className="stat-card stat-card--recovery">
          <Tag tone="recovery">복귀율</Tag>
          <strong>{weeklyReport.recoveryRate}%</strong>
          <span>48시간</span>
        </Card>
      </div>
      <FailurePatternList patterns={weeklyReport.patterns} />
      <NextWeekSuggestion suggestion={weeklyReport.nextWeekSuggestion} />
    </div>
  );
}

export default WeeklyReportPage;
