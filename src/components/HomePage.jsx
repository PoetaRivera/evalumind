import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTests } from '../data';
import './HomePage.css';

const LIKERT_IDS = ['tdah-adulto', 'tea-adulto', 'hsp-adulto', 'alexitimia-adulto', 'rsd-adulto', 'burnout-masking', 'funciones-ejecutivas'];
const TASK_IDS = ['dat', 'fas', 'social-scenarios', 'self-discrepancy', 'fer', 'sart', 'flanker', 'digit-span', 'navon', 'rmet', 'switch-task', 'sensory-threshold', 'auditory-distraction'];

const CONDITION_TAGS = {
  'tdah-adulto': 'TDAH', 'tea-adulto': 'TEA', 'hsp-adulto': 'HSP',
  'alexitimia-adulto': 'Alexitimia', 'rsd-adulto': 'RSD', 'burnout-masking': 'Masking',
  'funciones-ejecutivas': 'Ejecutivas', 'dat': 'Creatividad', 'fas': 'Lenguaje',
  'social-scenarios': 'RSD', 'self-discrepancy': 'Masking', 'fer': 'Alexitimia',
  'sart': 'TDAH', 'flanker': 'TDAH / Ejecutivas', 'digit-span': 'Ejecutivas',
  'navon': 'TEA', 'rmet': 'TEA', 'switch-task': 'Ejecutivas',
  'sensory-threshold': 'HSP', 'auditory-distraction': 'HSP',
};

function TestCard({ test, navigate }) {
  const tag = CONDITION_TAGS[test.id];
  return (
    <div className="test-card">
      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
        {tag && <span className="test-card-tag">{tag}</span>}
        <span className={`test-card-type ${test.isTask ? 'test-card-type--task' : 'test-card-type--likert'}`}>
          {test.isTask ? 'Tarea' : 'Cuestionario'}
        </span>
      </div>
      <h3>{test.title}</h3>
      <p className="test-card-desc">{test.description}</p>
      <ul className="test-card-info">
        <li>{test.isTask ? '1 tarea interactiva' : `${test.questionCount} preguntas`}</li>
        <li>~{test.isTask ? '3–8' : Math.max(4, Math.ceil(test.questionCount / 2.5))} min</li>
        <li>Anónimo</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/test/${test.id}`)}
        aria-label={`Comenzar ${test.title}`}
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
      <h2>NeuroScreen</h2>
      <p className="home-description">
        Herramienta gratuita y anónima de orientación neurodivergente.{' '}
        <strong>Ningún test constituye un diagnóstico.</strong>{' '}
        Combina cuestionarios de auto-observación con tareas interactivas para una visión más completa.
      </p>

      {/* Navegación rápida */}
      <div className="home-quicknav">
        <a href="/perfil" className="home-quicknav-btn home-quicknav-btn--primary">
          Ver mi Mapa de Funcionamiento
        </a>
        <a href="/historias" className="home-quicknav-btn home-quicknav-btn--secondary">
          Historias de Adaptación
        </a>
      </div>

      {/* Cuestionarios (auto-reporte) */}
      <section className="home-section">
        <h3 className="home-section-title">
          Cuestionarios de auto-observación
          <span className="home-section-subtitle">Responde según tu experiencia cotidiana</span>
        </h3>
        <div className="tests-grid">
          {likertTests.map((test) => (
            <TestCard key={test.id} test={test} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Tareas de acción (rendimiento) */}
      <section className="home-section">
        <h3 className="home-section-title">
          Tareas interactivas
          <span className="home-section-subtitle">Ejercicios que miden tu rendimiento real, no solo tu percepción</span>
        </h3>
        <div className="tests-grid">
          {taskTests.map((test) => (
            <TestCard key={test.id} test={test} navigate={navigate} />
          ))}
        </div>
      </section>

      <p className="home-footer-note">
        ¿No sabes por dónde empezar? Haz primero el cuestionario y luego la tarea del mismo tema (ej: TDAH → SART).{' '}
        La combinación de ambos te da una visión más objetiva.
      </p>
    </div>
  );
}
