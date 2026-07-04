import { getQuestStats, getQuestsByType } from "../../utils/questUtils";
import ProgressBar from "../ui/ProgressBar";
import SectionTitle from "../ui/SectionTitle";
import QuestList from "./QuestList";

function QuestBoard({ onOpenQuest, onToggleQuest, quests }) {
  const mainQuests = getQuestsByType(quests, "main");
  const miniQuests = getQuestsByType(quests, "mini");
  const stats = getQuestStats(quests);

  return (
    <section className="quest-board">
      <SectionTitle
        description="메인은 실행력을 만들고, 미니는 실패한 날에도 다시 돌아오는 길을 열어둡니다."
        eyebrow="Daily Quest Board"
        title="오늘의 퀘스트 보드"
      />
      <div className="quest-board__summary">
        <ProgressBar label={`${stats.completed}/${stats.total} 완료`} value={stats.completionRate} />
      </div>
      <QuestList
        description="오늘의 핵심 목표를 가장 작은 실행 단위로 쪼갠 목록입니다."
        onOpen={onOpenQuest}
        onToggle={onToggleQuest}
        quests={mainQuests}
        title="메인 퀘스트"
      />
      <QuestList
        description="컨디션이 낮아도 앱을 떠나지 않게 해주는 복구용 행동입니다."
        onOpen={onOpenQuest}
        onToggle={onToggleQuest}
        quests={miniQuests}
        title="미니 퀘스트"
      />
    </section>
  );
}

export default QuestBoard;
