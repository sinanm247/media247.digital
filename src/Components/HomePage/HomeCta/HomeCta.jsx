import { Link } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './HomeCta.scss';

const CROSS_POSITIONS = [
  { top: '13%', left: '13%' },
  { top: '13%', left: '87%' },
  { top: '76%', left: '26%' },
  { top: '76%', left: '74%' },
];

export default function HomeCta() {
  const { headingLeft, headingRight, tagline, cta, ctaPath } = SITE_CONTENT.cta;
  const { theme } = useTheme();
  const assets = THEME_ASSETS[theme];
  const bannerCta = assets.banners.banner2;

  return (
    <section className="home-cta" aria-label="Call to Action">

      {/* Framed container — image is fixed bg via CSS custom property */}
      <div
        className="home-cta__frame"
        style={{ '--cta-bg': `url(${bannerCta})` }}
      >
        {/* Overlay inside the frame */}
        <span className="home-cta__overlay" />

        {/* Decorative cross markers */}
        {CROSS_POSITIONS.map((pos, i) => (
          <span
            key={i}
            className="home-cta__cross"
            style={pos}
            aria-hidden="true"
          />
        ))}

        {/* Inner content */}
        <div className="home-cta__inner">

          <div className="home-cta__heading-row" aria-label={`${headingLeft} ${headingRight}`}>
            <h2 className="home-cta__heading-left" aria-hidden="true">
              {headingLeft}
            </h2>

            {/* Floating portrait card */}
            {/* <div className="home-cta__card" aria-hidden="true">
              <img src={ctaCard} alt="" className="home-cta__card-img" />
            </div> */}

            <h2 className="home-cta__heading-right" aria-hidden="true">
              {headingRight}
            </h2>
          </div>

          <div className="home-cta__bottom">
            <p className="home-cta__tagline">{tagline}</p>

            <Link to={ctaPath} className="home-cta__cta">
              <span>{cta}</span>
              <span className="home-cta__cta-line" aria-hidden="true" />
              <span className="home-cta__cta-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
