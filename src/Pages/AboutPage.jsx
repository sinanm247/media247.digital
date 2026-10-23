import { useEffect } from 'react';
import Seo from '../Components/Common/Seo/Seo';
import AboutHero from '../Components/AboutPage/AboutHero/AboutHero';
import AboutProcess from '../Components/AboutPage/AboutProcess/AboutProcess';
import AboutTeam from '../Components/AboutPage/AboutTeam/AboutTeam';
import AboutFigures from '../Components/AboutPage/AboutFigures/AboutFigures';
import AboutWork from '../Components/AboutPage/AboutWork/AboutWork';
import AboutFaq from '../Components/AboutPage/AboutFaq/AboutFaq';
import { useSectionTheme } from '../Context/SectionThemeContext';

const ABOUT_PAGE_THEME = {
  bgStart: '#ffffff',
  bgEnd: '#f5f5f5',
  text: '#1a1a1a',
  heading: '#0a0a0a',
};

export default function AboutPage() {
  const { setSectionTheme } = useSectionTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSectionTheme(ABOUT_PAGE_THEME);
  }, [setSectionTheme]);

  return (
    <>
      <Seo
        title="About | Media247 Digital"
        description="Media247 Digital is a performance marketing agency in Dubai. Strategy, media, creative, and reporting, measured on the number agreed before launch."
        path="/about"
      />
      <main>
        <div className="about-pin">
          <AboutHero />
          <AboutProcess />
        </div>
        <AboutTeam />
        {/* <AboutFigures /> */}
        {/* <AboutWork /> */}
        <AboutFaq />
      </main>
    </>
  );
}
