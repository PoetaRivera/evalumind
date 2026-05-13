function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="progress-bar-container" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso: ${pct}%`}>
      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      <span className="progress-bar-text">{pct}% completado</span>
    </div>
  );
}

export default ProgressBar;
