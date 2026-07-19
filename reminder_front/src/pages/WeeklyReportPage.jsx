import CompletionRateCard from "../components/report/CompletionRateCard";
import FailurePatternList from "../components/report/FailurePatternList";
import NextWeekSuggestion from "../components/report/NextWeekSuggestion";
import WeeklySummaryCard from "../components/report/WeeklySummaryCard";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";

function WeeklyReportPage() {
  const { weeklyReport } = useAppData();

  return (
    <div className="page">
      <SectionTitle description="잘한 날보다 다시 돌아온 순간을 먼저 봐요" eyebrow="MY RHYTHM" title="나의 리듬" />
      <div className="report-grid">
        <WeeklySummaryCard report={weeklyReport} />
        <CompletionRateCard report={weeklyReport} />
        <Card className="stat-card">
          <Tag tone="success">돌아온 날</Tag>
          <strong>{weeklyReport.comebackCount}일</strong>
          <span>쉬어간 뒤 다시 시작</span>
        </Card>
        <Card className="stat-card stat-card--recovery">
          <Tag tone="recovery">회복</Tag>
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
