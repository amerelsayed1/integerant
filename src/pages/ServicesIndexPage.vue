<script setup lang="ts">
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useSeo } from '../composables/seo'
import { services } from '../data/services'

const serviceList = Object.values(services)

const valueProps = [
  'Senior engineers and designers — no junior handoffs',
  'Fixed-scope discovery before any code is written',
  'Weekly demos and full source ownership from day one',
  'Production-grade DevOps, testing, and monitoring as standard',
]

const faqs = [
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
]

useSeo({
  title: 'Software Development Services',
  description:
    'Web, mobile, and SaaS development plus UI/UX design, technical consulting, and ongoing support. Senior engineers, fixed-scope discovery, and weekly demos.',
  path: '/services',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Services',
      url: 'https://integerant.com/services',
      description:
        'Web, mobile, SaaS, consulting, UI/UX, and maintenance services from Integrant.',
      isPartOf: { '@type': 'WebSite', name: 'Integrant', url: 'https://integerant.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Integrant Services',
      itemListElement: serviceList.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://integerant.com/services/${service.slug}`,
        name: service.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://integerant.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://integerant.com/services' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
})
</script>

<template>
  <article class="pt-20">
    <!-- Hero -->
    <section class="bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Services</span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl">
          Software development and consulting services for startups and growing businesses
        </h1>
        <p class="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
          We design, build, and maintain web, mobile, and SaaS products end-to-end. Our team pairs
          senior engineering with research-led design, so you get software that ships on time,
          scales with your growth, and is genuinely pleasant to use.
        </p>
      </div>
    </section>

    <!-- Service cards -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="service in serviceList"
            :key="service.slug"
            :to="`/services/${service.slug}`"
            class="group block bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
          >
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors duration-300">
              <component :is="service.icon" :size="22" class="text-blue-600" />
            </div>
            <h2 class="text-lg font-semibold text-slate-900 mb-2">{{ service.title }}</h2>
            <p class="text-slate-600 leading-relaxed text-sm mb-4">{{ service.tagline }}</p>
            <span class="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 group-hover:gap-2.5 transition-all duration-200">
              Learn more <ArrowRightIcon :size="14" />
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Value props -->
    <section class="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="max-w-3xl mb-10">
          <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Why Integrant</span>
          <h2 class="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            What every engagement comes with
          </h2>
        </div>
        <ul v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <li
            v-for="(item, i) in valueProps"
            :key="i"
            class="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-100"
          >
            <CheckCircleIcon :size="20" class="text-blue-500 flex-shrink-0 mt-0.5" />
            <span class="text-slate-700 text-sm leading-relaxed">{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="max-w-3xl mb-10">
          <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">FAQ</span>
          <h2 class="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Common questions about working with us
          </h2>
        </div>
        <div v-animate.stagger class="space-y-4 max-w-3xl">
          <details
            v-for="(faq, i) in faqs"
            :key="i"
            class="group bg-slate-50 rounded-xl border border-slate-100 p-5"
          >
            <summary class="cursor-pointer list-none flex items-start justify-between gap-4 text-slate-900 font-medium">
              <span>{{ faq.q }}</span>
              <span class="text-blue-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <p class="mt-3 text-slate-600 text-sm leading-relaxed">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-slate-900 py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to scope your project?</h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Tell us what you are building. We will reply within one business day with a discovery plan.
        </p>
        <router-link
          to="/#contact"
          class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-blue-600/20"
        >
          Start a conversation
          <ArrowRightIcon :size="16" />
        </router-link>
      </div>
    </section>
  </article>
</template>
