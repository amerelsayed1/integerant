<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TargetIcon,
  LayersIcon,
  ZapIcon,
} from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useServicesStore } from '../stores/services'
import { getIcon } from '../data/serviceIcons'
import { useSeo } from '../composables/seo'

const { t, tm } = useI18n()
const route = useRoute()
const { list, bySlug } = useServicesStore()

const slug = computed(() => route.params.slug as string)
const service = computed(() => (slug.value ? bySlug(slug.value) : null))

const currentIndex = computed(() =>
  service.value ? list.value.findIndex((s) => s.slug === service.value!.slug) : -1,
)
const prevService = computed(() =>
  currentIndex.value > 0 ? list.value[currentIndex.value - 1] : null,
)
const nextService = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < list.value.length - 1
    ? list.value[currentIndex.value + 1]
    : null,
)

const title = computed(() => service.value ? t(`services.items.${service.value.slug}.title`) : '')
const tagline = computed(() => service.value ? t(`services.items.${service.value.slug}.tagline`) : '')
const description = computed(() => service.value ? t(`services.items.${service.value.slug}.description`) : '')
const ctaText = computed(() => service.value ? t(`services.items.${service.value.slug}.ctaText`) : '')
type UseCase = { title: string; description: string }
const problems = computed<string[]>(() => {
  if (!service.value) return []
  const val = tm(`services.items.${service.value.slug}.problems`) as unknown
  return Array.isArray(val) ? (val as string[]) : []
})
const useCases = computed<UseCase[]>(() => {
  if (!service.value) return []
  const val = tm(`services.items.${service.value.slug}.useCases`) as unknown
  return Array.isArray(val) ? (val as UseCase[]) : []
})

const prevTitle = computed(() => prevService.value ? t(`services.items.${prevService.value.slug}.title`) : '')
const nextTitle = computed(() => nextService.value ? t(`services.items.${nextService.value.slug}.title`) : '')

const mounted = ref(false)
onMounted(() => requestAnimationFrame(() => { mounted.value = true }))

useSeo({
  title: () => (service.value ? `${title.value} — ${tagline.value}` : t('seo.serviceNotFound')),
  description: () => service.value?.description ?? 'The requested service could not be found.',
  path: () => (service.value ? `/services/${service.value.slug}` : '/services'),
  noindex: () => !service.value,
  jsonLd: () =>
    service.value
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: title.value,
            description: description.value,
            serviceType: title.value,
            url: `https://bunyanx.com/services/${service.value.slug}`,
            provider: {
              '@type': 'Organization',
              name: 'BunyanX',
              url: 'https://bunyanx.com/',
            },
            areaServed: 'Worldwide',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${title.value} Capabilities`,
              itemListElement: service.value.technologies.map((tech) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: tech },
              })),
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bunyanx.com/' },
              { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://bunyanx.com/services' },
              {
                '@type': 'ListItem',
                position: 3,
                name: title.value,
                item: `https://bunyanx.com/services/${service.value.slug}`,
              },
            ],
          },
        ]
      : null,
})
</script>

<template>
  <!-- Not Found -->
  <div v-if="!service" class="min-h-screen flex items-center justify-center bg-white">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-slate-900 mb-4">{{ t('serviceDetail.notFound') }}</h1>
      <p class="text-slate-600 mb-6">{{ t('serviceDetail.notFoundDesc') }}</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-navy text-white font-medium rounded-xl transition-colors"
      >
        <ArrowLeftIcon :size="16" />
        {{ t('serviceDetail.backHome') }}
      </router-link>
    </div>
  </div>

  <!-- Service Detail -->
  <div v-else class="pt-20">
    <!-- Hero -->
    <section class="bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div
          class="transition-all duration-500 ease-out"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
        >
          <router-link
            to="/services"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-navy mb-6 transition-colors"
          >
            <ArrowLeftIcon :size="14" />
            {{ t('serviceDetail.allServices') }}
          </router-link>

          <div class="flex items-start gap-5 mb-6">
            <div class="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <component :is="getIcon(service.iconName)" :size="28" class="text-teal" />
            </div>
            <div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">{{ title }}</h1>
              <p class="mt-2 text-lg sm:text-xl text-slate-600">{{ tagline }}</p>
            </div>
          </div>

          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl">{{ description }}</p>
        </div>
      </div>
    </section>

    <!-- Problems We Solve -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <div class="flex items-center gap-3 mb-3">
            <TargetIcon :size="20" class="text-teal" />
            <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('serviceDetail.problemsLabel') }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{{ t('serviceDetail.problemsTitle') }}</h2>
        </div>

        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(problem, i) in problems"
            :key="i"
            class="flex items-start gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <CheckCircleIcon :size="20" class="text-teal flex-shrink-0 mt-0.5" />
            <span class="text-slate-700 text-sm leading-relaxed">{{ problem }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Technologies -->
    <section class="bg-slate-50 py-16 md:py-24 border-y border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <div class="flex items-center gap-3 mb-3">
            <LayersIcon :size="20" class="text-teal" />
            <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('serviceDetail.techLabel') }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{{ t('serviceDetail.techTitle') }}</h2>
        </div>

        <div v-animate.delay-100 class="flex flex-wrap gap-3">
          <span
            v-for="(tech, i) in service.technologies"
            :key="i"
            class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <div class="flex items-center gap-3 mb-3">
            <ZapIcon :size="20" class="text-teal" />
            <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('serviceDetail.useCasesLabel') }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{{ t('serviceDetail.useCasesTitle') }}</h2>
        </div>

        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(useCase, i) in useCases"
            :key="i"
            class="bg-slate-50 rounded-2xl border border-slate-100 p-7"
          >
            <div class="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center mb-4">
              <span class="text-teal font-bold text-sm">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ useCase.title }}</h3>
            <p class="text-sm text-slate-600 leading-relaxed">{{ useCase.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-navy py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div v-animate>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">{{ t('serviceDetail.ctaTitle') }}</h2>
          <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            {{ t('serviceDetail.ctaSubtitle', { service: title.toLowerCase() }) }}
          </p>
          <router-link
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-teal/20"
          >
            {{ ctaText }}
            <ArrowRightIcon :size="16" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Prev / Next Navigation -->
    <section class="bg-white border-t border-slate-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <router-link
            v-if="prevService"
            :to="`/services/${prevService.slug}`"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal transition-colors"
          >
            <ArrowLeftIcon :size="14" />
            {{ prevTitle }}
          </router-link>
          <div v-else />

          <router-link
            v-if="nextService"
            :to="`/services/${nextService.slug}`"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal transition-colors"
          >
            {{ nextTitle }}
            <ArrowRightIcon :size="14" />
          </router-link>
          <div v-else />
        </div>
      </div>
    </section>
  </div>
</template>
