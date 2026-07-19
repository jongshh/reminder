import BadgeList from "../components/growth/BadgeList";
import LevelCard from "../components/growth/LevelCard";
import RecoveryTokenCard from "../components/growth/RecoveryTokenCard";
import ResilienceCard from "../components/growth/ResilienceCard";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";

function ProfilePage({ onNavigate }) {
  const { capabilities, profile } = useAppData();

  return (
    <div className="page">
      <SectionTitle description="쉬었다가 다시 시작한 모든 순간" eyebrow="RESILIENCE LOG" title="회복 기록" />

      <Card className="profile-card" tone="accent">
        <Tag tone="main">{profile.classLabel}</Tag>
        <h2>{profile.name}</h2>
        <p>{profile.targetGoal} · 지금까지 {profile.comebackCount ?? 0}번 다시 돌아왔어요.</p>
        {!capabilities.cloudSync ? <small>게스트 데이터는 이 기기 안에만 저장됩니다.</small> : null}
        <div className="profile-card__actions">
          <Button onClick={() => onNavigate("settings")} size="sm" variant="ghost">
            설정
          </Button>
        </div>
      </Card>

      <section className="insight-grid">
        <LevelCard profile={profile} />
        <ResilienceCard comebackCount={profile.comebackCount} recoveryRate={profile.recoveryRate} />
        <RecoveryTokenCard count={profile.recoveryTokens} recoveryRate={profile.recoveryRate} />
      </section>

      <BadgeList badges={profile.badges} />
    </div>
  );
}

export default ProfilePage;
