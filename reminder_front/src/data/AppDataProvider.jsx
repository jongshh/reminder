import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { getTodayKey } from "../utils/dateUtils";
import { applyQuestToggleRules } from "../utils/routineRules";
import { defaultAppData } from "./defaultAppData";
import { profileRepository, rebuildDerivedData } from "./profileRepository";

const AppDataContext = createContext(null);

const getCapabilities = (session) => ({
  cloudSync: session?.mode === "member",
  leaderboard: session?.mode === "member",
});

const loadDataForSession = async (session, todayKey) => {
  if (!session) return defaultAppData;
  return session.mode === "guest"
    ? profileRepository.loadGuestData(todayKey)
    : profileRepository.loadMemberData(session, todayKey);
};

const chooseClass = ({ energyLevel, preference }) => {
  if (energyLevel === "low" || preference === "recovery") {
    return { className: "Keeper", classLabel: "회복을 지키는 수호자", characterId: "sage-cat" };
  }

  if (preference === "challenge") {
    return { className: "Challenger", classLabel: "도전을 즐기는 실행가", characterId: "sunny-penguin" };
  }

  return { className: "Scholar", classLabel: "차분한 학습가", characterId: "cream-bunny" };
};

const createOnboardingQuests = ({ targetGoal, availableMinutes }) => {
  const minutes = Number(availableMinutes) || 25;
  const mainMinutes = Math.min(45, Math.max(10, minutes));

  return [
    {
      id: "main-focus",
      type: "main",
      title: `${targetGoal || "목표"} ${mainMinutes}분`,
      category: "핵심",
      time: "오늘",
      scheduledTime: "오늘",
      difficulty: minutes < 20 ? "쉬움" : "보통",
      xp: minutes < 20 ? 25 : 45,
      completed: false,
      completedAt: null,
      visual: String(mainMinutes),
      color: "teal",
      description: "오늘 가장 중요한 루틴을 작게 실행합니다.",
      recoveryAction: "5분만 다시 시작하기",
      steps: ["시작 준비", `${mainMinutes}분 실행`, "완료 기록"],
    },
    {
      id: "mini-restart",
      type: "mini",
      title: "5분 재시작",
      category: "회복",
      time: "언제든",
      scheduledTime: "언제든",
      difficulty: "매우 쉬움",
      xp: 10,
      completed: false,
      completedAt: null,
      visual: "5",
      color: "blue",
      description: "흐름이 끊겼을 때 다시 켜는 미니 루틴입니다.",
      recoveryAction: "1분만 하기",
      steps: ["앉기", "5분 실행"],
    },
  ];
};

export function AppDataProvider({ children }) {
  const { session } = useAuth();
  const saveTimerRef = useRef(null);
  const [appData, setAppData] = useState(defaultAppData);
  const [dataError, setDataError] = useState("");
  const [isDataReady, setIsDataReady] = useState(Boolean(session));
  const todayKey = getTodayKey();

  const persistData = async (nextData) => {
    if (!session) return;

    if (session.mode === "guest") {
      profileRepository.saveGuestData(nextData);
    } else {
      await profileRepository.saveMemberData(session, nextData, todayKey);
    }
  };

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
        const nextData = await loadDataForSession(session, todayKey);
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
  }, [session, todayKey]);

  useEffect(() => {
    if (!session || !isDataReady) return undefined;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(async () => {
      try {
        await persistData(appData);
        setDataError("");
      } catch (error) {
        setDataError(error.message);
      }
    }, 350);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [appData, isDataReady, session]);

  const updateAndPersist = (updater) => {
    setAppData((currentData) => {
      const nextData = rebuildDerivedData(typeof updater === "function" ? updater(currentData) : updater, todayKey);
      persistData(nextData).catch((error) => setDataError(error.message));
      return nextData;
    });
  };

  const setQuests = (updater) => {
    updateAndPersist((currentData) => {
      const quests = typeof updater === "function" ? updater(currentData.quests) : updater;
      return {
        ...currentData,
        quests,
        questsByDate: {
          ...(currentData.questsByDate ?? {}),
          [todayKey]: quests,
        },
      };
    });
  };

  const toggleQuest = (questId) => {
    updateAndPersist((currentData) => {
      const quest = currentData.quests.find((currentQuest) => currentQuest.id === questId);
      if (!quest) return currentData;

      const { nextProfile, nextQuests } = applyQuestToggleRules({
        profile: currentData.profile,
        quest,
        quests: currentData.quests,
        todayKey,
      });

      return {
        ...currentData,
        profile: nextProfile,
        quests: nextQuests,
        questsByDate: {
          ...(currentData.questsByDate ?? {}),
          [todayKey]: nextQuests,
        },
        spaceProfile: {
          ...currentData.spaceProfile,
          currency: nextProfile.xp,
          ddayLabel: `루틴 ${nextProfile.streak}일째`,
        },
      };
    });
  };

  const saveCheckin = (period, payload) => {
    updateAndPersist((currentData) => ({
      ...currentData,
      checkinsByDate: {
        ...(currentData.checkinsByDate ?? {}),
        [todayKey]: {
          ...(currentData.checkinsByDate?.[todayKey] ?? {}),
          [period]: {
            period,
            ...payload,
          },
        },
      },
    }));
  };

  const completeOnboarding = (payload) => {
    const classInfo = {
      ...chooseClass(payload),
      ...(payload.profilePatch ?? {}),
    };
    const quests =
      Array.isArray(payload.generatedQuests) && payload.generatedQuests.length > 0
        ? payload.generatedQuests
        : createOnboardingQuests(payload);

    updateAndPersist((currentData) => ({
      ...currentData,
      profile: {
        ...currentData.profile,
        ...classInfo,
        targetGoal: payload.targetGoal || currentData.profile.targetGoal,
      },
      quests,
      questsByDate: {
        ...(currentData.questsByDate ?? {}),
        [todayKey]: quests,
      },
      spaceProfile: {
        ...currentData.spaceProfile,
        todayQuestion: payload.targetGoal || currentData.spaceProfile.todayQuestion,
      },
    }));
  };

  const updateProfile = (updates) => {
    updateAndPersist((currentData) => ({
      ...currentData,
      profile: {
        ...currentData.profile,
        ...updates,
      },
    }));
  };

  const loadTodayData = async (dateKey = todayKey) => {
    const nextData = await loadDataForSession(session, dateKey);
    setAppData(nextData);
  };

  const resetGuestData = async () => {
    profileRepository.deleteGuestData();
    setAppData(await loadDataForSession(session, todayKey));
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
      completeOnboarding,
      dataError,
      deleteMemberData,
      isDataReady,
      loadTodayData,
      resetGuestData,
      saveCheckin,
      setQuests,
      toggleQuest,
      updateProfile,
    }),
    [appData, dataError, isDataReady, session],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const value = useContext(AppDataContext);
  if (!value) throw new Error("useAppData must be used within AppDataProvider");
  return value;
}
