export const getTodayKey = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
};

export const getRecentDateKeys = (endDateKey = getTodayKey(), days = 7) => {
  const endDate = new Date(`${endDateKey}T00:00:00`);

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - (days - index - 1));
    return date.toISOString().slice(0, 10);
  });
};

export const getKoreanDayLabel = (dateKey) => {
  const date = new Date(`${dateKey}T00:00:00`);
  return ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
};
