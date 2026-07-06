import { useEffect, useRef } from 'react';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './HomeStats.scss';

export default function HomeStats() {
  const { sectionNum, label, items } = SITE_CONTENT.stats;
  const sectionRef = useRef(null);

  // Diagonal reveal — same logic as HomeAbout (white section over dark Services).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Full vh range — animation completes when section top reaches viewport top.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      section.style.setProperty('--stats-progress', progress.toFixed(3));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="home-stats" aria-labelledby="home-stats-title">

      {/* Top info strip */}
      <div className="home-stats__strip">
        <span className="home-stats__strip-index" aria-hidden="true">
          <span className="home-stats__strip-dot" />
          ({sectionNum})
        </span>
        <span className="home-stats__strip-label" id="home-stats-title">
          ({label})
        </span>
        <span className="home-stats__strip-copy">© {new Date().getFullYear()}</span>
      </div>

      {/* 2 × 2 stat grid */}
      <div className="home-stats__grid">
        {items.map((item) => (
          <article key={item.title} className="home-stats__item">

            {/* Large stat number with corner bracket decoration */}
            <div className="home-stats__num-wrap">
              <span className="home-stats__num">{item.stat}</span>
              {item.unit && <span className="home-stats__unit">{item.unit}</span>}
              <span className="home-stats__corner" aria-hidden="true" />
            </div>

            {/* Divider */}
            <hr className="home-stats__divider" />

            {/* Title + description */}
            <h3 className="home-stats__title">{item.title}</h3>
            <p className="home-stats__desc">{item.description}</p>

          </article>
        ))}
      </div>

    </section>
  );
}
