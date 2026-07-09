function BusyLevelSelect({ onChange, value, options }) {
  return (
    <fieldset className="choice-group">
      <legend>바쁨</legend>
      <div className="choice-grid">
        {options.map((option) => (
          <button
            aria-pressed={value === option.value}
            className="choice-card"
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            <strong>{option.label}</strong>
            <span>{option.description}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default BusyLevelSelect;
