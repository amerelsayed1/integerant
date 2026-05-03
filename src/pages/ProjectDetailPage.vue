<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SmartphoneIcon,
  AppleIcon,
  ExternalLinkIcon,
} from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useProjectsStore } from '../stores/projects'
import { useSeo } from '../composables/seo'
import { getIcon } from '../data/serviceIcons'
import ProjectScreenMockup from '../components/ProjectScreenMockup.vue'

const { t, tm } = useI18n()
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

type Stat = { value: string; label: string }
type Feature = { title: string; description: string }
type Phase = { title: string; description: string }

const stats = computed<Stat[]>(() => {
  if (!project.value) return []
  const val = tm(`projects.items.${project.value.slug}.stats`) as unknown
  return Array.isArray(val) ? (val as Stat[]) : []
})
const features = computed<Feature[]>(() => {
  if (!project.value) return []
  const val = tm(`projects.items.${project.value.slug}.features`) as unknown
  return Array.isArray(val) ? (val as Feature[]) : []
})
const challengeBullets = computed<string[]>(() => {
  if (!project.value) return []
  const val = tm(`projects.items.${project.value.slug}.challengeBullets`) as unknown
  return Array.isArray(val) ? (val as string[]) : []
})
const solutionBullets = computed<string[]>(() => {
  if (!project.value) return []
  const val = tm(`projects.items.${project.value.slug}.solutionBullets`) as unknown
  return Array.isArray(val) ? (val as string[]) : []
})
const phases = computed<Phase[]>(() => {
  if (!project.value) return []
  const val = tm(`projects.items.${project.value.slug}.phases`) as unknown
  return Array.isArray(val) ? (val as Phase[]) : []
})

const isWebProject = computed(() => project.value?.platforms?.includes('Web') ?? false)

const mounted = ref(false)
onMounted(() => requestAnimationFrame(() => { mounted.value = true }))

