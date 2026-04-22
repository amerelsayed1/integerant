<script setup lang="ts">
import type { LeadStatus, LeadSummary } from '../../data/dashboard'

defineProps<{ leads: LeadSummary[] }>()

const statusBadge = (s: LeadStatus) => {
  switch (s) {
    case 'New':
      return 'bg-blue-50 text-blue-700'
    case 'Contacted':
      return 'bg-slate-100 text-slate-700'
    case 'Qualified':
      return 'bg-violet-50 text-violet-700'
    case 'Proposal':
      return 'bg-amber-50 text-amber-700'
    case 'Won':
      return 'bg-emerald-50 text-emerald-700'
    case 'Lost':
      return 'bg-rose-50 text-rose-700'
  }
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
</script>

<template>
  <ul class="divide-y divide-slate-100">
    <li
      v-for="lead in leads"
      :key="lead.id"
      class="py-3 flex items-center gap-3"
    >
      <div class="w-9 h-9 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">
        {{ initials(lead.name) }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-slate-900 truncate">{{ lead.name }}</p>
        <p class="text-xs text-slate-500 truncate">{{ lead.company }} · {{ lead.service }}</p>
      </div>
      <div class="text-right">
        <p class="text-sm font-semibold text-slate-900 tabular-nums">
          ${{ (lead.estValue / 1000).toFixed(1) }}k
        </p>
        <span :class="['mt-0.5 inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded-full', statusBadge(lead.status)]">
          {{ lead.status }}
        </span>
      </div>
    </li>
  </ul>
</template>
