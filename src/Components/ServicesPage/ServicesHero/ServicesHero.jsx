import { useEffect, useRef } from 'react';
import Navbar from '../../Common/Navbar/Navbar';
import { enterStyle } from '../../Common/Entrance/enterStyle';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './ServicesHero.scss';

const banner = THEME_ASSETS['theme-1'].banners.banner2;

export default function ServicesHero() {
  const sectionRef = useRef(null);
  const { introBold, introFade, list } = SITE_CONTENT.services;
  const count = String(list.length).padStart(2, '0');

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
    <section ref={sectionRef} className="services-hero" aria-labelledby="services-hero-title">
      <div className="services-hero__bg" aria-hidden="true">
        <img src={banner} alt="" className="services-hero__bg-img enter-media" />
        <span className="services-hero__shade" />
      </div>

      <Navbar variant="hero" />

      <div className="services-hero__bottom">
        <h1 id="services-hero-title" className="services-hero__title">
          <span className="services-hero__line enter-rise" style={enterStyle(100, 28, 1050, 'spring')}>
            <span className="enter-rise__in">Our</span>
          </span>
          <span className="services-hero__line enter-rise" style={enterStyle(200, 28, 1050, 'spring')}>
            <span className="enter-rise__in">
              Services
              <sup className="services-hero__count">({count})</sup>
            </span>
          </span>
        </h1>
        <p className="services-hero__caption enter-rise" style={enterStyle(400, 16, 1050, 'spring')}>
          <span className="enter-rise__in">{introBold} {introFade}</span>
        </p>
      </div>
    </section>
  );
}
