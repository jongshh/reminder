export const navItems = [
  { id: "onboarding", label: "온보딩", shortLabel: "시작", icon: "◎" },
  { id: "home", label: "오늘", shortLabel: "오늘", icon: "✓" },
  { id: "checkin", label: "체크인", shortLabel: "체크", icon: "◐" },
  { id: "quest", label: "퀘스트", shortLabel: "상세", icon: "◇" },
  { id: "report", label: "리포트", shortLabel: "주간", icon: "▣" },
  { id: "profile", label: "성장", shortLabel: "성장", icon: "☆" },
];

export const onboardingSteps = [
  {
    id: "goal",
    title: "핵심 목표 1개 설정",
    description: "한 번에 여러 목표를 굴리지 않고, 지금 가장 중요한 루틴 하나만 선택합니다.",
  },
  {
    id: "pattern",
    title: "생활 패턴 입력",
    description: "가용 시간, 에너지, 바쁜 시간대를 받아 첫 주 난이도를 현실적으로 낮춥니다.",
  },
  {
    id: "class",
    title: "사용자 클래스 결정",
    description: "Scholar, Builder, Runner, Balance 중 현재 목표에 맞는 성장 방향을 정합니다.",
  },
  {
    id: "quest",
    title: "첫 주 퀘스트 생성",
    description: "메인 퀘스트, 미니 퀘스트, 실패 시 복구 행동을 한 세트로 만듭니다.",
  },
];

export const userProfile = {
  name: "지우",
  className: "Scholar",
  classLabel: "Scholar / 공부형",
  targetGoal: "6주 안에 토익 루틴 되살리기",
  level: 4,
  xp: 320,
  nextLevelXp: 500,
  streak: 5,
  recoveryTokens: 2,
  recoveryRate: 76,
  badges: [
    { id: "first-week", label: "첫 주 완주", tone: "success" },
    { id: "morning-check", label: "아침 체크인 3회", tone: "warning" },
    { id: "recovery", label: "복구 성공", tone: "recovery" },
  ],
};

export const todayStatus = {
  dateLabel: "7월 첫째 주 토요일",
  condition: "보통",
  primaryFocus: "LC 20분 + 단어 20개",
  completionTarget: "메인 2개와 미니 1개만 끝내도 오늘은 성공",
  checkinProgress: 1,
  checkinTotal: 2,
};

export const coachMessage = {
  title: "오늘은 난이도를 살짝 낮춘 날",
  message:
    "어제 밤 루틴 성공률이 낮았어요. 오늘은 40분 목표를 25분으로 줄이고 오전에 먼저 시작하게 배치했습니다.",
  adjustment: "밤 루틴은 복구 퀘스트로 전환",
};

export const difficultySuggestion = {
  title: "내일 난이도 제안",
  message:
    "PM 체크인에서 시간 부족이 반복되면 메인 퀘스트 1개를 미니 퀘스트로 낮추는 흐름을 준비합니다.",
  recommendedLevel: "보통 → 쉬움",
};

export const todayQuests = [
  {
    id: "toeic-lc",
    type: "main",
    title: "LC 파트 2 쉐도잉 20분",
    category: "학습",
    time: "오전 10:00",
    difficulty: "보통",
    xp: 45,
    completed: false,
    description: "집중력이 남아 있는 오전 시간에 듣기 루틴을 먼저 처리합니다.",
    recoveryAction: "실패하면 내일 10분 듣기와 단어 10개로 낮춥니다.",
    steps: ["문제 10개 듣기", "틀린 문장 3개 반복", "헷갈린 표현 메모"],
  },
  {
    id: "vocab-20",
    type: "main",
    title: "토익 단어 20개 복습",
    category: "학습",
    time: "오후 2:00",
    difficulty: "쉬움",
    xp: 30,
    completed: true,
    description: "긴 공부가 부담스러울 때도 유지 가능한 핵심 반복 루틴입니다.",
    recoveryAction: "실패하면 자기 전 단어 10개만 훑습니다.",
    steps: ["새 단어 10개", "어제 단어 10개", "틀린 단어 별표"],
  },
  {
    id: "desk-reset",
    type: "main",
    title: "책상 5분 정리 후 공부 시작",
    category: "환경",
    time: "공부 전",
    difficulty: "쉬움",
    xp: 20,
    completed: false,
    description: "시작 마찰을 낮추기 위해 공부 전에 눈앞의 방해 요소만 치웁니다.",
    recoveryAction: "실패하면 내일 책 한 권만 펼쳐두는 행동으로 대체합니다.",
    steps: ["컵 치우기", "교재 펼치기", "타이머 켜기"],
  },
  {
    id: "mini-word",
    type: "mini",
    title: "단어 10개만 보기",
    category: "복구",
    time: "언제든",
    difficulty: "매우 쉬움",
    xp: 12,
    completed: false,
    description: "컨디션이 낮은 날에도 스트릭을 이어가는 미니 퀘스트입니다.",
    recoveryAction: "앱을 열고 단어장 첫 페이지만 봐도 완료로 인정합니다.",
    steps: ["단어장 열기", "10개 훑기"],
  },
  {
    id: "mini-walk",
    type: "mini",
    title: "5분 산책으로 리듬 리셋",
    category: "웰니스",
    time: "저녁",
    difficulty: "매우 쉬움",
    xp: 10,
    completed: false,
    description: "집중력 저하가 올 때 공부를 포기하지 않고 회복 루프로 돌아옵니다.",
    recoveryAction: "실패해도 스트레칭 1분으로 대체할 수 있습니다.",
    steps: ["밖으로 나가기", "5분 걷기", "물 마시기"],
  },
];

export const checkinOptions = {
  energyLevels: [
    { value: "low", label: "낮음", description: "복구 중심" },
    { value: "normal", label: "보통", description: "기본 난이도" },
    { value: "high", label: "높음", description: "메인 먼저" },
  ],
  busyLevels: [
    { value: "light", label: "여유", description: "퀘스트 유지" },
    { value: "normal", label: "보통", description: "핵심만 진행" },
    { value: "busy", label: "바쁨", description: "미니로 축소" },
  ],
};

export const failureReasonOptions = [
  "시간 부족",
  "집중력 저하",
  "감정 기복",
  "몸 상태",
  "계획 과다",
  "환경 방해",
];

export const weeklyReport = {
  summary:
    "이번 주는 오전 퀘스트 성공률이 높고, 밤 10시 이후에는 실패 태그가 집중됐습니다. 다음 주는 핵심 공부를 오전에 배치하고 저녁은 복구 퀘스트 위주로 낮춥니다.",
  completionRate: 68,
  completedCount: 17,
  totalCount: 25,
  bestTimeSlot: "오전 9시 - 11시",
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
    { id: "late-night", label: "밤 10시 이후", count: 4, note: "집중력 저하 태그가 반복됨" },
    { id: "over-plan", label: "40분 이상 공부", count: 3, note: "계획 과다 태그와 함께 실패" },
    { id: "no-checkin", label: "AM 체크인 누락", count: 2, note: "당일 우선순위가 흐려짐" },
  ],
  nextWeekSuggestion: {
    title: "다음 주 구조 조정",
    items: [
      "메인 퀘스트는 오전 2개까지만 배치",
      "저녁에는 미니 퀘스트와 산책 루틴을 기본값으로 설정",
      "3일 연속 실패 시 리커버리 토큰 사용 안내",
    ],
  },
};