useSeo({
  title: () => project.value ? t(`projects.items.${project.value.slug}.title`) : 'Case Study Not Found',
  description: () => project.value ? t(`projects.items.${project.value.slug}.summary`) : 'The requested case study could not be found.',
  path: () => (project.value ? `/projects/${project.value.slug}` : '/projects'),
  type: () => (project.value ? 'article' : 'website'),
  noindex: () => !project.value,
  jsonLd: () =>
    project.value
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: t(`projects.items.${project.value!.slug}.title`),
            description: t(`projects.items.${project.value!.slug}.summary`),
            url: `https://integerant.com/projects/${project.value!.slug}`,
            articleSection: 'Case Study',
            about: project.value!.industry,
            datePublished: `${project.value!.year}-01-01`,
            author: { '@type': 'Organization', name: 'Integerant', url: 'https://integerant.com/' },
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
                name: t(`projects.items.${project.value!.slug}.title`),
                item: `https://integerant.com/projects/${project.value!.slug}`,
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
      <h1 class="text-2xl font-bold text-slate-900 mb-4">{{ t('projectsPage.notFound') }}</h1>
      <p class="text-slate-600 mb-6">{{ t('projectsPage.notFoundDesc') }}</p>
      <router-link
        to="/projects"
        class="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal/90 text-white font-medium rounded-xl transition-colors"
      >
        <ArrowLeftIcon :size="16" />
        {{ t('projectsPage.backToProjects') }}
      </router-link>
    </div>
  </div>

  <article v-else class="pt-20">

    <!-- ① Hero -->
    <section
      class="relative overflow-hidden"
      :style="`background: linear-gradient(160deg, ${project.coverFrom} 0%, ${project.coverTo} 100%)`"
    >
      <!-- dot pattern -->
      <svg class="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots-hero" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.5" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-hero)"/>
      </svg>

      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <!-- top bar -->
        <div
          class="transition-all duration-500 ease-out flex flex-wrap items-center gap-2 mb-10"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <router-link
            to="/projects"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors me-2"
          >
            <ArrowLeftIcon :size="12" />
            {{ t('projectsPage.allProjects') }}
          </router-link>

          <span class="px-2.5 py-1 bg-white/15 rounded-full text-xs font-semibold text-white">
            {{ project.year }}
          </span>
          <span
            v-for="platform in project.platforms"
            :key="platform"
            class="px-2.5 py-1 bg-white/15 rounded-full text-xs font-semibold text-white"
          >
            {{ platform }}
          </span>
          <span class="px-2.5 py-1 bg-white/15 rounded-full text-xs font-semibold text-white">
            {{ project.industry }}
          </span>
        </div>

        <!-- two-column layout for web, single for mobile -->
        <div
          class="transition-all duration-500 delay-100 ease-out flex gap-10 items-center"
          :class="[mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4', isWebProject ? 'flex-col lg:flex-row-reverse' : 'flex-col']"
        >
          <!-- Browser illustration for web projects -->
          <div v-if="isWebProject" class="flex-none w-full lg:w-[340px] xl:w-[400px]">
            <div
              class="w-full rounded-xl border border-white/20 shadow-2xl overflow-hidden"
              style="aspect-ratio: 16/10"
              :style="{ background: 'rgba(0,0,0,0.35)' }"
            >
              <div class="flex items-center gap-1.5 px-3 py-2 border-b border-white/10" style="background: rgba(0,0,0,0.3)">
                <div class="w-2 h-2 rounded-full bg-red-400/60" />
                <div class="w-2 h-2 rounded-full bg-yellow-400/60" />
                <div class="w-2 h-2 rounded-full bg-green-400/60" />
                <div class="flex-1 mx-2 h-4 rounded px-2 flex items-center" style="background: rgba(255,255,255,0.1)">
                  <div class="h-1 rounded w-2/3" style="background: rgba(255,255,255,0.3)" />
                </div>
              </div>
              <div class="p-3 flex flex-col gap-2 h-[calc(100%-32px)]">
                <div class="h-8 rounded-lg w-full" style="background: rgba(255,255,255,0.08)" />
                <div class="flex gap-2 flex-1">
                  <div class="w-1/3 rounded-lg" style="background: rgba(255,255,255,0.05)" />
                  <div class="flex-1 flex flex-col gap-2">
                    <div class="h-5 rounded w-3/4" style="background: rgba(255,255,255,0.1)" />
                    <div class="h-3 rounded w-full" style="background: rgba(255,255,255,0.07)" />
                    <div class="h-3 rounded w-5/6" style="background: rgba(255,255,255,0.05)" />
                    <div class="mt-auto flex gap-2">
                      <div v-for="i in 3" :key="i" class="h-10 flex-1 rounded-lg" style="background: rgba(255,255,255,0.08)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Text content -->
          <div :class="isWebProject ? 'flex-1' : 'max-w-2xl'">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
              {{ t(`projects.items.${project.slug}.heroHeadline`) }}
            </h1>
            <p class="text-base sm:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              {{ t(`projects.items.${project.slug}.heroSubtitle`) }}
            </p>

            <!-- CTA buttons -->
            <div class="flex flex-wrap gap-3">
              <a
                v-if="project.playStoreUrl"
                :href="project.playStoreUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-900 font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors shadow-lg"
              >
                <SmartphoneIcon :size="16" />
                Google Play
              </a>
              <a
                v-if="project.appStoreUrl"
                :href="project.appStoreUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 bg-white/15 border border-white/30 text-white font-semibold rounded-xl text-sm hover:bg-white/25 transition-colors"
              >
                <AppleIcon :size="16" />
                App Store
              </a>
              <a
                v-if="project.externalUrl && !project.appStoreUrl"
                :href="project.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-900 font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors shadow-lg"
              >
                <ExternalLinkIcon :size="16" />
                {{ t('projectsPage.visitSiteLink') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ② Stats bar -->
    <section v-if="stats.length" class="bg-white border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap divide-x divide-slate-100 rtl:divide-x-reverse">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="flex flex-col items-center justify-center px-6 py-5 flex-1 min-w-[120px] text-center"
          >
            <div class="text-sm font-bold text-slate-900">{{ stat.value }}</div>
            <div class="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ Context: Challenge + Solution -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <span class="text-xs font-semibold text-gold uppercase tracking-widest">CONTEXT</span>
          <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {{ t(`projects.items.${project.slug}.contextSectionTitle`) }}
          </h2>
        </div>

        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Challenge -->
          <div>
            <h3 class="text-base font-semibold text-slate-900 mb-4">
              {{ t(`projects.items.${project.slug}.challengeTitle`) }}
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(bullet, i) in challengeBullets"
                :key="i"
                class="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
              >
                <CheckCircleIcon :size="16" class="text-teal flex-shrink-0 mt-0.5" />
                {{ bullet }}
              </li>
            </ul>
          </div>

          <!-- Solution -->
          <div>
            <h3 class="text-base font-semibold text-slate-900 mb-4">
              {{ t(`projects.items.${project.slug}.solutionTitle`) }}
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(bullet, i) in solutionBullets"
                :key="i"
                class="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
              >
                <CheckCircleIcon :size="16" class="text-teal flex-shrink-0 mt-0.5" />
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ App Screens -->
    <section
      v-if="project.screens?.length"
      class="py-16 md:py-20 overflow-hidden"
      :style="`background: linear-gradient(160deg, ${project.coverFrom}ee 0%, ${project.coverTo}ee 100%)`"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <span class="text-xs font-semibold text-white/50 uppercase tracking-widest">
            {{ t(`projects.items.${project.slug}.featuresSectionLabel`) }}
          </span>
          <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {{ t(`projects.items.${project.slug}.featuresSectionTitle`) }}
          </h2>
          <p class="mt-2 text-sm text-white/60 max-w-xl">
            {{ t(`projects.items.${project.slug}.featuresSectionSubtitle`) }}
          </p>
        </div>

        <!-- Grid layout for web/browser screens -->
        <div v-if="isWebProject" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProjectScreenMockup
            v-for="(screen, i) in project.screens"
            :key="i"
            :screen="screen"
            :index="i"
            class="w-full"
          />
        </div>

        <!-- Horizontal scroll for phone screens -->
        <div
          v-else
          class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style="scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch"
        >
          <ProjectScreenMockup
            v-for="(screen, i) in project.screens"
            :key="i"
            :screen="screen"
            :index="i"
            class="snap-start flex-none"
          />
          <div class="flex-none w-4" />
        </div>
      </div>
    </section>

    <!-- ⑤ Feature cards -->
    <section v-if="features.length" class="bg-white py-16 md:py-20 border-b border-slate-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate.stagger class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="bg-slate-50 rounded-2xl border border-slate-100 p-6"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              :style="`background: ${project.coverTo}20`"
            >
              <component
                :is="getIcon(project.features?.[i]?.iconName ?? '')"
                :size="18"
                :style="`color: ${project.coverTo}`"
              />
            </div>
            <h3 class="text-sm font-semibold text-slate-900 mb-1.5">{{ feature.title }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ Tech stack -->
    <section class="bg-slate-50 border-y border-slate-100 py-16 md:py-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-8">
          <span class="text-xs font-semibold text-gold uppercase tracking-widest">
            {{ t(`projects.items.${project.slug}.techSectionLabel`) }}
          </span>
          <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {{ t(`projects.items.${project.slug}.techSectionTitle`) }}
          </h2>
          <p class="mt-2 text-sm text-slate-500 max-w-xl">
            {{ t(`projects.items.${project.slug}.techSectionSubtitle`) }}
          </p>
        </div>

        <div v-animate.delay-100 class="flex flex-wrap gap-2">
          <span
            v-for="(tech, i) in project.technologies"
            :key="i"
            class="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm"
          >
            {{ tech }}
          </span>
          <span
            v-for="platform in project.platforms"
            :key="platform"
            class="px-3.5 py-1.5 rounded-lg text-sm font-medium text-white shadow-sm"
            :style="`background: linear-gradient(90deg, ${project.coverFrom}, ${project.coverTo})`"
          >
            {{ platform }}
          </span>
        </div>
      </div>
    </section>

    <!-- ⑦ Timeline -->
    <section v-if="phases.length" class="bg-white py-16 md:py-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate class="mb-10">
          <span class="text-xs font-semibold text-gold uppercase tracking-widest">
            {{ t(`projects.items.${project.slug}.timelineSectionLabel`) }}
          </span>
          <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {{ t(`projects.items.${project.slug}.timelineSectionTitle`) }}
          </h2>
        </div>

        <div v-animate.stagger class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div
            v-for="(phase, i) in phases"
            :key="i"
            class="relative bg-slate-50 rounded-2xl border border-slate-100 p-6 overflow-hidden"
          >
            <!-- big phase number watermark -->
            <div
              class="absolute -top-2 ltr:-right-1 rtl:-left-1 text-7xl font-black opacity-[0.05] leading-none select-none"
              :style="`color: ${project.coverTo}`"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </div>

            <div class="relative">
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span
                  class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                  :style="`background: linear-gradient(90deg, ${project.coverFrom}, ${project.coverTo})`"
                >
                  {{ project.timeline?.[i]?.phase }}
                </span>
                <span class="text-[10px] text-slate-400 font-medium">
                  {{ project.timeline?.[i]?.weeks }}
                </span>
              </div>
              <h3 class="text-sm font-semibold text-slate-900 mb-2">{{ phase.title }}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{{ phase.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑧ CTA -->
    <section class="bg-navy py-16 md:py-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div v-animate>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">{{ t('projectsPage.ctaDetailTitle') }}</h2>
          <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            {{ t('projectsPage.ctaDetailSubtitle') }}
          </p>
          <router-link
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal/90 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-teal/20"
          >
            {{ t('projectsPage.ctaCta') }}
            <ArrowRightIcon :size="16" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- ⑨ Back + Prev/Next -->
    <section class="bg-white border-t border-slate-200 py-8">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center gap-4">
          <router-link
            v-if="prevProject"
            :to="`/projects/${prevProject.slug}`"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal transition-colors"
          >
            <ArrowLeftIcon :size="14" />
            <span class="line-clamp-1">{{ t(`projects.items.${prevProject.slug}.title`) }}</span>
          </router-link>
          <router-link
            v-else
            to="/projects"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal transition-colors"
          >
            <ArrowLeftIcon :size="14" />
            {{ t('projectsPage.allProjects') }}
          </router-link>

          <router-link
            v-if="nextProject"
            :to="`/projects/${nextProject.slug}`"
            class="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal transition-colors"
          >
            <span class="line-clamp-1">{{ t(`projects.items.${nextProject.slug}.title`) }}</span>
            <ArrowRightIcon :size="14" />
          </router-link>
          <div v-else />
        </div>
      </div>
    </section>

  </article>
</template>
