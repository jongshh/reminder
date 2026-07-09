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
        description="메인 3 · 미니 2"
        eyebrow="Daily Quest Board"
        title="퀘스트"
      />
      <div className="quest-board__summary">
        <ProgressBar label={`${stats.completed}/${stats.total} 완료`} value={stats.completionRate} />
      </div>
      <QuestList
        description="핵심"
        onOpen={onOpenQuest}
        onToggle={onToggleQuest}
        quests={mainQuests}
        title="메인"
      />
      <QuestList
        description="복구"
        onOpen={onOpenQuest}
        onToggle={onToggleQuest}
        quests={miniQuests}
        title="미니"
      />
    </section>
  );
}

export default QuestBoard;
