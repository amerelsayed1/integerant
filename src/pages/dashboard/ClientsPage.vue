<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '../../data/dashboard'

const search = ref('')

const clients = computed(() => {
  const map = new Map<string, { name: string; projects: number; services: Set<string>; revenue: number }>()
  for (const p of projects) {
    const existing = map.get(p.client) ?? { name: p.client, projects: 0, services: new Set(), revenue: 0 }
    existing.projects++
    existing.services.add(p.service)
    map.set(p.client, existing)
  }
  return Array.from(map.values())
    .filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()))
})

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

const avatarColor = (name: string) => {
  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500']
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return colors[sum % colors.length]
}
</script>

<template>
  <div class="space-y-5">
    <input
      v-model="search"
      type="search"
      placeholder="Search clients…"
      class="w-full sm:max-w-xs px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div class="px-6 py-4 border-b border-slate-100">
        <h2 class="text-base font-semibold text-slate-900">All Clients</h2>
        <p class="text-sm text-slate-500">{{ clients.length }} accounts</p>
      </div>
      <ul class="divide-y divide-slate-100">
        <li v-for="client in clients" :key="client.name" class="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <div :class="['w-10 h-10 rounded-full text-white text-sm font-semibold flex items-center justify-center flex-shrink-0', avatarColor(client.name)]">
            {{ initials(client.name) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-slate-900">{{ client.name }}</p>
            <p class="text-sm text-slate-500 truncate">{{ Array.from(client.services).join(', ') }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-sm font-semibold text-slate-900">{{ client.projects }} project{{ client.projects !== 1 ? 's' : '' }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
