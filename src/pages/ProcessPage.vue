<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProcessSection from '../components/ProcessSection.vue'
import { useSeo } from '../composables/seo'

const { t } = useI18n()

useSeo({
  title: () => t('seo.process'),
  description: 'How BunyanX works — discovery, planning, development, testing, delivery and ongoing support. A proven methodology that ensures quality every time.',
  path: '/process',
})
</script>

<template>
  <div class="pt-20">
    <!-- Immediate hero — no animation so it's always visible -->
    <section class="bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('process.label') }}</span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl">
          {{ t('process.title') }}
        </h1>
        <p class="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">
          {{ t('process.subtitle') }}
        </p>
      </div>
    </section>
    <ProcessSection />
  </div>
</template>
