import { useEffect, useRef, useState } from 'react';
import './LineReveal.scss';

const FADE_CLASS = /(?:^|\s)(?:is-fade|home-services__intro-fade)(?:\s|$)/;

function fadeOf(node, root) {
  let el = node.parentElement;
  while (el && el !== root) {
    if (FADE_CLASS.test(el.className || '')) return el.className;
    el = el.parentElement;
  }
  return '';
}

function measureLines(root) {
  const range = document.createRange();
  const items = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const text = node.textContent || '';
    const fade = fadeOf(node, root);
    const tokens = text.match(/\S+\s*/g);
    if (!tokens) {
      if (items.length && text) items[items.length - 1].text += text;
      node = walker.nextNode();
      continue;
    }
    let index = 0;
    tokens.forEach((token) => {
      range.setStart(node, index);
      range.setEnd(node, index + token.length);
      const rect = range.getClientRects()[0];
      if (rect && token.trim()) {
        items.push({ text: token, top: rect.top, left: rect.left, fade });
      }
      index += token.length;
    });
    node = walker.nextNode();
  }

  const lines = [];
  items.forEach((item) => {
    const line = lines.find((entry) => Math.abs(entry.top - item.top) < 6);
    if (line) line.parts.push(item);
    else lines.push({ top: item.top, parts: [item] });
  });

  return lines
    .sort((a, b) => a.top - b.top)
    .map((line) => ({
      parts: line.parts.sort((a, b) => a.left - b.left),
    }))
    .filter((line) => line.parts.length);
}

export default function LineReveal({ children, indent = '0%' }) {
  const rootRef = useRef(null);
  const sourceRef = useRef(null);
  const playRef = useRef(false);
  const settledRef = useRef(false);
  const [lines, setLines] = useState(null);
  const [play, setPlay] = useState(false);
  const [settled, setSettled] = useState(false);
  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) return undefined;
    const source = sourceRef.current;
    const root = rootRef.current;
    if (!source || !root) return undefined;

    let settleTimer = 0;
    let lastKey = '';
    const measure = () => {
      if (playRef.current && !settledRef.current) return;
      const next = measureLines(source);
      const key = next.map((line) => line.parts.map((part) => part.text).join('')).join('|');
      if (!next.length || key === lastKey) return;
      lastKey = key;
      setLines(next);
    };

    measure();
    const fonts = document.fonts?.ready?.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(root);

    const view = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      playRef.current = true;
      setPlay(true);
      view.disconnect();
      const count = sourceRef.current ? measureLines(sourceRef.current).length : 4;
      settleTimer = window.setTimeout(() => {
        settledRef.current = true;
        setSettled(true);
      }, count * 100 + 900);
    }, { threshold: 0.35 });
    view.observe(root);

    return () => {
      fonts?.then?.(() => {});
      observer.disconnect();
      view.disconnect();
      window.clearTimeout(settleTimer);
    };
  }, [reduced]);

  if (reduced) return children;

  const state = [
    'line-reveal',
    lines ? 'is-measured' : '',
    play ? 'is-playing' : '',
    settled ? 'is-settled' : '',
  ].filter(Boolean).join(' ');

  return (
    <span ref={rootRef} className={state} style={{ '--line-indent': indent }}>
      <span ref={sourceRef} className="line-reveal__source">{children}</span>
      {lines && (
          <span className="line-reveal__lines" aria-hidden="true">
          {lines.map((line, index) => (
            <span
              key={`${index}-${line.parts.map((part) => part.text).join('')}`}
              className="line-reveal__line"
            >
              <span className="line-reveal__line-in" style={{ '--i': index }}>
                {line.parts.map((part, partIndex) => (
                  part.fade
                    ? <span key={partIndex} className={part.fade}>{part.text}</span>
                    : <span key={partIndex}>{part.text}</span>
                ))}
              </span>
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
