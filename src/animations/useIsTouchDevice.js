import { useEffect, useState } from 'react';

/**
 * Detects coarse-pointer / no-hover devices (touch, most tablets) so
 * cursor-driven effects (hero interaction, custom cursor) can be skipped
 * where a mouse isn't actually present.
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(() =>
    typeof window !== 'undefined'
      ? !window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const listener = (event) => setIsTouch(!event.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return isTouch;
}
