<script setup lang="ts">
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-vue-next'
import { services, serviceKeys, localizeText } from '../data/services'
import { useI18n } from '../i18n'

const { current, locale } = useI18n()
const featuredServices = serviceKeys.slice(0, 4)
</script>

<template>
  <div class="pt-20">
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">{{ current.home.badge }}</span>
        <h1 class="mt-4 text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight max-w-4xl">{{ current.home.title }}</h1>
        <p class="mt-6 text-lg text-slate-600 max-w-3xl leading-relaxed">{{ current.home.subtitle }}</p>
        <div class="mt-8 flex flex-wrap gap-4">
          <router-link to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-medium">
            {{ current.common.ctaPrimary }}
            <ArrowRightIcon :size="16" />
          </router-link>
          <router-link to="/services" class="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 hover:text-blue-700 rounded-xl font-medium">
            {{ current.common.ctaSecondary }}
          </router-link>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 py-14 border-y border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">{{ current.home.whyTitle }}</h2>
        <div class="grid gap-4 md:grid-cols-3">
          <div v-for="(item, i) in current.home.whyItems" :key="i" class="bg-white rounded-xl border border-slate-200 p-5 flex gap-3">
            <CheckCircleIcon :size="18" class="text-blue-600 mt-0.5 flex-shrink-0" />
            <p class="text-slate-700 text-sm leading-relaxed">{{ item }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-slate-900">{{ current.home.servicesTitle }}</h2>
          <router-link to="/services" class="text-blue-700 font-medium">{{ current.nav.services }}</router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <router-link v-for="key in featuredServices" :key="key" :to="`/services/${key}`" class="p-5 border border-slate-200 rounded-xl hover:border-blue-200 hover:shadow-sm">
            <component :is="services[key].icon" :size="20" class="text-blue-600 mb-3" />
            <h3 class="font-semibold text-slate-900 mb-1">{{ localizeText(services[key].title, locale) }}</h3>
            <p class="text-sm text-slate-600">{{ localizeText(services[key].tagline, locale) }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <section class="bg-slate-900 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">{{ current.home.finalCtaTitle }}</h2>
        <p class="text-slate-300 mb-8">{{ current.home.finalCtaText }}</p>
        <router-link to="/contact" class="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium">
          {{ current.nav.getStarted }} <ArrowRightIcon :size="16" />
        </router-link>
      </div>
    </section>
  </div>
</template>
