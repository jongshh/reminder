import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";

function ConfirmAction({ confirmLabel, description, onConfirm, title, variant = "secondary" }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const handleConfirm = async () => {
    setIsWorking(true);
    try {
      await onConfirm();
    } finally {
      setIsWorking(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="settings-confirm">
        <p>{description}</p>
        <div className="settings-actions">
          <Button disabled={isWorking} onClick={handleConfirm} variant={variant}>
            {isWorking ? "처리 중..." : confirmLabel}
          </Button>
          <Button disabled={isWorking} onClick={() => setIsConfirming(false)} variant="ghost">
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
  const { capabilities, dataError, deleteMemberData, profile, resetGuestData } = useAppData();
  const isGuest = session?.mode === "guest";

  const handleDeleteAccount = async () => {
    await deleteMemberData();
    await deleteAccount();
  };

  const handleResetGuestData = async () => {
    await resetGuestData();
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
        eyebrow="설정"
        title="설정"
      />

      {dataError ? <p className="form-error">{dataError}</p> : null}

      <section className="settings-grid">
        <Card className="settings-card" tone="accent">
          <div className="settings-card__header">
            <Tag tone={isGuest ? "warning" : "main"}>{isGuest ? "게스트" : "회원"}</Tag>
            <strong>{isGuest ? "게스트 세션" : profile.name}</strong>
          </div>
          <p>
            {isGuest
              ? "게스트 데이터는 이 브라우저에만 저장됩니다."
              : profile.email ?? "계정이 Supabase에 연결되어 있습니다."}
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
            <p>게스트 데이터를 초기화하면 이 브라우저에 저장된 퀘스트, 프로필, 진행 기록이 기본 상태로 돌아갑니다.</p>
            <div className="settings-actions">
              <Button onClick={logout} variant="secondary">
                세션 종료
              </Button>
              <ConfirmAction
                confirmLabel="데이터 초기화"
                description="이 브라우저에 저장된 게스트 퀘스트, 프로필, 진행 기록을 초기화합니다."
                onConfirm={handleResetGuestData}
                title="게스트 데이터 초기화"
                variant="ghost"
              />
            </div>
          </>
        ) : (
          <>
            <p>
            </p>
            <div className="settings-actions">
              <Button onClick={logout} variant="secondary">
                로그아웃
              </Button>
              <ConfirmAction
                confirmLabel="데이터 삭제"
                description="Supabase 프로필과 앱 데이터 row를 삭제하고 로그아웃합니다."
                onConfirm={handleDeleteAccount}
                title="계정 데이터 삭제"
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
