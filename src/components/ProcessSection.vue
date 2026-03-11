<script setup lang="ts">
import { computed } from 'vue'
import { SearchIcon, ClipboardListIcon, CodeIcon, TestTubeIcon, RocketIcon, HeadphonesIcon } from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useI18n } from '../i18n'

const { current } = useI18n()
const icons = [SearchIcon, ClipboardListIcon, CodeIcon, TestTubeIcon, RocketIcon, HeadphonesIcon]
const steps = computed(() => current.value.home.process.steps.map((s, i) => ({ ...s, icon: icons[i], label: `${current.value.common.step} ${i + 1}` })))
</script>

<template>
  <section id="process" class="py-20 md:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-16">
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">{{ current.home.process.eyebrow }}</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{{ current.home.process.title }}</h2>
        <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{{ current.home.process.subtitle }}</p>
      </div>

      <div class="relative">
        <div class="hidden lg:block absolute top-[52px] left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-0.5 bg-slate-200" />
        <div v-animate.stagger class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          <div v-for="step in steps" :key="step.title" class="flex flex-col items-center text-center">
            <div class="relative z-10 w-[52px] h-[52px] bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm"><component :is="step.icon" :size="20" class="text-blue-600" /></div>
            <span class="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">{{ step.label }}</span>
            <h3 class="text-base font-semibold text-slate-900 mb-1.5">{{ step.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed max-w-[180px]">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
