export const navItems = [
  { id: "home", label: "스튜디오", shortLabel: "스튜디오", icon: "⌂" },
  { id: "quests", label: "오늘 할 일", shortLabel: "오늘", icon: "✓" },
  { id: "checkin", label: "컨디션", shortLabel: "컨디션", icon: "◐" },
  { id: "report", label: "리듬", shortLabel: "리듬", icon: "▣" },
  { id: "profile", label: "회복 기록", shortLabel: "회복", icon: "↺" },
];

export const onboardingSteps = [
  { id: "goal", title: "목표", description: "가장 중요한 루틴을 정해요", icon: "01" },
  { id: "pattern", title: "패턴", description: "하루 가용 시간을 확인해요", icon: "02" },
  { id: "class", title: "클래스", description: "성향에 맞는 캐릭터를 고릅니다", icon: "03" },
  { id: "quest", title: "퀘스트", description: "오늘 시작할 루틴을 만들어요", icon: "04" },
];

export const userProfile = {
  email: "",
  name: "지은",
  characterId: "cream-bunny",
  className: "Scholar",
  classLabel: "차분한 학습가",
  targetGoal: "매일 이어가는 작은 루틴 만들기",
  level: 1,
  xp: 0,
  nextLevelXp: 500,
  streak: 0,
  recoveryTokens: 2,
  recoveryRate: 0,
  comebackCount: 0,
  lastBreakDays: 0,
  resilienceLevel: 1,
  lastCompletedDate: "",
  badges: [
    { id: "starter", label: "첫 시작", tone: "success" },
    { id: "morning-check", label: "AM 체크", tone: "warning" },
    { id: "recovery", label: "다시 시작 준비", tone: "recovery" },
  ],
};

export const spaceProfile = {
  appName: "나의 루틴 방",
  ownerName: "지은",
  ddayLabel: "루틴 0일째",
  currency: 0,
  notificationTime: "21:30",
  todayQuestion: "오늘 가장 중요한 루틴은?",
  answerState: "available",
  roomMood: "calm",
};

export const roomItems = [
  { id: "window", label: "창문", slot: "wall", owned: true, equipped: true },
  { id: "plant", label: "식물", slot: "floor", owned: true, equipped: true },
  { id: "lamp", label: "조명", slot: "side", owned: true, equipped: true },
  { id: "mug", label: "머그컵", slot: "table", owned: true, equipped: true },
];

export const todayStatus = {
  dateLabel: "오늘",
  condition: "보통",
  primaryFocus: "가장 작은 루틴 1개",
  completionTarget: "3개만 끝내기",
  checkinProgress: 0,
  checkinTotal: 2,
  planMode: "balanced",
  aiPlanApplied: false,
  quickCheckin: null,
};

export const coachMessage = {
  title: "오늘은 가볍게",
  message: "처음부터 완벽하게 채우기보다, 끝낼 수 있는 크기로 시작해요.",
  adjustment: "미니 루틴 우선",
};

export const difficultySuggestion = {
  title: "오늘은 라이트 모드가 좋아요",
  message: "완료하지 않아도 괜찮아요. 가장 작은 메인 1개를 10분짜리 미니로 바꿔드릴게요.",
  recommendedLevel: "AI 루틴 완화",
};

export const todayQuests = [
  {
    id: "focus-25",
    type: "main",
    title: "25분 집중 루틴",
    category: "학습",
    time: "10:00",
    scheduledTime: "10:00",
    difficulty: "보통",
    xp: 45,
    completed: false,
    completedAt: null,
    visual: "25",
    color: "teal",
    description: "타이머를 켜고 한 가지 일에 집중합니다.",
    recoveryAction: "내일은 10분만 다시 시작하기",
    steps: ["준비물 치우기", "타이머 25분", "짧게 회고"],
  },
  {
    id: "vocab-20",
    type: "main",
    title: "단어 20개 복습",
    category: "암기",
    time: "14:00",
    scheduledTime: "14:00",
    difficulty: "쉬움",
    xp: 30,
    completed: false,
    completedAt: null,
    visual: "20",
    color: "green",
    description: "오늘의 단어를 보고 헷갈리는 것만 표시합니다.",
    recoveryAction: "10개만 보기",
    steps: ["새 단어 확인", "틀린 단어 표시", "마지막 3개 읽기"],
  },
  {
    id: "desk-reset",
    type: "main",
    title: "책상 리셋",
    category: "환경",
    time: "시작 전",
    scheduledTime: "시작 전",
    difficulty: "쉬움",
    xp: 20,
    completed: false,
    completedAt: null,
    visual: "5",
    color: "coral",
    description: "5분만 정리해서 바로 시작할 수 있는 상태를 만듭니다.",
    recoveryAction: "교재만 제자리에 두기",
    steps: ["컵 치우기", "교재 정리", "앉을 자리 만들기"],
  },
  {
    id: "mini-word",
    type: "mini",
    title: "단어 10개",
    category: "회복",
    time: "언제든",
    scheduledTime: "언제든",
    difficulty: "매우 쉬움",
    xp: 12,
    completed: false,
    completedAt: null,
    visual: "10",
    color: "violet",
    description: "컨디션이 낮은 날에도 다시 시작할 수 있는 가장 작은 행동입니다.",
    recoveryAction: "첫 페이지 하나만 보기",
    steps: ["앱 열기", "10개 읽기"],
  },
  {
    id: "mini-walk",
    type: "mini",
    title: "5분 산책",
    category: "회복",
    time: "저녁",
    scheduledTime: "저녁",
    difficulty: "매우 쉬움",
    xp: 10,
    completed: false,
    completedAt: null,
    visual: "5",
    color: "blue",
    description: "몸을 움직여 루틴을 다시 이어갈 에너지를 만듭니다.",
    recoveryAction: "스트레칭 1분",
    steps: ["일어나기", "걷기", "물 마시기"],
  },
];

export const checkinOptions = {
  energyLevels: [
    { value: "low", label: "낮음", description: "회복 우선" },
    { value: "normal", label: "보통", description: "기본 루틴" },
    { value: "high", label: "높음", description: "메인 루틴" },
  ],
  busyLevels: [
    { value: "light", label: "여유", description: "조금 더 가능" },
    { value: "normal", label: "보통", description: "계획대로" },
    { value: "busy", label: "바쁨", description: "크기 줄이기" },
  ],
};

export const failureReasonOptions = ["시간 부족", "집중 어려움", "감정 소진", "몸 상태", "계획 과다", "환경 방해"];

export const weeklyReport = {
  summary: "아직 기록이 충분하지 않아요. 오늘의 체크인과 퀘스트 완료가 쌓이면 주간 패턴을 보여드릴게요.",
  completionRate: 0,
  completedCount: 0,
  totalCount: 0,
  bestTimeSlot: "기록 대기",
  recoveryRate: 0,
  comebackCount: 0,
  days: [],
  patterns: [],
  nextWeekSuggestion: {
    title: "다음 주 제안",
    items: ["AM 체크인으로 하루 목표를 정하기", "메인 퀘스트 1개부터 완료하기", "실패 사유를 PM 체크인에 남기기"],
  },
};
