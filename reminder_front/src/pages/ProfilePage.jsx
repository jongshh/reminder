import BadgeList from "../components/growth/BadgeList";
import LevelCard from "../components/growth/LevelCard";
import RecoveryTokenCard from "../components/growth/RecoveryTokenCard";
import StreakBadge from "../components/growth/StreakBadge";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { userProfile } from "../data/mockData";

function ProfilePage() {
  return (
    <div className="page">
      <SectionTitle
        description="클래스, 누적 XP, 스트릭, 배지를 모아 가벼운 성장 동기를 보여주는 화면입니다."
        eyebrow="Profile / Growth"
        title="프로필과 성장"
      />

      <Card className="profile-card" tone="accent">
        <Tag tone="main">{userProfile.classLabel}</Tag>
        <h2>{userProfile.name}님의 루틴 클래스</h2>
        <p>{userProfile.targetGoal}</p>
      </Card>

      <section className="insight-grid">
        <LevelCard profile={userProfile} />
        <StreakBadge streak={userProfile.streak} />
        <RecoveryTokenCard count={userProfile.recoveryTokens} recoveryRate={userProfile.recoveryRate} />
      </section>

      <BadgeList badges={userProfile.badges} />
    </div>
  );
}

export default ProfilePage;
