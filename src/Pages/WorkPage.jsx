import { useEffect } from 'react';
import Seo from '../Components/Common/Seo/Seo';
import AboutFaq from '../Components/AboutPage/AboutFaq/AboutFaq';
import WorkHero from '../Components/WorkPage/WorkHero/WorkHero';
import WorkGrid from '../Components/WorkPage/WorkGrid/WorkGrid';
import { useSectionTheme } from '../Context/SectionThemeContext';

const WORK_PAGE_THEME = {
  bgStart: '#ffffff',
  bgEnd: '#f5f5f5',
  text: '#1a1a1a',
  heading: '#0a0a0a',
};

export default function WorkPage() {
  const { setSectionTheme } = useSectionTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSectionTheme(WORK_PAGE_THEME);
  }, [setSectionTheme]);

  return (
    <>
      <Seo
        title="Work | Media247 Digital"
        description="Selected work from Media247 Digital. Campaigns, sites, and content, with the client and the job named on each one."
        path="/work"
      />
      <main>
        <div className="work-pin">
          <WorkHero />
          <WorkGrid />
        </div>
        <AboutFaq curtain="#ffffff" sectionNum="02" />
      </main>
    </>
  );
}
