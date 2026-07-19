import { useCallback, useMemo, useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import AppLayout from "./components/layout/AppLayout";
import { AppDataProvider, useAppData } from "./data/AppDataProvider";
import AuthEntryPage from "./pages/AuthEntryPage";
import AuthLoadingPage from "./pages/AuthLoadingPage";
import CharacterPage from "./pages/CharacterPage";
import CheckinPage from "./pages/CheckinPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage";
import QuestDetailPage from "./pages/QuestDetailPage";
import QuestPage from "./pages/QuestPage";
import SettingsPage from "./pages/SettingsPage";
import SignupPage from "./pages/SignupPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import { getQuestById } from "./utils/questUtils";

const navigationMeta = {
  home: { icon: "⌂", label: "스튜디오", shortLabel: "스튜디오" },
  characters: { icon: "☺", label: "캐릭터", shortLabel: "친구" },
  quests: { icon: "✓", label: "오늘 할 일", shortLabel: "할 일" },
  checkin: { icon: "◐", label: "컨디션", shortLabel: "체크" },
  quest: { icon: "◇", label: "루틴 상세", shortLabel: "상세" },
  report: { icon: "▣", label: "나의 리듬", shortLabel: "리듬" },
  profile: { icon: "↺", label: "회복 기록", shortLabel: "회복" },
  settings: { icon: "⚙", label: "설정", shortLabel: "설정" },
  onboarding: { icon: "◎", label: "시작 설정", shortLabel: "시작" },
};

function AuthenticatedApp() {
  const { dataError, isDataReady, navItems, quests, setQuests } = useAppData();
  const [activePage, setActivePage] = useState("home");
  const [selectedQuestId, setSelectedQuestId] = useState(quests[0]?.id);
  const [rewardEvent, setRewardEvent] = useState(null);

  const displayNavItems = useMemo(
    () => navItems.map((item) => ({ ...item, ...navigationMeta[item.id] })),
    [navItems],
  );
  const currentLabel = displayNavItems.find((item) => item.id === activePage)?.label ?? "Questlog";
  const selectedQuest = useMemo(() => getQuestById(quests, selectedQuestId), [quests, selectedQuestId]);

  const handleToggleQuest = (questId) => {
    const targetQuest = quests.find((quest) => quest.id === questId);
    setQuests((currentQuests) =>
      currentQuests.map((quest) =>
        quest.id === questId ? { ...quest, completed: !quest.completed } : quest,
      ),
    );

    if (targetQuest && !targetQuest.completed) {
      const event = { id: Date.now(), title: targetQuest.title, xp: targetQuest.xp };
      setRewardEvent(event);
      window.setTimeout(() => {
        setRewardEvent((current) => (current?.id === event.id ? null : current));
      }, 2400);
    }
  };

  const handleOpenQuest = (questId) => {
    setSelectedQuestId(questId);
    setActivePage("quest");
  };

  const renderPage = () => {
    if (!isDataReady) {
      return <AuthLoadingPage />;
    }

    switch (activePage) {
      case "onboarding":
        return <OnboardingPage onNavigate={setActivePage} />;
      case "checkin":
        return <CheckinPage />;
      case "characters":
        return <CharacterPage />;
      case "quests":
        return (
          <QuestPage
            onOpenQuest={handleOpenQuest}
            onToggleQuest={handleToggleQuest}
            quests={quests}
            rewardEvent={rewardEvent}
          />
        );
      case "quest":
        return <QuestDetailPage onToggleQuest={handleToggleQuest} quest={selectedQuest} />;
      case "report":
        return <WeeklyReportPage />;
      case "profile":
        return <ProfilePage onNavigate={setActivePage} />;
      case "settings":
        return <SettingsPage onNavigate={setActivePage} />;
      case "home":
      default:
        return (
          <HomePage
            onNavigate={setActivePage}
            onOpenQuest={handleOpenQuest}
            onToggleQuest={handleToggleQuest}
            quests={quests}
            rewardEvent={rewardEvent}
          />
        );
    }
  };

  return (
    <AppLayout
      activePage={activePage}
      currentLabel={currentLabel}
      navItems={displayNavItems}
      onNavigate={setActivePage}
    >
      {dataError ? <p className="form-error">데이터 동기화 오류: {dataError}</p> : null}
      {renderPage()}
      {rewardEvent ? (
        <div className="reward-toast" role="status">
          <span aria-hidden="true">✦</span>
          <div>
            <strong>방이 한층 더 반짝여요!</strong>
            <small>{rewardEvent.title} · +{rewardEvent.xp} XP</small>
          </div>
        </div>
      ) : null}
    </AppLayout>
  );
}

function App() {
  const {
    authError,
    clearAuthError,
    continueAsGuest,
    isAuthSubmitting,
    isRestoring,
    login,
    session,
    signup,
  } = useAuth();
  const [authPage, setAuthPage] = useState("entry");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startAuthTransition = useCallback(async (authenticate) => {
    try {
      await authenticate();
      setIsTransitioning(true);
    } catch {
      setIsTransitioning(false);
    }
  }, []);

  const finishAuthTransition = useCallback(() => {
    setAuthPage("entry");
    setIsTransitioning(false);
  }, []);

  const goToAuthPage = useCallback(
    (page) => {
      clearAuthError();
      setAuthPage(page);
    },
    [clearAuthError],
  );

  if (isRestoring) {
    return <AuthLoadingPage />;
  }

  if (!session) {
    switch (authPage) {
      case "login":
        return (
          <LoginPage
            error={authError}
            isSubmitting={isAuthSubmitting}
            onBack={() => goToAuthPage("entry")}
            onSubmit={(credentials) => startAuthTransition(() => login(credentials))}
          />
        );
      case "signup":
        return (
          <SignupPage
            error={authError}
            isSubmitting={isAuthSubmitting}
            onBack={() => goToAuthPage("entry")}
            onSubmit={(details) => startAuthTransition(() => signup(details))}
          />
        );
      case "entry":
      default:
        return (
          <AuthEntryPage
            onGuest={() => startAuthTransition(continueAsGuest)}
            onLogin={() => goToAuthPage("login")}
            onSignup={() => goToAuthPage("signup")}
          />
        );
    }
  }

  if (isTransitioning) {
    return <AuthLoadingPage onComplete={finishAuthTransition} />;
  }

  return (
    <AppDataProvider>
      <AuthenticatedApp />
    </AppDataProvider>
  );
}

export default App;
