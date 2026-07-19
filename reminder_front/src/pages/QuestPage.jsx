import RecoveryCoachCard from "../components/coach/RecoveryCoachCard";
import ResilienceCard from "../components/growth/ResilienceCard";
import RecoveryTokenCard from "../components/growth/RecoveryTokenCard";
import QuestBoard from "../components/quest/QuestBoard";
import ProgressBar from "../components/ui/ProgressBar";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";
import { getQuestStats } from "../utils/questUtils";

function QuestPage({ onOpenQuest, onToggleQuest, quests, rewardEvent }) {
  const { profile, todayStatus } = useAppData();
  const stats = getQuestStats(quests);

  return (
    <div className="page">
      <section className="quest-welcome">
        <div className="quest-welcome__copy">
          <Tag tone="recovery">NO STREAK, JUST RETURN</Tag>
          <h2>오늘의 목표는 완벽이 아니라<br />다시 시작하는 것.</h2>
          <p>{todayStatus.completionTarget} 완료하지 못한 항목은 내일의 실패로 남지 않아요.</p>
          <div className="mini-metrics">
            <span>회복력 {profile.recoveryRate}%</span>
            <span>복귀 {profile.comebackCount}회</span>
            <span>토큰 {profile.recoveryTokens}개</span>
          </div>
        </div>
        <div className="today-panel visual-panel">
          <div className="score-ring" style={{ "--value": `${stats.completionRate}%` }}>
            <strong>{stats.completionRate}</strong>
            <span>%</span>
          </div>
          <div className="today-panel__focus">
            <Tag tone="success">{todayStatus.condition}</Tag>
            <h3>{stats.completed ? `${stats.completed}번의 작은 성공을 만들었어요` : "첫 번째 작은 행동을 골라볼까요?"}</h3>
            <div className="mini-metrics">
              <span>{todayStatus.primaryFocus}</span>
              <span>{stats.completed}/{stats.total}</span>
              <span>체크인 {todayStatus.checkinProgress}/{todayStatus.checkinTotal}</span>
              <span>{stats.remaining}개는 선택</span>
            </div>
          </div>
          <ProgressBar label="진행" value={stats.completionRate} />
        </div>
      </section>

      <RecoveryCoachCard />

      {rewardEvent ? <div className="inline-celebration" role="status">✦ {rewardEvent.title} 완료! 캐릭터가 스튜디오에서 기뻐하고 있어요.</div> : null}

      <section className="recovery-stat-grid">
        <ResilienceCard comebackCount={profile.comebackCount} recoveryRate={profile.recoveryRate} />
        <RecoveryTokenCard count={profile.recoveryTokens} recoveryRate={profile.recoveryRate} />
      </section>

      <QuestBoard onOpenQuest={onOpenQuest} onToggleQuest={onToggleQuest} quests={quests} />
    </div>
  );
}

export default QuestPage;
