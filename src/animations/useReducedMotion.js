import { useEffect, useState } from 'react';

/**
 * Tracks the user's `prefers-reduced-motion` preference live, so components
 * can switch to instant/near-instant transitions instead of disabling
 * animation ad-hoc in a dozen places.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (event) => setReduced(event.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return reduced;
}
