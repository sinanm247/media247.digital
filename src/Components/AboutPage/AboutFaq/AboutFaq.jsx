import { useEffect, useRef, useState } from 'react';
import AboutStrip from '../AboutStrip/AboutStrip';
import { useInclineReveal } from '../../../Hooks/useInclineReveal';
import { useTheme } from '../../../Context/ThemeContext';
import { THEME_ASSETS } from '../../../Datasets/themeAssets';
import { SITE_CONTENT } from '../../../Datasets/siteContent';
import './AboutFaq.scss';

export default function AboutFaq({ curtain = '#111111', sectionNum, label }) {
  const faq = SITE_CONTENT.aboutPage.faq;
  const { showreel, items } = faq;
  const stripIndex = sectionNum || faq.sectionNum;
  const stripLabel = label || faq.label;
  const { theme } = useTheme();
  const videoSrc = THEME_ASSETS[theme].banners.video;
  const showreelImage = THEME_ASSETS['theme-2'].heroBanner;
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const [openId, setOpenId] = useState(null);
  useInclineReveal(sectionRef);

  const openShowreel = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const video = dialog.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  // Dialogs sit in the top layer, so React's root click listener never sees
  // the close control. Listen on the dialog element itself.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const stopVideo = () => {
      const video = dialog.querySelector('video');
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    };

    const onClick = (event) => {
      const closer = event.target.closest?.('.about-faq__close');
      if (event.target !== dialog && !closer) return;
      stopVideo();
      if (dialog.open) dialog.close();
    };

    dialog.addEventListener('click', onClick);
    dialog.addEventListener('close', stopVideo);
    return () => {
      dialog.removeEventListener('click', onClick);
      dialog.removeEventListener('close', stopVideo);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-faq"
      style={{ '--faq-curtain': curtain }}
      aria-labelledby="about-faq-title"
    >
      <h2 id="about-faq-title" className="about-faq__sr">
        Questions
      </h2>
      <AboutStrip index={stripIndex} label={stripLabel} />

      <div className="about-faq__layout">
        <button
          type="button"
          className="about-faq__play"
          onClick={openShowreel}
          aria-label={showreel}
        >
          <span className="about-faq__poster">
            <img src={showreelImage} alt="" className="about-faq__poster-img" />
          </span>
          <span className="about-faq__meta">
            <span className="about-faq__play-label">
              <span className="about-faq__triangle" aria-hidden="true" />
              Play
            </span>
            <span className="about-faq__showreel">Showreel</span>
          </span>
        </button>

        <div className="about-faq__list">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `about-faq-${item.id}`;

            return (
              <div key={item.id} className={`about-faq__item${isOpen ? ' is-open' : ''}`}>
                <h3 className="about-faq__heading">
                  <button
                    type="button"
                    className="about-faq__question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="about-faq__mark" aria-hidden="true">
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>
                </h3>
                <div id={panelId} className="about-faq__panel" role="region">
                  <div className="about-faq__panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <dialog ref={dialogRef} className="about-faq__dialog">
        <video
          className="about-faq__video"
          src={videoSrc}
          poster={showreelImage}
          controls
          playsInline
        />
        <button type="button" className="about-faq__close">
          Close
        </button>
      </dialog>
    </section>
  );
}
