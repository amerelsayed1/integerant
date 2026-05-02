<script setup lang="ts">
import { ref, computed } from 'vue'
import { leads } from '../../data/dashboard'
import type { LeadStatus } from '../../data/dashboard'

const search = ref('')
const statusFilter = ref<LeadStatus | ''>('')

const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost']

const filtered = computed(() =>
  leads.filter(l => {
    const matchSearch =
      l.name.toLowerCase().includes(search.value.toLowerCase()) ||
      l.company.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = !statusFilter.value || l.status === statusFilter.value
    return matchSearch && matchStatus
  })
)

const statusBadge = (s: LeadStatus) => {
  const map: Record<LeadStatus, string> = {
    New: 'bg-blue-50 text-blue-700',
    Contacted: 'bg-slate-100 text-slate-700',
    Qualified: 'bg-violet-50 text-violet-700',
    Proposal: 'bg-amber-50 text-amber-700',
    Won: 'bg-emerald-50 text-emerald-700',
    Lost: 'bg-rose-50 text-rose-700',
  }
  return map[s]
}

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

const totalPipeline = computed(() =>
  filtered.value.filter(l => !['Won', 'Lost'].includes(l.status)).reduce((a, l) => a + l.estValue, 0)
)
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-col sm:flex-row gap-3">
      <input
        v-model="search"
        type="search"
        placeholder="Search leads or companies…"
        class="flex-1 px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="statusFilter"
        class="px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All statuses</option>
        <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="text-sm text-slate-500">Total leads</p>
        <p class="text-2xl font-semibold text-slate-900 mt-1">{{ filtered.length }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="text-sm text-slate-500">Open pipeline</p>
        <p class="text-2xl font-semibold text-slate-900 mt-1">${{ (totalPipeline / 1000).toFixed(0) }}k</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hidden sm:block">
        <p class="text-sm text-slate-500">Won</p>
        <p class="text-2xl font-semibold text-emerald-600 mt-1">{{ leads.filter(l => l.status === 'Won').length }}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100">
        <h2 class="text-base font-semibold text-slate-900">Pipeline</h2>
      </div>
      <ul class="divide-y divide-slate-100">
        <li v-for="lead in filtered" :key="lead.id" class="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <div class="w-9 h-9 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center flex-shrink-0">
            {{ initials(lead.name) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-slate-900">{{ lead.name }}</p>
            <p class="text-sm text-slate-500 truncate">{{ lead.company }} · {{ lead.service }}</p>
          </div>
          <div class="text-right flex-shrink-0 space-y-1">
            <p class="text-sm font-semibold text-slate-900">${{ (lead.estValue / 1000).toFixed(1) }}k</p>
            <span :class="['inline-flex px-2 py-0.5 text-xs font-medium rounded-full', statusBadge(lead.status)]">
              {{ lead.status }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
