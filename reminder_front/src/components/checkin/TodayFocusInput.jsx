function TodayFocusInput({ onChange, value }) {
  return (
    <label className="form-field">
      <span>오늘 1개</span>
      <input
        onChange={(event) => onChange(event.target.value)}
        placeholder="LC 20분"
        type="text"
        value={value}
      />
    </label>
  );
}

export default TodayFocusInput;
