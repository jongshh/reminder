function ProgressBar({ label, value, max = 100 }) {
  const percent = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="progress-group" aria-label={label}>
      {label ? (
        <div className="progress-group__label">
          <span>{label}</span>
          <strong>{percent}%</strong>
        </div>
      ) : null}
      <div className="progress" role="progressbar" aria-valuemax="100" aria-valuemin="0" aria-valuenow={percent}>
        <span className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
