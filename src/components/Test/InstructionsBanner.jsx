function InstructionsBanner({ instructions, source }) {
  if (!instructions || instructions.length === 0) return null;

  return (
    <div className="instructions-banner" aria-live="polite">
      {instructions.map((text, i) => (
        <p key={i}>
          {i === 0 && <strong>Cómo responder: </strong>}
          {text}
        </p>
      ))}
      {source && (
        <p style={{
          fontSize: '0.8rem', color: 'var(--color-text-secondary)',
          marginTop: '12px', paddingTop: '8px',
          borderTop: '1px solid var(--color-border-light)',
        }}>
          <strong>Fuente: </strong>{source}
        </p>
      )}
    </div>
  );
}

export default InstructionsBanner;
