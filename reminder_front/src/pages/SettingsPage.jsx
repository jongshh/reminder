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
            {isWorking ? "Working..." : confirmLabel}
          </Button>
          <Button disabled={isWorking} onClick={() => setIsConfirming(false)} variant="ghost">
            Cancel
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
      <Tag tone={enabled ? "success" : "neutral"}>{enabled ? "Enabled" : "Off"}</Tag>
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
            Profile
          </Button>
        }
        description="Account, data, and connected features"
        eyebrow="Settings"
        title="Settings"
      />

      {dataError ? <p className="form-error">{dataError}</p> : null}

      <section className="settings-grid">
        <Card className="settings-card" tone="accent">
          <div className="settings-card__header">
            <Tag tone={isGuest ? "warning" : "main"}>{isGuest ? "Guest" : "Member"}</Tag>
            <strong>{isGuest ? "Guest session" : profile.name}</strong>
          </div>
          <p>
            {isGuest
              ? "Guest data stays in this browser only."
              : profile.email ?? "Your account is connected to Supabase."}
          </p>
        </Card>

        <Card className="settings-card">
          <h3>Connected features</h3>
          <CapabilityRow enabled={capabilities.cloudSync} label="Cloud sync" />
          <CapabilityRow enabled={capabilities.leaderboard} label="Leaderboard" />
        </Card>
      </section>

      <Card className="settings-card">
        <h3>Account management</h3>
        {isGuest ? (
          <>
            <p>Resetting guest data restores the local app data in this browser to the default state.</p>
            <div className="settings-actions">
              <Button onClick={logout} variant="secondary">
                End session
              </Button>
              <ConfirmAction
                confirmLabel="Reset data"
                description="This clears guest quests, profile data, and local progress for this browser."
                onConfirm={handleResetGuestData}
                title="Reset guest data"
                variant="ghost"
              />
            </div>
          </>
        ) : (
          <>
            <p>
              Logout ends the current session. Delete account data removes your profile and app data rows, then signs
              you out. Deleting the Supabase Auth user itself should be added later through a server or Edge Function.
            </p>
            <div className="settings-actions">
              <Button onClick={logout} variant="secondary">
                Log out
              </Button>
              <ConfirmAction
                confirmLabel="Delete data"
                description="This removes your Supabase profile and app data rows, then logs you out."
                onConfirm={handleDeleteAccount}
                title="Delete account data"
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
