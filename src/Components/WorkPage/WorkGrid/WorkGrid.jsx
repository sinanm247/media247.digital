import { useRef } from 'react';
import { useInclineReveal } from '../../../Hooks/useInclineReveal';
import { useTheme } from '../../../Context/ThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './WorkGrid.scss';

function CardMedia({ item }) {
  if (item.type === 'video') {
    return (
      <>
        <video className="work-card__blur" src={item.src} autoPlay muted loop playsInline aria-hidden="true" />
        <video className="work-card__frame" src={item.src} autoPlay muted loop playsInline />
      </>
    );
  }

  return (
    <>
      <img className="work-card__blur" src={item.src} alt="" aria-hidden="true" />
      <img className="work-card__frame" src={item.src} alt="" />
    </>
  );
}

export default function WorkGrid() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const media = THEME_ASSETS[theme].portfolio;
  const { items } = SITE_CONTENT.portfolio;
  const year = new Date().getFullYear();
  useInclineReveal(sectionRef);

  const cards = items.map((item) => ({
    ...item,
    ...(media[item.id] || {}),
  }));

  return (
    <section ref={sectionRef} className="work-grid" aria-labelledby="work-grid-title">
      <h2 id="work-grid-title" className="work-grid__sr">Selected work</h2>
      <div className="work-grid__list">
        {cards.map((item) => (
          <article key={item.id} className="work-card">
            <div className="work-card__well">
              <CardMedia item={item} />
            </div>
            <div className="work-card__meta">
              <span className="work-card__index">({item.index})</span>
              <p className="work-card__copy">
                <span className="work-card__name">{item.client}</span>
                <span className="work-card__service">{item.service}</span>
              </p>
              <span className="work-card__year">© {year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
