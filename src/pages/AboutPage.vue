<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AboutSection from '../components/AboutSection.vue'
import { useSeo } from '../composables/seo'

const { t } = useI18n()

useSeo({
  title: 'About BunyanX',
  description: 'Learn about BunyanX — our team, values, and how we partner with startups and growing businesses to build scalable software.',
  path: '/about',
})
</script>

<template>
  <div class="pt-20">
    <!-- Immediate hero — no animation so it's always visible -->
    <section class="bg-slate-50 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('about.label') }}</span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl">
          {{ t('about.title') }}
        </h1>
      </div>
    </section>
    <AboutSection />
  </div>
</template>
