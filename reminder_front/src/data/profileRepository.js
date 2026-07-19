import { requireSupabase } from "../lib/supabaseClient";
import { getRecentDateKeys, getTodayKey } from "../utils/dateUtils";
import { createCoachState, createTodayStatus, createWeeklyReport, normalizeProfileProgress } from "../utils/routineRules";
import { defaultAppData } from "./defaultAppData";

const GUEST_DATA_KEY = "questlog.data.guest.v2";
const LEGACY_GUEST_DATA_KEY = "questlog.data.guest";
const APP_DATA_SCHEMA_VERSION = 2;

const clone = (value) => JSON.parse(JSON.stringify(value));

const getStorage = () => (typeof window === "undefined" ? null : window.localStorage);

const readJson = (key, fallback) => {
  const storage = getStorage();
  if (!storage) return fallback;

  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  const storage = getStorage();
  if (storage) storage.setItem(key, JSON.stringify(value));
};

const removeItem = (key) => {
  const storage = getStorage();
  if (storage) storage.removeItem(key);
};

const throwIfSupabaseError = (error) => {
  if (error) {
    throw new Error(error.message);
  }
};

const normalizeProfile = (profile = {}) =>
  normalizeProfileProgress({
    ...defaultAppData.profile,
    email: profile.email ?? "",
    name: profile.name || "Questlog 사용자",
    targetGoal: profile.target_goal || profile.targetGoal || defaultAppData.profile.targetGoal,
    characterId: profile.character_id || profile.characterId || defaultAppData.profile.characterId,
    className: profile.class_name || profile.className || defaultAppData.profile.className,
    classLabel: profile.class_label || profile.classLabel || defaultAppData.profile.classLabel,
    level: profile.level ?? defaultAppData.profile.level,
    xp: profile.xp ?? defaultAppData.profile.xp,
    nextLevelXp: profile.next_level_xp ?? profile.nextLevelXp ?? defaultAppData.profile.nextLevelXp,
    streak: profile.streak ?? defaultAppData.profile.streak,
    recoveryTokens: profile.recovery_tokens ?? profile.recoveryTokens ?? defaultAppData.profile.recoveryTokens,
    recoveryRate: profile.recovery_rate ?? profile.recoveryRate ?? defaultAppData.profile.recoveryRate,
    lastCompletedDate: profile.last_completed_date ?? profile.lastCompletedDate ?? "",
  });

const normalizeQuest = (quest = {}) => ({
  id: quest.id,
  type: quest.type || "main",
  title: quest.title || "새 퀘스트",
  category: quest.category || "루틴",
  time: quest.scheduled_time || quest.scheduledTime || quest.time || "언제든",
  scheduledTime: quest.scheduled_time || quest.scheduledTime || quest.time || "언제든",
  difficulty: quest.difficulty || "보통",
  xp: Number(quest.xp) || 0,
  completed: Boolean(quest.completed),
  completedAt: quest.completed_at || quest.completedAt || null,
  description: quest.description || "",
  recoveryAction: quest.recovery_action || quest.recoveryAction || "",
  steps: Array.isArray(quest.steps) ? quest.steps : [],
  color: quest.color || "teal",
  visual: quest.visual || "Q",
});

const normalizeCheckin = (checkin = {}) => ({
  period: checkin.period,
  energyLevel: checkin.energy_level || checkin.energyLevel || "normal",
  busyLevel: checkin.busy_level || checkin.busyLevel || "normal",
  primaryFocus: checkin.primary_focus || checkin.primaryFocus || "",
  completedToday: checkin.completed_today ?? checkin.completedToday ?? false,
  failureReasons: checkin.failure_reasons || checkin.failureReasons || [],
});

