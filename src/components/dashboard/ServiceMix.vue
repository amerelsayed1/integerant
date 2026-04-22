<script setup lang="ts">
import type { ServiceBreakdown } from '../../data/dashboard'

defineProps<{ items: ServiceBreakdown[] }>()

const palette = ['bg-blue-600', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-slate-500']
</script>

<template>
  <div>
    <div class="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        v-for="(item, i) in items"
        :key="item.slug"
        :class="palette[i % palette.length]"
        :style="{ width: `${item.share}%` }"
        :title="`${item.service} — ${item.share}%`"
      />
    </div>

    <ul class="mt-5 space-y-3">
      <li v-for="(item, i) in items" :key="item.slug" class="flex items-center gap-3 text-sm">
        <span :class="['w-2.5 h-2.5 rounded-full flex-shrink-0', palette[i % palette.length]]" />
        <span class="flex-1 text-slate-700 truncate">{{ item.service }}</span>
        <span class="text-slate-500 tabular-nums">{{ item.projects }} proj</span>
        <span class="w-16 text-right font-medium text-slate-900 tabular-nums">
          ${{ (item.revenue / 1000).toFixed(1) }}k
        </span>
        <span class="w-10 text-right text-xs text-slate-500 tabular-nums">{{ item.share }}%</span>
      </li>
    </ul>
  </div>
</template>
