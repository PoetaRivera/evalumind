function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="progress-bar-wrapper">
      <div
        className="progress-bar-container"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progreso: pregunta ${current} de ${total}`}
      >
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-bar-text">
        Pregunta {current} de {total} · {pct}%
      </span>
    </div>
  );
}

export default ProgressBar;
