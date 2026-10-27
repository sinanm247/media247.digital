import { useEffect, useRef } from 'react';
import Navbar from '../../Common/Navbar/Navbar';
import { enterStyle } from '../../Common/Entrance/enterStyle';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './AboutHero.scss';

const banner = THEME_ASSETS['theme-2'].images.image3;

const PLUS_MARKS = [
  { top: '36%', left: '10%' },
  { top: '64%', left: '10%' },
  { top: '36%', left: '90%' },
  { top: '64%', left: '90%' },
];

export default function AboutHero() {
  const sectionRef = useRef(null);
  const { headline, label, captionLine1, captionLine2 } = SITE_CONTENT.aboutPage.hero;
  const year = new Date().getFullYear();

  // Same drift as the home hero: sticky, then a short upward move
  // while the next section covers it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const onScroll = () => {
      const progress = Math.min(window.scrollY / section.offsetHeight, 1);
      section.style.setProperty('--scroll-progress', progress.toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="about-hero" aria-labelledby="about-hero-title">
      <div className="about-hero__bg" aria-hidden="true">
        <img
          src={banner}
          alt=""
          className="about-hero__bg-img enter-media"
        />
      </div>

      <Navbar variant="on-light" />

      <div className="about-hero__stage enter-rise" style={enterStyle(100, 70, 1170, 'spring')}>
        <div className="about-hero__frame enter-rise__in">
          <img
            src={banner}
            alt="A hand holding a glass card printed with the Media247 Digital mark"
            className="about-hero__frame-img enter-zoom"
          />
          <span className="about-hero__shade" aria-hidden="true" />

          {PLUS_MARKS.map((pos) => (
            <span key={`${pos.top}-${pos.left}`} className="about-hero__plus" style={pos} aria-hidden="true">
              +
            </span>
          ))}

          <h1 id="about-hero-title" className="about-hero__title">
            {headline}
          </h1>
        </div>
      </div>

      <div className="about-hero__meta">
        <span className="about-hero__meta-label enter-rise" style={enterStyle(520, 12, 500)}>
          <span className="enter-rise__in">{label}</span>
        </span>
        <p className="about-hero__meta-copy enter-rise" style={enterStyle(680, 12, 500)}>
          <span className="enter-rise__in">
            <span>{captionLine1}</span>
            <span>{captionLine2}</span>
          </span>
        </p>
        <span className="about-hero__meta-year enter-rise" style={enterStyle(840, 12, 500)}>
          <span className="enter-rise__in">© {year}</span>
        </span>
      </div>
    </section>
  );
}
