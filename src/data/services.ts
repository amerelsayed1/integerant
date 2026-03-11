import type { Component } from 'vue'
import {
  GlobeIcon,
  SmartphoneIcon,
  CloudIcon,
  LightbulbIcon,
  PaletteIcon,
  WrenchIcon,
} from 'lucide-vue-next'

export interface ServiceData {
  slug: string
  title: string
  tagline: string
  description: string
  icon: Component
  problems: string[]
  technologies: string[]
  useCases: { title: string; description: string }[]
  ctaText: string
}

export const services: Record<string, ServiceData> = {
  'web-development': {
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'Modern web applications built for performance and scale',
    description:
      'We design and develop responsive, high-performance web applications using modern frameworks and best practices. From interactive single-page applications to complex enterprise platforms, we deliver solutions that are fast, accessible, and built to grow with your business.',
    icon: GlobeIcon,
    problems: [
      "Outdated website that doesn't reflect your brand or convert visitors",
      'Slow page load times driving users away',
      'Poor mobile experience losing potential customers',
      'Difficulty managing and updating content',
      'Lack of integration with business tools and APIs',
      'Security vulnerabilities in legacy systems',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Tailwind CSS',
      'GraphQL',
      'REST APIs',
      'AWS',
      'Vercel',
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
    ctaText: 'Start Your Web Project',
  },
  'mobile-development': {
    slug: 'mobile-development',
    title: 'Mobile App Development',
    tagline: 'Native and cross-platform apps that users love',
    description:
      'We build mobile applications for iOS and Android that deliver seamless, intuitive experiences. Whether you need a native app for maximum performance or a cross-platform solution for faster time-to-market, we craft mobile products that engage users and drive business results.',
    icon: SmartphoneIcon,
    problems: [
      'No mobile presence in an increasingly mobile-first world',
      'Existing app is slow, buggy, or outdated',
      'Need to reach users on both iOS and Android efficiently',
      'Poor user engagement and high uninstall rates',
      'Difficulty integrating mobile with existing backend systems',
      'App store rejection due to quality or compliance issues',
    ],
    technologies: [
      'React Native',
      'Swift',
      'Kotlin',
      'Flutter',
      'Firebase',
      'Expo',
      'REST APIs',
      'Push Notifications',
      'App Store Connect',
      'Google Play Console',
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
    ctaText: 'Build Your Mobile App',
  },
  'saas-development': {
    slug: 'saas-development',
    title: 'SaaS Development',
    tagline: 'Scalable platforms designed for growth and reliability',
    description:
      'We architect and build SaaS platforms from the ground up — multi-tenant, secure, and designed to scale. From subscription management to user onboarding, we handle the complex infrastructure so you can focus on delivering value to your customers.',
    icon: CloudIcon,
    problems: [
      'Validating a SaaS idea without burning through runway',
      'Scaling infrastructure as your user base grows',
      'Managing multi-tenant data isolation and security',
      'Building reliable subscription billing and user management',
      'Ensuring uptime and performance under load',
      'Migrating from a monolith to a modern SaaS architecture',
    ],
    technologies: [
      'React',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'Stripe',
      'Docker',
      'Kubernetes',
      'AWS/GCP',
      'Terraform',
      'CI/CD Pipelines',
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
    ctaText: 'Launch Your SaaS',
  },
  consulting: {
    slug: 'consulting',
    title: 'Technical Consulting',
    tagline: 'Expert guidance to make the right technology decisions',
    description:
      'Our consulting services help you navigate complex technical decisions with confidence. From architecture reviews and technology selection to team augmentation and process optimization, we bring senior-level expertise to ensure your project is set up for long-term success.',
    icon: LightbulbIcon,
    problems: [
      'Uncertainty about which technology stack to choose',
      'Technical debt slowing down development velocity',
      "Architecture that won't scale with business growth",
      'Difficulty hiring or retaining senior engineering talent',
      'Lack of engineering best practices and processes',
      'Need for an unbiased technical assessment before a major investment',
    ],
    technologies: [
      'Architecture Design',
      'System Design',
      'Cloud Strategy',
      'DevOps',
      'Code Review',
      'Performance Audits',
      'Security Assessments',
      'Team Training',
      'Agile Coaching',
      'Technical Due Diligence',
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
    ctaText: 'Book a Consultation',
  },
  'ui-ux': {
    slug: 'ui-ux',
    title: 'UI/UX Design',
    tagline: 'Research-driven design that users love to interact with',
    description:
      'We create user interfaces that are beautiful, intuitive, and effective. Our design process is grounded in user research and iterative testing, ensuring every interaction serves a purpose. From wireframes to polished prototypes, we design experiences that convert.',
    icon: PaletteIcon,
    problems: [
      'Low conversion rates despite good traffic',
      'Users abandoning complex workflows or forms',
      'Inconsistent design across products and platforms',
      'No design system or component library',
      'Accessibility compliance requirements',
      'Need to redesign an existing product without disrupting users',
    ],
    technologies: [
      'Figma',
      'User Research',
      'Wireframing',
      'Prototyping',
      'Design Systems',
      'Usability Testing',
      'Accessibility (WCAG)',
      'Interaction Design',
      'Visual Design',
      'Information Architecture',
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
    ctaText: 'Improve Your UX',
  },
  support: {
    slug: 'support',
    title: 'Maintenance & Support',
    tagline: 'Keep your systems running smoothly and evolving',
    description:
      "Software doesn't end at launch. We provide ongoing maintenance, monitoring, and support to keep your applications secure, performant, and up-to-date. From bug fixes and security patches to feature enhancements and infrastructure optimization, we're your long-term technology partner.",
    icon: WrenchIcon,
    problems: [
      'Production issues with no dedicated team to resolve them',
      'Security vulnerabilities in unpatched dependencies',
      'Performance degradation over time',
      'Need for ongoing feature development after initial launch',
      'Lack of monitoring and alerting for critical systems',
      'Previous development team is no longer available',
    ],
    technologies: [
      'Monitoring (Datadog, Sentry)',
      'CI/CD',
      'Automated Testing',
      'Security Patching',
      'Performance Optimization',
      'Database Maintenance',
      'Infrastructure Management',
      'Backup & Recovery',
      'SLA Management',
      'On-Call Support',
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
    ctaText: 'Get Ongoing Support',
  },
}

export const serviceKeys = Object.keys(services)
