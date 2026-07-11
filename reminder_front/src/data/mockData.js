export const navItems = [
  { id: "home", label: "나의 방", shortLabel: "방", icon: "⌂" },
  { id: "quests", label: "오늘 퀘스트", shortLabel: "퀘스트", icon: "✓" },
  { id: "checkin", label: "체크인", shortLabel: "체크", icon: "◐" },
  { id: "quest", label: "퀘스트 상세", shortLabel: "상세", icon: "◇" },
  { id: "report", label: "주간 리포트", shortLabel: "주간", icon: "▣" },
  { id: "profile", label: "성장 기록", shortLabel: "성장", icon: "☆" },
  { id: "settings", label: "계정 설정", shortLabel: "설정", icon: "⚙" },
  { id: "onboarding", label: "시작 설정", shortLabel: "시작", icon: "◎" },
];

export const onboardingSteps = [
  { id: "goal", title: "목표", description: "토익 루틴", icon: "01" },
  { id: "pattern", title: "패턴", description: "오전 집중", icon: "02" },
  { id: "class", title: "클래스", description: "Scholar", icon: "03" },
  { id: "quest", title: "퀘스트", description: "5개 생성", icon: "04" },
];

export const userProfile = {
  name: "지우",
  className: "Scholar",
  classLabel: "Scholar",
  targetGoal: "토익 루틴 회복",
  level: 4,
  xp: 320,
  nextLevelXp: 500,
  streak: 5,
  recoveryTokens: 2,
  recoveryRate: 76,
  badges: [
    { id: "first-week", label: "첫 주", tone: "success" },
    { id: "morning-check", label: "AM 3회", tone: "warning" },
    { id: "recovery", label: "복구", tone: "recovery" },
  ],
};

export const spaceProfile = {
  appName: "나의 루틴 방",
  ownerName: "지우",
  ddayLabel: "루틴 128일째",
  currency: 320,
  notificationTime: "21:30",
  todayQuestion: "오늘 가장 중요한 루틴은?",
  answerState: "available",
  roomMood: "calm",
};

export const roomItems = [
  { id: "window", label: "창문", slot: "wall", owned: true, equipped: true },
  { id: "plant", label: "식물", slot: "floor", owned: true, equipped: true },
  { id: "lamp", label: "조명", slot: "side", owned: true, equipped: true },
  { id: "mug", label: "머그잔", slot: "table", owned: true, equipped: true },
];

export const todayStatus = {
  dateLabel: "7월 1주",
  condition: "보통",
  primaryFocus: "LC 20분",
  completionTarget: "3개만 끝내기",
  checkinProgress: 1,
  checkinTotal: 2,
};

export const coachMessage = {
  title: "오늘은 가볍게",
  message: "40분 → 25분",
  adjustment: "밤 루틴 복구",
};

export const difficultySuggestion = {
  title: "내일은 쉬움",
  message: "시간 부족이면 메인 1개를 미니로 낮춰요.",
  recommendedLevel: "보통 → 쉬움",
};

export const todayQuests = [
  {
    id: "toeic-lc",
    type: "main",
    title: "LC 20분",
    category: "학습",
    time: "10:00",
    difficulty: "보통",
    xp: 45,
    completed: false,
    visual: "LC",
    color: "teal",
    description: "듣기 루틴",
    recoveryAction: "내일 10분으로 낮추기",
    steps: ["10문제", "3문장 반복", "표현 메모"],
  },
  {
    id: "vocab-20",
    type: "main",
    title: "단어 20개",
    category: "암기",
    time: "14:00",
    difficulty: "쉬움",
    xp: 30,
    completed: true,
    visual: "20",
    color: "green",
    description: "단어 복습",
    recoveryAction: "10개만 보기",
    steps: ["새 단어", "어제 단어", "별표"],
  },
  {
    id: "desk-reset",
    type: "main",
    title: "책상 리셋",
    category: "환경",
    time: "시작 전",
    difficulty: "쉬움",
    xp: 20,
    completed: false,
    visual: "5",
    color: "coral",
    description: "5분 정리",
    recoveryAction: "교재만 펼치기",
    steps: ["컵 치우기", "교재 펼치기", "타이머"],
  },
  {
    id: "mini-word",
    type: "mini",
    title: "단어 10개",
    category: "복구",
    time: "언제든",
    difficulty: "매우 쉬움",
    xp: 12,
    completed: false,
    visual: "10",
    color: "violet",
    description: "스트릭 유지",
    recoveryAction: "첫 페이지만 보기",
    steps: ["열기", "10개"],
  },
  {
    id: "mini-walk",
    type: "mini",
    title: "5분 산책",
    category: "회복",
    time: "저녁",
    difficulty: "매우 쉬움",
    xp: 10,
    completed: false,
    visual: "5",
    color: "blue",
    description: "리듬 리셋",
    recoveryAction: "스트레칭 1분",
    steps: ["나가기", "걷기", "물"],
  },
];

export const checkinOptions = {
  energyLevels: [
    { value: "low", label: "낮음", description: "복구" },
    { value: "normal", label: "보통", description: "기본" },
    { value: "high", label: "높음", description: "메인" },
  ],
  busyLevels: [
    { value: "light", label: "여유", description: "유지" },
    { value: "normal", label: "보통", description: "핵심" },
    { value: "busy", label: "바쁨", description: "축소" },
  ],
};

export const failureReasonOptions = ["시간", "집중", "감정", "몸", "과다", "환경"];

export const weeklyReport = {
  summary: "오전 성공률이 높아요. 저녁은 복구 루틴으로 낮춥니다.",
  completionRate: 68,
  completedCount: 17,
  totalCount: 25,
  bestTimeSlot: "09-11",
  recoveryRate: 76,
  days: [
    { day: "월", rate: 80 },
    { day: "화", rate: 60 },
    { day: "수", rate: 72 },
    { day: "목", rate: 48 },
    { day: "금", rate: 84 },
    { day: "토", rate: 62 },
    { day: "일", rate: 70 },
  ],
  patterns: [
    { id: "late-night", label: "밤 10시", count: 4, note: "집중 ↓" },
    { id: "over-plan", label: "40분+", count: 3, note: "계획 과다" },
    { id: "no-checkin", label: "AM 누락", count: 2, note: "우선순위 흐림" },
  ],
  nextWeekSuggestion: {
    title: "다음 주",
    items: ["오전 메인 2개", "저녁 미니 1개", "3일 실패 시 토큰"],
  },
};
