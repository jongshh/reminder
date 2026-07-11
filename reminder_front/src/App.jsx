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
import SignupPage from "./pages/SignupPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import { getQuestById } from "./utils/questUtils";

function AuthenticatedApp() {
  const { navItems, quests, setQuests } = useAppData();
  const [activePage, setActivePage] = useState("onboarding");
  const [selectedQuestId, setSelectedQuestId] = useState(quests[0]?.id);

  const currentLabel = navItems.find((item) => item.id === activePage)?.label ?? "Questlog";
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
    switch (activePage) {
      case "onboarding":
        return <OnboardingPage onNavigate={setActivePage} />;
      case "checkin":
        return <CheckinPage />;
      case "quest":
        return <QuestDetailPage onToggleQuest={handleToggleQuest} quest={selectedQuest} />;
      case "report":
        return <WeeklyReportPage />;
      case "profile":
        return <ProfilePage />;
      case "home":
      default:
        return <HomePage onOpenQuest={handleOpenQuest} onToggleQuest={handleToggleQuest} quests={quests} />;
    }
  };

  return (
    <AppLayout
      activePage={activePage}
      currentLabel={currentLabel}
      navItems={navItems}
      onNavigate={setActivePage}
    >
      {renderPage()}
    </AppLayout>
  );
}

function App() {
  const { continueAsGuest, isRestoring, login, session, signup } = useAuth();
  const [authPage, setAuthPage] = useState("entry");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startAuthTransition = useCallback((authenticate) => {
    authenticate();
    setIsTransitioning(true);
  }, []);

  const finishAuthTransition = useCallback(() => {
    setAuthPage("entry");
    setIsTransitioning(false);
  }, []);

  if (isRestoring) {
    return <AuthLoadingPage />;
  }

  if (!session) {
    switch (authPage) {
      case "login":
        return (
          <LoginPage
            onBack={() => setAuthPage("entry")}
            onSubmit={(credentials) => startAuthTransition(() => login(credentials))}
          />
        );
      case "signup":
        return (
          <SignupPage
            onBack={() => setAuthPage("entry")}
            onSubmit={(details) => startAuthTransition(() => signup(details))}
          />
        );
      case "entry":
      default:
        return (
          <AuthEntryPage
            onGuest={() => startAuthTransition(continueAsGuest)}
            onLogin={() => setAuthPage("login")}
            onSignup={() => setAuthPage("signup")}
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
