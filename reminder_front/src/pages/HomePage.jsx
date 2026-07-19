import RecoveryCoachCard from "../components/coach/RecoveryCoachCard";
import RoomCanvas from "../components/room/RoomCanvas";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";
import { getQuestStats } from "../utils/questUtils";

function HomePage({ onNavigate, onOpenQuest, onToggleQuest, quests, rewardEvent }) {
  const { profile, todayStatus } = useAppData();
  const stats = getQuestStats(quests);
  const nextQuests = quests.filter((quest) => !quest.completed).slice(0, 3);

  return (
    <div className="page recovery-home">
      <section className="comeback-hero">
        <div className="comeback-hero__copy">
          <span className="comeback-hero__eyebrow">WELCOME BACK · DAY {profile.comebackCount}</span>
          <h2>다시 와줘서 정말 반가워요, {profile.name}님.</h2>
          <p>{profile.lastBreakDays}일의 빈칸은 실패가 아니에요. 오늘 돌아온 선택이 새로운 기록이에요.</p>
          <div className="comeback-hero__actions">
            <Button onClick={() => onNavigate("quests")}>가장 작은 루틴 시작</Button>
            <button className="text-button" onClick={() => onNavigate("checkin")} type="button">
              3초 컨디션 체크 →
            </button>
          </div>
        </div>
        <div className="comeback-bonus" aria-label="복귀 보상 리커버리 토큰 1개">
          <span>↺</span>
          <strong>+1</strong>
          <small>복귀 보너스</small>
          <b>리커버리 토큰</b>
        </div>
      </section>

      <div className="studio-layout">
        <RoomCanvas
          onSelectCharacter={() => onNavigate("characters")}
          rewardEvent={rewardEvent}
        />

        <aside className="recovery-dashboard">
          <section className="resilience-meter-card">
            <div className="resilience-meter-card__top">
              <Tag tone="success">나의 회복력</Tag>
              <span>지난 30일</span>
            </div>
            <div className="resilience-score">
              <strong>{profile.recoveryRate}</strong><span>%</span>
            </div>
            <p>쉬어간 뒤 48시간 안에 다시 돌아온 비율이에요.</p>
            <ProgressBar label={`${profile.comebackCount}번 다시 시작`} value={profile.recoveryRate} />
            <div className="resilience-meter-card__tokens">
              <span aria-hidden="true">↺</span>
              <div><strong>{profile.recoveryTokens}개</strong><small>사용 가능한 리커버리 토큰</small></div>
            </div>
          </section>

          <RecoveryCoachCard compact />
        </aside>
      </div>

      <section className="comeback-mission">
        <div className="comeback-mission__header">
          <div>
            <span>TODAY'S SOFT LANDING</span>
            <h2>오늘은 하나만 해도 성공이에요</h2>
            <p>{todayStatus.completionTarget} · 완료할수록 스튜디오가 반응해요.</p>
          </div>
          <div className="mission-count"><strong>{stats.completed}</strong><span>/{stats.total}</span></div>
        </div>
        <div className="comeback-mission__list">
          {nextQuests.length ? nextQuests.map((quest) => (
            <article className={`soft-quest soft-quest--${quest.color}`} key={quest.id}>
              <div className="soft-quest__visual" aria-hidden="true">{quest.visual}</div>
              <div className="soft-quest__copy">
                <div><Tag tone={quest.type === "mini" ? "recovery" : "main"}>{quest.recoveryAdjusted ? "AI 완화" : quest.type === "mini" ? "미니" : "메인"}</Tag><span>{quest.time}</span></div>
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
              </div>
              <div className="soft-quest__actions">
                <Button onClick={() => onToggleQuest(quest.id)} size="sm">완료 +{quest.xp}</Button>
                <button aria-label={`${quest.title} 상세 보기`} onClick={() => onOpenQuest(quest.id)} type="button">•••</button>
              </div>
            </article>
          )) : (
            <div className="all-done-message"><span>✦</span><strong>오늘의 작은 약속을 모두 지켰어요.</strong><p>이제 충분히 쉬어도 괜찮아요.</p></div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
