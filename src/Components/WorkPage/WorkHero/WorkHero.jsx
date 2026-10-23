import { useEffect, useRef } from 'react';
import Navbar from '../../Common/Navbar/Navbar';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './WorkHero.scss';

const banner = THEME_ASSETS['theme-2'].banners.banner2;

export default function WorkHero() {
  const sectionRef = useRef(null);
  const { description, items } = SITE_CONTENT.portfolio;
  const count = String(items.length).padStart(2, '0');

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
    <section ref={sectionRef} className="work-hero" aria-labelledby="work-hero-title">
      <div className="work-hero__bg" aria-hidden="true">
        <img src={banner} alt="" className="work-hero__bg-img" />
        <span className="work-hero__shade" />
      </div>

      <Navbar variant="hero" />

      <div className="work-hero__bottom">
        <h1 id="work-hero-title" className="work-hero__title">
          <span className="work-hero__line">
            Latest
            <sup className="work-hero__count">({count})</sup>
          </span>
          <span className="work-hero__line">Portfolio</span>
        </h1>
        <p className="work-hero__caption">{description}</p>
      </div>
    </section>
  );
}
