import { requireSupabase } from "../lib/supabaseClient";
import { defaultAppData } from "./defaultAppData";

const GUEST_DATA_KEY = "questlog.data.guest";
const APP_DATA_SCHEMA_VERSION = 1;

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const readJson = (key, fallback) => {
  const storage = getStorage();

  if (!storage) {
    return fallback;
  }

  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  const storage = getStorage();

  if (storage) {
    storage.setItem(key, JSON.stringify(value));
  }
};

const removeItem = (key) => {
  const storage = getStorage();

  if (storage) {
    storage.removeItem(key);
  }
};

const normalizeProfile = (profile) => ({
  email: profile?.email ?? "",
  name: profile?.name || "Questlog User",
  targetGoal: profile?.target_goal || profile?.targetGoal || "매일 이어갈 작은 루틴 만들기",
});

const createInitialData = (profileSeed) => {
  const data = clone(defaultAppData);

  if (profileSeed) {
    const profile = normalizeProfile(profileSeed);

    data.profile = {
      ...data.profile,
      email: profile.email,
      name: profile.name,
      targetGoal: profile.targetGoal,
    };
  }

  return data;
};

const mergeWithDefaultData = (data, profileSeed) => {
  const initialData = createInitialData(profileSeed);

  if (!data || typeof data !== "object") {
    return initialData;
  }

  return {
    ...initialData,
    ...data,
    profile: {
      ...initialData.profile,
      ...data.profile,
    },
    spaceProfile: {
      ...initialData.spaceProfile,
      ...data.spaceProfile,
    },
    checkinOptions: {
      ...initialData.checkinOptions,
      ...data.checkinOptions,
    },
    weeklyReport: {
      ...initialData.weeklyReport,
      ...data.weeklyReport,
    },
  };
};

const throwIfSupabaseError = (error) => {
  if (error) {
    throw new Error(error.message);
  }
};

const loadMemberProfile = async (userId) => {
  const client = requireSupabase();
  const { data, error } = await client
    .from("profiles")
    .select("id,email,name,target_goal")
    .eq("id", userId)
    .maybeSingle();

  throwIfSupabaseError(error);
  return data;
};

const upsertMemberProfile = async (userId, profile) => {
  const client = requireSupabase();
  const normalizedProfile = normalizeProfile(profile);
  const { error } = await client.from("profiles").upsert({
    id: userId,
    email: normalizedProfile.email,
    name: normalizedProfile.name,
    target_goal: normalizedProfile.targetGoal,
    updated_at: new Date().toISOString(),
  });

  throwIfSupabaseError(error);
};

const upsertMemberAppData = async (userId, data) => {
  const client = requireSupabase();
  const { error } = await client.from("app_data").upsert({
    user_id: userId,
    data,
    schema_version: APP_DATA_SCHEMA_VERSION,
    updated_at: new Date().toISOString(),
  });

  throwIfSupabaseError(error);
};

export const profileRepository = {
  loadGuestData() {
    return mergeWithDefaultData(readJson(GUEST_DATA_KEY, null));
  },

  async loadMemberData(session) {
    const client = requireSupabase();
    const profile = await loadMemberProfile(session.userId);
    const { data, error } = await client
      .from("app_data")
      .select("data")
      .eq("user_id", session.userId)
      .maybeSingle();

    throwIfSupabaseError(error);

    if (data?.data) {
      return mergeWithDefaultData(data.data, {
        email: session.email,
        ...profile,
      });
    }

    const initialData = createInitialData({
      email: session.email,
      ...profile,
    });

    await upsertMemberProfile(session.userId, initialData.profile);
    await upsertMemberAppData(session.userId, initialData);

    return initialData;
  },

  saveGuestData(data) {
    writeJson(GUEST_DATA_KEY, data);
  },

  async saveMemberData(session, data) {
    await upsertMemberProfile(session.userId, data.profile);
    await upsertMemberAppData(session.userId, data);
  },

  deleteGuestData() {
    removeItem(GUEST_DATA_KEY);
  },

  async deleteMemberData(session) {
    const client = requireSupabase();
    const { error: appDataError } = await client.from("app_data").delete().eq("user_id", session.userId);
    throwIfSupabaseError(appDataError);

    const { error: profileError } = await client.from("profiles").delete().eq("id", session.userId);
    throwIfSupabaseError(profileError);
  },
};
