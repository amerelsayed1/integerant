<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  ShieldCheckIcon,
  WalletIcon,
  LayoutDashboardIcon,
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'
import { useSeo } from '../composables/seo'
import { useProjectsStore } from '../stores/projects'

const { t } = useI18n()
const { list: projectList } = useProjectsStore()

const iconMap: Record<string, unknown> = {
  saferoute: ShieldCheckIcon,
  floosi: WalletIcon,
  operix: LayoutDashboardIcon,
}

useSeo({
  title: 'Case Studies & Client Projects',
  description:
    'Selected case studies of web, mobile, and SaaS products Integerant has shipped — including measurable outcomes, technologies used, and the services applied.',
  path: '/projects',
  jsonLd: computed(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projects',
      url: 'https://integerant.com/projects',
      description:
        'Case studies of products Integerant has designed, built, and shipped for startups and growing businesses.',
      isPartOf: { '@type': 'WebSite', name: 'Integerant', url: 'https://integerant.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Integerant Projects',
      itemListElement: projectList.value.map((project, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://integerant.com/projects/${project.slug}`,
        name: project.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://integerant.com/' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://integerant.com/projects' },
      ],
    },
  ]),
})
</script>

<template>
  <article class="pt-20">
    <!-- Hero -->
    <section class="bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('projectsPage.label') }}</span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl">
          {{ t('projectsPage.heroTitle') }}
        </h1>
        <p class="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
          {{ t('projectsPage.heroSubtitle') }}
        </p>
      </div>
    </section>

    <!-- Project grid -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <router-link
            v-for="project in projectList"
            :key="project.slug"
            :to="`/projects/${project.slug}`"
            class="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10 cursor-pointer"
          >
            <!-- Colored header -->
            <div
              class="relative flex flex-col items-center justify-center px-7 pt-10 pb-8 text-center flex-shrink-0"
              :style="`background: linear-gradient(135deg, ${project.coverFrom}, ${project.coverTo})`"
            >
              <!-- Subtle dot pattern -->
              <svg class="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="1.5" fill="white"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)"/>
              </svg>

              <!-- Icon box -->
              <div
                class="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                :style="`background: ${project.iconBg}`"
              >
                <component :is="iconMap[project.slug]" :size="28" :style="{ color: project.iconColor }" />
              </div>

              <!-- Title -->
              <h2 class="relative text-2xl font-bold text-white tracking-tight mb-3">{{ t(`projects.items.${project.slug}.title`) }}</h2>

              <!-- Summary -->
              <p class="relative text-sm text-white/75 leading-relaxed">{{ t(`projects.items.${project.slug}.summary`) }}</p>
            </div>

            <!-- White footer -->
            <div class="flex items-center justify-between gap-3 px-6 py-4 bg-white border-t border-slate-100">
              <!-- Service tags -->
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="service in project.services"
                  :key="service.slug"
                  class="text-[10px] font-medium text-slate-500 bg-slate-100 rounded-md px-2 py-0.5"
                >
                  {{ t(`services.items.${service.slug}.title`) }}
                </span>
              </div>

              <!-- CTA -->
              <a
                v-if="project.externalUrl"
                :href="project.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-none inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:gap-2.5 transition-all duration-200 whitespace-nowrap"
                @click.stop
              >
                {{ t('projectsPage.visitSiteLink') }}
                <ExternalLinkIcon :size="12" />
              </a>
              <span
                v-else
                class="flex-none inline-flex items-center gap-1.5 text-xs font-semibold text-teal group-hover:gap-2.5 transition-all duration-200 whitespace-nowrap"
              >
                {{ t('projectsPage.caseStudyLink') }}
                <ArrowRightIcon :size="12" />
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-navy py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">{{ t('projectsPage.ctaTitle') }}</h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          {{ t('projectsPage.ctaSubtitle') }}
        </p>
        <router-link
          to="/contact"
          class="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal/90 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg shadow-teal/20"
        >
          {{ t('projectsPage.ctaCta') }}
          <ArrowRightIcon :size="16" />
        </router-link>
      </div>
    </section>
  </article>
</template>
