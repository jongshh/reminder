import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";
import { profileRepository } from "../data/profileRepository";

function ConfirmAction({ confirmLabel, description, onConfirm, title, variant = "secondary" }) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <div className="settings-confirm">
        <p>{description}</p>
        <div className="settings-actions">
          <Button onClick={onConfirm} variant={variant}>
            {confirmLabel}
          </Button>
          <Button onClick={() => setIsConfirming(false)} variant="ghost">
            취소
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button onClick={() => setIsConfirming(true)} variant={variant}>
      {title}
    </Button>
  );
}

function CapabilityRow({ enabled, label }) {
  return (
    <div className="settings-row">
      <span>{label}</span>
      <Tag tone={enabled ? "success" : "neutral"}>{enabled ? "사용 가능" : "비활성"}</Tag>
    </div>
  );
}

function SettingsPage({ onNavigate }) {
  const { deleteAccount, logout, session } = useAuth();
  const { capabilities, profile, resetGuestData } = useAppData();
  const isGuest = session?.mode === "guest";

  const handleDeleteAccount = () => {
    if (session?.userId) {
      profileRepository.deleteMemberData(session.userId);
    }

    deleteAccount();
  };

  const handleResetGuestData = () => {
    resetGuestData();
  };

  return (
    <div className="page">
      <SectionTitle
        action={
          <Button onClick={() => onNavigate("profile")} size="sm" variant="ghost">
            프로필
          </Button>
        }
        description="계정, 데이터, 연결 기능"
        eyebrow="Settings"
        title="설정"
      />

      <section className="settings-grid">
        <Card className="settings-card" tone="accent">
          <div className="settings-card__header">
            <Tag tone={isGuest ? "warning" : "main"}>{isGuest ? "Guest" : "Member"}</Tag>
            <strong>{isGuest ? "게스트 세션" : profile.name}</strong>
          </div>
          <p>
            {isGuest
              ? "데이터가 연동되어 있지 않습니다. (게스트 모드 사용 중)"
              : profile.email ?? "데이터가 연동되어 있습니다. (회원 로그인 중)"}
          </p>
        </Card>

        <Card className="settings-card">
          <h3>연결 기능</h3>
          <CapabilityRow enabled={capabilities.cloudSync} label="클라우드 동기화" />
          <CapabilityRow enabled={capabilities.leaderboard} label="리더보드" />
        </Card>
      </section>

      <Card className="settings-card">
        <h3>계정 관리</h3>
        {isGuest ? (
          <>
            <p>데이터 초기화 시 지금까지의 모든 정보가 사라집니다. 주의하세요!</p>
            <div className="settings-actions">
              <Button onClick={logout} variant="secondary">
                세션 종료
              </Button>
              <ConfirmAction
                confirmLabel="데이터 초기화"
                description="게스트 모드의 퀘스트와 프로필 데이터를 초기 상태로 되돌립니다."
                onConfirm={handleResetGuestData}
                title="데이터 초기화"
                variant="ghost"
              />
            </div>
          </>
        ) : (
          <>
            <p>로그아웃은 세션만 종료하고, 회원탈퇴는 mock 계정과 회원별 앱 데이터를 함께 삭제합니다.</p>
            <div className="settings-actions">
              <Button onClick={logout} variant="secondary">
                로그아웃
              </Button>
              <ConfirmAction
                confirmLabel="회원탈퇴"
                description="계정, 회원별 앱 데이터, 현재 세션이 삭제됩니다."
                onConfirm={handleDeleteAccount}
                title="회원탈퇴"
                variant="danger"
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default SettingsPage;
