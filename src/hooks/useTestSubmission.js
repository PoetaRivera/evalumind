import { useState, useRef, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { saveCompletedTest } from '../utils/sessionResults';

export function useTestSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const submitting = useRef(false);

  const saveResponse = useCallback(async (testId, answers, result) => {
    if (submitting.current) return;
    submitting.current = true;

    setLoading(true);
    setError(null);

    // Guardar localmente siempre (para Mapa de Funcionamiento y notas)
    saveCompletedTest(testId, result);

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
      }
    } catch (err) {
      console.warn('Firestore save skipped (not configured or offline):', err.message);
    } finally {
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        submitting.current = false;
      }, 2000);
    }
  }, []);

  return { loading, error, saved, saveResponse };
}
