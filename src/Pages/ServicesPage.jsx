import { useEffect } from 'react';
import Seo from '../Components/Common/Seo/Seo';
import AboutFaq from '../Components/AboutPage/AboutFaq/AboutFaq';
import ServicesHero from '../Components/ServicesPage/ServicesHero/ServicesHero';
import ServicesList from '../Components/ServicesPage/ServicesList/ServicesList';
import { useSectionTheme } from '../Context/SectionThemeContext';

const SERVICES_PAGE_THEME = {
  bgStart: '#111111',
  bgEnd: '#111111',
  text: '#ffffff',
  heading: '#ffffff',
};

export default function ServicesPage() {
  const { setSectionTheme } = useSectionTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSectionTheme(SERVICES_PAGE_THEME);
  }, [setSectionTheme]);

  return (
    <>
      <Seo
        title="Services | Media247 Digital"
        description="Content, paid media, social, SEO, programmatic, and the site the traffic lands on. Media247 Digital, Dubai."
        path="/services"
      />
      <main>
        <div className="services-pin">
          <ServicesHero />
          <ServicesList />
        </div>
        <AboutFaq curtain="#111111" sectionNum="02" />
      </main>
    </>
  );
}
