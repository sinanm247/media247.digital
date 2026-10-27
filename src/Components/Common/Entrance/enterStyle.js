const EASE = {
  settle: 'var(--ease-settle)',
  spring: 'var(--ease-spring)',
  tag: 'var(--ease-tag)',
};

export function enterStyle(delay, y = 10, duration = 500, ease = 'settle') {
  return {
    '--enter-delay': `${delay}ms`,
    '--enter-y': `${y}px`,
    '--enter-dur': `${duration}ms`,
    '--enter-ease': EASE[ease] || EASE.settle,
  };
}
