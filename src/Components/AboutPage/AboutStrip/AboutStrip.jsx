import './AboutStrip.scss';

export default function AboutStrip({ index, label, tone = 'light' }) {
  return (
    <div className={`about-strip${tone === 'dark' ? ' about-strip--dark' : ''}`}>
      <span className="about-strip__index">
        <span className="about-strip__dot" aria-hidden="true" />
        ({index})
      </span>
      <span className="about-strip__label">({label})</span>
      <span className="about-strip__copy">© {new Date().getFullYear()}</span>
    </div>
  );
}
