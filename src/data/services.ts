import type { Component } from 'vue'
import {
  GlobeIcon,
  SmartphoneIcon,
  CloudIcon,
  LightbulbIcon,
  PaletteIcon,
  WrenchIcon,
  CodeIcon,
  WorkflowIcon,
} from 'lucide-vue-next'
import type { Locale } from '../i18n'

type LString = { en: string; ar: string }
type LArray = { en: string[]; ar: string[] }
type LUseCase = { en: { title: string; description: string }[]; ar: { title: string; description: string }[] }

export interface ServiceData {
  slug: string
  icon: Component
  title: LString
  tagline: LString
  description: LString
  included: LArray
  whoFor: LArray
  benefits: LArray
  approach: LArray
  technologies: string[]
  useCases: LUseCase
  ctaText: LString
}

export const services: Record<string, ServiceData> = {
  'custom-software': {
    slug: 'custom-software',
    icon: CodeIcon,
    title: { en: 'Custom Software Development', ar: 'تطوير برمجيات مخصصة' },
    tagline: { en: 'Business software tailored to your workflows', ar: 'حلول برمجية مصممة حسب احتياج أعمالك' },
    description: {
      en: 'We design and build custom platforms that align with your operations, data model, and growth plans.',
      ar: 'نصمم ونبني منصات برمجية مخصصة تتوافق مع عملياتك ونموذج بياناتك وخطط التوسع.',
    },
    included: {
      en: ['Requirements discovery', 'Architecture design', 'Full-stack development', 'Testing and release planning'],
      ar: ['تحليل المتطلبات', 'تصميم المعمارية', 'تطوير متكامل للواجهة والخلفية', 'اختبارات وخطة إطلاق'],
    },
    whoFor: {
      en: ['Organizations with unique workflows', 'Teams replacing spreadsheets/manual operations'],
      ar: ['الشركات ذات العمليات الخاصة', 'الفرق التي تستبدل الجداول والعمليات اليدوية'],
    },
    benefits: {
      en: ['Higher operational efficiency', 'Lower long-term software constraints', 'Data-driven decision making'],
      ar: ['كفاءة تشغيلية أعلى', 'قيود أقل على المدى الطويل', 'قرارات مبنية على البيانات'],
    },
    approach: {
      en: ['Discovery workshop', 'Roadmap and milestones', 'Iterative delivery with demos', 'Post-launch optimization'],
      ar: ['ورشة اكتشاف', 'خارطة طريق ومراحل تنفيذ', 'تسليم تكراري مع عروض دورية', 'تحسين ما بعد الإطلاق'],
    },
    technologies: ['TypeScript', 'Vue/React', 'Node.js', 'PostgreSQL', 'Docker'],
    useCases: {
      en: [
        { title: 'Operations Management Portal', description: 'Replaced fragmented tools with a unified internal platform.' },
      ],
      ar: [
        { title: 'بوابة إدارة العمليات', description: 'استبدال أدوات متفرقة بمنصة داخلية موحدة.' },
      ],
    },
    ctaText: { en: 'Plan Your Custom Platform', ar: 'خطط منصتك المخصصة' },
  },
  'mobile-development': {
    slug: 'mobile-development',
    icon: SmartphoneIcon,
    title: { en: 'Mobile App Development', ar: 'تطوير تطبيقات الجوال' },
    tagline: { en: 'iOS and Android apps built for adoption', ar: 'تطبيقات iOS وAndroid مبنية للتبني والنمو' },
    description: {
      en: 'We deliver native and cross-platform mobile applications with strong UX, scalability, and analytics readiness.',
      ar: 'نطوّر تطبيقات جوال أصلية ومتعددة المنصات مع تجربة مستخدم قوية وقابلية للتوسع وقياس الأداء.',
    },
    included: {
      en: ['Product strategy', 'UI implementation', 'API integration', 'Store release support'],
      ar: ['استراتيجية المنتج', 'تنفيذ الواجهات', 'تكامل API', 'دعم الإطلاق على المتاجر'],
    },
    whoFor: {
      en: ['Businesses launching customer-facing products', 'Teams modernizing legacy mobile apps'],
      ar: ['الشركات التي تطلق منتجات موجهة للعملاء', 'الفرق التي تحدث تطبيقات قديمة'],
    },
    benefits: {
      en: ['Faster user acquisition', 'Improved engagement', 'Reliable mobile performance'],
      ar: ['اكتساب مستخدمين أسرع', 'تحسين التفاعل', 'أداء موثوق للتطبيق'],
    },
    approach: {
      en: ['Product requirements', 'Rapid prototyping', 'Sprint-based development', 'Release and optimization'],
      ar: ['تحديد المتطلبات', 'نماذج أولية سريعة', 'تطوير على دورات', 'إطلاق وتحسين مستمر'],
    },
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    useCases: {
      en: [{ title: 'Field Service App', description: 'Offline-first app for distributed teams with live sync.' }],
      ar: [{ title: 'تطبيق خدمات ميدانية', description: 'تطبيق يعمل دون اتصال مع مزامنة مباشرة للفرق الموزعة.' }],
    },
    ctaText: { en: 'Build Your Mobile App', ar: 'ابنِ تطبيقك الآن' },
  },
  'web-development': {
    slug: 'web-development',
    icon: GlobeIcon,
    title: { en: 'Web Development', ar: 'تطوير تطبيقات الويب' },
    tagline: { en: 'Modern web experiences for scale and speed', ar: 'تجارب ويب حديثة سريعة وقابلة للتوسع' },
    description: {
      en: 'From customer portals to enterprise dashboards, we ship web applications engineered for reliability and growth.',
      ar: 'من بوابات العملاء إلى لوحات التحكم المؤسسية، نطوّر تطبيقات ويب موثوقة وقابلة للنمو.',
    },
    included: {
      en: ['Frontend engineering', 'Backend services', 'Security baseline', 'Performance optimization'],
      ar: ['هندسة واجهات المستخدم', 'خدمات الخلفية', 'أساس أمني', 'تحسين الأداء'],
    },
    whoFor: {
      en: ['B2B and B2C product teams', 'Companies replacing outdated web systems'],
      ar: ['فرق المنتجات B2B وB2C', 'الشركات التي تستبدل أنظمة ويب قديمة'],
    },
    benefits: {
      en: ['Better conversion and retention', 'Maintainable architecture', 'Improved release velocity'],
      ar: ['تحسين التحويل والاحتفاظ', 'معمارية قابلة للصيانة', 'سرعة أعلى في الإصدارات'],
    },
    approach: {
      en: ['UX discovery', 'Component-driven implementation', 'QA automation', 'Production deployment'],
      ar: ['اكتشاف تجربة المستخدم', 'تنفيذ قائم على المكونات', 'اختبارات آلية', 'نشر للإنتاج'],
    },
    technologies: ['Vue', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    useCases: {
      en: [{ title: 'Client Self-Service Portal', description: 'Secure portal with dashboards, reporting, and workflows.' }],
      ar: [{ title: 'بوابة خدمة ذاتية للعملاء', description: 'بوابة آمنة تتضمن لوحات بيانات وتقارير وسير عمل.' }],
    },
    ctaText: { en: 'Start Your Web Project', ar: 'ابدأ مشروع الويب' },
  },
  'ui-ux': {
    slug: 'ui-ux',
    icon: PaletteIcon,
    title: { en: 'UI/UX Design', ar: 'تصميم UI/UX' },
    tagline: { en: 'Design systems and journeys that convert', ar: 'تصميم تجارب وأنظمة واجهات ترفع التحويل' },
    description: {
      en: 'We create intuitive product experiences that improve usability, reduce friction, and support business goals.',
      ar: 'نصمم تجارب استخدام واضحة تقلل التعقيد وتدعم أهداف الأعمال.',
    },
    included: {
      en: ['Research and flows', 'Wireframes and prototypes', 'Design systems', 'Usability testing'],
      ar: ['بحث وتجارب المستخدم', 'نماذج أولية', 'أنظمة تصميم', 'اختبارات قابلية الاستخدام'],
    },
    whoFor: {
      en: ['Products with low conversion', 'Teams needing consistent UX across platforms'],
      ar: ['المنتجات ذات التحويل المنخفض', 'الفرق التي تحتاج تجربة موحدة عبر المنصات'],
    },
    benefits: {
      en: ['Higher engagement', 'Lower user drop-off', 'Faster feature delivery with reusable UI'],
      ar: ['تفاعل أعلى', 'انخفاض تسرب المستخدمين', 'إطلاق أسرع عبر واجهات قابلة لإعادة الاستخدام'],
    },
    approach: {
      en: ['Research insights', 'Design exploration', 'Validation sessions', 'Handoff and iteration'],
      ar: ['تحليل المستخدم', 'استكشاف التصميم', 'جلسات التحقق', 'تسليم وتحسين متكرر'],
    },
    technologies: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    useCases: {
      en: [{ title: 'Onboarding Redesign', description: 'Improved activation rate by redesigning early user journeys.' }],
      ar: [{ title: 'إعادة تصميم رحلة الانضمام', description: 'رفع معدل التفعيل عبر تحسين الرحلة الأولى للمستخدم.' }],
    },
    ctaText: { en: 'Improve Product Experience', ar: 'حسّن تجربة منتجك' },
  },
  'saas-development': {
    slug: 'saas-development',
    icon: CloudIcon,
    title: { en: 'SaaS Development', ar: 'تطوير منصات SaaS' },
    tagline: { en: 'Scalable SaaS platforms built for growth', ar: 'منصات SaaS قابلة للتوسع والنمو' },
    description: {
      en: 'We architect and build multi-tenant SaaS products with robust billing, access control, and operational reliability.',
      ar: 'نصمم ونبني منصات SaaS متعددة المستأجرين مع إدارة اشتراكات وأمان واعتمادية تشغيلية.',
    },
    included: {
      en: ['Tenant architecture', 'Subscription workflows', 'Admin controls', 'Cloud infrastructure'],
      ar: ['معمارية متعددة المستأجرين', 'تدفقات الاشتراك', 'لوحات تحكم إدارية', 'بنية سحابية'],
    },
    whoFor: {
      en: ['Startups launching SaaS MVPs', 'Scale-ups evolving monolithic products'],
      ar: ['الشركات الناشئة التي تطلق MVP', 'الشركات المتوسعة التي تطور أنظمة قديمة'],
    },
    benefits: {
      en: ['Predictable growth architecture', 'Faster feature rollout', 'Improved reliability and observability'],
      ar: ['معمارية نمو مستقرة', 'إطلاق أسرع للميزات', 'اعتمادية ومراقبة أفضل'],
    },
    approach: {
      en: ['SaaS strategy workshop', 'MVP scope definition', 'Incremental platform build', 'Scale and optimization'],
      ar: ['ورشة استراتيجية SaaS', 'تحديد نطاق MVP', 'بناء تدريجي للمنصة', 'توسع وتحسين'],
    },
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    useCases: {
      en: [{ title: 'B2B Analytics Platform', description: 'White-label SaaS with tenant isolation and role-based access.' }],
      ar: [{ title: 'منصة تحليلات B2B', description: 'منصة SaaS قابلة للتخصيص مع عزل بيانات المستأجرين وصلاحيات متقدمة.' }],
    },
    ctaText: { en: 'Launch Your SaaS', ar: 'أطلق منصتك SaaS' },
  },
  'system-integration': {
    slug: 'system-integration',
    icon: WorkflowIcon,
    title: { en: 'System Integration', ar: 'تكامل الأنظمة' },
    tagline: { en: 'Connect platforms and automate business workflows', ar: 'ربط الأنظمة وأتمتة سير العمل' },
    description: {
      en: 'We integrate CRMs, ERPs, payment systems, and internal tools to create reliable data flows across your business.',
      ar: 'نقوم بربط أنظمة CRM وERP والمدفوعات والأدوات الداخلية لإنشاء تدفقات بيانات موثوقة عبر أعمالك.',
    },
    included: {
      en: ['Integration mapping', 'API development', 'Data synchronization', 'Monitoring and error handling'],
      ar: ['تحليل نقاط التكامل', 'تطوير API', 'مزامنة البيانات', 'مراقبة ومعالجة الأخطاء'],
    },
    whoFor: {
      en: ['Companies with disconnected systems', 'Teams requiring process automation'],
      ar: ['الشركات التي تعاني من أنظمة منفصلة', 'الفرق التي تحتاج أتمتة العمليات'],
    },
    benefits: {
      en: ['Reduced manual work', 'Data consistency', 'Faster operations'],
      ar: ['تقليل العمل اليدوي', 'اتساق البيانات', 'تسريع العمليات'],
    },
    approach: {
      en: ['Systems audit', 'Integration blueprint', 'Secure implementation', 'Operational handover'],
      ar: ['تدقيق الأنظمة', 'تصميم مخطط التكامل', 'تنفيذ آمن', 'تسليم تشغيلي'],
    },
    technologies: ['REST APIs', 'Webhooks', 'ETL Pipelines', 'Message Queues'],
    useCases: {
      en: [{ title: 'ERP + E-commerce Sync', description: 'Automated order and inventory synchronization across systems.' }],
      ar: [{ title: 'تكامل ERP مع التجارة الإلكترونية', description: 'مزامنة تلقائية للطلبات والمخزون بين الأنظمة.' }],
    },
    ctaText: { en: 'Integrate Your Systems', ar: 'ابدأ تكامل أنظمتك' },
  },
  consulting: {
    slug: 'consulting',
    icon: LightbulbIcon,
    title: { en: 'Technical Consulting', ar: 'الاستشارات التقنية' },
    tagline: { en: 'Strategic guidance for critical technical decisions', ar: 'توجيه تقني لاتخاذ قرارات حاسمة' },
    description: {
      en: 'We help leadership teams make confident product and architecture decisions based on business goals and technical realities.',
      ar: 'نساعد فرق القيادة على اتخاذ قرارات المنتج والمعمارية بثقة بناءً على أهداف العمل والواقع التقني.',
    },
    included: {
      en: ['Architecture reviews', 'Technology selection', 'Delivery audits', 'Scaling strategy'],
      ar: ['مراجعة المعمارية', 'اختيار التقنيات', 'تدقيق عمليات التسليم', 'استراتيجية التوسع'],
    },
    whoFor: {
      en: ['Founders and product leaders', 'Companies preparing modernization programs'],
      ar: ['المؤسسون وقادة المنتجات', 'الشركات التي تستعد للتحديث التقني'],
    },
    benefits: {
      en: ['Lower technical risk', 'Better investment decisions', 'Improved engineering maturity'],
      ar: ['تقليل المخاطر التقنية', 'قرارات استثمارية أفضل', 'رفع نضج الهندسة'],
    },
    approach: {
      en: ['Assessment', 'Strategic recommendations', 'Execution roadmap', 'Advisory support'],
      ar: ['تقييم شامل', 'توصيات استراتيجية', 'خارطة تنفيذ', 'دعم استشاري مستمر'],
    },
    technologies: ['System Design', 'Cloud Strategy', 'DevOps', 'Security Assessments'],
    useCases: {
      en: [{ title: 'Architecture Modernization', description: 'Created a migration strategy from legacy monolith to scalable services.' }],
      ar: [{ title: 'تحديث المعمارية', description: 'وضع استراتيجية انتقال من نظام أحادي قديم إلى خدمات قابلة للتوسع.' }],
    },
    ctaText: { en: 'Book a Consultation', ar: 'احجز استشارة' },
  },
  support: {
    slug: 'support',
    icon: WrenchIcon,
    title: { en: 'Maintenance & Support', ar: 'الصيانة والدعم' },
    tagline: { en: 'Keep your systems secure, stable, and evolving', ar: 'حافظ على أنظمتك آمنة ومستقرة ومتطورة' },
    description: {
      en: 'We provide ongoing monitoring, performance improvements, and feature support to keep your product healthy after launch.',
      ar: 'نقدم مراقبة مستمرة وتحسين أداء ودعم تطوير الميزات للحفاظ على جودة المنتج بعد الإطلاق.',
    },
    included: {
      en: ['Monitoring and incident response', 'Security patching', 'Performance tuning', 'Roadmap support'],
      ar: ['مراقبة واستجابة للحوادث', 'تحديثات أمنية', 'تحسين الأداء', 'دعم خارطة التطوير'],
    },
    whoFor: {
      en: ['Teams without in-house support capacity', 'Businesses scaling live products'],
      ar: ['الفرق التي لا تمتلك قدرة دعم داخلية', 'الشركات التي توسّع منتجات تعمل بالفعل'],
    },
    benefits: {
      en: ['Reduced downtime', 'Safer releases', 'Continuous product improvement'],
      ar: ['تقليل التوقفات', 'إصدارات أكثر أمانًا', 'تحسين مستمر للمنتج'],
    },
    approach: {
      en: ['Operational baseline', 'SLA and priorities', 'Continuous maintenance cycles', 'Quarterly optimization'],
      ar: ['تقييم تشغيلي', 'تحديد SLA والأولويات', 'دورات صيانة مستمرة', 'تحسينات ربع سنوية'],
    },
    technologies: ['Datadog', 'Sentry', 'CI/CD', 'Security Tooling'],
    useCases: {
      en: [{ title: 'Post-Launch Care Program', description: 'Stabilized product operations and reduced incident resolution times.' }],
      ar: [{ title: 'برنامج رعاية ما بعد الإطلاق', description: 'تحسين استقرار التشغيل وتقليل زمن حل الأعطال.' }],
    },
    ctaText: { en: 'Get Ongoing Support', ar: 'احصل على دعم مستمر' },
  },
}

export const serviceKeys = Object.keys(services)

export const localizeText = (value: LString, locale: Locale) => value[locale]
export const localizeArray = (value: LArray, locale: Locale) => value[locale]
export const localizeUseCases = (value: LUseCase, locale: Locale) => value[locale]
