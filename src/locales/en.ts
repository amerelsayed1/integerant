export default {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    process: 'Process',
    contact: 'Contact',
    getStarted: 'Get Started',
  },
  hero: {
    badge: 'Custom Software for Egypt & GCC',
    titleBefore: 'Software Development ',
    titleHighlight: 'Company',
    titleAfter: ' for Startups & Growing Businesses',
    subtitle:
      'We build custom web platforms, mobile apps, SaaS systems, dashboards, and business automation tools for companies in Egypt and the GCC.',
    cta: 'Book a Free Consultation',
    services: 'View Our Work',
    deployed: 'Deployed',
  },
  about: {
    label: 'Who We Are',
    title: 'About Integerant',
    p1: 'Integerant provides end-to-end software solutions, system design, and consulting services tailored for businesses and startups in Egypt and the GCC. We combine technical expertise with strategic thinking to deliver products that drive growth.',
    p2: "Our team works closely with clients to understand their unique challenges and build solutions that scale. Whether you're launching a new product or modernizing existing systems, we bring the right mix of engineering skill and business insight to every engagement.",
    stats: {
      projects: 'Projects Delivered',
      clients: 'Happy Clients',
      years: 'Years of Experience',
    },
  },
  services: {
    label: 'What We Do',
    title: 'Our Services',
    subtitle:
      'Comprehensive software solutions to help your business grow and succeed in the digital landscape.',
    learnMore: 'Learn more',
    viewAll: 'View all services',
    caseStudies: 'See case studies',
    items: {
      'web-development': {
        title: 'Web Development',
        tagline: 'Modern web applications built for performance and scale',
        description:
          'We design and develop responsive, high-performance web applications using modern frameworks and best practices. From interactive single-page applications to complex enterprise platforms, we deliver solutions that are fast, accessible, and built to grow with your business.',
        ctaText: 'Start Your Web Project',
        problems: [
          "Outdated website that doesn't reflect your brand or convert visitors",
          'Slow page load times driving users away',
          'Poor mobile experience losing potential customers',
          'Difficulty managing and updating content',
          'Lack of integration with business tools and APIs',
          'Security vulnerabilities in legacy systems',
        ],
        useCases: [
          {
            title: 'E-Commerce Platform',
            description:
              'A startup needed a fast, SEO-optimized storefront with real-time inventory management and payment processing.',
          },
          {
            title: 'Client Portal',
            description:
              'A consulting firm required a secure portal for clients to access reports, schedule meetings, and manage documents.',
          },
          {
            title: 'Internal Dashboard',
            description:
              'A logistics company needed a real-time dashboard to track shipments, manage routes, and generate analytics.',
          },
        ],
      },
      'mobile-development': {
        title: 'Mobile App Development',
        tagline: 'Native and cross-platform apps that users love',
        description:
          'We build mobile applications for iOS and Android that deliver seamless, intuitive experiences. Whether you need a native app for maximum performance or a cross-platform solution for faster time-to-market, we craft mobile products that engage users and drive business results.',
        ctaText: 'Build Your Mobile App',
        problems: [
          'No mobile presence in an increasingly mobile-first world',
          'Existing app is slow, buggy, or outdated',
          'Need to reach users on both iOS and Android efficiently',
          'Poor user engagement and high uninstall rates',
          'Difficulty integrating mobile with existing backend systems',
          'App store rejection due to quality or compliance issues',
        ],
        useCases: [
          {
            title: 'Fitness Tracking App',
            description:
              'A health startup needed a cross-platform app with workout tracking, social features, and wearable device integration.',
          },
          {
            title: 'Field Service App',
            description:
              'A maintenance company required an offline-capable app for technicians to log work orders and capture signatures.',
          },
          {
            title: 'Marketplace App',
            description:
              'A local marketplace needed a mobile app with real-time messaging, payments, and location-based search.',
          },
        ],
      },
      'saas-development': {
        title: 'SaaS Development',
        tagline: 'Scalable platforms designed for growth and reliability',
        description:
          'We architect and build SaaS platforms from the ground up — multi-tenant, secure, and designed to scale. From subscription management to user onboarding, we handle the complex infrastructure so you can focus on delivering value to your customers.',
        ctaText: 'Launch Your SaaS',
        problems: [
          'Validating a SaaS idea without burning through runway',
          'Scaling infrastructure as your user base grows',
          'Managing multi-tenant data isolation and security',
          'Building reliable subscription billing and user management',
          'Ensuring uptime and performance under load',
          'Migrating from a monolith to a modern SaaS architecture',
        ],
        useCases: [
          {
            title: 'Project Management Tool',
            description:
              'A startup needed an MVP with team workspaces, task boards, and real-time collaboration — launched in 12 weeks.',
          },
          {
            title: 'HR Platform',
            description:
              'An HR tech company required a multi-tenant platform with role-based access, payroll integration, and compliance reporting.',
          },
          {
            title: 'Analytics Dashboard',
            description:
              'A data company needed a white-label analytics platform that customers could embed in their own products.',
          },
        ],
      },
      consulting: {
        title: 'Technical Consulting',
        tagline: 'Expert guidance to make the right technology decisions',
        description:
          'Our consulting services help you navigate complex technical decisions with confidence. From architecture reviews and technology selection to team augmentation and process optimization, we bring senior-level expertise to ensure your project is set up for long-term success.',
        ctaText: 'Book a Consultation',
        problems: [
          'Uncertainty about which technology stack to choose',
          'Technical debt slowing down development velocity',
          "Architecture that won't scale with business growth",
          'Difficulty hiring or retaining senior engineering talent',
          'Lack of engineering best practices and processes',
          'Need for an unbiased technical assessment before a major investment',
        ],
        useCases: [
          {
            title: 'Pre-Seed Architecture Review',
            description:
              'A funded startup needed an architecture blueprint before hiring their first engineers — we delivered a complete technical roadmap.',
          },
          {
            title: 'Legacy Modernization',
            description:
              'A mid-size company needed a migration strategy to move from a monolithic PHP app to a modern microservices architecture.',
          },
          {
            title: 'CTO-as-a-Service',
            description:
              'A non-technical founder needed ongoing technical leadership to guide product development and manage an outsourced team.',
          },
        ],
      },
      'ui-ux': {
        title: 'UI/UX Design',
        tagline: 'Research-driven design that users love to interact with',
        description:
          'We create user interfaces that are beautiful, intuitive, and effective. Our design process is grounded in user research and iterative testing, ensuring every interaction serves a purpose. From wireframes to polished prototypes, we design experiences that convert.',
        ctaText: 'Improve Your UX',
        problems: [
          'Low conversion rates despite good traffic',
          'Users abandoning complex workflows or forms',
          'Inconsistent design across products and platforms',
          'No design system or component library',
          'Accessibility compliance requirements',
          'Need to redesign an existing product without disrupting users',
        ],
        useCases: [
          {
            title: 'SaaS Onboarding Redesign',
            description:
              'A SaaS company reduced churn by 35% after we redesigned their onboarding flow based on user session analysis.',
          },
          {
            title: 'Design System Creation',
            description:
              'A growing startup needed a scalable design system to ensure consistency across web and mobile products.',
          },
          {
            title: 'E-Commerce UX Audit',
            description:
              'An online retailer increased checkout completion by 28% after we identified and fixed key friction points.',
          },
        ],
      },
      support: {
        title: 'Maintenance & Support',
        tagline: 'Keep your systems running smoothly and evolving',
        description:
          "Software doesn't end at launch. We provide ongoing maintenance, monitoring, and support to keep your applications secure, performant, and up-to-date. From bug fixes and security patches to feature enhancements and infrastructure optimization, we're your long-term technology partner.",
        ctaText: 'Get Ongoing Support',
        problems: [
          'Production issues with no dedicated team to resolve them',
          'Security vulnerabilities in unpatched dependencies',
          'Performance degradation over time',
          'Need for ongoing feature development after initial launch',
          'Lack of monitoring and alerting for critical systems',
          'Previous development team is no longer available',
        ],
        useCases: [
          {
            title: 'Post-Launch Support',
            description:
              'A startup needed reliable ongoing support after their agency engagement ended — we took over with zero downtime.',
          },
          {
            title: 'Performance Rescue',
            description:
              'An app experiencing 10-second load times was optimized to under 2 seconds through database tuning and caching.',
          },
          {
            title: 'Security Hardening',
            description:
              'A fintech company needed a comprehensive security audit and remediation plan to meet compliance requirements.',
          },
        ],
      },
    },
  },
  process: {
    label: 'How We Work',
    title: 'Our Process',
    subtitle: 'A proven methodology that ensures quality delivery, every time.',
    steps: {
      discovery: { label: 'Step 1', title: 'Discovery', description: 'Understanding your vision, goals, and requirements' },
      planning: { label: 'Step 2', title: 'Planning', description: 'Defining scope, architecture, and project roadmap' },
      development: { label: 'Step 3', title: 'Development', description: 'Building your solution with agile methodology' },
      testing: { label: 'Step 4', title: 'Testing', description: 'Rigorous QA to ensure quality and reliability' },
      delivery: { label: 'Step 5', title: 'Delivery', description: 'Deploying your product and ensuring smooth launch' },
      support: { label: 'Step 6', title: 'Support', description: 'Ongoing maintenance and continuous improvement' },
    },
  },
  contact: {
    label: 'Contact',
    title: 'Get in Touch',
    subtitle: "Ready to start your project? Reach out and let's discuss how we can help bring your ideas to life.",
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      subjectPlaceholder: 'Project inquiry',
      messagePlaceholder: 'Tell us about your project...',
      send: 'Send Message',
    },
    company: {
      title: 'Integerant',
      desc: 'Custom software for startups and growing businesses in Egypt and the GCC. We build technology that matters.',
    },
    emailCard: {
      title: 'Email Us',
      response: 'We typically respond within 24 hours.',
    },
  },
  footer: {
    desc: 'Software solutions and consulting for startups and growing businesses. We turn ideas into scalable, reliable products.',
    quickLinks: 'Quick Links',
    services: 'Services',
    contact: 'Contact',
    rights: 'All rights reserved.',
    tagline: 'Software Solutions & Consulting',
    contactPrompt: "Have a project in mind? We'd love to hear about it. Drop us a line and we'll get back to you within 24 hours.",
  },
  clients: {
    label: 'Trusted by',
    title: 'Companies that ship with us',
  },
  whyUs: {
    label: 'Why Integerant',
    title: 'Built different, by design',
    subtitle: 'We work the way great engineering teams do — not the way agencies usually do.',
    items: [
      {
        title: 'End-to-end ownership',
        description: 'One team from discovery to deployment. No handoffs between design, dev, and QA — everyone is responsible for the full product.',
      },
      {
        title: 'Senior engineers only',
        description: 'Every engagement is led by experienced engineers. We do not use your project to train junior staff.',
      },
      {
        title: 'Startup-first speed',
        description: 'We know what runway means. We ship MVPs fast, validate early, and scale only what works.',
      },
      {
        title: 'Radical transparency',
        description: 'You get access to our project board, daily standups, and code. No black boxes, no surprises.',
      },
      {
        title: 'Outcomes, not output',
        description: 'We measure success by business results — retention, revenue, and uptime — not by lines of code shipped.',
      },
      {
        title: 'Arabic & English ready',
        description: 'Native bilingual support in every product we build. RTL, i18n, and locale-aware UX are first-class requirements.',
      },
    ],
  },
  testimonials: {
    label: 'What clients say',
    title: 'Heard from our clients',
    subtitle: 'Real results from real teams who trusted us with their most important projects.',
    items: [
      {
        quote: 'Integerant delivered our fleet tracking platform in 14 weeks with zero compromises on quality. Our on-time delivery jumped from 78% to 96% in the first quarter after launch.',
        author: 'Mohammed Al-Rashid',
        role: 'Operations Director',
        company: 'Apex Logistics',
      },
      {
        quote: 'They understood our investor deadline and worked backwards from it. We shipped to both app stores on time and closed our Series A two quarters ahead of plan.',
        author: 'Sarah Chen',
        role: 'CEO & Co-founder',
        company: 'PulseFit',
      },
      {
        quote: 'The migration was seamless — not a single customer noticed the transition. Our deploy time went from four hours to nine minutes and we passed SOC 2 within a year.',
        author: 'James Northfield',
        role: 'CTO',
        company: 'Northwind Bookkeeping',
      },
    ],
  },
  serviceDetail: {
    allServices: 'All Services',
    problemsLabel: 'Problems We Solve',
    problemsTitle: 'Is this you?',
    techLabel: 'Technologies & Tools',
    techTitle: 'What we work with',
    useCasesLabel: 'Example Use Cases',
    useCasesTitle: "How we've helped",
    ctaTitle: 'Ready to get started?',
    ctaSubtitle: "Let's discuss how our {service} services can help your business grow.",
    notFound: 'Service Not Found',
    notFoundDesc: "The service you're looking for doesn't exist.",
    backHome: 'Back to Home',
  },
  servicesPage: {
    heroTitle: 'Software development and consulting services for startups and growing businesses',
    heroSubtitle: 'We design, build, and maintain web, mobile, and SaaS products end-to-end. Our team pairs senior engineering with research-led design, so you get software that ships on time, scales with your growth, and is genuinely pleasant to use.',
    whyLabel: 'Why Integerant',
    whyTitle: 'What every engagement comes with',
    faqLabel: 'FAQ',
    faqTitle: 'Common questions about working with us',
    ctaTitle: 'Ready to scope your project?',
    ctaSubtitle: 'Tell us what you are building. We will reply within one business day with a discovery plan.',
    ctaCta: 'Start a conversation',
    learnMore: 'Learn more',
    valueProps: [
      'Senior engineers and designers — no junior handoffs',
      'Fixed-scope discovery before any code is written',
      'Weekly demos and full source ownership from day one',
      'Production-grade DevOps, testing, and monitoring as standard',
    ],
    faqs: [
      {
        q: 'How do engagements typically start?',
        a: 'Every project begins with a paid discovery sprint where we shape scope, architecture, and a fixed estimate before committing to delivery. You leave the sprint with a written plan you can take to any vendor.',
      },
      {
        q: 'Do you work fixed-price or time-and-materials?',
        a: 'Both. We default to a fixed-scope discovery and either a fixed-price build for well-defined work, or a weekly retainer for evolving products. We will recommend whichever fits the risk profile of your project.',
      },
      {
        q: 'Can you augment our existing engineering team?',
        a: 'Yes. We provide senior engineers, designers, and fractional CTOs who plug into your stand-ups, code reviews, and tooling. Most augmentation engagements run on three- or six-month rolling contracts.',
      },
      {
        q: 'What happens after a project launches?',
        a: 'You can take everything in-house, or we stay on for ongoing maintenance and feature work through our Maintenance & Support practice. We keep at least one engineer on every former project so we can pick work back up quickly.',
      },
    ],
  },
  projectsPage: {
    label: 'Our work',
    heroTitle: 'Selected case studies from products we have shipped',
    heroSubtitle: 'A small sample of the work we have delivered for startups and growing businesses across logistics, fintech, health, and B2B SaaS. Every case study includes the problem, our approach, and the measurable outcomes.',
    ctaTitle: 'Want to be the next case study?',
    ctaSubtitle: 'Tell us about your product. We will reply within one business day with a discovery plan.',
    ctaCta: 'Start a conversation',
    screensLabel: 'Inside the product',
    screensTitle: 'App screens',
    screensHint: 'Scroll to explore →',
    caseStudyLink: 'Case study',
    visitSiteLink: 'Visit site',
    allProjects: 'All projects',
    challengeLabel: 'The Challenge',
    challengeTitle: 'What {client} was up against',
    solutionLabel: 'Our Approach',
    solutionTitle: 'What we built',
    resultsLabel: 'Results',
    resultsTitle: 'What changed for the business',
    stackLabel: 'Stack & Services',
    stackTitle: 'Technology and services applied',
    techTitle: 'Technologies',
    servicesTitle: 'Services delivered',
    ctaDetailTitle: 'Have a project like this?',
    ctaDetailSubtitle: "We'd love to hear about it. Tell us what you're building and we'll reply within one business day.",
    notFound: 'Case Study Not Found',
    notFoundDesc: "The case study you're looking for doesn't exist.",
    backToProjects: 'Back to Projects',
  },
  projects: {
    items: {
      saferoute: {
        title: 'SafeRoute',
        heroHeadline: 'The Safety Navigation App That Keeps Your Community Informed',
        heroSubtitle: 'Discover safe routes, report hazards in seconds, and receive real-time alerts about incidents near you — all powered by your community.',
        summary: 'A real-time safety navigation platform that helps users discover and share safe routes, report hazards, and stay informed about local incidents.',
        contextSectionTitle: 'The Problem & Our Approach to Solving It',
        challengeTitle: 'The Problem',
        challengeBullets: [
          'Traditional map apps show routes but not safety conditions',
          'No reliable way to crowdsource and verify real-time hazard reports',
          'Emergency services had no civilian-facing situational awareness tool',
          'Existing safety apps lacked offline functionality and Arabic support',
        ],
        solutionTitle: 'Our Approach',
        solutionBullets: [
          'Built a community-powered hazard reporting system with instant verification',
          'Integrated real-time Mapbox layers for live incident visualisation',
          'Designed a one-tap report flow completed in under 20 seconds',
          'Added push alert subscriptions for routes users save and frequent',
          'Offline map caching so core features work without internet',
        ],
        featuresSectionLabel: 'KEY FEATURES',
        featuresSectionTitle: 'Core Features',
        featuresSectionSubtitle: 'Four screens that capture the SafeRoute experience — fast reporting, clear maps, and real-time community updates.',
        features: [
          { title: 'Live Hazard Map', description: 'Community-reported hazards and verified incidents shown as real-time pins on a live map.' },
          { title: 'Route Safety Score', description: 'Every route is scored on lighting, recent incidents, and community ratings before you set off.' },
          { title: 'Instant Alerts', description: 'Push notifications for incidents along your saved and frequently travelled routes.' },
          { title: 'Community Reporting', description: 'One-tap hazard reporting with photo upload and category selection — verified by locals.' },
          { title: 'Live Updates', description: 'Incident statuses update in real time as community members confirm or resolve reports.' },
          { title: 'City Coverage', description: 'Multi-city support with localised hazard categories and language settings per region.' },
        ],
        techSectionLabel: 'TECH STACK',
        techSectionTitle: 'Tools & Technologies',
        techSectionSubtitle: 'Cross-platform mobile built with React Native and Mapbox, backed by a Node.js real-time backend.',
        timelineSectionLabel: 'TIMELINE',
        timelineSectionTitle: 'Phases & Schedule',
        phases: [
          { title: 'Discovery & Research', description: 'User interviews with commuters and community safety coordinators, mapping hazard taxonomy and alert severity levels.' },
          { title: 'Design & Prototyping', description: 'High-fidelity Figma prototype with map UI, report flow, and alert centre — validated through three rounds of usability testing.' },
          { title: 'Build & Integration', description: 'React Native app with Mapbox GL, real-time WebSocket backend, push notifications, and offline map caching.' },
          { title: 'Launch & Monitoring', description: 'Staged rollout to iOS and Android, community seeding in two pilot cities, and two patch releases in the first month.' },
        ],
        stats: [
          { value: 'Offline · No ads', label: 'Mode' },
          { value: 'iOS · Android', label: 'Platform' },
          { value: '10K+', label: 'Active users' },
          { value: '★ 4.7', label: 'App rating' },
        ],
      },
      floosi: {
        title: 'Floosi',
        heroHeadline: 'Budget & Expense Tracker That Understands Your Financial Habits',
        heroSubtitle: 'Track all your income and expenses across multiple accounts, set smart budgets, and reach your financial goals — all without internet. Available in Arabic and English.',
        summary: 'A smart personal finance platform that helps users track spending, set budgets, and grow their savings through automated insights and goal tracking.',
        contextSectionTitle: 'The Problem & Our Approach to Solving It',
        challengeTitle: 'The Problem',
        challengeBullets: [
          'Users needed offline expense tracking without privacy trade-offs',
          'Most budgeting apps require constant internet and monetise user data',
          'Arabic speakers lacked a fully localised personal finance tool',
          'Manual entry workflows made consistent daily tracking difficult',
        ],
        solutionTitle: 'Our Approach',
        solutionBullets: [
          'Built fully offline-first with local SQLite — no server, no data collection',
          'Automatic transaction categorisation with smart defaults',
          'Full Arabic and English UI with seamless RTL/LTR switching',
          'Flexible recurring expense engine for subscriptions and regular bills',
          'Privacy-first: no account required, no ads, no tracking',
        ],
        featuresSectionLabel: 'KEY FEATURES',
        featuresSectionTitle: 'Core Features',
        featuresSectionSubtitle: 'Four screens that define the Floosi experience — fast, clear, and always offline.',
        features: [
          { title: 'Recurring Expenses', description: 'Set up repeating bills and subscriptions once — Floosi tracks them automatically every period.' },
          { title: 'Flexible Budgets', description: 'Create category budgets that adapt to your spending habits with visual progress indicators.' },
          { title: 'Tap to Track', description: 'Log any expense in seconds with a streamlined entry flow — built for speed, not complexity.' },
          { title: 'Arabic & English', description: 'Fully localised UI with seamless RTL/LTR switching. Works equally well in both languages.' },
          { title: 'Full Privacy', description: 'No account. No internet required. Your data stays on your device, always.' },
          { title: 'Account Management', description: 'Track multiple wallets and bank accounts in one unified balance view.' },
        ],
        techSectionLabel: 'TECH STACK',
        techSectionTitle: 'Tools & Technologies',
        techSectionSubtitle: 'Built with Flutter for a native feel on both iOS and Android, with a lightweight offline-first SQLite architecture.',
        timelineSectionLabel: 'TIMELINE',
        timelineSectionTitle: 'Phases & Schedule',
        phases: [
          { title: 'Discovery & User Research', description: 'Understanding pain points through 15+ user interviews with Arabic-speaking users, defining the core feature set and information architecture.' },
          { title: 'Design & Prototyping', description: 'Building a bilingual design system in Figma, user-testing three rounds of prototypes, and finalising the Arabic-first UI pattern.' },
          { title: 'Build — Android & iOS', description: 'Flutter development with offline SQLite, state management via Riverpod, and CI/CD on GitHub Actions targeting both platforms.' },
          { title: 'Launch & Post-Launch Support', description: 'Rolling out to Google Play then App Store, monitoring ratings and reviews, shipping two patch releases in the first four weeks.' },
        ],
        stats: [
          { value: 'Offline · No ads', label: 'Mode' },
          { value: 'English · Arabic', label: 'Languages' },
          { value: '10K+', label: 'Downloads' },
          { value: '★ 4.9', label: 'App rating' },
        ],
      },
      operix: {
        title: 'Operix',
        heroHeadline: 'All-in-One Business Finance Manager for Operations Teams',
        heroSubtitle: 'Invoicing, inventory, point of sale, and full double-entry accounting — all in one multi-tenant platform built for growing businesses.',
        summary: 'A multi-tenant business finance manager built for operations teams — covering invoicing, inventory, POS, and full double-entry accounting in one platform.',
        contextSectionTitle: 'The Problem & Our Approach to Solving It',
        challengeTitle: 'The Problem',
        challengeBullets: [
          'Businesses were juggling separate tools for invoicing, stock, and accounting',
          'Month-end reconciliation took days and was error-prone',
          'No unified audit trail across operations created compliance risks',
          'Legacy systems couldn\'t support multi-location or multi-currency operations',
        ],
        solutionTitle: 'Our Approach',
        solutionBullets: [
          'Designed a GL-backed accounting engine where every transaction auto-posts a double-entry journal',
          'Built multi-location POS with shift open/close and cash drawer reconciliation',
          'Inventory management with purchase orders, transfers, and low-stock alerts',
          'Tenant isolation baked in from day one — each business sees only its own data',
          'Period locking and immutable audit log for accountants and compliance teams',
        ],
        featuresSectionLabel: 'KEY FEATURES',
        featuresSectionTitle: 'Core Features',
        featuresSectionSubtitle: 'Six modules that cover the full operations lifecycle — from the first sale to the audit trail.',
        features: [
          { title: 'Finance Dashboard', description: 'P&L, balance sheet, and cash flow metrics in one view — updated in real time as invoices are posted.' },
          { title: 'Invoicing', description: 'Create, send, and track invoices with automatic GL posting and payment status updates.' },
          { title: 'Inventory Control', description: 'Multi-location stock with purchase orders, stock transfers, and automated low-stock alerts.' },
          { title: 'Point of Sale', description: 'Touch-friendly POS with shift management, cash drawer reconciliation, and receipt printing.' },
          { title: 'Reports & Analytics', description: 'On-demand financial reports, sales summaries, and inventory valuation at any date.' },
          { title: 'Audit & Compliance', description: 'Immutable double-entry journal, period locking, and CSV export for accountants and auditors.' },
        ],
        techSectionLabel: 'TECH STACK',
        techSectionTitle: 'Tools & Technologies',
        techSectionSubtitle: 'Laravel API backend with a Vue 3 SPA frontend, PostgreSQL for the GL, and Docker for deployment.',
        timelineSectionLabel: 'TIMELINE',
        timelineSectionTitle: 'Phases & Schedule',
        phases: [
          { title: 'Architecture & GL Design', description: 'Designing the multi-tenant data model, double-entry accounting engine, and chart of accounts structure with the client\'s accountant.' },
          { title: 'Core Modules', description: 'Building invoicing, payments, customer management, and the GL journal with full double-entry auto-posting.' },
          { title: 'POS & Inventory', description: 'Point of sale with shift management, inventory control with multi-location support, and purchase order workflow.' },
          { title: 'QA, Reporting & Deployment', description: 'Financial report suite, period locking, audit log, Docker production deployment, and user acceptance testing.' },
        ],
        stats: [
          { value: 'Multi-tenant', label: 'Architecture' },
          { value: 'Web', label: 'Platform' },
          { value: '10+', label: 'Currencies' },
          { value: '−80%', label: 'Close time' },
        ],
      },
    },
  },
}
