import Seo from '../Components/Common/Seo/Seo';
import HomeHero from '../Components/HomePage/HomeHero/HomeHero';
import HomeAbout from '../Components/HomePage/HomeAbout/HomeAbout';
import HomePortfolio from '../Components/HomePage/HomePortfolio/HomePortfolio';
import HomeServices from '../Components/HomePage/HomeServices/HomeServices';
import HomeCta from '../Components/HomePage/HomeCta/HomeCta';
import HomeStats from '../Components/HomePage/HomeStats/HomeStats';
import ContactForm from '../Components/ContactPage/ContactForm/ContactForm';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Media247 Digital | Data-Driven Digital Marketing Agency"
        description="Media247 Digital is a leading digital marketing agency specialising in performance marketing, social media, content creation, SEO, programmatic ads, and website development."
        path="/"
      />
      <main>
        <HomeHero />
        <HomeAbout />
        <HomePortfolio />
        <HomeServices />
        <HomeStats />
        <HomeCta />
        <ContactForm withNav={false} />
      </main>
    </>
  );
}
