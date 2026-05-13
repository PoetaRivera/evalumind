import { useState, useCallback, useRef } from 'react';
import { calculateFERScore } from '../../utils/ferScoring';

const EMOTIONS = [
  { id: 'alegria', emoji: '😊', label: 'Alegría', color: '#f59e0b' },
  { id: 'tristeza', emoji: '😢', label: 'Tristeza', color: '#6366f1' },
  { id: 'miedo', emoji: '😨', label: 'Miedo', color: '#8b5cf6' },
  { id: 'ira', emoji: '😠', label: 'Ira', color: '#dc2626' },
  { id: 'asco', emoji: '🤢', label: 'Asco', color: '#16a34a' },
  { id: 'sorpresa', emoji: '😲', label: 'Sorpresa', color: '#f97316' },
];

// 30 situaciones emocionales con emoción correcta
const TRIALS = [
  { text: 'Recibes una noticia inesperada que no esperabas para nada.', answer: 'sorpresa' },
  { text: 'Alguien te dice algo muy hiriente sobre tu forma de ser.', answer: 'tristeza' },
  { text: 'Ves una cucaracha subiendo por la pared de tu cocina.', answer: 'asco' },
  { text: 'Tu mejor amigo te da un abrazo después de mucho tiempo sin verse.', answer: 'alegria' },
  { text: 'Alguien te grita en la cara acusándote de algo que no hiciste.', answer: 'ira' },
  { text: 'Escuchas un ruido fuerte y extraño en tu casa a las 3 de la mañana.', answer: 'miedo' },
  { text: 'Hueles leche en mal estado al abrir el refrigerador.', answer: 'asco' },
  { text: 'Tu mascota se perdió y no aparece desde hace dos días.', answer: 'tristeza' },
  { text: 'Alguien te empuja bruscamente en el transporte público y no se disculpa.', answer: 'ira' },
  { text: 'Te dicen que acabas de ganar un premio importante.', answer: 'alegria' },
  { text: 'Vas caminando de noche por una calle oscura y escuchas pasos detrás de ti.', answer: 'miedo' },
  { text: 'Un desconocido te dice algo muy amable y genuino.', answer: 'sorpresa' },
  { text: 'Lees un mensaje que dice que tu vuelo fue cancelado cuando ya estás en el aeropuerto.', answer: 'ira' },
  { text: 'Encuentras comida con moho en un tupper que ibas a comer.', answer: 'asco' },
  { text: 'Alguien que quieres mucho te dice que se muda a otro país para siempre.', answer: 'tristeza' },
  { text: 'Terminas un proyecto en el que trabajaste meses y el resultado es exactamente lo que querías.', answer: 'alegria' },
  { text: 'Estás solo en casa y escuchas que alguien intenta abrir la puerta.', answer: 'miedo' },
  { text: 'Un desconocido te regala flores en la calle sin motivo aparente.', answer: 'sorpresa' },
  { text: 'Alguien importante para ti organiza una fiesta sorpresa para tu cumpleaños.', answer: 'alegria' },
  { text: 'Te das cuenta de que alguien está hablando mal de ti a tus espaldas.', answer: 'tristeza' },
  { text: 'Tienes que hablar en público frente a 200 personas dentro de 5 minutos.', answer: 'miedo' },
  { text: 'Alguien en el cine no para de patear tu asiento después de pedírselo amablemente.', answer: 'ira' },
  { text: 'Abres un envase de comida que lleva semanas en el fondo de la nevera.', answer: 'asco' },
  { text: 'Tu hijo/a o un niño que quieres te dice "te quiero" por primera vez.', answer: 'alegria' },
  { text: 'Recibes una multa por algo que estás seguro de no haber hecho.', answer: 'ira' },
  { text: 'Te dicen que el resultado de una prueba médica no es el que esperabas.', answer: 'miedo' },
  { text: 'Alguien te cuenta una historia que contradice totalmente lo que creías saber.', answer: 'sorpresa' },
  { text: 'Ves a una persona mayor llorando sola en un banco del parque.', answer: 'tristeza' },
  { text: 'Hueles un perfume que te recuerda a una persona que ya no está en tu vida.', answer: 'tristeza' },
  { text: 'Logras hacer algo que habías estado intentando durante años sin éxito.', answer: 'alegria' },
];

export default function FERTask({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const trialStartRef = useRef(0);

  const startTask = useCallback(() => {
    setStarted(true);
    trialStartRef.current = Date.now();
  }, []);

  const handleSelect = useCallback(
    (emotionId) => {
      const rt = Date.now() - trialStartRef.current;
      setResponses((prev) => {
        const next = [...prev];
        next[currentIndex] = {
          emotion: emotionId,
          correctAnswer: TRIALS[currentIndex].answer,
          selectedAnswer: emotionId,
          reactionTime: rt,
        };
        return next;
      });

      if (currentIndex < TRIALS.length - 1) {
        setCurrentIndex((i) => i + 1);
        trialStartRef.current = Date.now();
      }
    },
    [currentIndex],
  );

  const handleFinish = () => {
    const result = calculateFERScore(responses);
    setFinished(true);
    onComplete(result);
  };

  if (finished) return null;

  if (!started) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '550px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '12px' }}>
          Reconocimiento Emocional
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Lee cada situación e identifica la emoción que sentiría la mayoría de las personas.
        </p>
        <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '0.85rem' }}>
          {TRIALS.length} situaciones · ~{Math.ceil(TRIALS.length / 5)} minutos
        </p>
        <button className="btn btn-primary" onClick={startTask} style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
          Comenzar
        </button>
      </div>
    );
  }

  const trial = TRIALS[currentIndex];
  const currentResp = responses[currentIndex];
  const answered = !!currentResp?.selectedAnswer;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: '#6b7280' }}>
        {currentIndex + 1} de {TRIALS.length}
      </div>

      <div style={{
        height: '4px', background: '#f3f4f6', borderRadius: '2px',
        marginBottom: '24px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${((currentIndex + 1) / TRIALS.length) * 100}%`,
          background: '#4a90d9', borderRadius: '2px', transition: 'width 0.2s ease',
        }} />
      </div>

      <div className="question-card" style={{ marginBottom: '20px' }}>
        <p style={{
          fontSize: '1.15rem', lineHeight: 1.7, color: '#1a1a2e',
          marginBottom: '24px',
        }}>
          {trial.text}
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
        }}>
          {EMOTIONS.map((em) => (
            <button
              key={em.id}
              type="button"
              onClick={() => !answered && handleSelect(em.id)}
              disabled={answered}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '12px 8px', borderRadius: '10px', border: '2px solid',
                borderColor: answered && currentResp?.selectedAnswer === em.id
                  ? '#4a90d9' : '#e5e7eb',
                background: answered && currentResp?.selectedAnswer === em.id
                  ? '#eff6ff' : '#fff',
                cursor: answered ? 'default' : 'pointer',
                opacity: answered && currentResp?.selectedAnswer !== em.id ? 0.5 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '2rem', marginBottom: '4px' }}>{em.emoji}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
                {em.label}
              </span>
            </button>
          ))}
        </div>

        {answered && currentIndex < TRIALS.length - 1 && (
          <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#9ca3af' }}>
            Pasando a la siguiente...
          </div>
        )}
      </div>

      {responses.filter(Boolean).length >= 25 && currentIndex >= TRIALS.length - 1 && answered && (
        <button className="btn btn-primary" onClick={handleFinish} style={{ padding: '14px 40px' }}>
          Ver resultados ({responses.filter(Boolean).length}/{TRIALS.length})
        </button>
      )}
    </div>
  );
}
