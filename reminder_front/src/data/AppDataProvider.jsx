import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { defaultAppData } from "./defaultAppData";
import { profileRepository } from "./profileRepository";

const AppDataContext = createContext(null);

const getCapabilities = (session) => ({
  cloudSync: session?.mode === "member",
  leaderboard: session?.mode === "member",
});

const loadDataForSession = async (session) => {
  if (!session) {
    return defaultAppData;
  }

  return session.mode === "guest"
    ? profileRepository.loadGuestData()
    : profileRepository.loadMemberData(session);
};

export function AppDataProvider({ children }) {
  const { session } = useAuth();
  const saveTimerRef = useRef(null);
  const [appData, setAppData] = useState(defaultAppData);
  const [dataError, setDataError] = useState("");
  const [isDataReady, setIsDataReady] = useState(Boolean(session));

  useEffect(() => {
    let isCurrent = true;

    const load = async () => {
      if (!session) {
        setAppData(defaultAppData);
        setIsDataReady(false);
        return;
      }

      setIsDataReady(false);
      setDataError("");

      try {
        const nextData = await loadDataForSession(session);

        if (isCurrent) {
          setAppData(nextData);
          setIsDataReady(true);
        }
      } catch (error) {
        if (isCurrent) {
          setAppData(defaultAppData);
          setDataError(error.message);
          setIsDataReady(true);
        }
      }
    };

    load();

    return () => {
      isCurrent = false;
    };
  }, [session]);

  useEffect(() => {
    if (!session || !isDataReady) {
      return undefined;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(async () => {
      try {
        if (session.mode === "guest") {
          profileRepository.saveGuestData(appData);
        } else {
          await profileRepository.saveMemberData(session, appData);
        }

        setDataError("");
      } catch (error) {
        setDataError(error.message);
      }
    }, 350);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
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

  const resetGuestData = async () => {
    profileRepository.deleteGuestData();
    setAppData(await loadDataForSession(session));
  };

  const deleteMemberData = async () => {
    if (session?.mode === "member") {
      await profileRepository.deleteMemberData(session);
    }
  };

  const value = useMemo(
    () => ({
      ...appData,
      capabilities: getCapabilities(session),
      dataError,
      deleteMemberData,
      isDataReady,
      resetGuestData,
      setQuests,
      updateProfile,
    }),
    [appData, dataError, isDataReady, session],
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
