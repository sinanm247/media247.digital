import { useEffect, useRef } from 'react';
import { useSectionTheme } from '../../../Context/SectionThemeContext';
import { useTheme } from '../../../Context/ThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './HomeAbout.scss';

const ABOUT_SECTION_THEME = {
  bgStart: '#ffffff',
  bgEnd:   '#f5f5f5',
  text:    '#1a1a1a',
  heading: '#0a0a0a',
};

const { about } = SITE_CONTENT;

export default function HomeAbout() {
  const sectionRef = useRef(null);
  const { setSectionTheme } = useSectionTheme();
  const { theme } = useTheme();
  const assets = THEME_ASSETS[theme];

  // Section theme
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionTheme(ABOUT_SECTION_THEME);
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setSectionTheme]);

  // Reveal clip — section enters with flat hidden top, both sides reveal as it rises.
  // Right side reveals faster → diagonal (right higher) forms by the time section is fully in view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 when section top is at viewport bottom (rect.top = vh).
      // 1 when section top has risen to 50% of viewport (rect.top = vh * 0.5).
      // Full vh range — animation completes when section top reaches viewport top.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      section.style.setProperty('--about-progress', progress.toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="home-about"
      aria-labelledby="about-heading"
    >
      {/* ── Section info strip ─────────────────────────────────────────── */}
      <div className="home-about__strip">
        <span className="home-about__strip-index" aria-hidden="true">
          <span className="home-about__strip-dot" />
          ({about.sectionNum})
        </span>
        <span className="home-about__strip-label">(About Us)</span>
        <span className="home-about__strip-copy">© {new Date().getFullYear()}</span>
      </div>

      {/* ── Large section heading ──────────────────────────────────────── */}
      <div className="home-about__heading-wrap">
        <h2 id="about-heading" className="home-about__heading">
          {about.heading}
        </h2>
      </div>

      {/* ── Content grid: photo + rows ─────────────────────────────────── */}
      <div className="home-about__grid">

        {/* Photo */}
        <div className="home-about__photo-wrap">
          <img
            src={assets.images.image1}
            alt="Media247 Digital — About us"
            className="home-about__photo"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Rows */}
        <div className="home-about__rows">
          {about.rows.map((row) => (
            <div key={row.id} className="home-about__row">
              <span className="home-about__row-tag">{row.tag}</span>

              {row.stats ? (
                <div className="home-about__stats">
                  {row.stats.map((s) => (
                    <div key={s.label} className="home-about__stat">
                      <span className="home-about__stat-label">{s.label}</span>
                      <span className="home-about__stat-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="home-about__row-text">{row.text}</p>
              )}
            </div>
          ))}

          <a href="/work" className="home-about__cta">
            <span className="home-about__cta-text">{about.cta}</span>
            <span className="home-about__cta-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* ── Client logos marquee ──────────────────────────────────────── */}
      <div className="home-about__marquee" aria-hidden="true">
        <div className="home-about__marquee-track">
          {[...assets.clients, ...assets.clients].map((logo, i) => (
            <span key={i} className="home-about__marquee-item">
              <img src={logo} alt={`Client ${i + 1}`} className="home-about__marquee-logo" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
