import { useEffect, useRef } from 'react';
import { useSectionTheme } from '../../../Context/SectionThemeContext';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './HomePortfolio.scss';

import portfolioAll from '../../../assets/Portfolio/Portfolio-All.webp';

const PORTFOLIO_THEME = {
  bgStart: '#ffffff',
  bgEnd:   '#f5f5f5',
  text:    '#1a1a1a',
  heading: '#0a0a0a',
};

const { portfolio } = SITE_CONTENT;

function PortfolioMedia({ item }) {
  if (item.type === 'video') {
    return (
      <video
        className="portfolio-item__media"
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${item.service} — ${item.client}`}
      />
    );
  }
  return (
    <img
      className="portfolio-item__media"
      src={item.src}
      alt={`${item.service} for ${item.client}`}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function HomePortfolio() {
  const sectionRef = useRef(null);
  const { setSectionTheme } = useSectionTheme();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionTheme(PORTFOLIO_THEME);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setSectionTheme]);

  // Scroll-driven scale: cards shrink continuously as the next card scrolls over them
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const STICKY_TOPS = [60, 80, 100, 120];

    const onScroll = () => {
      const items = [...section.querySelectorAll('.home-portfolio__item')];
      const vh = window.innerHeight;

      const scrollIntoSection = Math.max(0, window.scrollY - section.offsetTop);
      const sectionProgress = Math.min(1, scrollIntoSection / section.offsetHeight);

      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const myTop = STICKY_TOPS[i] ?? 60 + i * 20;

        if (rect.top > myTop) {
          item.style.transform = '';
          return;
        }

        let scale = 1;

        items.slice(i + 1).forEach((next, offset) => {
          const j = i + 1 + offset;
          const nextStickyTop = STICKY_TOPS[j] ?? 60 + j * 20;
          const nextRect = next.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0,
            (vh - nextRect.top) / (vh - nextStickyTop),
          ));
          scale -= progress * 0.04;
        });

        const depthFromFront = items.length - 1 - i;
        scale -= sectionProgress * depthFromFront * 0.02;

        item.style.transform = `scale(${Math.max(0.78, scale).toFixed(3)})`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const firstImage = portfolio.items.find((i) => i.type === 'image');

  return (
    <section
      id="work"
      ref={sectionRef}
      className="home-portfolio"
      aria-labelledby="portfolio-heading"
    >
      {/* ── Section strip ──────────────────────────────────────────────── */}
      <div className="home-portfolio__strip">
        <span className="home-portfolio__strip-index">
          <span className="home-portfolio__strip-dot" aria-hidden="true" />
          ({portfolio.sectionNum})
        </span>
        <span className="home-portfolio__strip-label">(Portfolio)</span>
        <span className="home-portfolio__strip-copy">© {new Date().getFullYear()}</span>
      </div>

      {/* ── Body: sidebar | list | see-all ─────────────────────────────── */}
      <div className="home-portfolio__body">

        {/* Sticky left sidebar */}
        <aside className="home-portfolio__sidebar" aria-label="Portfolio summary">
          <div className="home-portfolio__display" aria-hidden="true">
            <span className="home-portfolio__display-line1">{portfolio.displayLine1}</span>
            <span className="home-portfolio__display-line2">{portfolio.displayLine2}</span>
          </div>
          {portfolio.description && (
            <p className="home-portfolio__description">{portfolio.description}</p>
          )}
          <a href="/work" className="home-portfolio__cta">
            <span className="home-portfolio__cta-text">{portfolio.cta}</span>
            <span className="home-portfolio__cta-arrow" aria-hidden="true">↗</span>
          </a>
        </aside>

        {/* Portfolio items list */}
        <div className="home-portfolio__list" id="portfolio-heading">
          {portfolio.items.map((item) => (
            <article key={item.id} className="home-portfolio__item">
              <div className="portfolio-item__media-wrap">
                <PortfolioMedia item={item} />
              </div>
              <div className="portfolio-item__meta">
                <span className="portfolio-item__index">{item.index}</span>
                <div className="portfolio-item__info">
                  <span className="portfolio-item__service">{item.service}</span>
                  <span className="portfolio-item__client">
                    {item.client}
                    <em className="portfolio-item__industry"> — {item.industry}</em>
                  </span>
                </div>
                <span className="portfolio-item__year">© {new Date().getFullYear()}</span>
              </div>
            </article>
          ))}
        </div>

        {/* See all card */}
        {portfolioAll && (
          <aside className="home-portfolio__see-all" aria-label="View all portfolio work">
            <a href="/work" className="home-portfolio__see-all-link">
              <div className="home-portfolio__see-all-thumb">
                <img
                  src={portfolioAll}
                  alt=""
                  className="home-portfolio__see-all-img"
                  aria-hidden="true"
                />
              </div>
              <div className="home-portfolio__see-all-label">
                <span>See all</span>
                <strong>({portfolio.seeAllCount})</strong>
              </div>
            </a>
          </aside>
        )}

      </div>
    </section>
  );
}
