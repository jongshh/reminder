import { useMemo, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import { navItems, todayQuests } from "./data/mockData";
import CheckinPage from "./pages/CheckinPage";
import HomePage from "./pages/HomePage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage";
import QuestDetailPage from "./pages/QuestDetailPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import { getQuestById } from "./utils/questUtils";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [quests, setQuests] = useState(todayQuests);
  const [selectedQuestId, setSelectedQuestId] = useState(todayQuests[0]?.id);

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

export default App;
