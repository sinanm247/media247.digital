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

  contactPage: {
    title: 'Get In Touch',
    intro: 'Tell us the job. We reply from contact@media247.digital.',
    submit: 'Submit',
    email: 'contact@media247.digital',
    categoryPlaceholder: 'Select',
    emailPlaceholder: 'name@company.com',
    messagePlaceholder: 'The offer, the channel, and when you need a number.',
  },

  projectCard: {
    kicker: 'Start a project',
    title: 'contact@media247.digital',
    role: 'New business',
    path: '/contact',
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

  aboutPage: {
    hero: {
      headline: 'We Are Here',
      label: '(The Agency)',
      captionLine1: 'Media, creative, and the number behind them.',
      captionLine2: 'Based in Dubai. Measured on what comes back.',
    },

    process: {
      sectionNum: '01',
      label: 'Process',
      statement:
        'A digital agency with an offline advantage, and no patience for a campaign that cannot defend its numbers.',
      scopeLabel: 'In scope',
      steps: [
        {
          id: 'diagnose',
          index: '001',
          title: 'Diagnose',
          text: 'Nothing is recommended until we know what a lead is worth, and where the current spend actually goes.',
          scope: [
            'Account and spend review',
            'Offer, audience, and tracking check',
            'A target agreed before launch',
          ],
        },
        {
          id: 'build',
          index: '002',
          title: 'Build',
          text: 'Media, creative, and the path after the click are planned as one job. The ending is a page or a WhatsApp thread, picked for how the buyer already acts.',
          scope: [
            'Campaign structure and creative',
            'Landing path, in one language or two',
            'Tracking that matches the report',
          ],
        },
        {
          id: 'adjust',
          index: '003',
          title: 'Adjust',
          text: 'The number is read while the budget is still live. Spend moves, weak cuts come out, and the close report says what to repeat.',
          scope: [
            'Weekly read of cost and return',
            'Changes while the flight is running',
            'A close report with the next move',
          ],
        },
      ],
    },

    figures: {
      sectionNum: '02',
      label: 'Record',
      items: [
        {
          id: 'brands',
          stat: '100+',
          title: 'Brands scaled',
          text: 'Accounts taken from a brief to a number we can put in front of you.',
        },
        {
          id: 'success',
          stat: '98%',
          title: 'Hit the agreed target',
          text: 'Campaigns that reached the figure set before the first dirham was spent.',
        },
        {
          id: 'cpl',
          stat: '40%',
          title: 'Lower cost per lead',
          text: 'Up to 40% lower when the path goes to WhatsApp instead of a form.',
        },
        {
          id: 'engagement',
          stat: '3×',
          title: 'Engagement, two languages',
          text: 'What bilingual content has returned against a single-language cut.',
        },
      ],
    },

    team: {
      sectionNum: '02',
      label: 'Meet Our Team',
      members: [
        { id: 'ahmed', name: 'Ahmed Zaher', role: 'Head of Digital' },
        { id: 'sanal', name: 'Sanal Nambiar', role: 'Digital Operations Manager' },
        { id: 'reynold', name: 'Reynold Francis', role: 'Sales Manager' },
        { id: 'sadik', name: 'Sadik Shaik', role: 'Performance Marketing' },
        { id: 'mizna', name: 'Mizna Ansudeen T.', role: 'Social Media Manager' },
        { id: 'sinan', name: 'Mohamed Sinan', role: 'Web Developer' },
        { id: 'sierra', name: 'Sierra Raj', role: 'Graphic Designer' },
        { id: 'john', name: 'John Kenneth dela Cruz', role: 'Videographer' },
        { id: 'yupar', name: 'Yupar Yone Oo', role: 'Social Media Account Manager' },
      ],
    },

    work: {
      sectionNum: '03',
      label: 'Selected work',
    },

    faq: {
      sectionNum: '04',
      label: 'Questions',
      showreel: 'Play showreel',
      items: [
        {
          id: 'timing',
          question: 'How soon is there a number we can use?',
          answer:
            'We ask for 60 to 90 days. Inside that window you get a figure you can act on, or a direct recommendation to stop.',
        },
        {
          id: 'inhouse',
          question: 'What if a marketer already sits in-house?',
          answer:
            'We can work beside that person. Media, tracking, and the report can sit with us, without replacing a team that already covers part of the job.',
        },
        {
          id: 'single',
          question: 'Can you take one project, not a retainer?',
          answer:
            'Yes. A site, a launch flight, or a single content run. The same rule holds: the target is agreed before the work starts.',
        },
        {
          id: 'channels',
          question: 'Which channels do you actually run?',
          answer:
            'Content, paid social, Google, programmatic, SEO, and the site the traffic lands on. A channel that does not connect to the target does not get added.',
        },
        {
          id: 'miss',
          question: 'What happens when a campaign is missing?',
          answer:
            'We change it while it is live, or we stop it. The budget is not left to run out so the miss can be explained afterwards.',
        },
      ],
    },
  },
};
