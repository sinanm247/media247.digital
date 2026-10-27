import { useEffect, useRef, useState } from 'react';
import AboutStrip from '../../AboutPage/AboutStrip/AboutStrip';
import LineReveal from '../../Common/LineReveal/LineReveal';
import ServicesThemeToggle from '../../Common/ServicesThemeToggle/ServicesThemeToggle';
import { useInclineReveal } from '../../../Hooks/useInclineReveal';
import { useServicesTheme } from '../../../Context/ServicesThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './ServicesList.scss';

export default function ServicesList() {
  const sectionRef = useRef(null);
  const { theme } = useServicesTheme();
  const images = THEME_ASSETS[theme].services;
  const { introBold, introFade, list } = SITE_CONTENT.services;
  const [active, setActive] = useState(0);
  useInclineReveal(sectionRef);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;

    const onScroll = () => {
      const rows = [...root.querySelectorAll('.services-list__row')];
      const mark = window.innerHeight * 0.42;
      let best = 0;
      let bestDist = Infinity;

      rows.forEach((row, index) => {
        const box = row.getBoundingClientRect();
        if (box.bottom < 80 || box.top > window.innerHeight - 80) return;
        const dist = Math.abs(box.top + box.height * 0.35 - mark);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });

      setActive((current) => (current === best ? current : best));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="services-list" aria-labelledby="services-list-heading">
      <AboutStrip index="01" label="Services" aside={<ServicesThemeToggle />} />

      <div className="services-list__lead">
        <h2 id="services-list-heading" className="services-list__statement">
          <LineReveal indent="27%">
            <span>{introBold} </span>
            <span className="is-fade">{introFade}</span>
          </LineReveal>
        </h2>
      </div>

      <div className="services-list__rows">
        {list.map((item, index) => (
          <article
            key={item.id}
            id={item.id}
            className={`services-list__row${index === active ? ' is-active' : ''}`}
          >
            <span className="services-list__index" aria-hidden="true">{item.index}</span>
            <div className="services-list__media">
              <img src={images[item.id]} alt="" />
            </div>
            <div className="services-list__copy">
              <h3 className="services-list__title">{item.title}</h3>
              <div className="services-list__detail">
                <p className="services-list__subtitle">{item.subtitle}</p>
                <p className="services-list__desc">{item.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
