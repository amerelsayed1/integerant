<script setup lang="ts">
import { computed } from 'vue'
import {
  LayersIcon,
  UserCheckIcon,
  ZapIcon,
  EyeIcon,
  TrendingUpIcon,
  GlobeIcon,
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'

const { t, tm } = useI18n()

const icons = [LayersIcon, UserCheckIcon, ZapIcon, EyeIcon, TrendingUpIcon, GlobeIcon]
type WhyItem = { title: string; description: string }
const items = computed<WhyItem[]>(() => {
  const val = tm('whyUs.items') as unknown
  return Array.isArray(val) ? (val as WhyItem[]) : []
})
</script>

<template>
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-16">
        <span class="text-sm font-semibold uppercase tracking-wider" style="color: #C5A15A">{{ t('whyUs.label') }}</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold tracking-tight" style="color: #0D1B3D">{{ t('whyUs.title') }}</h2>
        <p class="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">{{ t('whyUs.subtitle') }}</p>
      </div>

      <div v-animate.stagger class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="group relative rounded-2xl border border-slate-100 p-7 hover:border-[#0FA4A6]/30 hover:shadow-lg transition-all duration-300 bg-white overflow-hidden"
        >
          <!-- Number badge -->
          <div
            class="absolute top-5 ltr:right-6 rtl:left-6 text-5xl font-black opacity-[0.04] select-none leading-none"
            style="color: #0D1B3D"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </div>

          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
            style="background: #0FA4A610"
          >
            <component
              :is="icons[i]"
              :size="22"
              style="color: #0FA4A6"
            />
          </div>

          <h3 class="text-base font-semibold mb-2" style="color: #0D1B3D">{{ item.title }}</h3>
          <p class="text-sm text-slate-500 leading-relaxed">{{ item.description }}</p>

          <!-- Bottom accent line on hover -->
          <div
            class="absolute bottom-0 ltr:left-0 rtl:right-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
            style="background: linear-gradient(90deg, #0FA4A6, #C5A15A)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
