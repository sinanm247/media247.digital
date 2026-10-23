import { useRef } from 'react';
import AboutStrip from '../AboutStrip/AboutStrip';
import { useInclineReveal } from '../../../Hooks/useInclineReveal';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './AboutProcess.scss';

const featureImage = THEME_ASSETS['theme-1'].images.image1;

export default function AboutProcess() {
  const sectionRef = useRef(null);
  const { sectionNum, label, statement, scopeLabel, steps } = SITE_CONTENT.aboutPage.process;
  useInclineReveal(sectionRef);

  return (
    <section ref={sectionRef} className="about-process" aria-labelledby="about-process-title">
      <AboutStrip index={sectionNum} label={label} />

      <h2 id="about-process-title" className="about-process__statement">
        {statement}
      </h2>

      <figure className="about-process__media">
        <img
          src={featureImage}
          alt="Media247 Digital campaign work"
          className="about-process__media-img"
        />
      </figure>

      <ol className="about-process__list">
        {steps.map((step) => (
          <li key={step.id} className="about-process__step">
            <span className="about-process__index">{step.index}</span>

            <h3 className="about-process__title">{step.title}</h3>

            <div className="about-process__scope">
              <p className="about-process__text">{step.text}</p>
              <p className="about-process__scope-label">{scopeLabel}</p>
              <ul>
                {step.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