const createInitialData = (profileSeed, todayKey = getTodayKey()) => {
  const data = clone(defaultAppData);
  data.profile = normalizeProfile(profileSeed);
  data.spaceProfile = {
    ...data.spaceProfile,
    ownerName: data.profile.name,
    currency: data.profile.xp,
    ddayLabel: `루틴 ${data.profile.streak}일째`,
  };
  data.quests = data.quests.map(normalizeQuest);
  data.questsByDate = { [todayKey]: data.quests };
  data.checkinsByDate = {};
  return rebuildDerivedData(data, todayKey);
};

const mergeWithDefaultData = (data, profileSeed, todayKey = getTodayKey()) => {
  const initialData = createInitialData(profileSeed, todayKey);
  if (!data || typeof data !== "object") return initialData;

  const merged = {
    ...initialData,
    ...data,
    profile: normalizeProfile({ ...initialData.profile, ...data.profile }),
    spaceProfile: { ...initialData.spaceProfile, ...data.spaceProfile },
    checkinOptions: { ...initialData.checkinOptions, ...data.checkinOptions },
    questsByDate: { ...initialData.questsByDate, ...(data.questsByDate ?? {}) },
    checkinsByDate: { ...initialData.checkinsByDate, ...(data.checkinsByDate ?? {}) },
  };

  merged.quests = (merged.questsByDate[todayKey] ?? data.quests ?? initialData.quests).map(normalizeQuest);
  merged.questsByDate[todayKey] = merged.quests;
  return rebuildDerivedData(merged, todayKey);
};

export const rebuildDerivedData = (data, todayKey = getTodayKey()) => {
  const checkinsByDate = data.checkinsByDate ?? {};
  const questsByDate = { ...(data.questsByDate ?? {}), [todayKey]: data.quests ?? [] };
  const todayStatus = createTodayStatus({
    checkins: checkinsByDate,
    quests: questsByDate[todayKey] ?? [],
    todayKey,
  });
  const coachState = createCoachState({ checkins: checkinsByDate, quests: questsByDate[todayKey] ?? [] });

  return {
    ...data,
    ...coachState,
    checkinsByDate,
    questsByDate,
    todayStatus,
    weeklyReport: createWeeklyReport({ checkinsByDate, questsByDate, todayKey }),
  };
};

const profileToRow = (userId, profile) => ({
  id: userId,
  email: profile.email,
  name: profile.name,
  target_goal: profile.targetGoal,
  class_name: profile.className,
  class_label: profile.classLabel,
  character_id: profile.characterId,
  level: profile.level,
  xp: profile.xp,
  next_level_xp: profile.nextLevelXp,
  streak: profile.streak,
  recovery_tokens: profile.recoveryTokens,
  recovery_rate: profile.recoveryRate,
  last_completed_date: profile.lastCompletedDate || null,
  updated_at: new Date().toISOString(),
});

const questToRow = (userId, questDate, quest) => ({
  user_id: userId,
  quest_date: questDate,
  id: quest.id,
  type: quest.type,
  title: quest.title,
  category: quest.category,
  scheduled_time: quest.scheduledTime || quest.time,
  difficulty: quest.difficulty,
  xp: quest.xp,
  completed: quest.completed,
  completed_at: quest.completedAt,
  description: quest.description,
  recovery_action: quest.recoveryAction,
  steps: quest.steps ?? [],
  color: quest.color,
  visual: quest.visual,
  updated_at: new Date().toISOString(),
});

const checkinToRow = (userId, checkinDate, checkin) => ({
  user_id: userId,
  checkin_date: checkinDate,
  period: checkin.period,
  energy_level: checkin.energyLevel,
  busy_level: checkin.busyLevel,
  primary_focus: checkin.primaryFocus,
  completed_today: checkin.completedToday,
  failure_reasons: checkin.failureReasons ?? [],
  updated_at: new Date().toISOString(),
});

const loadLegacyAppData = async (client, userId) => {
  const { data, error } = await client.from("app_data").select("data").eq("user_id", userId).maybeSingle();
  throwIfSupabaseError(error);
  return data?.data ?? null;
};

