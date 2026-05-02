<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TargetIcon,
  LayersIcon,
  ZapIcon,
} from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { services, serviceKeys } from '../data/services'
import { useSeo } from '../composables/seo'

const route = useRoute()
const router = useRouter()

const scrollToHome = (e: Event, sectionId: string) => {
  e.preventDefault()
  router.push('/').then(() => {
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  })
}

const slug = computed(() => route.params.slug as string)
const service = computed(() => (slug.value ? services[slug.value] : null))

const currentIndex = computed(() => (service.value ? serviceKeys.indexOf(service.value.slug) : -1))
const prevService = computed(() =>
  currentIndex.value > 0 ? services[serviceKeys[currentIndex.value - 1]] : null
)
const nextService = computed(() =>
  currentIndex.value < serviceKeys.length - 1 ? services[serviceKeys[currentIndex.value + 1]] : null
)

const mounted = ref(false)
onMounted(() => requestAnimationFrame(() => { mounted.value = true }))

useSeo({
  title: () => (service.value ? `${service.value.title} — ${service.value.tagline}` : 'Service Not Found'),
  description: () => service.value?.description ?? 'The requested service could not be found.',
  path: () => (service.value ? `/services/${service.value.slug}` : '/services'),
  noindex: () => !service.value,
  jsonLd: () =>
    service.value
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.value.title,
            description: service.value.description,
            serviceType: service.value.title,
            url: `https://integerant.com/services/${service.value.slug}`,
            provider: {
              '@type': 'Organization',
              name: 'Integrant',
              url: 'https://integerant.com/',
            },
            areaServed: 'Worldwide',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${service.value.title} Capabilities`,
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
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://integerant.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Services',
                item: 'https://integerant.com/#services',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: service.value.title,
                item: `https://integerant.com/services/${service.value.slug}`,
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
      <h1 class="text-2xl font-bold text-slate-900 mb-4">Service Not Found</h1>
      <p class="text-slate-600 mb-6">The service you're looking for doesn't exist.</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl transition-colors"
      >
        <ArrowLeftIcon :size="16" />
        Back to Home
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
          <a
            href="#services"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 mb-6 transition-colors"
            @click="scrollToHome($event, 'services')"
          >
            <ArrowLeftIcon :size="14" />
            All Services
          </a>

          <div class="flex items-start gap-5 mb-6">
            <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <component :is="service.icon" :size="28" class="text-blue-600" />
            </div>
            <div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                {{ service.title }}
              </h1>
              <p class="mt-2 text-lg sm:text-xl text-slate-600">{{ service.tagline }}</p>
            </div>
          </div>

          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl">{{ service.description }}</p>
        </div>
      </div>
    </section>

    <!-- Problems We Solve -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <div class="flex items-center gap-3 mb-3">
            <TargetIcon :size="20" class="text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Problems We Solve</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Is this you?</h2>
        </div>

        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(problem, i) in service.problems"
            :key="i"
            class="flex items-start gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <CheckCircleIcon :size="20" class="text-blue-500 flex-shrink-0 mt-0.5" />
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
            <LayersIcon :size="20" class="text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Technologies &amp; Tools</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">What we work with</h2>
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
            <ZapIcon :size="20" class="text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Example Use Cases</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">How we've helped</h2>
        </div>

        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(useCase, i) in service.useCases"
            :key="i"
            class="bg-slate-50 rounded-2xl border border-slate-100 p-7"
          >
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span class="text-blue-700 font-bold text-sm">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ useCase.title }}</h3>
            <p class="text-sm text-slate-600 leading-relaxed">{{ useCase.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-slate-900 py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div v-animate>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Let's discuss how our {{ service.title.toLowerCase() }} services can help your business grow.
          </p>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-blue-600/20"
            @click="scrollToHome($event, 'contact')"
          >
            {{ service.ctaText }}
            <ArrowRightIcon :size="16" />
          </a>
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
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeftIcon :size="14" />
            {{ prevService.title }}
          </router-link>
          <div v-else />

          <router-link
            v-if="nextService"
            :to="`/services/${nextService.slug}`"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            {{ nextService.title }}
            <ArrowRightIcon :size="14" />
          </router-link>
          <div v-else />
        </div>
      </div>
    </section>
  </div>
</template>
