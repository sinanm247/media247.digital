import { useEffect, useRef } from 'react';
import Navbar from '../../Common/Navbar/Navbar';
import { enterStyle } from '../../Common/Entrance/enterStyle';
import { attachHeroRipple } from './heroRipple';
import { useSectionTheme } from '../../../Context/SectionThemeContext';
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
const assets = THEME_ASSETS['theme-1'];

export default function HomeHero() {
  const sectionRef = useRef(null);
  const { setSectionTheme } = useSectionTheme();

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const image = section.querySelector('.home-hero__bg-img');
    const canvas = section.querySelector('.home-hero__ripple');
    return attachHeroRipple(section, image, canvas);
  }, []);

  const headlineWords = SITE_CONTENT.hero.headline.split(' ');
  const headlineLast = headlineWords.pop();
  const headlineLead = headlineWords.join(' ');
  const tagMotion = [
    { delay: 900, y: 10 },
    { delay: 1100, y: 8 },
    { delay: 1300, y: 6 },
  ];

  return (
    <section
      ref={sectionRef}
      className="home-hero"
      aria-labelledby="home-hero-title"
    >

      {/* Background image + overlay */}
      <div className="home-hero__bg" aria-hidden="true">
        <div className="home-hero__bg-frame enter-media">
          <img
            src={assets.heroBanner}
            alt=""
            className="home-hero__bg-img"
            loading="eager"
            decoding="async"
          />
          <canvas className="home-hero__ripple" />
        </div>
        <span className="home-hero__bg-overlay" />
      </div>

      <Navbar variant="hero" />

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
        <p className="home-hero__eyebrow enter-rise" style={enterStyle(300, 10, 500)}>
          <span className="enter-rise__in">
            <span className="home-hero__eyebrow-dot" aria-hidden="true" />
            Digital Marketing Agency
          </span>
        </p>

        <h1 id="home-hero-title" className="home-hero__heading">
          <span className="home-hero__line enter-rise" style={enterStyle(400, 10, 500)}>
            <span className="enter-rise__in">{headlineLead}</span>
          </span>
          <span className="home-hero__line enter-rise" style={enterStyle(600, 10, 500)}>
            <span className="enter-rise__in">{headlineLast}</span>
          </span>
        </h1>

        <p className="home-hero__sub enter-rise" style={enterStyle(800, 10, 500)}>
          <span className="enter-rise__in">{SITE_CONTENT.hero.subheadline}</span>
        </p>

        <div className="enter-rise" style={enterStyle(600, 0, 1170, 'spring')}>
          <a href="#services" className="home-hero__cta enter-rise__in">
            <span>Explore Now</span>
            <span className="home-hero__cta-line" aria-hidden="true" />
            <span className="home-hero__cta-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="home-hero__bottom">

          {/* Left: service tags + copyright strip */}
          <div className="home-hero__bottom-left">
            <ul className="home-hero__tags" aria-label="Core services">
              {SERVICE_TAGS.map((tag, i) => (
                <li
                  key={tag}
                  className="home-hero__tag enter-rise"
                  style={enterStyle(tagMotion[i].delay, tagMotion[i].y, 500, 'tag')}
                >
                  <span className="enter-rise__in">
                    {i === 0 && <em className="home-hero__tag-num" aria-hidden="true">01/</em>}
                    {tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="home-hero__footer-strip enter-rise" style={enterStyle(500, 0, 1170, 'spring')}>
              <span className="enter-rise__in">
              <span className="home-hero__copy">© {new Date().getFullYear()}</span>
              <span className="home-hero__ticks" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} className="home-hero__tick" />
                ))}
              </span>
              <span className="home-hero__footer-label">Digital</span>
              </span>
            </div>
          </div>

          {/* Large display wordmark */}
          <div className="enter-rise" style={enterStyle(100, 170, 1170, 'spring')} aria-hidden="true">
            <div className="home-hero__wordmark enter-rise__in">
              <span className="home-hero__word-a">MEDIA</span>
              <span className="home-hero__word-b">247</span>
            </div>
          </div>

        </div>
    </section>
  );
}
