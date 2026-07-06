import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../../Datasets/navigation';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './Footer.scss';

const CROSS_POSITIONS = ['33%', '55%', '77%'];

export default function Footer() {
  const { tagline, email, cta, ctaPath, wordmarkA, wordmarkB } = SITE_CONTENT.footer;
  const year = new Date().getFullYear();
  const footerRef = useRef(null);

  // Diagonal reveal — white curtain lifts off dark Footer, same as Services over Portfolio.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const onScroll = () => {
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;
      // Full vh range — animation completes when footer top reaches viewport top.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      footer.style.setProperty('--footer-progress', progress.toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">

      {/* ── Main content row ─────────────────────────────────────────────── */}
      <div className="site-footer__main">

        {/* Left: contact block */}
        <div className="site-footer__contact">
          <p className="site-footer__tagline">{tagline}</p>

          <a
            href={`mailto:${email}`}
            className="site-footer__email"
            aria-label={`Email us at ${email}`}
          >
            {email}
          </a>

          <Link to={ctaPath} className="site-footer__cta">
            <span>{cta}</span>
            <span className="site-footer__cta-line" aria-hidden="true" />
            <span className="site-footer__cta-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Right: navigation links */}
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {NAV_LINKS.map(({ number, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `site-footer__nav-link${isActive ? ' is-active' : ''}`
              }
            >
              {label}
              <sup className="site-footer__nav-num" aria-hidden="true">
                {number}
              </sup>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ── Middle: cross decorators + horizontal divider ────────────────── */}
      <div className="site-footer__mid" aria-hidden="true">
        {CROSS_POSITIONS.map((left) => (
          <span
            key={left}
            className="site-footer__cross"
            style={{ left }}
          />
        ))}
        <hr className="site-footer__divider" />
      </div>

      {/* ── Large display wordmark ───────────────────────────────────────── */}
      <div className="site-footer__wordmark" aria-hidden="true">
        <span className="site-footer__word-a">{wordmarkA}</span>
        <span className="site-footer__word-b">{wordmarkB}</span>
      </div>

      {/* ── Bottom copyright strip ───────────────────────────────────────── */}
      <div className="site-footer__bottom">
        <span className="site-footer__copy">
          © {year} Media247 Digital. All rights reserved.
        </span>
      </div>

    </footer>
  );
}
