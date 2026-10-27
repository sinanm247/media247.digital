import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSectionTheme } from '../../../Context/SectionThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './HomePortfolio.scss';

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
  const themePortfolio = THEME_ASSETS['theme-1'].portfolio;

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

  // Cards glide into the sticky stack instead of stopping dead at the top.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const STICKY_TOPS = [60, 80, 100, 120, 140, 160, 180];
    const RANGE = 340;

    // 1 at the stick point, matching scroll speed where the glide starts.
    const settle = (distance) => {
      const u = Math.min(1, Math.max(0, distance / RANGE));
      return u * u * (2 - u);
    };

    const onScroll = () => {
      const items = [...section.querySelectorAll('.home-portfolio__item')];
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      items.forEach((item, i) => {
        const card = item.querySelector('.home-portfolio__card');
        if (!card) return;

        const myTop = STICKY_TOPS[i] ?? 60 + i * 20;
        const distance = item.getBoundingClientRect().top - myTop;

        let arrive = 0;
        if (!reduce && distance > 0 && distance < RANGE) {
          arrive = RANGE * settle(distance) - distance;
        }

        let cover = 0;
        if (!reduce) {
          items.slice(i + 1).forEach((next, offset) => {
            const j = i + 1 + offset;
            const nextTop = STICKY_TOPS[j] ?? 60 + j * 20;
            const nextDistance = next.getBoundingClientRect().top - nextTop;
            cover += 1 - settle(Math.max(0, nextDistance));
          });
        }

        const scale = Math.max(0.84, 1 - cover * 0.04);
        const recede = Math.min(cover, 4) * -8;
        card.style.transform = `translate3d(0, ${(arrive + recede).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Merge text content from siteContent with src/type from themePortfolio
  const portfolioItems = portfolio.items.map((item) => ({
    ...item,
    ...(themePortfolio[item.id] || {}),
  }));

  const portfolioAll = themePortfolio.all;

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
          <Link to="/work" className="home-portfolio__cta">
            <span className="home-portfolio__cta-text">{portfolio.cta}</span>
            <span className="home-portfolio__cta-arrow" aria-hidden="true">↗</span>
          </Link>
        </aside>

        {/* Portfolio items list */}
        <div className="home-portfolio__list" id="portfolio-heading">
          {portfolioItems.map((item) => (
            <article key={item.id} className="home-portfolio__item">
              <div className="home-portfolio__card">
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
              </div>
            </article>
          ))}
        </div>

        {/* See all card */}
        {portfolioAll && (
          <aside className="home-portfolio__see-all" aria-label="View all portfolio work">
            <Link to="/work" className="home-portfolio__see-all-link">
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
            </Link>
          </aside>
        )}

      </div>
    </section>
  );
}
