function EnergyCheck({ onChange, value, options }) {
  return (
    <fieldset className="choice-group">
      <legend>오늘 에너지</legend>
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

export default EnergyCheck;
