import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllTests } from '../data';
import './HomePage.css';

const LIKERT_IDS = ['tdah-adulto', 'tea-adulto', 'hsp-adulto', 'alexitimia-adulto', 'rsd-adulto', 'burnout-masking', 'funciones-ejecutivas'];
const TASK_IDS = ['dat', 'fas', 'social-scenarios', 'self-discrepancy', 'fer', 'sart', 'flanker', 'digit-span', 'navon', 'rmet', 'switch-task', 'sensory-threshold', 'auditory-distraction'];

function TestCard({ test, navigate }) {
  return (
    <div className="test-card">
      <h3>{test.title}</h3>
      <p className="test-card-desc">{test.description}</p>
      <ul className="test-card-info">
        <li>{test.isTask ? '1 tarea interactiva' : `${test.questionCount} preguntas`}</li>
        <li>~{test.isTask ? '3–8' : Math.max(4, Math.ceil(test.questionCount / 2.5))} min</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/test/${test.id}`)}
      >
        {test.isTask ? 'Comenzar tarea' : 'Comenzar cuestionario'}
      </button>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const tests = getAllTests();

  const likertTests = useMemo(() => tests.filter((t) => LIKERT_IDS.includes(t.id)), [tests]);
  const taskTests = useMemo(() => tests.filter((t) => TASK_IDS.includes(t.id)), [tests]);

  return (
    <div className="home-page">
      {/* ─── Hero ─── */}
      <section className="home-hero">
        <h1 className="home-hero-title">Explora cómo funciona tu mente</h1>
        <p className="home-hero-subtitle">
          Tests gratuitos y anónimos que combinan preguntas de auto-observación con ejercicios interactivos.{' '}
          No es un diagnóstico. Es un punto de partida.
        </p>
        <div className="home-hero-actions">
          <a href="#start" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1rem' }}>
            Comenzar
          </a>
          <Link to="/perfil" className="btn btn-secondary" style={{ padding: '12px 32px', fontSize: '1rem' }}>
            Mi perfil
          </Link>
        </div>
      </section>

      {/* ─── Cómo funciona ─── */}
      <section className="home-how">
        <h2 className="home-section-heading">Cómo funciona</h2>
        <div className="home-steps">
          <div className="home-step">
            <div className="home-step-num">1</div>
            <h3>Elige un área</h3>
            <p>Atención, sensibilidad, emociones, cognición social. Explora lo que te intrigue.</p>
          </div>
          <div className="home-step-arrow">→</div>
          <div className="home-step">
            <div className="home-step-num">2</div>
            <h3>Completa los tests</h3>
            <p>Cuestionarios sobre tu experiencia + ejercicios que miden tu rendimiento real.</p>
          </div>
          <div className="home-step-arrow">→</div>
          <div className="home-step">
            <div className="home-step-num">3</div>
            <h3>Descubre tu perfil</h3>
            <p>Resultados por área, mapa combinado, y notas que conectan tus patrones.</p>
          </div>
        </div>
      </section>

      {/* ─── Metodología breve ─── */}
      <section className="home-methodology">
        <div className="home-methodology-grid">
          <div>
            <h3>Dos tipos de prueba</h3>
            <p>
              <strong>Cuestionarios:</strong> preguntas sobre tu experiencia cotidiana. Miden cómo te percibes.<br />
              <strong>Tareas:</strong> ejercicios que miden tu rendimiento real (tiempo de reacción, memoria, precisión).<br />
              La combinación de ambos da una visión más completa que cualquiera por separado.
            </p>
          </div>
          <div>
            <h3>Privacidad real</h3>
            <p>
              No recopilamos datos personales. No usamos cookies de seguimiento. Tus resultados se guardan
              solo en esta sesión del navegador y se eliminan al cerrar la pestaña.{' '}
              <strong>Nada se almacena en servidores de forma permanente.</strong>
            </p>
          </div>
          <div>
            <h3>Limitaciones</h3>
            <p>
              Estos tests son orientativos, no diagnósticos. No sustituyen una evaluación profesional.
              Si tus resultados te preocupan, busca un psicólogo, psiquiatra o neuropsicólogo.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Tests ─── */}
      <div id="start">
        <section className="home-section">
          <h2 className="home-section-heading">Cuestionarios</h2>
          <p className="home-section-desc">Preguntas sobre tu experiencia cotidiana. Responde según lo que vives, no lo que crees que deberías responder.</p>
          <div className="tests-grid">
            {likertTests.map((test) => (
              <TestCard key={test.id} test={test} navigate={navigate} />
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section-heading">Tareas interactivas</h2>
          <p className="home-section-desc">Ejercicios que miden tu rendimiento. No hay respuestas correctas o incorrectas: mide cómo funciona tu atención, memoria y procesamiento.</p>
          <div className="tests-grid">
            {taskTests.map((test) => (
              <TestCard key={test.id} test={test} navigate={navigate} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
