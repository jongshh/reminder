import { getQuestTypeLabel } from "../../utils/questUtils";
import Tag from "../ui/Tag";

function QuestTypeBadge({ type }) {
  return <Tag tone={type === "main" ? "main" : "mini"}>{getQuestTypeLabel(type)}</Tag>;
}

export default QuestTypeBadge;
