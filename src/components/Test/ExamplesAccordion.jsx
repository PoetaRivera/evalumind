import { useState, memo } from 'react';

function ExamplesAccordion({ examples, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  if (!examples || examples.length === 0) return null;

  return (
    <div className="examples-accordion">
      <button
        className="examples-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Ocultar ejemplos' : 'Ver ejemplos concretos'}
        type="button"
      >
        <span className="examples-toggle-icon">{open ? '▾' : '▸'}</span>
        {open ? 'Ocultar ejemplos' : 'Ver ejemplos concretos'}
      </button>
      {open && (
        <ul className="examples-list">
          {examples.map((ex, i) => (
            <li key={i} className="examples-item">
              <span className="examples-label">{ex.label}</span>
              <span className="examples-desc">{ex.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(ExamplesAccordion);
