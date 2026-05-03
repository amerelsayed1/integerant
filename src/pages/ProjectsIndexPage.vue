<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useSeo } from '../composables/seo'
import { useProjectsStore } from '../stores/projects'

const { list: projectList } = useProjectsStore()

useSeo({
  title: 'Case Studies & Client Projects',
  description:
    'Selected case studies of web, mobile, and SaaS products Integrant has shipped — including measurable outcomes, technologies used, and the services applied.',
  path: '/projects',
  jsonLd: computed(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projects',
      url: 'https://integerant.com/projects',
      description:
        'Case studies of products Integrant has designed, built, and shipped for startups and growing businesses.',
      isPartOf: { '@type': 'WebSite', name: 'Integrant', url: 'https://integerant.com/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Integrant Projects',
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
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">Our work</span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl">
          Selected case studies from products we have shipped
        </h1>
        <p class="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
          A small sample of the work we have delivered for startups and growing businesses across
          logistics, fintech, health, and B2B SaaS. Every case study includes the problem, our
          approach, and the measurable outcomes.
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
            class="group block bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
          >
            <div class="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
              <span class="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md">{{ project.industry }}</span>
              <span>{{ project.year }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.duration }}</span>
            </div>
            <h2 class="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
              {{ project.title }}
            </h2>
            <p class="text-slate-600 leading-relaxed text-sm mb-5">{{ project.summary }}</p>

            <div class="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-slate-100">
              <div v-for="(metric, i) in project.metrics" :key="i" class="text-center">
                <div class="text-base font-bold text-slate-900">{{ metric.value }}</div>
                <div class="text-[11px] text-slate-500 mt-0.5 leading-tight">{{ metric.label }}</div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="service in project.services"
                  :key="service.slug"
                  class="text-[11px] font-medium text-slate-600 bg-slate-100 rounded px-2 py-0.5"
                >
                  {{ service.label }}
                </span>
              </div>
              <span class="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 group-hover:gap-2.5 transition-all duration-200">
                Read case study <ArrowRightIcon :size="14" />
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-slate-900 py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Want to be the next case study?</h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Tell us about your product. We will reply within one business day with a discovery plan.
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
