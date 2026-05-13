import { useNavigate } from 'react-router-dom';
import './RecursosPage.css';

function RecursosPage() {
  const navigate = useNavigate();

  return (
    <div className="recursos-page">
      <h2>Recursos y ayuda profesional</h2>
      <p>
        Si tus resultados sugieren rasgos significativos de TDAH, el siguiente paso es buscar una
        evaluación con un profesional de la salud mental especializado.
      </p>

      <section className="recursos-section">
        <h3>Profesionales que pueden ayudarte</h3>
        <ul>
          <li><strong>Psicólogo/a clínico:</strong> evaluación psicológica y terapia cognitivo-conductual.</li>
          <li><strong>Psiquiatra:</strong> evaluación médica y tratamiento farmacológico si corresponde.</li>
          <li><strong>Neuropsicólogo/a:</strong> evaluación neuropsicológica detallada.</li>
        </ul>
      </section>

      <section className="recursos-section">
        <h3>Qué decir en tu consulta</h3>
        <p>
          Puedes comentar: "Hice un screening orientativo de TDAH y me gustaría una evaluación
          profesional para saber si estos rasgos aplican en mi caso."
        </p>
      </section>

      <section className="recursos-section">
        <h3>Recursos adicionales</h3>
        <ul>
          <li>
            <a href="https://chadd.org" target="_blank" rel="noopener noreferrer">
              CHADD — Children and Adults with ADHD
            </a>
          </li>
          <li>
            <a href="https://www.tdah.org.es" target="_blank" rel="noopener noreferrer">
              Fundación TDAH
            </a>
          </li>
        </ul>
      </section>

      <button
        className="btn btn-secondary"
        onClick={() => navigate('/')}
        aria-label="Volver al inicio"
      >
        Volver al inicio
      </button>
    </div>
  );
}

export default RecursosPage;
