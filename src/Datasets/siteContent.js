// All image / asset references have been moved to themeAssets.js.
// This file contains only text-based site content.

export const SITE_CONTENT = {
  portfolio: {
    sectionNum: '02',
    displayLine1: 'WRK.',
    displayLine2: "24'",
    description: 'The work, with the numbers still in it.',
    cta: 'View All Work',
    seeAllCount: '07',
    items: [
      {
        id: 'content-creation',
        index: '01',
        service: 'Content Creation',
        client: 'Chaima Holdings',
        industry: 'Real Estate',
      },
      {
        id: 'google-ads',
        index: '02',
        service: 'Google Ads',
        client: 'NML Hair Care',
        industry: 'Beauty & Personal Care',
      },
      {
        id: 'performance-marketing',
        index: '03',
        service: 'Performance Marketing',
        client: 'Media247 Digital',
        industry: 'Digital Marketing',
      },
      {
        id: 'programmatic-ads',
        index: '04',
        service: 'Programmatic Ads',
        client: 'NML Hair Care',
        industry: 'Beauty & Personal Care',
      },
      {
        id: 'seo',
        index: '05',
        service: 'SEO',
        client: 'Media247',
        industry: 'Digital Agency',
      },
      {
        id: 'social-media-management',
        index: '06',
        service: 'Social Media Management',
        client: 'XReal, Hoka, Stamn One',
        industry: 'Lifestyle & Sports',
      },
      {
        id: 'website-development',
        index: '07',
        service: 'Website Development',
        client: 'Orange Advertising',
        industry: 'Advertising Agency',
      },
    ],
  },

  about: {
    sectionNum: '01',
    heading:
      "A digital agency with an offline advantage and zero patience for campaigns that can't defend their numbers.",
    rows: [
      {
        id: 'strategy',
        tag: 'Strategy',
        text: "Diagnosis before prescription. We won't recommend a thing until we know exactly where the money is going and why.",
      },
      {
        id: 'execution',
        tag: '+Execution',
        text: 'Paid media, funnels, creative, tracking. All of it running together, all of it pointed at the same outcome.',
      },
      {
        id: 'results',
        tag: '=Results',
        stats: [
          { label: 'Brands Scaled',        value: '100+' },
          { label: 'Campaign Success Rate', value: '98%'  },
        ],
      },
    ],
    cta: 'Explore Our Work',
    // clients array is now sourced from THEME_ASSETS[theme].clients
  },

  hero: {
    headline: 'We Help Brands Scale',
    subheadline: 'A performance marketing agency with an offline advantage built in.',
    description:
      'Our digital marketing agency specializes in creating targeted and effective social, google & programmatic advertising as well as social media strategy & content creation to help our clients reach their maximum online potential.',
  },

  mission: {
    heading: 'Our Mission',
    body: 'Our ultimate mission and drive, is to compose and conduct groundbreaking digital marketing strategies in order to break through your limitations as a company and boost your potential, minimize your risk of failing and in the end increase your turn over.',
  },

  vision: {
    heading: 'Our Vision',
    body: 'Media247 Digital will be a leading force in marketing for all businesses. Our marketing expertise makes us a trusted resource for digital, brand, media, direct marketing, strategy and event marketing, among clients looking to expand and evolve their marketing.',
  },

  process: {
    heading: 'Every Smart Step',
    body: 'Our process begins with a deep dive into client goals during the onboarding phase. We then craft a tailored strategy, develop culturally resonant creatives, and execute campaigns across chosen platforms. Throughout, we closely monitor performance, making real-time adjustments to optimize results. Finally, we analyze the outcomes, providing insights and recommendations for future campaigns.',
  },

  services: {
    sectionNum: '03',
    introBold: 'The full stack of what we offer,',
    introFade: 'broken down.',
    list: [
      {
        id: 'content-creation',
        index: '01',
        title: 'Content Creation',
        subtitle: 'Creative Strategy',
        description:
          "Content that has a reason to exist beyond filling a calendar. We build it around what your audience is actually doing — not simply what the algorithm rewarded last month. If it doesn't connect to a conversion, we'll tell you before we make it.",
      },
      {
        id: 'performance-marketing',
        index: '02',
        title: 'Performance Marketing',
        subtitle: 'Paid Media & ROI',
        description:
          "We buy media with a number in mind — your cost per lead, your ROAS, your payback period. Every campaign launches with a ceiling and a kill date. We don't wait for the budget to run out before making a call.",
      },
      {
        id: 'social-media-management',
        index: '03',
        title: 'Social Media Management',
        subtitle: 'Community & Growth',
        description:
          'Consistent, considered, and always pointed at something commercial. We manage your presence so it works alongside your paid activity, not independently of it.',
      },
      {
        id: 'seo',
        index: '04',
        title: 'SEO',
        subtitle: 'Organic Visibility',
        description:
          "The kind of traffic that compounds. We work on what actually moves rankings — technical foundations, content that earns authority, and the search terms your buyers are using when they're ready to act.",
      },
      {
        id: 'website-development',
        index: '05',
        title: 'Website Development',
        subtitle: 'Digital Presence',
        description:
          "Built to convert, not just to look good at the pitch. Every page we build has a job, and we measure whether it's doing it.",
      },
      {
        id: 'programmatic-ads',
        index: '06',
        title: 'Programmatic Ads',
        subtitle: 'Audience Targeting',
        description:
          "Your audience, found across the internet in real time, based on what they actually do — not just what they search. We target the right attention at the right moment, and we're specific about what that costs.",
      },
      // {
      //   id: 'google-ads',
      //   index: '07',
      //   title: 'Google Ads',
      //   subtitle: 'Search & Display',
      //   description:
      //     'High-intent search, handled properly. We go after the terms that signal a buyer, and we manage bids, copy, and landing pages as one system — not three separate jobs.',
      // },
    ],
  },

  stats: {
    sectionNum: '04',
    label: 'Stats',
    items: [
      {
        stat: '40%',
        title: 'Lower Cost Per Lead',
        description:
          'Up to 40% lower cost per lead when we route to WhatsApp instead of a form.',
      },
      {
        stat: '60-90',
        unit: 'Days',
        title: 'Days to Real Results',
        description:
          '60–90 days is how long we need to show you a real number, or tell you to walk.',
      },
      {
        stat: '3×',
        title: 'More Engagement',
        description:
          '3× the engagement when content runs bilingual instead of single-language.',
      },
      {
        stat: '1,500+',
        title: 'Agencies in This Market',
        description:
          "1,500+ agencies in this market. We're not trying to look like the other 1,499.",
      },
    ],
  },

  footer: {
    tagline: "Let's figure out what's working for your brand.",
    email: 'hello@media247.digital',
    cta: 'Contact Now',
    ctaPath: '/contact',
    wordmarkA: 'MEDIA247',
    wordmarkB: 'DIGITAL',
  },

  cta: {
    headingLeft: 'Scale Your',
    headingRight: 'Brand.',
    tagline: "Let's build your digital strategy together.",
    cta: 'Get In Touch',
    ctaPath: '/contact',
  },
};
