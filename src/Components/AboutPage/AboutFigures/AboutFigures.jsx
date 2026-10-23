import AboutStrip from '../AboutStrip/AboutStrip';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './AboutFigures.scss';

export default function AboutFigures() {
  const { sectionNum, label, items } = SITE_CONTENT.aboutPage.figures;

  return (
    <section className="about-figures" aria-labelledby="about-figures-title">
      <h2 id="about-figures-title" className="about-figures__sr">
        The record
      </h2>
      <AboutStrip index={sectionNum} label={label} />

      <ol className="about-figures__list">
        {items.map((item) => (
          <li key={item.id} className="about-figures__item">
            <p className="about-figures__stat">{item.stat}</p>
            <div className="about-figures__copy">
              <h3 className="about-figures__title">{item.title}</h3>
              <p className="about-figures__text">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
