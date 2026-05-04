<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'
import { useSeo } from '../composables/seo'
import { useServicesStore } from '../stores/services'
import { getIcon } from '../data/serviceIcons'

const { t, tm } = useI18n()
const { list } = useServicesStore()

type Faq = { q: string; a: string }
const valueProps = computed<string[]>(() => {
  const val = tm('servicesPage.valueProps') as unknown
  return Array.isArray(val) ? (val as string[]) : []
})
const faqs = computed<Faq[]>(() => {
  const val = tm('servicesPage.faqs') as unknown
  return Array.isArray(val) ? (val as Faq[]) : []
})

useSeo({
  title: 'Software Development Services',
  description:
    'Web, mobile, and SaaS development plus UI/UX design, technical consulting, and ongoing support. Senior engineers, fixed-scope discovery, and weekly demos.',
  path: '/services',
  jsonLd: computed(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Services',
      url: 'https://bunyanx.com/services',
      description:
        'Web, mobile, SaaS, consulting, UI/UX, and maintenance services from Integerant.',
      isPartOf: { '@type': 'WebSite', name: 'Integerant', url: 'https://bunyanx.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Integerant Services',
      itemListElement: list.value.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://bunyanx.com/services/${service.slug}`,
        name: service.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bunyanx.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://bunyanx.com/services' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.value.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]),
})
</script>

<template>
  <article class="pt-20">
    <!-- Hero -->
    <section class="bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('services.label') }}</span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl">
          {{ t('servicesPage.heroTitle') }}
        </h1>
        <p class="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
          {{ t('servicesPage.heroSubtitle') }}
        </p>
      </div>
    </section>

    <!-- Service cards -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="service in list"
            :key="service.slug"
            :to="`/services/${service.slug}`"
            class="group block bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:border-teal/30 transition-all duration-300"
          >
            <div class="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal/20 transition-colors duration-300">
              <component :is="getIcon(service.iconName)" :size="22" class="text-teal" />
            </div>
            <h2 class="text-lg font-semibold text-slate-900 mb-2">{{ t(`services.items.${service.slug}.title`) }}</h2>
            <p class="text-slate-600 leading-relaxed text-sm mb-4">{{ t(`services.items.${service.slug}.tagline`) }}</p>
            <span class="inline-flex items-center gap-1.5 text-sm font-medium text-teal group-hover:gap-2.5 transition-all duration-200">
              {{ t('servicesPage.learnMore') }} <ArrowRightIcon :size="14" />
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Value props -->
    <section class="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="max-w-3xl mb-10">
          <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('servicesPage.whyLabel') }}</span>
          <h2 class="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {{ t('servicesPage.whyTitle') }}
          </h2>
        </div>
        <ul v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <li
            v-for="(item, i) in valueProps"
            :key="i"
            class="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-100"
          >
            <CheckCircleIcon :size="20" class="text-teal flex-shrink-0 mt-0.5" />
            <span class="text-slate-700 text-sm leading-relaxed">{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="max-w-3xl mb-10">
          <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('servicesPage.faqLabel') }}</span>
          <h2 class="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {{ t('servicesPage.faqTitle') }}
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
              <span class="text-teal transition-transform group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <p class="mt-3 text-slate-600 text-sm leading-relaxed">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-navy py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">{{ t('servicesPage.ctaTitle') }}</h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          {{ t('servicesPage.ctaSubtitle') }}
        </p>
        <router-link
          to="/#contact"
          class="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal/90 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-teal/20"
        >
          {{ t('servicesPage.ctaCta') }}
          <ArrowRightIcon :size="16" />
        </router-link>
      </div>
    </section>
  </article>
</template>
