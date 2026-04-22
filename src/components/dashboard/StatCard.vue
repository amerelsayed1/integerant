<script setup lang="ts">
import { computed, type Component } from 'vue'
import { ArrowUpRightIcon, ArrowDownRightIcon } from 'lucide-vue-next'

const props = defineProps<{
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: Component
  accent: 'blue' | 'emerald' | 'amber' | 'violet'
}>()

const accentClasses = computed(() => {
  const map = {
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    violet: 'bg-violet-50 text-violet-700',
  }
  return map[props.accent]
})

const trendClasses = computed(() =>
  props.trend === 'up'
    ? 'text-emerald-700 bg-emerald-50'
    : 'text-rose-700 bg-rose-50',
)
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
    <div class="flex items-start justify-between">
      <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', accentClasses]">
        <component :is="icon" :size="20" />
      </div>
      <span :class="['inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full', trendClasses]">
        <component :is="trend === 'up' ? ArrowUpRightIcon : ArrowDownRightIcon" :size="12" />
        {{ Math.abs(change).toFixed(1) }}%
      </span>
    </div>
    <p class="mt-4 text-sm text-slate-500">{{ label }}</p>
    <p class="mt-1 text-2xl font-semibold text-slate-900 tracking-tight">{{ value }}</p>
  </div>
</template>
