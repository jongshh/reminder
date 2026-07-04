import Card from "../ui/Card";
import Tag from "../ui/Tag";
import XpBar from "./XpBar";

function LevelCard({ profile }) {
  return (
    <Card className="level-card">
      <div className="level-card__header">
        <Tag tone="success">{profile.classLabel}</Tag>
        <strong>Lv.{profile.level}</strong>
      </div>
      <h3>{profile.targetGoal}</h3>
      <XpBar profile={profile} />
    </Card>
  );
}

export default LevelCard;
