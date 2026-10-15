import { useEffect, useRef } from 'react';
import Navbar from '../../Common/Navbar/Navbar';
import { useSectionTheme } from '../../../Context/SectionThemeContext';
import { useTheme } from '../../../Context/ThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './HomeHero.scss';

const HERO_SECTION_THEME = {
  bgStart: '#000000',
  bgEnd: '#0a0a0a',
  text: '#f3f3f3',
  heading: '#ffffff',
};

const CROSS_POSITIONS = [
  { top: '30%', left: '50%' },
  { top: '30%', left: '82%' },
  { top: '56%', left: '72%' },
  { top: '64%', left: '44%' },
];

const SERVICE_TAGS = ['Content Creation', 'Performance Marketing', 'Social Media'];

function HeroBadge() {
  return (
    <div className="hero-badge" aria-label="Data-driven digital marketing">
      <span className="hero-badge__pip" aria-hidden="true" />
      <div className="hero-badge__body">
        <span className="hero-badge__top">Data-Driven</span>
        <span className="hero-badge__bottom">Digital Marketing</span>
      </div>
      <span className="hero-badge__corner" aria-hidden="true">↗</span>
    </div>
  );
}

export default function HomeHero() {
  const sectionRef = useRef(null);
  const { setSectionTheme } = useSectionTheme();
  const { theme } = useTheme();
  const assets = THEME_ASSETS[theme];
  const isTheme2 = theme === 'theme-2';

  // Section theme observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    setSectionTheme(HERO_SECTION_THEME);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionTheme(HERO_SECTION_THEME);
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setSectionTheme]);

  // Scroll-driven overlay: darkens hero as user scrolls away
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const onScroll = () => {
      const progress = Math.min(window.scrollY / section.offsetHeight, 1);
      section.style.setProperty('--scroll-progress', progress.toFixed(3));
      // Expose to document root so sibling sections (About) can read it
      document.documentElement.style.setProperty('--hero-scroll-progress', progress.toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`home-hero${isTheme2 ? ' home-hero--theme-2' : ''}`}
      aria-labelledby="home-hero-title"
    >

      {/* Background image + overlay */}
      <div className="home-hero__bg" aria-hidden="true">
        <img
          src={assets.heroBanner}
          alt=""
          className="home-hero__bg-img"
          loading="eager"
          decoding="async"
        />
        <span className="home-hero__bg-overlay" />
      </div>

      {/* Navbar: logo | centered nav | badge */}
      <Navbar variant="hero" rightSlot={<HeroBadge />} />

      {/* Decorative cross markers */}
      {CROSS_POSITIONS.map((pos, i) => (
        <span
          key={i}
          className="home-hero__cross"
          style={{ top: pos.top, left: pos.left }}
          aria-hidden="true"
        />
      ))}

      {/* Mid-left content */}
      <div className="home-hero__mid">
        <p className="home-hero__eyebrow">
          <span className="home-hero__eyebrow-dot" aria-hidden="true" />
          Digital Marketing Agency
        </p>

        <h1 id="home-hero-title" className="home-hero__heading">
          {SITE_CONTENT.hero.headline}
        </h1>

        <p className="home-hero__sub">{SITE_CONTENT.hero.subheadline}</p>

        <a href="#services" className="home-hero__cta">
          <span>Explore Now</span>
          <span className="home-hero__cta-line" aria-hidden="true" />
          <span className="home-hero__cta-arrow" aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Bottom bar */}
      {!isTheme2 && (
        <div className="home-hero__bottom">

          {/* Left: service tags + copyright strip */}
          <div className="home-hero__bottom-left">
            <ul className="home-hero__tags" aria-label="Core services">
              {SERVICE_TAGS.map((tag, i) => (
                <li key={tag} className="home-hero__tag">
                  {i === 0 && <em className="home-hero__tag-num" aria-hidden="true">01/</em>}
                  {tag}
                </li>
              ))}
            </ul>

            <div className="home-hero__footer-strip">
              <span className="home-hero__copy">© {new Date().getFullYear()}</span>
              <span className="home-hero__ticks" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} className="home-hero__tick" />
                ))}
              </span>
              <span className="home-hero__footer-label">Digital</span>
            </div>
          </div>

          {/* Large display wordmark */}
          <div className="home-hero__wordmark" aria-hidden="true">
            <span className="home-hero__word-a">MEDIA</span>
            <span className="home-hero__word-b">247</span>
          </div>

        </div>
      )}
    </section>
  );
}
