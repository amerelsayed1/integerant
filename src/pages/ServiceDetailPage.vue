<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-vue-next'
import { services, serviceKeys, localizeArray, localizeText, localizeUseCases } from '../data/services'
import { useI18n } from '../i18n'

const route = useRoute()
const { locale, current } = useI18n()

const slug = computed(() => route.params.slug as string)
const service = computed(() => (slug.value ? services[slug.value] : null))
const currentIndex = computed(() => (service.value ? serviceKeys.indexOf(service.value.slug) : -1))
const prevService = computed(() => (currentIndex.value > 0 ? services[serviceKeys[currentIndex.value - 1]] : null))
const nextService = computed(() =>
  currentIndex.value < serviceKeys.length - 1 ? services[serviceKeys[currentIndex.value + 1]] : null
)
</script>

<template>
  <div v-if="!service" class="min-h-screen flex items-center justify-center bg-white pt-20">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-slate-900 mb-3">{{ current.serviceDetail.notFound }}</h1>
      <p class="text-slate-600 mb-6">{{ current.serviceDetail.notFoundText }}</p>
      <router-link to="/" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl">
        <ArrowLeftIcon :size="16" /> {{ current.serviceDetail.backHome }}
      </router-link>
    </div>
  </div>

  <div v-else class="pt-20">
    <section class="bg-slate-50 border-b border-slate-200 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <router-link to="/services" class="inline-flex items-center gap-1.5 text-sm text-blue-700 mb-5">
          <ArrowLeftIcon :size="14" /> {{ current.serviceDetail.allServices }}
        </router-link>
        <div class="flex items-start gap-5 mb-5">
          <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <component :is="service.icon" :size="28" class="text-blue-600" />
          </div>
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900">{{ localizeText(service.title, locale) }}</h1>
            <p class="mt-2 text-lg text-slate-600">{{ localizeText(service.tagline, locale) }}</p>
          </div>
        </div>
        <p class="text-lg text-slate-600 max-w-3xl">{{ localizeText(service.description, locale) }}</p>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
        <div class="p-6 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">{{ current.serviceDetail.included }}</h2>
          <ul class="space-y-3">
            <li v-for="item in localizeArray(service.included, locale)" :key="item" class="flex gap-2 text-slate-700 text-sm">
              <CheckCircleIcon :size="16" class="text-blue-600 mt-0.5" />{{ item }}
            </li>
          </ul>
        </div>
        <div class="p-6 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">{{ current.serviceDetail.whoFor }}</h2>
          <ul class="space-y-3">
            <li v-for="item in localizeArray(service.whoFor, locale)" :key="item" class="flex gap-2 text-slate-700 text-sm">
              <CheckCircleIcon :size="16" class="text-blue-600 mt-0.5" />{{ item }}
            </li>
          </ul>
        </div>
        <div class="p-6 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">{{ current.serviceDetail.benefits }}</h2>
          <ul class="space-y-3">
            <li v-for="item in localizeArray(service.benefits, locale)" :key="item" class="flex gap-2 text-slate-700 text-sm">
              <CheckCircleIcon :size="16" class="text-blue-600 mt-0.5" />{{ item }}
            </li>
          </ul>
        </div>
        <div class="p-6 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-semibold text-slate-900 mb-4">{{ current.serviceDetail.approach }}</h2>
          <ul class="space-y-3">
            <li v-for="item in localizeArray(service.approach, locale)" :key="item" class="flex gap-2 text-slate-700 text-sm">
              <CheckCircleIcon :size="16" class="text-blue-600 mt-0.5" />{{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="py-14 bg-slate-50 border-y border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-semibold text-slate-900 mb-4">{{ current.serviceDetail.technologies }}</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in service.technologies" :key="tech" class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">{{ tech }}</span>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-semibold text-slate-900 mb-6">{{ current.serviceDetail.useCases }}</h2>
        <div class="grid md:grid-cols-3 gap-5">
          <div v-for="useCase in localizeUseCases(service.useCases, locale)" :key="useCase.title" class="rounded-xl border border-slate-200 p-5">
            <h3 class="font-semibold text-slate-900 mb-2">{{ useCase.title }}</h3>
            <p class="text-sm text-slate-600">{{ useCase.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-slate-900 text-center">
      <h2 class="text-2xl font-bold text-white mb-4">{{ current.serviceDetail.ready }}</h2>
      <router-link to="/contact" class="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium">
        {{ localizeText(service.ctaText, locale) }} <ArrowRightIcon :size="16" />
      </router-link>
    </section>

    <section class="bg-white border-t border-slate-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <router-link v-if="prevService" :to="`/services/${prevService.slug}`" class="text-sm text-slate-600 hover:text-blue-700 inline-flex items-center gap-2">
          <ArrowLeftIcon :size="14" /> {{ current.serviceDetail.prev }}: {{ localizeText(prevService.title, locale) }}
        </router-link>
        <div v-else />
        <router-link v-if="nextService" :to="`/services/${nextService.slug}`" class="text-sm text-slate-600 hover:text-blue-700 inline-flex items-center gap-2">
          {{ current.serviceDetail.next }}: {{ localizeText(nextService.title, locale) }} <ArrowRightIcon :size="14" />
        </router-link>
      </div>
    </section>
  </div>
</template>
