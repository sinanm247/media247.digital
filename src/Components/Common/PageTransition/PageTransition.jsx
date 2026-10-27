import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.scss';

const CARD_PATHS = new Set();
const FADE_MS = 1900;
const CARD_MS = 880;

function variantFor(pathname) {
  return CARD_PATHS.has(pathname) ? 'card' : 'fade';
}

function isInternalNavigation(link, event) {
  if (!link || event.defaultPrevented) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return null;
  if (link.target && link.target !== '_self') return null;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) return null;
  return url.pathname;
}

export default function PageTransition({ ready, children }) {
  const shellRef = useRef(null);
  const snapRef = useRef(null);
  const timerRef = useRef(0);
  const location = useLocation();
  const [mode, setMode] = useState(null);

  const clearSnap = () => {
    snapRef.current?.remove();
    snapRef.current = null;
    document.documentElement.classList.remove('is-page-transition');
    document.documentElement.style.scrollBehavior = '';
    document.body.style.overflow = '';
    const root = document.getElementById('root');
    if (root) root.style.zIndex = '';
  };

  const begin = (pathname) => {
    const shell = shellRef.current;
    if (!shell || !ready) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    clearSnap();
    window.clearTimeout(timerRef.current);

    const y = window.scrollY;
    const variant = variantFor(pathname);
    const clip = document.createElement('div');
    clip.className = `page-snapshot page-snapshot--${variant}`;
    const copy = shell.cloneNode(true);
    copy.style.transform = `translateY(-${y}px)`;
    clip.appendChild(copy);
    document.body.appendChild(clip);
    snapRef.current = clip;
    const root = document.getElementById('root');
    if (root) root.style.zIndex = '2';

    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.classList.add('is-page-transition');
    document.body.style.overflow = 'hidden';
    setMode(variant);

    timerRef.current = window.setTimeout(() => {
      clearSnap();
      setMode(null);
    }, variant === 'card' ? CARD_MS : FADE_MS);
  };

  useEffect(() => {
    const onClick = (event) => {
      const pathname = isInternalNavigation(event.target.closest('a'), event);
      if (pathname) begin(pathname);
    };
    const onPop = () => begin(window.location.pathname);

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPop);
      window.clearTimeout(timerRef.current);
      clearSnap();
    };
  }, [ready]);

  useEffect(() => () => {
    window.clearTimeout(timerRef.current);
    clearSnap();
  }, []);

  return (
    <div className={`app-shell${ready ? ' is-ready' : ''}`}>
      <div
        ref={shellRef}
        className={`page-shell${mode ? ` is-${mode}` : ''}`}
        key={location.pathname}
      >
        <div className="page-shell__view">{children}</div>
      </div>
    </div>
  );
}
