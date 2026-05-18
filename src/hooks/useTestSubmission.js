import { useState, useRef, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { saveCompletedTest } from '../utils/sessionResults';

export function useTestSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [remoteSaved, setRemoteSaved] = useState(false);
  const submitting = useRef(false);

  const saveResponse = useCallback(async (testId, answers, result) => {
    if (submitting.current) return;
    submitting.current = true;

    setLoading(true);
    setError(null);
    setSaved(false);
    setRemoteSaved(false);

    // Guardar localmente siempre (para Mapa de Funcionamiento y notas)
    saveCompletedTest(testId, result, answers);
    setSaved(true);

    try {
      const sessionId = crypto.randomUUID();

      const responseData = {
        testId,
        answers,
        resultCategory: result.category,
        sessionId,
        createdAt: serverTimestamp(),
      };

      if (result.total !== undefined && result.total !== null) {
        responseData.totalScore = result.total;
      }
      if (result.dimensions && result.dimensions.length > 0) {
        responseData.dimensions = result.dimensions.reduce((acc, d) => {
          acc[d.key] = d.score;
          return acc;
        }, {});
        responseData.profiles = result.profiles ? result.profiles.map((p) => p.id) : [];
      }

      if (result.finalScore !== undefined) {
        responseData.finalScore = result.finalScore;
        responseData.averageDistance = result.averageDistance;
        responseData.standardDeviation = result.standardDeviation;
      }
      if (result.pairwiseDistances) {
        responseData.pairwiseDistances = result.pairwiseDistances;
      }

      if (db) {
        await addDoc(collection(db, 'responses'), responseData);
        setRemoteSaved(true);
      }
    } catch (err) {
      const message = 'No se pudo enviar la copia anónima. Tus resultados locales siguen disponibles en esta sesión.';
      console.warn('Firestore save skipped (not configured or offline):', err.message);
      setError(message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        submitting.current = false;
      }, 2000);
    }
  }, []);

  return { loading, error, saved, remoteSaved, saveResponse };
}
