import { useEffect, useRef } from 'react';
import { useSectionTheme } from '../../../Context/SectionThemeContext';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './HomeServices.scss';

const SERVICES_THEME = {
  bgStart: '#0a0a0a',
  bgEnd:   '#111111',
  text:    '#ffffff',
  heading: '#ffffff',
};

const { services } = SITE_CONTENT;

export default function HomeServices() {
  const sectionRef = useRef(null);
  const { setSectionTheme } = useSectionTheme();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionTheme(SERVICES_THEME);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setSectionTheme]);

  // Reveal clip — same diagonal expand as HomeAbout.
  // Both sides expand upward; right expands faster → incline toward right.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Full vh range — animation completes when section top reaches viewport top.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      section.style.setProperty('--services-progress', progress.toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="home-services"
      aria-labelledby="services-heading"
    >
      {/* ── Section strip ──────────────────────────────────────────────── */}
      <div className="home-services__strip">
        <span className="home-services__strip-index">
          <span className="home-services__strip-dot" aria-hidden="true" />
          ({services.sectionNum})
        </span>
        <span className="home-services__strip-label">(Services)</span>
        <span className="home-services__strip-copy">© {new Date().getFullYear()}</span>
      </div>

      {/* ── Intro heading ──────────────────────────────────────────────── */}
      <div className="home-services__intro-wrap">
        <p className="home-services__intro" id="services-heading">
          <span className="home-services__intro-bold">{services.introBold} </span>
          <span className="home-services__intro-fade">{services.introFade}</span>
        </p>
      </div>

      {/* ── Service rows ───────────────────────────────────────────────── */}
      <ul className="home-services__list" role="list">
        {services.list.map((item) => (
          <li key={item.id} className="home-services__row">
            <span className="home-services__row-num" aria-hidden="true">
              {item.index}
            </span>

            <div className="home-services__row-img-wrap">
              <img
                className="home-services__row-img"
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="home-services__row-info">
              <h3 className="home-services__row-title">{item.title}</h3>
              <div className="home-services__row-bottom">
                <span className="home-services__row-subtitle">{item.subtitle}</span>
                <p className="home-services__row-desc">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
