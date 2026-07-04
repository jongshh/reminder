import { getXpProgress } from "../../utils/questUtils";
import ProgressBar from "../ui/ProgressBar";

function XpBar({ profile }) {
  return <ProgressBar label={`${profile.xp}/${profile.nextLevelXp} XP`} value={getXpProgress(profile)} />;
}

export default XpBar;
