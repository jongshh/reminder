export function getQuestsByType(quests, type) {
  return quests.filter((quest) => quest.type === type);
}

export function getQuestStats(quests) {
  const total = quests.length;
  const completed = quests.filter((quest) => quest.completed).length;
  const remaining = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    remaining,
    completionRate,
  };
}

export function getXpProgress(profile) {
  if (!profile.nextLevelXp) {
    return 0;
  }

  return Math.min(100, Math.round((profile.xp / profile.nextLevelXp) * 100));
}

export function getQuestById(quests, questId) {
  return quests.find((quest) => quest.id === questId) ?? quests[0];
}

export function getQuestTypeLabel(type) {
  return type === "main" ? "메인 퀘스트" : "미니 퀘스트";
}
