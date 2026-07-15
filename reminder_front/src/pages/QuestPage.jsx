import CoachMessageCard from "../components/coach/CoachMessageCard";
import LevelCard from "../components/growth/LevelCard";
import RecoveryTokenCard from "../components/growth/RecoveryTokenCard";
import StreakBadge from "../components/growth/StreakBadge";
import QuestBoard from "../components/quest/QuestBoard";
import ProgressBar from "../components/ui/ProgressBar";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";
import { getQuestStats } from "../utils/questUtils";

function QuestPage({ onOpenQuest, onToggleQuest, quests }) {
  const { profile, spaceProfile, todayStatus } = useAppData();
  const stats = getQuestStats(quests);

  return (
    <div className="page">
      <section className="home-overview">
        <SectionTitle description={todayStatus.completionTarget} eyebrow="Daily Quest" title="오늘 퀘스트" />
        <div className="today-panel visual-panel">
          <div className="score-ring" style={{ "--value": `${stats.completionRate}%` }}>
            <strong>{stats.completionRate}</strong>
            <span>%</span>
          </div>
          <div className="today-panel__focus">
            <Tag tone="success">{todayStatus.condition}</Tag>
            <h3>{spaceProfile.todayQuestion}</h3>
            <div className="mini-metrics">
              <span>{todayStatus.primaryFocus}</span>
              <span>{stats.completed}/{stats.total}</span>
              <span>체크 {todayStatus.checkinProgress}/{todayStatus.checkinTotal}</span>
              <span>{stats.remaining} 남음</span>
            </div>
          </div>
          <ProgressBar label="진행" value={stats.completionRate} />
        </div>
      </section>

      <section className="insight-grid">
        <CoachMessageCard />
        <LevelCard profile={profile} />
        <StreakBadge streak={profile.streak} />
        <RecoveryTokenCard count={profile.recoveryTokens} recoveryRate={profile.recoveryRate} />
      </section>

      <QuestBoard onOpenQuest={onOpenQuest} onToggleQuest={onToggleQuest} quests={quests} />
    </div>
  );
}

export default QuestPage;
