export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectData {
  slug: string
  title: string
  client: string
  industry: string
  year: string
  duration: string
  summary: string
  challenge: string
  solution: string
  results: string
  metrics: ProjectMetric[]
  technologies: string[]
  services: { label: string; slug: string }[]
}

export const defaultProjects: ProjectData[] = [
  {
    slug: 'apex-logistics-fleet-tracking',
    title: 'Real-time fleet tracking for Apex Logistics',
    client: 'Apex Logistics',
    industry: 'Logistics & Supply Chain',
    year: '2025',
    duration: '14 weeks',
    summary:
      'A web platform that lets dispatchers see every vehicle in their fleet on a live map, assign jobs in seconds, and surface delays before customers notice.',
    challenge:
      'Apex was running its 200+ vehicle fleet through spreadsheets and phone calls. Dispatchers had no visibility into vehicle location or job status, late deliveries cost five-figure sums per week, and their warehouse customers were threatening to switch providers.',
    solution:
      'We designed and built a real-time dispatch platform with live GPS tracking, drag-and-drop job assignment, and automated SLA alerts. The driver-side mobile app captures proof of delivery and updates the dispatcher view in under one second.',
    results:
      'On-time delivery climbed from 78% to 96% in the first quarter after launch, dispatcher headcount needs flattened despite a 30% increase in fleet size, and Apex retained their two largest accounts.',
    metrics: [
      { label: 'On-time delivery', value: '78% → 96%' },
      { label: 'Dispatch time per job', value: '−65%' },
      { label: 'Customer churn', value: '−40%' },
    ],
    technologies: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'Mapbox', 'AWS'],
    services: [
      { label: 'Web Development', slug: 'web-development' },
      { label: 'SaaS Development', slug: 'saas-development' },
    ],
  },
  {
    slug: 'pulsefit-wellness-app',
    title: 'PulseFit — cross-platform wellness app',
    client: 'PulseFit',
    industry: 'Health & Wellness',
    year: '2024',
    duration: '20 weeks',
    summary:
      'A native-feeling iOS and Android app that pairs with wearables, guides users through coached workouts, and turned a pre-revenue startup into a Series A candidate.',
    challenge:
      'PulseFit had a Figma prototype and an investor deadline. They needed a production-grade app on both stores in under five months, with wearable integration, social features, and an offline workout mode — without compromising on design polish.',
    solution:
      'We built a single React Native codebase with deep native modules for HealthKit and Health Connect, an offline-first sync layer, and a creator console for coaches to publish programs. We shipped to TestFlight in week 8 and to both app stores in week 18.',
    results:
      'PulseFit launched on time with a 4.8 average rating across stores, hit 50k installs in the first month, and closed a Series A two quarters ahead of plan.',
    metrics: [
      { label: 'App store rating', value: '4.8 / 5' },
      { label: 'Installs in month 1', value: '50,000+' },
      { label: 'D30 retention', value: '42%' },
    ],
    technologies: ['React Native', 'TypeScript', 'Expo', 'HealthKit', 'Health Connect', 'Firebase', 'Stripe'],
    services: [
      { label: 'Mobile App Development', slug: 'mobile-development' },
      { label: 'UI/UX Design', slug: 'ui-ux' },
    ],
  },
  {
    slug: 'northwind-saas-modernization',
    title: 'Northwind Bookkeeping — SaaS modernization',
    client: 'Northwind Bookkeeping',
    industry: 'Fintech / Accounting',
    year: '2024',
    duration: '9 months',
    summary:
      'Migrating a 12-year-old PHP monolith to a modern multi-tenant SaaS architecture without dropping a single customer or invoice.',
    challenge:
      'Northwind’s monolith was hitting scaling limits, deploys were taking four hours, and three different audit firms had flagged the platform as unfit for SOC 2. Customers were demanding API access the legacy system could not provide.',
    solution:
      'We led the architecture redesign, picked the team’s first set of services to extract, and rebuilt the highest-traffic flows in TypeScript on AWS. We kept the monolith and the new services running in parallel behind a router until every customer was migrated.',
    results:
      'Average deploy went from four hours to nine minutes, the platform passed SOC 2 Type II within twelve months of project start, and Northwind launched a public API that now drives 18% of new revenue.',
    metrics: [
      { label: 'Deploy time', value: '4h → 9m' },
      { label: 'p95 API latency', value: '−72%' },
      { label: 'Revenue from API', value: '18% of new ARR' },
    ],
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'Kubernetes', 'Terraform', 'AWS', 'OpenAPI'],
    services: [
      { label: 'Technical Consulting', slug: 'consulting' },
      { label: 'SaaS Development', slug: 'saas-development' },
    ],
  },
  {
    slug: 'lumen-onboarding-redesign',
    title: 'Lumen — onboarding redesign that cut churn 35%',
    client: 'Lumen Analytics',
    industry: 'B2B SaaS',
    year: '2025',
    duration: '8 weeks',
    summary:
      'A research-led redesign of the first-run experience for a B2B analytics tool, shipped behind a controlled rollout and validated with measurable retention gains.',
    challenge:
      'Lumen was paying real money for trial signups and losing 60% of them in the first three days. Customer interviews suggested the product was great once people got past setup, but setup took 45 minutes and asked questions most users could not answer.',
    solution:
      'We ran 12 user sessions, mapped every dropoff in the funnel, and rebuilt onboarding around a five-minute sample workspace, deferred configuration, and progressive disclosure. We shipped behind a feature flag to half of new accounts and measured against the existing flow.',
    results:
      'Day-30 trial-to-paid conversion improved by 35%, time-to-first-value dropped from 45 minutes to under 6, and the new flow shipped to 100% of accounts in week 9.',
    metrics: [
      { label: 'Trial → paid', value: '+35%' },
      { label: 'Time-to-first-value', value: '45m → <6m' },
      { label: 'Setup support tickets', value: '−68%' },
    ],
    technologies: ['Figma', 'User Research', 'Usability Testing', 'Design Systems', 'A/B Testing'],
    services: [
      { label: 'UI/UX Design', slug: 'ui-ux' },
    ],
  },
]

