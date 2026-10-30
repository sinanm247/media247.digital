import { useEffect, useRef } from 'react';
import LineReveal from '../../Common/LineReveal/LineReveal';
import ServicesThemeToggle from '../../Common/ServicesThemeToggle/ServicesThemeToggle';
import { useSectionTheme } from '../../../Context/SectionThemeContext';
import { useServicesTheme } from '../../../Context/ServicesThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
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
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const fillRef     = useRef(null);
  const counterRef  = useRef(null);
  const { setSectionTheme } = useSectionTheme();
  const { theme: servicesTheme } = useServicesTheme();
  const themeServices = THEME_ASSETS[servicesTheme].services;

  // Section theme observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionTheme(SERVICES_THEME);
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [setSectionTheme]);

  // Clip reveal + horizontal scroll driven by vertical scroll
  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    const fill    = fillRef.current;
    const counter = counterRef.current;
    if (!section || !track) return undefined;

    const isMobile = () => window.innerWidth < 768;

    // Cache padding-top so we don't call getComputedStyle on every scroll tick.
    // The sticky child sits padding-top px below the section top, so horizontal
    // scroll must only start once the sticky has actually pinned.
    let paddingTop = 0;

    // ── Set section height so vertical scroll equals horizontal travel ──────
    const updateHeight = () => {
      if (isMobile()) {
        section.style.height = '';
        track.style.transform = '';
        return;
      }
      // Re-read padding on resize (it's a clamp value)
      paddingTop = parseFloat(getComputedStyle(section).paddingTop) || 0;
      const totalSlide = Math.max(0, track.scrollWidth - window.innerWidth);
      // Short settle after the last card. The sticky lets go soon after 06
      // is in view, so Stats arrives without a long empty scrollbar travel.
      const tail = window.innerHeight * 0.35;
      section.style.height = `${window.innerHeight + totalSlide + paddingTop + tail}px`;
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    // ── Scroll handler ───────────────────────────────────────────────────────
    const onScroll = () => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();

      // Clip-path reveal progress (0 → 1 as section enters viewport)
      const revealProgress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      section.style.setProperty('--services-progress', revealProgress.toFixed(3));

      if (isMobile()) return;

      // Horizontal slide starts only after the sticky has pinned
      // (i.e. after scrollY has passed section.offsetTop + paddingTop)
      const scrollIntoSection = Math.max(0, window.scrollY - section.offsetTop - paddingTop);
      const totalSlide = Math.max(0, track.scrollWidth - window.innerWidth);
      const slide = Math.min(scrollIntoSection, totalSlide);
      // Bail early if nothing to slide (avoids a no-op transform each frame)
      if (totalSlide === 0) return;
      track.style.transform = `translateX(-${slide}px)`;

      // Progress indicator
      if (fill) {
        const pct = totalSlide > 0 ? (slide / totalSlide) * 100 : 0;
        fill.style.width = `${pct.toFixed(1)}%`;
      }
      if (counter) {
        // Which card is most in view
        const numCards = services.list.length;
        const cardIdx = Math.min(
          Math.floor((slide / (totalSlide || 1)) * numCards),
          numCards - 1,
        );
        counter.textContent = String(cardIdx + 1).padStart(2, '0');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const totalCards = String(services.list.length).padStart(2, '0');

  return (
    <section
      id="services"
      ref={sectionRef}
      className="home-services"
      aria-labelledby="services-heading"
    >
      <div className="home-services__sticky">

        {/* ── Section strip ─────────────────────────────────────────────── */}
        <div className="home-services__strip">
          <span className="home-services__strip-index">
            <span className="home-services__strip-dot" aria-hidden="true" />
            ({services.sectionNum})
          </span>
          <span className="home-services__strip-label">(Services)</span>
          <ServicesThemeToggle />
          <span className="home-services__strip-copy">© {new Date().getFullYear()}</span>
        </div>

        {/* ── Intro heading ──────────────────────────────────────────────── */}
        <div className="home-services__intro-wrap">
          <p className="home-services__intro" id="services-heading">
            <LineReveal indent="38%">
              <span className="home-services__intro-bold">{services.introBold} </span>
              <span className="home-services__intro-fade">{services.introFade}</span>
            </LineReveal>
          </p>
        </div>

        {/* ── Horizontal card track ──────────────────────────────────────── */}
        <div
          ref={trackRef}
          className="home-services__track"
          aria-label="Services list"
        >
          {services.list.map((item) => (
            <article key={item.id} className="home-services__card">

              {/* Left: text pane */}
              <div className="home-services__card-body">
                <div className="home-services__card-head">
                  <span className="home-services__card-num" aria-hidden="true">
                    {item.index}
                  </span>
                  <h3 className="home-services__card-title">{item.title}</h3>
                </div>
                <div className="home-services__card-detail">
                  <span className="home-services__card-subtitle">{item.subtitle}</span>
                  <p className="home-services__card-desc">{item.summary}</p>
                </div>
              </div>

              {/* Right: image pane */}
              <div className="home-services__card-img-wrap">
                <img
                  className="home-services__card-img"
                  src={themeServices[item.id]}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>

            </article>
          ))}
        </div>

        {/* ── Progress bar + counter ─────────────────────────────────────── */}
        <div className="home-services__progress" aria-hidden="true">
          <div className="home-services__progress-counter">
            <span ref={counterRef} className="home-services__progress-current">01</span>
            <span className="home-services__progress-sep"> / </span>
            <span className="home-services__progress-total">{totalCards}</span>
          </div>
          <div className="home-services__progress-track">
            <div ref={fillRef} className="home-services__progress-fill" />
          </div>
        </div>

      </div>
    </section>
  );
}
