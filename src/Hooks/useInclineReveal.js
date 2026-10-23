import { useEffect } from 'react';

// 0 when the section top is at the bottom of the screen.
// 1 when the section top reaches the top of the screen.
export function useInclineReveal(ref, varName = '--incline-progress') {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      el.style.setProperty(varName, progress.toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, varName]);
}
