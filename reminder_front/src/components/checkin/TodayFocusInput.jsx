function TodayFocusInput({ onChange, value }) {
  return (
    <label className="form-field">
      <span>오늘 가장 중요한 1가지</span>
      <input
        onChange={(event) => onChange(event.target.value)}
        placeholder="예: LC 20분만 먼저 끝내기"
        type="text"
        value={value}
      />
    </label>
  );
}

export default TodayFocusInput;
