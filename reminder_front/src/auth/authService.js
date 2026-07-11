const SESSION_KEY = "questlog.auth.session";
const MEMBERS_KEY = "questlog.auth.members";

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

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

const normalizeEmail = (email) => email.trim().toLowerCase();

const createMemberId = (email) => `member:${normalizeEmail(email)}`;

const createSession = ({ mode, userId }) => ({
  mode,
  userId,
  profileId: `${mode}:${userId}`,
  isAuthenticated: true,
});

const saveSession = (session) => {
  writeJson(SESSION_KEY, session);
  return session;
};

export const authService = {
  restoreSession() {
    return readJson(SESSION_KEY, null);
  },

  login({ email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const members = readJson(MEMBERS_KEY, {});
    const userId = createMemberId(normalizedEmail);

    if (!members[userId]) {
      members[userId] = {
        email: normalizedEmail,
        name: normalizedEmail.split("@")[0] || "Questlog User",
        password,
        targetGoal: "오늘의 루틴 만들기",
        userId,
      };
      writeJson(MEMBERS_KEY, members);
    }

    return saveSession(createSession({ mode: "member", userId }));
  },

  signup({ email, name, password, targetGoal }) {
    const normalizedEmail = normalizeEmail(email);
    const members = readJson(MEMBERS_KEY, {});
    const userId = createMemberId(normalizedEmail);

    members[userId] = {
      email: normalizedEmail,
      name: name.trim() || "Questlog User",
      password,
      targetGoal: targetGoal.trim() || "오늘의 루틴 만들기",
      userId,
    };
    writeJson(MEMBERS_KEY, members);

    return saveSession(createSession({ mode: "member", userId }));
  },

  continueAsGuest() {
    const userId = "guest:local";
    return saveSession(createSession({ mode: "guest", userId }));
  },

  logout() {
    removeItem(SESSION_KEY);
  },

  deleteAccount(userId) {
    const members = readJson(MEMBERS_KEY, {});
    delete members[userId];
    writeJson(MEMBERS_KEY, members);
    removeItem(SESSION_KEY);
  },
};

export const getMemberProfileSeed = (userId) => {
  const members = readJson(MEMBERS_KEY, {});
  return members[userId] ?? null;
};
