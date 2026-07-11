import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { defaultAppData } from "./defaultAppData";
import { profileRepository } from "./profileRepository";

const AppDataContext = createContext(null);

const getCapabilities = (session) => ({
  cloudSync: session?.mode === "member",
  leaderboard: session?.mode === "member",
});

const loadDataForSession = (session) => {
  if (!session) {
    return defaultAppData;
  }

  return session.mode === "guest"
    ? profileRepository.loadGuestData()
    : profileRepository.loadMemberData(session.userId);
};

export function AppDataProvider({ children }) {
  const { session } = useAuth();
  const [appData, setAppData] = useState(() => loadDataForSession(session));
  const [isDataReady, setIsDataReady] = useState(Boolean(session));

  useEffect(() => {
    if (!session) {
      setAppData(defaultAppData);
      setIsDataReady(false);
      return;
    }

    setAppData(loadDataForSession(session));
    setIsDataReady(true);
  }, [session]);

  useEffect(() => {
    if (!session || !isDataReady) {
      return;
    }

    if (session.mode === "guest") {
      profileRepository.saveGuestData(appData);
    } else {
      profileRepository.saveMemberData(session.userId, appData);
    }
  }, [appData, isDataReady, session]);

  const setQuests = (updater) => {
    setAppData((currentData) => ({
      ...currentData,
      quests: typeof updater === "function" ? updater(currentData.quests) : updater,
    }));
  };

  const updateProfile = (updates) => {
    setAppData((currentData) => ({
      ...currentData,
      profile: {
        ...currentData.profile,
        ...updates,
      },
    }));
  };

  const resetGuestData = () => {
    profileRepository.deleteGuestData();
    setAppData(loadDataForSession(session));
  };

  const value = useMemo(
    () => ({
      ...appData,
      capabilities: getCapabilities(session),
      isDataReady,
      resetGuestData,
      setQuests,
      updateProfile,
    }),
    [appData, isDataReady, session],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const value = useContext(AppDataContext);

  if (!value) {
    throw new Error("useAppData must be used within AppDataProvider");
  }

  return value;
}
