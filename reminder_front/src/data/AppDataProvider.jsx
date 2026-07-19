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

  const updateTodayStatus = (updates) => {
    setAppData((currentData) => ({
      ...currentData,
      todayStatus: {
        ...currentData.todayStatus,
        ...(typeof updates === "function" ? updates(currentData.todayStatus) : updates),
      },
    }));
  };

  const applyRecoveryPlan = () => {
    setAppData((currentData) => {
      if (currentData.todayStatus?.aiPlanApplied) {
        return currentData;
      }

      let adjusted = false;
      const quests = currentData.quests.map((quest) => {
        if (adjusted || quest.completed || quest.type !== "main") {
          return quest;
        }

        adjusted = true;
        return {
          ...quest,
          type: "mini",
          title: quest.title.replace("20분", "10분").replace("20개", "10개").replace("5분", "2분"),
          difficulty: "매우 쉬움",
          description: "AI가 가볍게 줄인 복귀 퀘스트",
          xp: Math.max(12, Math.round(quest.xp * 0.65)),
          recoveryAdjusted: true,
        };
      });

      return {
        ...currentData,
        quests,
        coachMessage: {
          ...currentData.coachMessage,
          title: "라이트 모드 적용 완료",
          message: "오늘은 이만큼이면 충분해요",
          adjustment: "메인 1개 → 미니",
        },
        todayStatus: {
          ...currentData.todayStatus,
          aiPlanApplied: true,
          completionTarget: "오늘은 1개면 충분해요",
          planMode: "recovery",
        },
      };
    });
  };

  const toggleRoomItem = (itemId) => {
    setAppData((currentData) => ({
      ...currentData,
      roomItems: currentData.roomItems.map((item) =>
        item.id === itemId && item.owned ? { ...item, equipped: !item.equipped } : item,
      ),
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
      applyRecoveryPlan,
      dataError,
      deleteMemberData,
      isDataReady,
      resetGuestData,
      setQuests,
      toggleRoomItem,
      updateTodayStatus,
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
