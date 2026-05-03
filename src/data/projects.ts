export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectScreen {
  title: string
  description: string
  layout: 'map' | 'kanban' | 'mobile-form' | 'chart' | 'feed' | 'table' | 'wizard' | 'api' | 'browser'
  accent: string
  bg: string
}

export interface ProjectFeatureIcon {
  iconName: string
}

export interface ProjectTimelineEntry {
  phase: string
  weeks: string
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
  iconBg: string
  iconColor: string
  coverFrom: string
  coverTo: string
  screens: ProjectScreen[]
  externalUrl?: string
  platforms?: string[]
  appStoreUrl?: string
  playStoreUrl?: string
  features?: ProjectFeatureIcon[]
  timeline?: ProjectTimelineEntry[]
}

export const defaultProjects: ProjectData[] = [
  {
    slug: 'saferoute',
    title: 'SafeRoute',
    client: 'SafeRoute',
    industry: 'Safety & Navigation',
    year: '2024',
    duration: '16 weeks',
    summary:
      'A real-time safety navigation platform that helps users discover and share safe routes, report hazards, and stay informed about local incidents.',
    challenge:
      'Users needed a reliable way to navigate urban areas safely, with up-to-date information on road conditions, crime hotspots, and community-reported hazards — data that traditional map apps do not surface.',
    solution:
      'We built a cross-platform mobile app with real-time hazard reporting, community-verified route ratings, and push alerts for incidents along saved routes. A lightweight backend aggregates reports and pushes updates in under two seconds.',
    results:
      'SafeRoute launched across iOS and Android with strong early traction, averaging 4.7 stars in both stores and thousands of active community reporters within the first month.',
    metrics: [
      { label: 'App store rating', value: '4.7 / 5' },
      { label: 'Active reporters', value: '10,000+' },
      { label: 'Avg. alert latency', value: '<2 sec' },
    ],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Firebase', 'Mapbox'],
    services: [
      { label: 'Mobile App Development', slug: 'mobile-development' },
      { label: 'UI/UX Design', slug: 'ui-ux' },
    ],
    iconBg: '#dbeafe',
    iconColor: '#1d4ed8',
    coverFrom: '#1e3a8a',
    coverTo: '#3b82f6',
    externalUrl: 'https://saferoute.app',
    platforms: ['iOS', 'Android'],
    features: [
      { iconName: 'map-pin' },
      { iconName: 'shield-check' },
      { iconName: 'bell' },
      { iconName: 'users' },
      { iconName: 'zap' },
      { iconName: 'globe' },
    ],
    timeline: [
      { phase: 'Phase 01', weeks: 'Weeks 1–3' },
      { phase: 'Phase 02', weeks: 'Weeks 4–8' },
      { phase: 'Phase 03', weeks: 'Weeks 9–14' },
      { phase: 'Phase 04', weeks: 'Weeks 15–16' },
    ],
    screens: [
      {
        title: 'Live Safety Map',
        description: 'Community-reported hazards, verified safe routes, and real-time incident pins visible on a live map.',
        layout: 'map',
        accent: '#3b82f6',
        bg: '#0f172a',
      },
      {
        title: 'Route Safety Score',
        description: 'Each suggested route is scored on safety, lighting, and recent incident history so users can make informed choices.',
        layout: 'chart',
        accent: '#60a5fa',
        bg: '#1e293b',
      },
      {
        title: 'Incident Report Flow',
        description: 'One-tap hazard reporting with category selection, photo upload, and location pinning — completed in under 20 seconds.',
        layout: 'mobile-form',
        accent: '#34d399',
        bg: '#064e3b',
      },
      {
        title: 'Alert Feed',
        description: 'Personalised push alerts for incidents along saved routes, with severity levels and community-verified status.',
        layout: 'feed',
        accent: '#f59e0b',
        bg: '#1c1917',
      },
    ],
  },
  {
    slug: 'floosi',
    title: 'Floosi',
    client: 'Floosi',
    industry: 'Fintech',
    year: '2024',
    duration: '24 weeks',
    summary:
      'A smart personal finance platform that helps users track spending, set budgets, and grow their savings through automated insights and goal tracking.',
    challenge:
      'Most budgeting apps overwhelm users with manual data entry. Floosi needed a frictionless experience that connects bank accounts, categorises transactions automatically, and nudges users toward better habits without requiring daily attention.',
    solution:
      'We built a full-stack web and mobile platform with open-banking integrations, ML-powered transaction categorisation, and a goal-based savings engine. The onboarding flow connects a bank account in under three minutes.',
    results:
      'Floosi users save an average of 18% more in the first three months, with a 72% day-60 retention rate — well above the category average. The platform handles thousands of transactions daily with 99.9% uptime.',
    metrics: [
      { label: 'Avg. savings increase', value: '+18%' },
      { label: 'Day-60 retention', value: '72%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    technologies: ['Vue 3', 'TypeScript', 'Laravel', 'PostgreSQL', 'Redis', 'Stripe', 'Plaid'],
    services: [
      { label: 'Web Development', slug: 'web-development' },
      { label: 'Mobile App Development', slug: 'mobile-development' },
      { label: 'SaaS Development', slug: 'saas-development' },
    ],
    iconBg: '#d1fae5',
    iconColor: '#059669',
    coverFrom: '#065f46',
    coverTo: '#059669',
    platforms: ['iOS', 'Android'],
    appStoreUrl: 'https://apps.apple.com',
    playStoreUrl: 'https://play.google.com',
    features: [
      { iconName: 'repeat2' },
      { iconName: 'sliders' },
      { iconName: 'zap' },
      { iconName: 'globe' },
      { iconName: 'lock' },
      { iconName: 'wallet' },
    ],
    timeline: [
      { phase: 'Phase 01', weeks: 'Weeks 1–4' },
      { phase: 'Phase 02', weeks: 'Weeks 5–9' },
      { phase: 'Phase 03', weeks: 'Weeks 10–17' },
      { phase: 'Phase 04', weeks: 'Weeks 18–24' },
    ],
    screens: [
      {
        title: 'Spending Dashboard',
        description: 'Monthly spending breakdown by category with trend lines and comparison to previous months — all pulled automatically from connected accounts.',
        layout: 'chart',
        accent: '#34d399',
        bg: '#022c22',
      },
      {
        title: 'Budget Tracker',
        description: 'Visual budget progress bars with real-time updates as transactions come in, and smart alerts before limits are reached.',
        layout: 'kanban',
        accent: '#6ee7b7',
        bg: '#0f2918',
      },
      {
        title: 'Savings Goals',
        description: 'Goal-based savings pots with automated contributions, projected completion dates, and milestone celebrations.',
        layout: 'feed',
        accent: '#10b981',
        bg: '#1a3a2a',
      },
      {
        title: 'Transaction Feed',
        description: 'Unified transaction list across all accounts with AI-powered categories, notes, and receipt photo attachments.',
        layout: 'table',
        accent: '#4ade80',
        bg: '#0a1f14',
      },
    ],
  },
  {
    slug: 'operix',
    title: 'Operix',
    client: 'Operix',
    industry: 'Business Management',
    year: '2025',
    duration: '9 months',
    summary:
      'A multi-tenant business finance manager built for operations teams — covering invoicing, inventory, POS, and full double-entry accounting in one platform.',
    challenge:
      'Growing businesses were juggling separate tools for invoicing, stock control, and accounting. Month-end reconciliation took days, and the lack of a unified audit trail created compliance risks.',
    solution:
      'We designed and built a modular SaaS platform with a GL-backed accounting engine, multi-location POS, inventory management, and tenant isolation baked in from day one. Every transaction posts a double-entry journal entry automatically.',
    results:
      'Operix tenants close their books in hours instead of days, with zero reconciliation errors reported since launch. The platform supports multiple currencies and is actively used across multiple business types.',
    metrics: [
      { label: 'Month-end close time', value: '−80%' },
      { label: 'Reconciliation errors', value: '0' },
      { label: 'Supported currencies', value: '10+' },
    ],
    technologies: ['Vue 3', 'TypeScript', 'Laravel', 'PostgreSQL', 'Redis', 'Docker'],
    services: [
      { label: 'SaaS Development', slug: 'saas-development' },
      { label: 'Technical Consulting', slug: 'consulting' },
    ],
    iconBg: '#ffedd5',
    iconColor: '#ea580c',
    coverFrom: '#7c2d12',
    coverTo: '#f97316',
    externalUrl: 'https://operix.io',
    platforms: ['Web'],
    features: [
      { iconName: 'layout-dashboard' },
      { iconName: 'receipt' },
      { iconName: 'package' },
      { iconName: 'credit-card' },
      { iconName: 'bar-chart' },
      { iconName: 'lock' },
    ],
    timeline: [
      { phase: 'Phase 01', weeks: 'Weeks 1–6' },
      { phase: 'Phase 02', weeks: 'Weeks 7–18' },
      { phase: 'Phase 03', weeks: 'Weeks 19–30' },
      { phase: 'Phase 04', weeks: 'Weeks 31–36' },
    ],
    screens: [
      {
        title: 'Finance Dashboard',
        description: 'P&L, balance sheet, and cash flow metrics in a single view — updated in real time as invoices are posted.',
        layout: 'browser',
        accent: '#fb923c',
        bg: '#1c0a00',
      },
      {
        title: 'POS & Shift Management',
        description: 'Touch-friendly point-of-sale with shift open/close, cash drawer reconciliation, and receipt printing.',
        layout: 'browser',
        accent: '#f97316',
        bg: '#1a0800',
      },
      {
        title: 'Inventory Control',
        description: 'Multi-location stock tracking with purchase orders, stock transfers, and low-stock alerts.',
        layout: 'browser',
        accent: '#fdba74',
        bg: '#1c1007',
      },
      {
        title: 'GL Journal & Audit Log',
        description: 'Immutable double-entry journal with full audit trail, period locking, and CSV export for accountants.',
        layout: 'browser',
        accent: '#fed7aa',
        bg: '#0f0800',
      },
    ],
  },
]
