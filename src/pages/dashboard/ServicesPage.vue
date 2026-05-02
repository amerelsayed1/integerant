<script setup lang="ts">
import { serviceBreakdown } from '../../data/dashboard'

const totalRevenue = serviceBreakdown.reduce((a, s) => a + s.revenue, 0)

const dotColor = (i: number) => {
  const colors = ['bg-blue-600', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-slate-400']
  return colors[i % colors.length]
}

const barColor = (i: number) => {
  const colors = ['bg-blue-600', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-slate-400']
  return colors[i % colors.length]
}
</script>

<template>
  <div class="space-y-5">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="text-sm text-slate-500">Total offerings</p>
        <p class="text-2xl font-semibold text-slate-900 mt-1">{{ serviceBreakdown.length }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="text-sm text-slate-500">Total projects</p>
        <p class="text-2xl font-semibold text-slate-900 mt-1">{{ serviceBreakdown.reduce((a, s) => a + s.projects, 0) }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="text-sm text-slate-500">Total revenue</p>
        <p class="text-2xl font-semibold text-slate-900 mt-1">${{ (totalRevenue / 1000).toFixed(1) }}k</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100">
        <h2 class="text-base font-semibold text-slate-900">Revenue by Service</h2>
        <p class="text-sm text-slate-500">Performance breakdown this month</p>
      </div>
      <ul class="divide-y divide-slate-100">
        <li v-for="(s, i) in serviceBreakdown" :key="s.slug" class="px-6 py-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2.5">
              <span :class="['w-2.5 h-2.5 rounded-full flex-shrink-0', dotColor(i)]" />
              <p class="font-medium text-slate-900 text-sm">{{ s.service }}</p>
            </div>
            <div class="flex items-center gap-6 text-sm text-slate-600">
              <span>{{ s.projects }} proj</span>
              <span class="font-semibold text-slate-900 tabular-nums w-16 text-right">${{ (s.revenue / 1000).toFixed(1) }}k</span>
              <span class="w-8 text-right tabular-nums">{{ s.share }}%</span>
            </div>
          </div>
          <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div :class="['h-full rounded-full', barColor(i)]" :style="{ width: `${s.share}%` }" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
