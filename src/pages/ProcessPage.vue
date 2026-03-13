<script setup lang="ts">
import { useI18n } from '../i18n'

const { current } = useI18n()
</script>

<template>
  <div class="pt-24 pb-16">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ current.process.title }}</h1>
      <p class="text-lg text-slate-600 mb-10">{{ current.process.subtitle }}</p>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(step, i) in current.process.steps" :key="step.title" class="bg-white border border-slate-200 rounded-2xl p-6">
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mb-4">{{ i + 1 }}</div>
          <h2 class="text-lg font-semibold text-slate-900 mb-2">{{ step.title }}</h2>
          <p class="text-sm text-slate-600 leading-relaxed">{{ step.text }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
