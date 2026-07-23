import RoomCanvas from "../components/room/RoomCanvas";
import ProgressBar from "../components/ui/ProgressBar";
import { useAppData } from "../data/AppDataProvider";
import { getQuestStats } from "../utils/questUtils";

function HomePage({ onNavigate, quests = [] }) {
  const { profile, todayStatus } = useAppData();
  const stats = getQuestStats(quests);

  return (
    <div className="page page--simple-home">
      <RoomCanvas onSelectCharacter={() => onNavigate("characters")} />

      <section className="home-status-strip" aria-label="오늘 요약">
        <div>
          <span>오늘 진행</span>
          <strong>
            {stats.completed}/{stats.total}
          </strong>
        </div>
        <div>
          <span>남은 루틴</span>
          <strong>{stats.remaining}</strong>
        </div>
        <div>
          <span>연속 기록</span>
          <strong>{profile.streak}일</strong>
        </div>
        <div>
          <span>컨디션</span>
          <strong>{todayStatus.condition}</strong>
        </div>
        <ProgressBar label={`${stats.completionRate}% 완료`} value={stats.completionRate} />
      </section>
    </div>
  );
}

export default HomePage;
