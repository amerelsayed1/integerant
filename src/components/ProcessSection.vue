<script setup lang="ts">
import {
  SearchIcon, ClipboardListIcon, CodeIcon,
  TestTubeIcon, RocketIcon, HeadphonesIcon,
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'

const { t } = useI18n()

const stepKeys = ['discovery', 'planning', 'development', 'testing', 'delivery', 'support'] as const
const stepIcons = [SearchIcon, ClipboardListIcon, CodeIcon, TestTubeIcon, RocketIcon, HeadphonesIcon]
</script>

<template>
  <section id="process" class="py-20 md:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-16">
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">{{ t('process.label') }}</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{{ t('process.title') }}</h2>
        <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{{ t('process.subtitle') }}</p>
      </div>

      <div class="relative">
        <div class="hidden lg:block absolute top-[52px] left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-0.5 bg-slate-200" />
        <div v-animate.stagger class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          <div v-for="(key, i) in stepKeys" :key="key" class="flex flex-col items-center text-center">
            <div class="relative z-10 w-[52px] h-[52px] bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <component :is="stepIcons[i]" :size="20" class="text-blue-600" />
            </div>
            <span class="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">{{ t(`process.steps.${key}.label`) }}</span>
            <h3 class="text-base font-semibold text-slate-900 mb-1.5">{{ t(`process.steps.${key}.title`) }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed max-w-[180px]">{{ t(`process.steps.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
