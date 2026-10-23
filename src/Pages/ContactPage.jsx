import { useEffect } from 'react';
import Seo from '../Components/Common/Seo/Seo';
import AboutFaq from '../Components/AboutPage/AboutFaq/AboutFaq';
import ContactForm from '../Components/ContactPage/ContactForm/ContactForm';
import { useSectionTheme } from '../Context/SectionThemeContext';

const CONTACT_PAGE_THEME = {
  bgStart: '#111111',
  bgEnd: '#111111',
  text: '#ffffff',
  heading: '#ffffff',
};

export default function ContactPage() {
  const { setSectionTheme } = useSectionTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSectionTheme(CONTACT_PAGE_THEME);
  }, [setSectionTheme]);

  return (
    <>
      <Seo
        title="Contact | Media247 Digital"
        description="Tell Media247 Digital the job. The reply comes from contact@media247.digital."
        path="/contact"
      />
      <main>
        <ContactForm />
        <AboutFaq curtain="#111111" sectionNum="01" />
      </main>
    </>
  );
}
