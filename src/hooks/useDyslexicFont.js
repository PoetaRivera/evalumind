import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'evalumind_dyslexic_font';

function isEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export default function useDyslexicFont() {
  const [enabled, setEnabled] = useState(() => isEnabled());

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('font-dyslexic');
    } else {
      document.documentElement.classList.remove('font-dyslexic');
    }
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
      } catch { /* storage full or unavailable */ }
      return next;
    });
  }, []);

  return { enabled, toggle };
}
