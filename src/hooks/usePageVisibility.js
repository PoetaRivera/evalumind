import { useState, useEffect, useCallback, useRef } from 'react';

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const [pauseCount, setPauseCount] = useState(0);
  const callbacksRef = useRef({ onPause: null, onResume: null });

  useEffect(() => {
    const handleChange = () => {
      const visible = document.visibilityState === 'visible';
      setIsVisible(visible);
      if (!visible) {
        setPauseCount((c) => c + 1);
        callbacksRef.current.onPause?.();
      } else {
        callbacksRef.current.onResume?.();
      }
    };
    document.addEventListener('visibilitychange', handleChange);
    return () => document.removeEventListener('visibilitychange', handleChange);
  }, []);

  const registerCallbacks = useCallback((onPause, onResume) => {
    callbacksRef.current = { onPause, onResume };
  }, []);

  return { isVisible, pauseCount, registerCallbacks };
}
