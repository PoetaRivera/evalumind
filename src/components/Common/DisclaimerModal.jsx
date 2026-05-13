import { useState, useEffect, useRef } from 'react';
import './DisclaimerModal.css';

function DisclaimerModal({ onAccept, disclaimerText }) {
  const [checked, setChecked] = useState(false);
  const modalRef = useRef(null);
  const checkboxRef = useRef(null);

  useEffect(() => {
    checkboxRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') return;

      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'input[type="checkbox"], button:not(:disabled)'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="modal-content" ref={modalRef}>
        <h2 id="disclaimer-title">Aviso importante</h2>
        <p>{disclaimerText}</p>
        <p className="disclaimer-confidentiality">
          Tus respuestas son anónimas. No almacenamos información que permita identificarte.
        </p>
        <label className="disclaimer-checkbox">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          He leído y entiendo el aviso. Deseo continuar.
        </label>
        <button
          className="btn btn-primary"
          disabled={!checked}
          onClick={onAccept}
          aria-label="Comenzar el test de screening"
        >
          Entiendo, quiero continuar
        </button>
      </div>
    </div>
  );
}

export default DisclaimerModal;
