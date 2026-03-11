<script setup lang="ts">
import { useI18n } from '../i18n'

const { current } = useI18n()
</script>

<template>
  <div class="pt-24 pb-16">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-slate-900 mb-6">{{ current.about.title }}</h1>
      <p class="text-lg text-slate-600 leading-relaxed mb-10">{{ current.about.intro }}</p>

      <div class="grid md:grid-cols-2 gap-6 mb-10">
        <div class="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 class="text-xl font-semibold text-slate-900 mb-3">{{ current.about.missionTitle }}</h2>
          <p class="text-slate-600">{{ current.about.mission }}</p>
        </div>
        <div class="p-6 rounded-2xl border border-slate-200 bg-white">
          <h2 class="text-xl font-semibold text-slate-900 mb-3">{{ current.about.visionTitle }}</h2>
          <p class="text-slate-600">{{ current.about.vision }}</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mb-4">{{ current.about.valuesTitle }}</h2>
      <div class="flex flex-wrap gap-3 mb-10">
        <span v-for="value in current.about.values" :key="value" class="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">{{ value }}</span>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900 text-white">
        <h2 class="text-2xl font-bold mb-3">{{ current.about.teamTitle }}</h2>
        <p class="text-slate-300 leading-relaxed">{{ current.about.teamText }}</p>
      </div>
    </section>
  </div>
</template>
