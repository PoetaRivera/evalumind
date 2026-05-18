import useDyslexicFont from '../../hooks/useDyslexicFont';

export default function FontToggle() {
  const { enabled, toggle } = useDyslexicFont();

  return (
    <button
      type="button"
      className="font-toggle"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label="Alternar tipografía para dislexia"
      title={enabled ? 'Usar tipografía estándar' : 'Usar tipografía para dislexia (OpenDyslexic)'}
      data-testid="font-toggle"
    >
      Aa
    </button>
  );
}
