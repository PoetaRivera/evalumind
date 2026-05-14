import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisclaimerModal.css';

function DisclaimerModal({ onAccept, disclaimerText }) {
  const [checked, setChecked] = useState(false);
  const modalRef = useRef(null);
  const checkboxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkboxRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 id="disclaimer-title">Antes de continuar</h2>
        <div className="modal-disclaimer-text">
          <p>{disclaimerText}</p>
        </div>
        <p className="modal-privacy-note">
          Tus respuestas no incluyen datos personales. Se guardan en esta sesión y pueden enviarse de forma anónima para análisis agregado si el servidor está activo.
        </p>
        <label className="modal-checkbox">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>He leído y entiendo el aviso. Deseo continuar.</span>
        </label>
        <div className="modal-actions">
          <button className="btn btn-primary" disabled={!checked} onClick={onAccept}>
            Comenzar
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisclaimerModal;
