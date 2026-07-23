import { getKoreanDayLabel, getRecentDateKeys, getTodayKey } from "./dateUtils";

const LEVEL_STEP = 500;

export const normalizeProfileProgress = (profile = {}) => {
  let level = Number(profile.level) || 1;
  let xp = Math.max(0, Number(profile.xp) || 0);
  let nextLevelXp = Number(profile.nextLevelXp ?? profile.next_level_xp) || LEVEL_STEP;

  while (xp >= nextLevelXp) {
    xp -= nextLevelXp;
    level += 1;
    nextLevelXp += LEVEL_STEP;
  }

  return { ...profile, level, xp, nextLevelXp };
};

export const applyQuestToggleRules = ({ profile, quest, quests, todayKey = getTodayKey() }) => {
  const wasCompleted = Boolean(quest.completed);
  const toggledQuest = {
    ...quest,
    completed: !wasCompleted,
    completedAt: wasCompleted ? null : new Date().toISOString(),
  };
  const nextQuests = quests.map((currentQuest) => (currentQuest.id === quest.id ? toggledQuest : currentQuest));
  const xpDelta = wasCompleted ? -Number(quest.xp || 0) : Number(quest.xp || 0);
  const allCompleted = nextQuests.length > 0 && nextQuests.every((currentQuest) => currentQuest.completed);
  const nextProfile = normalizeProfileProgress({
    ...profile,
    xp: Math.max(0, Number(profile.xp || 0) + xpDelta),
    streak: allCompleted ? Math.max(1, Number(profile.streak || 0) + (profile.lastCompletedDate === todayKey ? 0 : 1)) : profile.streak,
    lastCompletedDate: allCompleted ? todayKey : profile.lastCompletedDate,
  });

  return { nextProfile, nextQuests };
};

export const createTodayStatus = ({ checkins = {}, quests = [], todayKey = getTodayKey() }) => {
  const todayCheckins = checkins[todayKey] ?? {};
  const completedCount = quests.filter((quest) => quest.completed).length;
  const totalCount = quests.length;
  const am = todayCheckins.am;
  const pm = todayCheckins.pm;
  const condition = am?.energyLevel === "high" ? "좋음" : am?.energyLevel === "low" ? "회복 필요" : "보통";

  return {
    dateLabel: todayKey,
    condition,
    primaryFocus: am?.primaryFocus || "가장 작은 루틴 1개",
    completionTarget: totalCount ? `${Math.min(3, totalCount)}개부터 끝내기` : "오늘 퀘스트 만들기",
    checkinProgress: [am, pm].filter(Boolean).length,
    checkinTotal: 2,
    completedCount,
    totalCount,
  };
};

export const createCoachState = ({ checkins = {}, quests = [] }) => {
  const completed = quests.filter((quest) => quest.completed).length;
  const total = quests.length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;
  const latestAm = Object.values(checkins).find((daily) => daily?.am)?.am;

  if (latestAm?.energyLevel === "low" || latestAm?.busyLevel === "busy") {
    return {
      coachMessage: {
        title: "오늘은 크기를 줄여요",
        message: "컨디션이나 일정이 빡빡한 날에는 미니 루틴으로 연결감을 지키는 편이 좋아요.",
        adjustment: "미니 루틴 우선",
      },
      difficultySuggestion: {
        title: "오늘의 제안",
        message: "메인 퀘스트 1개와 미니 퀘스트 1개만 남기고 나머지는 내일로 미뤄도 괜찮아요.",
        recommendedLevel: "낮은 난이도",
      },
    };
  }

  return {
    coachMessage: {
      title: completionRate >= 70 ? "좋은 흐름이에요" : "하나만 더 해볼까요",
      message:
        completionRate >= 70
          ? "오늘 루틴이 꽤 안정적으로 이어지고 있어요. 마무리 기록만 남겨보세요."
          : "완료율보다 중요한 건 다시 시작하는 힘이에요. 가장 쉬운 퀘스트부터 눌러봅시다.",
      adjustment: completionRate >= 70 ? "마무리 유지" : "작게 재시작",
    },
    difficultySuggestion: {
      title: "오늘의 제안",
      message: "기록이 쌓일수록 퀘스트 크기를 조금씩 조정해볼 수 있어요.",
      recommendedLevel: "보통 난이도",
    },
  };
};

export const createWeeklyReport = ({ checkinsByDate = {}, questsByDate = {}, todayKey = getTodayKey() }) => {
  const dateKeys = getRecentDateKeys(todayKey, 7);
  let completedCount = 0;
  let totalCount = 0;
  let recoveredDays = 0;
  const failureCounts = new Map();

  const days = dateKeys.map((dateKey) => {
    const quests = questsByDate[dateKey] ?? [];
    const dailyTotal = quests.length;
    const dailyCompleted = quests.filter((quest) => quest.completed).length;
    const pm = checkinsByDate[dateKey]?.pm;

    completedCount += dailyCompleted;
    totalCount += dailyTotal;
    if (dailyCompleted > 0 && pm?.completedToday === false) recoveredDays += 1;
    (pm?.failureReasons ?? []).forEach((reason) => {
      failureCounts.set(reason, (failureCounts.get(reason) ?? 0) + 1);
    });

    return {
      day: getKoreanDayLabel(dateKey),
      rate: dailyTotal ? Math.round((dailyCompleted / dailyTotal) * 100) : 0,
    };
  });

  const completionRate = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const patterns = Array.from(failureCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([label, count], index) => ({
      id: `failure-${index}`,
      label,
      count,
      note: count >= 2 ? "반복되는 방해 요인" : "가끔 나타난 요인",
    }));

  return {
    summary:
      totalCount === 0
        ? "아직 주간 기록이 충분하지 않아요. 오늘의 체크인과 퀘스트부터 쌓아볼게요."
        : `최근 7일 동안 ${completedCount}개의 퀘스트를 완료했어요. 완료율은 ${completionRate}%입니다.`,
    completionRate,
    completedCount,
    totalCount,
    bestTimeSlot: days.reduce((best, day) => (day.rate > best.rate ? day : best), { day: "기록 대기", rate: -1 }).day,
    recoveryRate: totalCount ? Math.round((recoveredDays / 7) * 100) : 0,
    days,
    patterns,
    nextWeekSuggestion: {
      title: "다음 주 제안",
      items:
        completionRate >= 70
          ? ["현재 퀘스트 수를 유지하기", "PM 체크인으로 성공 조건 기록하기", "미니 루틴 1개를 회복용으로 남기기"]
          : ["메인 퀘스트를 1개 줄이기", "AM 체크인에서 오늘의 초점을 먼저 정하기", "실패 사유가 반복되는 시간을 피하기"],
    },
  };
};
