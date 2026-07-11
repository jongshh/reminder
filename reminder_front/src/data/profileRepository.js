import { getMemberProfileSeed } from "../auth/authService";
import { defaultAppData } from "./defaultAppData";

const GUEST_DATA_KEY = "questlog.data.guest";
const MEMBER_DATA_PREFIX = "questlog.data.member.";

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

const createInitialData = (profileSeed) => {
  const data = clone(defaultAppData);

  if (profileSeed) {
    data.profile = {
      ...data.profile,
      email: profileSeed.email,
      name: profileSeed.name || data.profile.name,
      targetGoal: profileSeed.targetGoal || data.profile.targetGoal,
    };
  }

  return data;
};

const memberDataKey = (userId) => `${MEMBER_DATA_PREFIX}${userId}`;

export const profileRepository = {
  loadGuestData() {
    return readJson(GUEST_DATA_KEY, createInitialData());
  },

  loadMemberData(userId) {
    return readJson(memberDataKey(userId), createInitialData(getMemberProfileSeed(userId)));
  },

  saveGuestData(data) {
    writeJson(GUEST_DATA_KEY, data);
  },

  saveMemberData(userId, data) {
    writeJson(memberDataKey(userId), data);
  },

  deleteGuestData() {
    removeItem(GUEST_DATA_KEY);
  },

  deleteMemberData(userId) {
    removeItem(memberDataKey(userId));
  },
};
