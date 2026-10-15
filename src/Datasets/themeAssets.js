// ─────────────────────────────────────────────────────────────────────────────
// Theme-1 Assets
// ─────────────────────────────────────────────────────────────────────────────

// Banners
import t1Banner1     from '../assets/Theme-1/Banners/Banner-1.webp';
import t1Banner2     from '../assets/Theme-1/Banners/Banner-2.webp';
import t1Banner3     from '../assets/Theme-1/Banners/Banner-3.webp';
import t1BannerVideo from '../assets/Theme-1/Banners/Banner-Video.mp4';

// Services
import t1SvcContentCreation      from '../assets/Theme-1/Services/Content-Creation.webp';
import t1SvcPerformanceMarketing from '../assets/Theme-1/Services/Performance-Marketing.webp';
import t1SvcSocialMedia          from '../assets/Theme-1/Services/Social-Media-Managament.webp';
import t1SvcSeo                  from '../assets/Theme-1/Services/SEO.webp';
import t1SvcWebDev               from '../assets/Theme-1/Services/Website-Development.webp';
import t1SvcProgrammatic         from '../assets/Theme-1/Services/Programatic-Ads.webp';
import t1SvcGoogleAds            from '../assets/Theme-1/Services/Google-Ads.webp';

// Clients
import t1Client1  from '../assets/Theme-1/Clients/Logo-1.png';
import t1Client2  from '../assets/Theme-1/Clients/Logo-2.png';
import t1Client3  from '../assets/Theme-1/Clients/Logo-3.png';
import t1Client4  from '../assets/Theme-1/Clients/Logo-4.png';
import t1Client5  from '../assets/Theme-1/Clients/Logo-5.png';
import t1Client6  from '../assets/Theme-1/Clients/Logo-6.png';
import t1Client7  from '../assets/Theme-1/Clients/Logo-7.png';
import t1Client8  from '../assets/Theme-1/Clients/Logo-8.png';
import t1Client9  from '../assets/Theme-1/Clients/Logo-9.png';
import t1Client10 from '../assets/Theme-1/Clients/Logo-10.png';
import t1Client11 from '../assets/Theme-1/Clients/Logo-11.png';
import t1Client12 from '../assets/Theme-1/Clients/Logo-12.png';
import t1Client13 from '../assets/Theme-1/Clients/Logo-13.png';
import t1Client14 from '../assets/Theme-1/Clients/Logo-14.png';

// Images
import t1Image1 from '../assets/Theme-1/Images/Image-1.webp';
import t1Image2 from '../assets/Theme-1/Images/Image-2.webp';

// Logo
import t1Logo      from '../assets/Theme-1/Logo/M247D-Logo.png';
import t1LogoWhite from '../assets/Theme-1/Logo/M247D-Logo-White.png';

// Portfolio — one image per service
import t1PfContentCreation      from '../assets/Theme-1/Portfolio/Content-Creation-1.webp';
import t1PfGoogleAds            from '../assets/Theme-1/Portfolio/Google-Ads-1.webp';
import t1PfPerformanceMarketing from '../assets/Theme-1/Portfolio/Performance-Marketing-1.webp';
import t1PfProgrammaticAds      from '../assets/Theme-1/Portfolio/Programmatic-Ads-1.webp';
import t1PfSeo                  from '../assets/Theme-1/Portfolio/SEO-1.webp';
import t1PfSocialMedia          from '../assets/Theme-1/Portfolio/Social-Media-1.webp';
import t1PfWebsiteDev           from '../assets/Theme-1/Portfolio/Website-Development-1.webp';
import t1PortfolioAll           from '../assets/Theme-1/Portfolio/Content-Creation-2.webp';

// ─────────────────────────────────────────────────────────────────────────────
// Theme-2 Assets
// ─────────────────────────────────────────────────────────────────────────────

// Banners
import t2Banner1     from '../assets/Theme-2/Banners/Banner-1.webp';
import t2Banner2     from '../assets/Theme-2/Banners/Banner-2.webp';
import t2BannerVideo from '../assets/Theme-2/Banners/Banner-Video.mp4';

// Services
import t2SvcContentCreation      from '../assets/Theme-2/Services/Content-Creation.webp';
import t2SvcPerformanceMarketing from '../assets/Theme-2/Services/Performance-Marketing.webp';
import t2SvcSocialMedia          from '../assets/Theme-2/Services/Social-Media-Managament.webp';
import t2SvcSeo                  from '../assets/Theme-2/Services/SEO.webp';
import t2SvcWebDev               from '../assets/Theme-2/Services/Website-Development.webp';
import t2SvcProgrammatic         from '../assets/Theme-2/Services/Programatic-Ads.webp';
import t2SvcGoogleAds            from '../assets/Theme-2/Services/Google-Ads.webp';

