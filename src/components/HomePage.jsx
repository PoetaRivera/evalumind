import { useNavigate } from 'react-router-dom';
import { getAllTests } from '../data';

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

      <div className="tests-grid">
        {tests.map((test) => (
          <div className="test-card" key={test.id}>
            <h3>{test.title}</h3>
            <p className="test-card-desc">{test.description}</p>
            <ul className="test-card-info">
              <li>{test.isTask ? '1 tarea' : `${test.questionCount} preguntas`}</li>
              <li>~{test.isTask ? '3' : Math.ceil(test.questionCount / 3)} minutos</li>
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
