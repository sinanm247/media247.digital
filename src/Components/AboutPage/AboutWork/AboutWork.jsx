import AboutStrip from '../AboutStrip/AboutStrip';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './AboutWork.scss';

export default function AboutWork() {
  const { sectionNum, label } = SITE_CONTENT.aboutPage.work;
  const items = SITE_CONTENT.portfolio.items;

  return (
    <section className="about-work" aria-labelledby="about-work-title">
      <h2 id="about-work-title" className="about-work__sr">
        Selected work
      </h2>
      <AboutStrip index={sectionNum} label={label} />

      <ol className="about-work__list">
        {items.map((item) => (
          <li key={item.id} className="about-work__row">
            <span className="about-work__index">{item.index}</span>
            <span className="about-work__client">{item.client}</span>
            <span className="about-work__service">{item.service}</span>
            <span className="about-work__industry">{item.industry}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
