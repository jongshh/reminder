import { requireSupabase, supabase } from "../lib/supabaseClient";

const GUEST_SESSION_KEY = "questlog.auth.guestSession";

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

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const createGuestSession = () => ({
  mode: "guest",
  userId: "guest:local",
  profileId: "guest:guest:local",
  isAuthenticated: true,
});

const createMemberSession = (user) => ({
  mode: "member",
  userId: user.id,
  profileId: `member:${user.id}`,
  email: user.email,
  name: user.user_metadata?.name,
  targetGoal: user.user_metadata?.target_goal,
  isAuthenticated: true,
});

const saveGuestSession = (session) => {
  writeJson(GUEST_SESSION_KEY, session);
  return session;
};

const clearGuestSession = () => {
  removeItem(GUEST_SESSION_KEY);
};

const throwIfSupabaseError = (error) => {
  if (error) throw new Error(error.message);
};

const getEmailRedirectTo = () => {
  if (typeof window === "undefined") return undefined;
  return window.location.origin;
};

export const authService = {
  async restoreSession() {
    const guestSession = readJson(GUEST_SESSION_KEY, null);

    if (guestSession?.mode === "guest") {
      return guestSession;
    }

    if (!supabase) {
      return null;
    }

    const { data, error } = await supabase.auth.getSession();
    throwIfSupabaseError(error);

    return data.session?.user ? createMemberSession(data.session.user) : null;
  },

  async login({ email, password }) {
    const client = requireSupabase();
    clearGuestSession();

    const { data, error } = await client.auth.signInWithPassword({
      email: normalizeEmail(email),
      password,
    });
    throwIfSupabaseError(error);

    if (!data.user) {
      throw new Error("로그인이 완료되지 않았습니다. 이메일 인증 상태를 확인해 주세요.");
    }

    return createMemberSession(data.user);
  },

  async signup({ email, name, password, targetGoal }) {
    const client = requireSupabase();
    const normalizedEmail = normalizeEmail(email);
    const profileSeed = {
      name: name.trim() || "Questlog 사용자",
      targetGoal: targetGoal.trim() || "매일 이어가는 작은 루틴 만들기",
    };

    clearGuestSession();

    const { data, error } = await client.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: getEmailRedirectTo(),
        data: {
          name: profileSeed.name,
          target_goal: profileSeed.targetGoal,
        },
      },
    });
    throwIfSupabaseError(error);

    if (data.session?.user) {
      return createMemberSession(data.session.user);
    }

    return {
      pendingEmailConfirmation: true,
      email: normalizedEmail,
      message: "인증 메일을 보냈습니다. 메일의 인증 링크를 누르면 이 앱으로 돌아와 가입이 자동으로 이어집니다.",
    };
  },

  continueAsGuest() {
    return saveGuestSession(createGuestSession());
  },

  async logout() {
    clearGuestSession();

    if (supabase) {
      const { error } = await supabase.auth.signOut();
      throwIfSupabaseError(error);
    }
  },

  async deleteAccount() {
    clearGuestSession();

    if (supabase) {
      const { error } = await supabase.auth.signOut();
      throwIfSupabaseError(error);
    }
  },

  onAuthStateChange(callback) {
    if (!supabase) return () => {};

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      clearGuestSession();
      callback(session?.user ? createMemberSession(session.user) : null);
    });

    return () => data.subscription.unsubscribe();
  },
};
