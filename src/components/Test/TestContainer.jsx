import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getTest } from '../../data';
import { useTestSubmission } from '../../hooks/useTestSubmission';
import DisclaimerModal from '../Common/DisclaimerModal';
import InstructionsBanner from './InstructionsBanner';
import SectionHeader from './SectionHeader';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultsView from './ResultsView';
import DatInput from './DatInput';
import FasTask from './FasTask';
import { FAS_LETTERS } from '../../data/fasConfig';
import './TestContainer.css';

function makeEmptyAnswers(count) {
  return new Array(count).fill(null);
}

function storageKey(testId) {
  return `neuroscreen_${testId}_state`;
}

function loadState(testId) {
  try {
    const raw = localStorage.getItem(storageKey(testId));
    if (raw) return JSON.parse(raw);
  } catch {
    /* datos corruptos */
  }
  return null;
}

function TestContainer() {
  const { testId } = useParams();
  const test = getTest(testId);

  const saved = loadState(testId);
  const questionCount = test?.questions?.length ?? 0;

  const [accepted, setAccepted] = useState(saved?.accepted ?? false);
  const [answers, setAnswers] = useState(saved?.answers ?? makeEmptyAnswers(questionCount));
  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex ?? 0);
  const [finished, setFinished] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(!saved?.accepted);
  // DAT & FAS
  const [datResult, setDatResult] = useState(null);
  const [fasResult, setFasResult] = useState(null);
  const fasLetter = useRef(FAS_LETTERS[Math.floor(Math.random() * FAS_LETTERS.length)]);

  const { loading, error, saved: submissionSaved, saveResponse } = useTestSubmission();

  const persist = useCallback(
    (overrides) => {
      try {
        const state = { accepted, answers, currentIndex, ...overrides };
        localStorage.setItem(storageKey(testId), JSON.stringify(state));
      } catch {
        /* storage lleno o privado */
      }
    },
    [accepted, answers, currentIndex, testId],
  );

  useEffect(() => {
    if (finished || submissionSaved) {
      localStorage.removeItem(storageKey(testId));
    }
  }, [finished, submissionSaved, testId]);

  // Reset state when navigating to a different test (only if no saved progress)
  useEffect(() => {
    const existing = loadState(testId);
    if (!existing) {
      setAccepted(false);
      setAnswers(makeEmptyAnswers(questionCount));
      setCurrentIndex(0);
      setFinished(false);
      setShowDisclaimer(true);
      setDatResult(null);
      setFasResult(null);
    }
  }, [testId, questionCount]);

  const handleAccept = () => {
    setAccepted(true);
    setShowDisclaimer(false);
    persist({ accepted: true });
  };

  const handleSelect = (index, value) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    persist({ answers: next });
  };

  const handleNext = () => {
    const next = currentIndex + 1;
    setCurrentIndex(next);
    persist({ currentIndex: next });
  };

  const handlePrev = () => {
    const prev = currentIndex - 1;
    setCurrentIndex(prev);
    persist({ currentIndex: prev });
  };

  const handleFinish = () => {
    const result = test.scoringFn(answers);
    setFinished(true);
    saveResponse(test.testId, answers, result);
  };

  // DAT: user clicked "Calcular resultado"
  const handleDatComplete = (words) => {
    const result = test.scoringFn(words);
    setDatResult(result);
    setAnswers(words);
    setFinished(true);
    saveResponse(test.testId, words, result);
  };

  // FAS: cronómetro terminado o user hizo clic en terminar
  const handleFasComplete = (result) => {
    setFasResult(result);
    setAnswers(result.words || []);
    setFinished(true);
    saveResponse(test.testId, result.words || [], result);
  };

  // Test not found
  if (!test) {
    return (
      <div className="test-container">
        <div className="question-card">
          <h2>Test no encontrado</h2>
          <p>El test solicitado no está disponible.</p>
        </div>
      </div>
    );
  }

  const isDat = test.type === 'dat';
  const isFas = test.type === 'fas';

  if (showDisclaimer) {
    return (
      <DisclaimerModal
        onAccept={handleAccept}
        disclaimerText={test.disclaimerText}
      />
    );
  }

  if (finished) {
    // Para DAT/FAS, el resultado ya fue calculado; para Likert, calcular ahora
    const result = isDat ? datResult : isFas ? fasResult : test.scoringFn(answers);
    return (
      <ResultsView
        result={result}
        testId={test.testId}
        loading={loading}
        error={error}
        saved={submissionSaved}
        onRestart={() => {
          if (isDat) setDatResult(null);
          if (isFas) setFasResult(null);
          setAnswers(isDat ? [] : makeEmptyAnswers(questionCount));
          setCurrentIndex(0);
          setFinished(false);
          setShowDisclaimer(true);
          setAccepted(false);
          localStorage.removeItem(storageKey(testId));
        }}
      />
    );
  }

  // ─── DAT flow ────────────────────────────────────
  if (isDat) {
    return (
      <div className="test-container">
        <InstructionsBanner instructions={test.instructions} />
        <DatInput onComplete={handleDatComplete} />
      </div>
    );
  }

  // ─── FAS flow ────────────────────────────────────
  if (isFas) {
    return (
      <div className="test-container">
        <FasTask letter={fasLetter.current} onComplete={handleFasComplete} />
      </div>
    );
  }

  // ─── Likert flow ─────────────────────────────────
  const allAnswered = answers.every((a) => a !== null);
  const currentAnswer = answers[currentIndex];
  const isLast = currentIndex === questionCount - 1;
  const question = test.questions[currentIndex];

  // Primera pregunta de cada sección
  const currentSection = test.sections.find(
    (s) => currentIndex >= s.range[0] && currentIndex <= s.range[1],
  );
  const isFirstInSection = currentSection && currentIndex === currentSection.range[0];

  // ¿Acabamos de cambiar de sección?
  const prevQuestion = currentIndex > 0 ? test.questions[currentIndex - 1] : null;
  const sectionChanged = prevQuestion && prevQuestion.section !== question.section;

  return (
    <div className="test-container">
      <InstructionsBanner instructions={test.instructions} />

      <ProgressBar current={currentIndex + 1} total={questionCount} />

      {(sectionChanged || (!prevQuestion && currentSection)) && (
        <SectionHeader sectionId={question.section} title={question.sectionTitle} />
      )}

      <QuestionCard
        question={question}
        selectedValue={currentAnswer}
        onSelect={handleSelect}
        currentIndex={currentIndex}
        totalQuestions={questionCount}
        isFirstInSection={isFirstInSection}
      />

      <div className="test-nav">
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Pregunta anterior"
        >
          Anterior
        </button>

        <span className="test-nav-hint">
          {currentAnswer === null && 'Selecciona una opción para continuar'}
        </span>

        {isLast ? (
          <button
            className="btn btn-primary"
            onClick={handleFinish}
            disabled={!allAnswered}
            aria-label="Finalizar test y ver resultados"
          >
            Finalizar y ver resultados
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={currentAnswer === null}
            aria-label="Siguiente pregunta"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}

export default TestContainer;
