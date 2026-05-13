import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { saveCompletedTest } from '../utils/sessionResults';

export function useTestSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const saveResponse = async (testId, answers, result) => {
    setLoading(true);
    setError(null);
    try {
      const sessionId = crypto.randomUUID();

      const responseData = {
        testId,
        answers,
        resultCategory: result.category,
        userAgent: navigator.userAgent,
        sessionId,
        createdAt: serverTimestamp(),
      };

      // Likert tests
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

      // DAT-specific
      if (result.finalScore !== undefined) {
        responseData.finalScore = result.finalScore;
        responseData.averageDistance = result.averageDistance;
        responseData.standardDeviation = result.standardDeviation;
      }
      if (result.pairwiseDistances) {
        responseData.pairwiseDistances = result.pairwiseDistances;
      }

      await addDoc(collection(db, 'responses'), responseData);
      saveCompletedTest(testId, result);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, saved, saveResponse };
}
