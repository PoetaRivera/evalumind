import { LIKERT_OPTIONS } from '../../data/tdahQuestions';
import ExamplesAccordion from './ExamplesAccordion';

function QuestionCard({ question, selectedValue, onSelect, currentIndex, totalQuestions, isFirstInSection }) {
  return (
    <div
      className="question-card"
      role="region"
      aria-label={`Pregunta ${currentIndex + 1} de ${totalQuestions}`}
    >
      <div className="question-header">
        <span className="question-number">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </span>
        <span className="question-dimension">
          {question.dimension === 'inattention'
            ? 'Atención'
            : question.dimension === 'hyperactivityPhysical'
              ? 'Hiperactividad'
              : 'Impulsividad'}
        </span>
      </div>

      <p className="question-text">{question.text}</p>

      <ExamplesAccordion
        examples={question.examples}
        defaultOpen={isFirstInSection}
      />

      <fieldset className="likert-options" aria-label="Opciones de respuesta">
        <legend className="sr-only">
          Selecciona la frecuencia con la que experimentas esta situación
        </legend>
        {LIKERT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`likert-label ${selectedValue === opt.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => onSelect(currentIndex, opt.value)}
              aria-label={opt.label}
            />
            <span className="likert-text">{opt.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}

export default QuestionCard;
