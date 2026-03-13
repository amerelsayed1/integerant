<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
import { serviceKeys, services, localizeText } from '../data/services'
import { useI18n } from '../i18n'

const { current, locale } = useI18n()
</script>

<template>
  <div class="pt-24 pb-16">
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ current.servicesPage.title }}</h1>
      <p class="text-lg text-slate-600 max-w-3xl">{{ current.servicesPage.subtitle }}</p>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="key in serviceKeys"
          :key="key"
          :to="`/services/${key}`"
          class="group bg-white rounded-2xl border border-slate-200 p-7 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <component :is="services[key].icon" :size="22" class="text-blue-600 mb-4" />
          <h2 class="text-lg font-semibold text-slate-900 mb-2">{{ localizeText(services[key].title, locale) }}</h2>
          <p class="text-slate-600 text-sm mb-4">{{ localizeText(services[key].tagline, locale) }}</p>
          <span class="inline-flex items-center gap-1 text-blue-700 text-sm font-medium">
            {{ current.nav.services }} <ArrowRightIcon :size="14" />
          </span>
        </router-link>
      </div>
    </section>
  </div>
</template>
