import { supabase } from "../lib/supabaseClient";

const EDGE_FUNCTION_NAME = "generate-onboarding-quests";

const normalizeGeneratedQuest = (quest, index) => ({
  id: quest.id || `generated-${index + 1}`,
  type: quest.type === "mini" ? "mini" : "main",
  title: quest.title || "오늘의 루틴",
  category: quest.category || "루틴",
  time: quest.scheduledTime || quest.time || "오늘",
  scheduledTime: quest.scheduledTime || quest.time || "오늘",
  difficulty: quest.difficulty || "보통",
  xp: Number(quest.xp) || 20,
  completed: false,
  completedAt: null,
  visual: quest.visual || String(index + 1),
  color: quest.color || "teal",
  description: quest.description || "오늘 가능한 크기로 실행하는 루틴입니다.",
  recoveryAction: quest.recoveryAction || "5분만 다시 시작하기",
  steps: Array.isArray(quest.steps) ? quest.steps : [],
});

const normalizeResponse = (data) => {
  if (!data || !Array.isArray(data.quests) || data.quests.length === 0) {
    return null;
  }

  return {
    message: data.message || "",
    profilePatch: data.profilePatch && typeof data.profilePatch === "object" ? data.profilePatch : {},
    quests: data.quests.map(normalizeGeneratedQuest),
  };
};

export const generateOnboardingQuests = async (payload) => {
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.functions.invoke(EDGE_FUNCTION_NAME, {
      body: {
        targetGoal: payload.targetGoal,
        availableMinutes: Number(payload.availableMinutes),
        energyLevel: payload.energyLevel,
        preference: payload.preference,
      },
    });

    if (error) {
      return null;
    }

    return normalizeResponse(data);
  } catch {
    return null;
  }
};
