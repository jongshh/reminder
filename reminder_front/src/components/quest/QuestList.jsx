import SectionTitle from "../ui/SectionTitle";
import QuestCard from "./QuestCard";

function QuestList({ description, onOpen, onToggle, quests, title }) {
  return (
    <section className="quest-list">
      <SectionTitle description={description} title={title} />
      <div className="quest-list__items">
        {quests.map((quest) => (
          <QuestCard key={quest.id} onOpen={onOpen} onToggle={onToggle} quest={quest} />
        ))}
      </div>
    </section>
  );
}

export default QuestList;
