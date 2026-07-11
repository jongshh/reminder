import BadgeList from "../components/growth/BadgeList";
import LevelCard from "../components/growth/LevelCard";
import RecoveryTokenCard from "../components/growth/RecoveryTokenCard";
import StreakBadge from "../components/growth/StreakBadge";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";

function ProfilePage() {
  const { capabilities, profile } = useAppData();

  return (
    <div className="page">
      <SectionTitle
        description="레벨 · 연속 · 배지"
        eyebrow="Profile / Growth"
        title="성장"
      />

      <Card className="profile-card" tone="accent">
        <Tag tone="main">{profile.classLabel}</Tag>
        <h2>{profile.name}</h2>
        <p>{profile.targetGoal}</p>
        {!capabilities.cloudSync ? <small>비회원 데이터는 이 기기 안에서만 유지됩니다.</small> : null}
      </Card>

      <section className="insight-grid">
        <LevelCard profile={profile} />
        <StreakBadge streak={profile.streak} />
        <RecoveryTokenCard count={profile.recoveryTokens} recoveryRate={profile.recoveryRate} />
      </section>

      <BadgeList badges={profile.badges} />
    </div>
  );
}

export default ProfilePage;