// Clients
import t2Client1  from '../assets/Theme-2/Clients/Logo-1.png';
import t2Client2  from '../assets/Theme-2/Clients/Logo-2.png';
import t2Client3  from '../assets/Theme-2/Clients/Logo-3.png';
import t2Client4  from '../assets/Theme-2/Clients/Logo-4.png';
import t2Client5  from '../assets/Theme-2/Clients/Logo-5.png';
import t2Client6  from '../assets/Theme-2/Clients/Logo-6.png';
import t2Client7  from '../assets/Theme-2/Clients/Logo-7.png';
import t2Client8  from '../assets/Theme-2/Clients/Logo-8.png';
import t2Client9  from '../assets/Theme-2/Clients/Logo-9.png';
import t2Client10 from '../assets/Theme-2/Clients/Logo-10.png';
import t2Client11 from '../assets/Theme-2/Clients/Logo-11.png';
import t2Client12 from '../assets/Theme-2/Clients/Logo-12.png';
import t2Client13 from '../assets/Theme-2/Clients/Logo-13.png';
import t2Client14 from '../assets/Theme-2/Clients/Logo-14.png';

// Images
import t2Image1 from '../assets/Theme-2/Images/Image-1.webp';
import t2Image2 from '../assets/Theme-2/Images/Image-2.webp';

// Logo
import t2Logo      from '../assets/Theme-2/Logo/M247D-Logo.png';
import t2LogoWhite from '../assets/Theme-2/Logo/M247D-Logo-White.png';

// Portfolio — Theme-2 shares the same work images as Theme-1
import t2PortfolioAll from '../assets/Theme-2/Portfolio/Portfolio-All.webp';

// ─────────────────────────────────────────────────────────────────────────────
// Structured export — keyed by theme id
// ─────────────────────────────────────────────────────────────────────────────

export const THEME_ASSETS = {
  'theme-1': {
    // Hero banner (the one shown on the hero section)
    heroBanner: t1Banner1,

    banners: {
      banner1: t1Banner1,
      banner2: t1Banner2,
      banner3: t1Banner3,
      video:   t1BannerVideo,
    },

    // Keyed by service id (matches siteContent.js service ids)
    services: {
      'content-creation':      t1SvcContentCreation,
      'performance-marketing': t1SvcPerformanceMarketing,
      'social-media-management': t1SvcSocialMedia,
      'seo':                   t1SvcSeo,
      'website-development':   t1SvcWebDev,
      'programmatic-ads':      t1SvcProgrammatic,
      'google-ads':            t1SvcGoogleAds,
    },

    clients: [
      t1Client1,  t1Client2,  t1Client3,  t1Client4,
      t1Client5,  t1Client6,  t1Client7,  t1Client8,
      t1Client9,  t1Client10, t1Client11, t1Client12,
      t1Client13, t1Client14,
    ],

    images: {
      image1: t1Image1,
      image2: t1Image2,
    },

    logo: {
      main:  t1Logo,
      white: t1LogoWhite,
    },

    // Keyed by portfolio item id (matches siteContent.js portfolio item ids)
    portfolio: {
      'content-creation':        { src: t1PfContentCreation,      type: 'image' },
      'google-ads':              { src: t1PfGoogleAds,            type: 'image' },
      'performance-marketing':   { src: t1PfPerformanceMarketing, type: 'image' },
      'programmatic-ads':        { src: t1PfProgrammaticAds,      type: 'image' },
      'seo':                     { src: t1PfSeo,                  type: 'image' },
      'social-media-management': { src: t1PfSocialMedia,          type: 'image' },
      'website-development':     { src: t1PfWebsiteDev,           type: 'image' },
      all:                       t1PortfolioAll,
    },
  },

  'theme-2': {
    // Hero banner
    heroBanner: t2Banner1,

    banners: {
      banner1: t2Banner1,
      banner2: t2Banner2,
      video:   t2BannerVideo,
    },

    services: {
      'content-creation':        t2SvcContentCreation,
      'performance-marketing':   t2SvcPerformanceMarketing,
      'social-media-management': t2SvcSocialMedia,
      'seo':                     t2SvcSeo,
      'website-development':     t2SvcWebDev,
      'programmatic-ads':        t2SvcProgrammatic,
      'google-ads':              t2SvcGoogleAds,
    },

    clients: [
      t2Client1,  t2Client2,  t2Client3,  t2Client4,
      t2Client5,  t2Client6,  t2Client7,  t2Client8,
      t2Client9,  t2Client10, t2Client11, t2Client12,
      t2Client13, t2Client14,
    ],

    images: {
      image1: t2Image1,
      image2: t2Image2,
    },

    logo: {
      main:  t2Logo,
      white: t2LogoWhite,
    },

    // Theme-2 uses the same work images (portfolio = actual client work, not theme-specific)
    portfolio: {
      'content-creation':        { src: t1PfContentCreation,      type: 'image' },
      'google-ads':              { src: t1PfGoogleAds,            type: 'image' },
      'performance-marketing':   { src: t1PfPerformanceMarketing, type: 'image' },
      'programmatic-ads':        { src: t1PfProgrammaticAds,      type: 'image' },
      'seo':                     { src: t1PfSeo,                  type: 'image' },
      'social-media-management': { src: t1PfSocialMedia,          type: 'image' },
      'website-development':     { src: t1PfWebsiteDev,           type: 'image' },
      all:                       t2PortfolioAll,
    },
  },
};
