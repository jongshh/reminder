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
        description="달성률보다 다음 주에 어떻게 쉽게 돌아올지까지 정리하는 리포트 화면입니다."
        eyebrow="Weekly Report"
        title="주간 리포트"
      />
      <div className="report-grid">
        <WeeklySummaryCard report={weeklyReport} />
        <CompletionRateCard report={weeklyReport} />
        <Card className="stat-card">
          <Tag tone="success">최적 시간대</Tag>
          <strong>{weeklyReport.bestTimeSlot}</strong>
          <span>다음 주 메인 퀘스트 배치 기준입니다.</span>
        </Card>
        <Card className="stat-card stat-card--recovery">
          <Tag tone="recovery">복귀율</Tag>
          <strong>{weeklyReport.recoveryRate}%</strong>
          <span>실패 후 48시간 안에 돌아온 비율입니다.</span>
        </Card>
      </div>
      <FailurePatternList patterns={weeklyReport.patterns} />
      <NextWeekSuggestion suggestion={weeklyReport.nextWeekSuggestion} />
    </div>
  );
}

export default WeeklyReportPage;
