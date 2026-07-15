import { useCallback, useMemo, useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import AppLayout from "./components/layout/AppLayout";
import { AppDataProvider, useAppData } from "./data/AppDataProvider";
import AuthEntryPage from "./pages/AuthEntryPage";
import AuthLoadingPage from "./pages/AuthLoadingPage";
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
  home: { icon: "H", label: "Studio", shortLabel: "Home" },
  quests: { icon: "Q", label: "Daily Quests", shortLabel: "Quests" },
  checkin: { icon: "C", label: "Condition Check", shortLabel: "Check" },
  quest: { icon: "D", label: "Quest Detail", shortLabel: "Detail" },
  report: { icon: "R", label: "Weekly Report", shortLabel: "Report" },
  profile: { icon: "P", label: "Growth Log", shortLabel: "Profile" },
  settings: { icon: "S", label: "Settings", shortLabel: "Settings" },
  onboarding: { icon: "O", label: "Start Setup", shortLabel: "Start" },
};

function AuthenticatedApp() {
  const { dataError, isDataReady, navItems, quests, setQuests } = useAppData();
  const [activePage, setActivePage] = useState("home");
  const [selectedQuestId, setSelectedQuestId] = useState(quests[0]?.id);

  const displayNavItems = useMemo(
    () => navItems.map((item) => ({ ...item, ...navigationMeta[item.id] })),
    [navItems],
  );
  const currentLabel = displayNavItems.find((item) => item.id === activePage)?.label ?? "Questlog";
  const selectedQuest = useMemo(() => getQuestById(quests, selectedQuestId), [quests, selectedQuestId]);

  const handleToggleQuest = (questId) => {
    setQuests((currentQuests) =>
      currentQuests.map((quest) =>
        quest.id === questId ? { ...quest, completed: !quest.completed } : quest,
      ),
    );
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
      case "quests":
        return <QuestPage onOpenQuest={handleOpenQuest} onToggleQuest={handleToggleQuest} quests={quests} />;
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
      {dataError ? <p className="form-error">Data sync error: {dataError}</p> : null}
      {renderPage()}
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
