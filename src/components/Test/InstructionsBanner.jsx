function InstructionsBanner({ instructions }) {
  if (!instructions || instructions.length === 0) return null;

  return (
    <div className="instructions-banner" aria-live="polite">
      {instructions.map((text, i) => (
        <p key={i}>
          {i === 0 && <strong>Cómo responder: </strong>}
          {text}
        </p>
      ))}
    </div>
  );
}

export default InstructionsBanner;
