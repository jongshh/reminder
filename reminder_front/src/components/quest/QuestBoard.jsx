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
        description={`메인 ${mainQuests.length} · 부담을 낮춘 미니 ${miniQuests.length}`}
        eyebrow="CHOOSE YOUR PACE"
        title="오늘의 선택지"
      />
      <div className="quest-board__summary">
        <ProgressBar label={`${stats.completed}/${stats.total} · 하나만 해도 오늘은 성공`} value={stats.completionRate} />
      </div>
      <QuestList
        description="꼭 다 하지 않아도 괜찮은 핵심 루틴"
        onOpen={onOpenQuest}
        onToggle={onToggleQuest}
        quests={mainQuests}
        title="메인"
      />
      <QuestList
        description="복귀 성공으로 인정되는 가장 작은 행동"
        onOpen={onOpenQuest}
        onToggle={onToggleQuest}
        quests={miniQuests}
        title="가볍게 시작"
      />
    </section>
  );
}

export default QuestBoard;
