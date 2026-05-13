import { useNavigate } from 'react-router-dom';
import { getAllTests } from '../data';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const tests = getAllTests();

  return (
    <div className="home-page">
      <h2>NeuroScreen</h2>
      <p className="home-description">
        Herramienta gratuita y anónima de screening orientativo. Ninguno de estos tests constituye
        un diagnóstico. Consulta siempre con un profesional de la salud mental.
      </p>

      <div style={{ textAlign: 'center', marginBottom: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="/perfil" style={{
          background: '#8b5cf6', color: '#fff', padding: '10px 24px', borderRadius: '8px',
          textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
        }}>
          Ver mi Mapa de Funcionamiento
        </a>
        <a href="/historias" style={{
          background: '#f3f4f6', color: '#4b5563', padding: '10px 24px', borderRadius: '8px',
          textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
        }}>
          Historias de Adaptación
        </a>
      </div>

      <div className="tests-grid">
        {tests.map((test) => (
          <div className="test-card" key={test.id}>
            <h3>{test.title}</h3>
            <p className="test-card-desc">{test.description}</p>
            <ul className="test-card-info">
              <li>{test.isTask ? '1 tarea' : `${test.questionCount} preguntas`}</li>
              <li>~{test.isTask ? '3' : Math.max(4, Math.ceil(test.questionCount / 2.5))} min</li>
              <li>Anónimo</li>
            </ul>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/test/${test.id}`)}
              aria-label={`Comenzar ${test.title}`}
            >
              {test.isTask ? 'Comenzar tarea' : 'Comenzar screening'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
