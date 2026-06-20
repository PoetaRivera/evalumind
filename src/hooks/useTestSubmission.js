import { useState, useRef, useCallback } from 'react';
import { db, isRemoteCollectionEnabled } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { saveCompletedTest } from '../utils/sessionResults';

export function useTestSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [remoteSaved, setRemoteSaved] = useState(false);
  const submitting = useRef(false);

  const saveResponse = useCallback(async (testId, _answers, result) => {
    void _answers;
    if (submitting.current) return;
    submitting.current = true;

    setLoading(true);
    setError(null);
    setSaved(false);
    setRemoteSaved(false);

    saveCompletedTest(testId, result);
    setSaved(true);

    try {
      if (!db || !isRemoteCollectionEnabled) return;

      const responseData = {
        schemaVersion: 2,
        appContext: 'personal-educational',
        testId,
        resultCategory: result.category,
        scoreDirection: result.scoreDirection || 'higher-is-more',
        sessionId: crypto.randomUUID(),
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

      await addDoc(collection(db, 'responses'), responseData);
      setRemoteSaved(true);
    } catch (err) {
      const message = 'No se pudo enviar la copia anónima opcional. Tus resultados locales siguen disponibles en este navegador.';
      console.warn('Firestore save skipped (not configured, disabled or offline):', err.message);
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