export const profileRepository = {
  loadGuestData(todayKey = getTodayKey()) {
    return mergeWithDefaultData(readJson(GUEST_DATA_KEY, readJson(LEGACY_GUEST_DATA_KEY, null)), null, todayKey);
  },

  async loadMemberData(session, todayKey = getTodayKey()) {
    const client = requireSupabase();
    const dateKeys = getRecentDateKeys(todayKey, 7);

    const [{ data: profile, error: profileError }, { data: questRows, error: questError }, { data: checkinRows, error: checkinError }] =
      await Promise.all([
        client.from("profiles").select("*").eq("id", session.userId).maybeSingle(),
        client.from("quests").select("*").eq("user_id", session.userId).in("quest_date", dateKeys),
        client.from("checkins").select("*").eq("user_id", session.userId).in("checkin_date", dateKeys),
      ]);

    throwIfSupabaseError(profileError);
    throwIfSupabaseError(questError);
    throwIfSupabaseError(checkinError);

    const legacyAppData = await loadLegacyAppData(client, session.userId);
    const data = mergeWithDefaultData(legacyAppData, { email: session.email, ...profile }, todayKey);

    const questsByDate = {};
    (questRows ?? []).forEach((row) => {
      questsByDate[row.quest_date] = [...(questsByDate[row.quest_date] ?? []), normalizeQuest(row)];
    });

    const checkinsByDate = {};
    (checkinRows ?? []).forEach((row) => {
      checkinsByDate[row.checkin_date] = {
        ...(checkinsByDate[row.checkin_date] ?? {}),
        [row.period]: normalizeCheckin(row),
      };
    });

    data.questsByDate = { ...data.questsByDate, ...questsByDate };
    data.checkinsByDate = { ...data.checkinsByDate, ...checkinsByDate };
    data.quests = data.questsByDate[todayKey] ?? defaultAppData.quests.map(normalizeQuest);
    data.questsByDate[todayKey] = data.quests;

    await this.saveMemberData(session, data, todayKey);
    return rebuildDerivedData(data, todayKey);
  },

  saveGuestData(data) {
    writeJson(GUEST_DATA_KEY, data);
  },

  async saveMemberData(session, data, todayKey = getTodayKey()) {
    const client = requireSupabase();
    const todayQuests = (data.questsByDate?.[todayKey] ?? data.quests ?? []).map(normalizeQuest);
    const todayCheckins = Object.values(data.checkinsByDate?.[todayKey] ?? {});

    await Promise.all([
      client.from("profiles").upsert(profileToRow(session.userId, data.profile)),
      todayQuests.length
        ? client.from("quests").upsert(todayQuests.map((quest) => questToRow(session.userId, todayKey, quest)))
        : Promise.resolve({ error: null }),
      todayCheckins.length
        ? client.from("checkins").upsert(todayCheckins.map((checkin) => checkinToRow(session.userId, todayKey, checkin)))
        : Promise.resolve({ error: null }),
      client.from("app_data").upsert({
        user_id: session.userId,
        data,
        schema_version: APP_DATA_SCHEMA_VERSION,
        updated_at: new Date().toISOString(),
      }),
    ]).then((results) => results.forEach(({ error }) => throwIfSupabaseError(error)));
  },

  deleteGuestData() {
    removeItem(GUEST_DATA_KEY);
    removeItem(LEGACY_GUEST_DATA_KEY);
  },

  async deleteMemberData(session) {
    const client = requireSupabase();
    const results = await Promise.all([
      client.from("quests").delete().eq("user_id", session.userId),
      client.from("checkins").delete().eq("user_id", session.userId),
      client.from("app_data").delete().eq("user_id", session.userId),
      client.from("profiles").delete().eq("id", session.userId),
    ]);
    results.forEach(({ error }) => throwIfSupabaseError(error));
  },
};
