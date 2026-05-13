import { useState } from 'react';
import './DisclaimerModal.css';

function DisclaimerModal({ onAccept, disclaimerText }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="modal-content">
        <h2 id="disclaimer-title">Aviso importante</h2>
        <p>{disclaimerText}</p>
        <p className="disclaimer-confidentiality">
          Tus respuestas son anónimas. No almacenamos información que permita identificarte.
        </p>
        <label className="disclaimer-checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            aria-label="Confirmo que he leído y entiendo el aviso"
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
