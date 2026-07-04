import CoachMessageCard from "../components/coach/CoachMessageCard";
import LevelCard from "../components/growth/LevelCard";
import RecoveryTokenCard from "../components/growth/RecoveryTokenCard";
import StreakBadge from "../components/growth/StreakBadge";
import QuestBoard from "../components/quest/QuestBoard";
import ProgressBar from "../components/ui/ProgressBar";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { todayStatus, userProfile } from "../data/mockData";
import { getQuestStats } from "../utils/questUtils";

function HomePage({ onOpenQuest, onToggleQuest, quests }) {
  const stats = getQuestStats(quests);

  return (
    <div className="page">
      <section className="home-overview">
        <SectionTitle
          description={todayStatus.completionTarget}
          eyebrow="Today"
          title="이것만 끝내면 오늘은 성공"
        />
        <div className="today-panel">
          <div>
            <Tag tone="success">컨디션 {todayStatus.condition}</Tag>
            <h3>{todayStatus.primaryFocus}</h3>
            <p>체크인 {todayStatus.checkinProgress}/{todayStatus.checkinTotal} 완료</p>
          </div>
          <ProgressBar label="오늘 진행률" value={stats.completionRate} />
        </div>
      </section>

      <section className="insight-grid">
        <CoachMessageCard />
        <LevelCard profile={userProfile} />
        <StreakBadge streak={userProfile.streak} />
        <RecoveryTokenCard count={userProfile.recoveryTokens} recoveryRate={userProfile.recoveryRate} />
      </section>

      <QuestBoard onOpenQuest={onOpenQuest} onToggleQuest={onToggleQuest} quests={quests} />
    </div>
  );
}

export default HomePage;
