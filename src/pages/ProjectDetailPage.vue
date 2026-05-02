<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TargetIcon,
  LayersIcon,
  TrendingUpIcon,
  WrenchIcon,
} from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useProjectsStore } from '../stores/projects'
import { useSeo } from '../composables/seo'

const route = useRoute()
const { list, bySlug } = useProjectsStore()

const slug = computed(() => route.params.slug as string)
const project = computed(() => (slug.value ? bySlug(slug.value) : null))

const currentIndex = computed(() =>
  project.value ? list.value.findIndex((p) => p.slug === project.value!.slug) : -1
)
const prevProject = computed(() =>
  currentIndex.value > 0 ? list.value[currentIndex.value - 1] : null
)
const nextProject = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < list.value.length - 1
    ? list.value[currentIndex.value + 1]
    : null
)

const mounted = ref(false)
onMounted(() => requestAnimationFrame(() => { mounted.value = true }))

useSeo({
  title: () => project.value?.title ?? 'Case Study Not Found',
  description: () => project.value?.summary ?? 'The requested case study could not be found.',
  path: () => (project.value ? `/projects/${project.value.slug}` : '/projects'),
  type: () => (project.value ? 'article' : 'website'),
  noindex: () => !project.value,
  jsonLd: () =>
    project.value
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `https://integerant.com/projects/${project.value.slug}#article`,
            headline: project.value.title,
            description: project.value.summary,
            url: `https://integerant.com/projects/${project.value.slug}`,
            articleSection: 'Case Study',
            about: project.value.industry,
            datePublished: `${project.value.year}-01-01`,
            author: { '@type': 'Organization', name: 'Integrant', url: 'https://integerant.com/' },
            publisher: {
              '@type': 'Organization',
              name: 'Integrant',
              logo: { '@type': 'ImageObject', url: 'https://integerant.com/og-image.svg' },
            },
            mentions: project.value.services.map((s) => ({
              '@type': 'Service',
              name: s.label,
              url: `https://integerant.com/services/${s.slug}`,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://integerant.com/' },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://integerant.com/projects' },
              {
                '@type': 'ListItem',
                position: 3,
                name: project.value.title,
                item: `https://integerant.com/projects/${project.value.slug}`,
              },
            ],
          },
        ]
      : null,
})
</script>

<template>
  <!-- Not Found -->
  <div v-if="!project" class="min-h-screen flex items-center justify-center bg-white">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-slate-900 mb-4">Case Study Not Found</h1>
      <p class="text-slate-600 mb-6">The case study you're looking for doesn't exist.</p>
      <router-link
        to="/projects"
        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl transition-colors"
      >
        <ArrowLeftIcon :size="16" />
        Back to Projects
      </router-link>
    </div>
  </div>

  <!-- Detail -->
  <article v-else class="pt-20">
    <!-- Hero -->
    <section class="bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div
          class="transition-all duration-500 ease-out"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
        >
          <router-link
            to="/projects"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeftIcon :size="14" />
            All projects
          </router-link>

          <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
            <span class="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">{{ project.industry }}</span>
            <span>{{ project.year }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ project.duration }}</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-4xl">
            {{ project.title }}
          </h1>
          <p class="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">{{ project.summary }}</p>

          <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <div
              v-for="(metric, i) in project.metrics"
              :key="i"
              class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >
              <div class="text-2xl font-bold text-slate-900">{{ metric.value }}</div>
              <div class="text-xs text-slate-500 mt-1">{{ metric.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Challenge -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate>
          <div class="flex items-center gap-3 mb-3">
            <TargetIcon :size="20" class="text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">The Challenge</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-5">
            What {{ project.client }} was up against
          </h2>
          <p class="text-slate-600 text-lg leading-relaxed">{{ project.challenge }}</p>
        </div>
      </div>
    </section>

    <!-- Solution -->
    <section class="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate>
          <div class="flex items-center gap-3 mb-3">
            <WrenchIcon :size="20" class="text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Our Approach</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-5">
            What we built
          </h2>
          <p class="text-slate-600 text-lg leading-relaxed">{{ project.solution }}</p>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate>
          <div class="flex items-center gap-3 mb-3">
            <TrendingUpIcon :size="20" class="text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Results</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-5">
            What changed for the business
          </h2>
          <p class="text-slate-600 text-lg leading-relaxed">{{ project.results }}</p>
        </div>
      </div>
    </section>

    <!-- Tech & services -->
    <section class="bg-slate-50 border-y border-slate-200 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <div class="flex items-center gap-3 mb-3">
            <LayersIcon :size="20" class="text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Stack &amp; Services</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Technology and services applied
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Technologies</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, i) in project.technologies"
                :key="i"
                class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Services delivered</h3>
            <ul class="space-y-2">
              <li v-for="service in project.services" :key="service.slug">
                <router-link
                  :to="`/services/${service.slug}`"
                  class="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium transition-colors"
                >
                  {{ service.label }}
                  <ArrowRightIcon :size="14" />
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-slate-900 py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Have a project like this?</h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          We'd love to hear about it. Tell us what you're building and we'll reply within one business day.
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

    <!-- Prev / Next -->
    <section class="bg-white border-t border-slate-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center gap-4">
          <router-link
            v-if="prevProject"
            :to="`/projects/${prevProject.slug}`"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeftIcon :size="14" />
            <span class="line-clamp-1">{{ prevProject.title }}</span>
          </router-link>
          <div v-else />

          <router-link
            v-if="nextProject"
            :to="`/projects/${nextProject.slug}`"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors text-right"
          >
            <span class="line-clamp-1">{{ nextProject.title }}</span>
            <ArrowRightIcon :size="14" />
          </router-link>
          <div v-else />
        </div>
      </div>
    </section>
  </article>
</template>
