<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectStatus, ProjectSummary } from '../../data/dashboard'

const props = defineProps<{ projects: ProjectSummary[] }>()

const rows = computed(() => props.projects)

const statusBadge = (s: ProjectStatus) => {
  switch (s) {
    case 'On Track':
      return 'bg-emerald-50 text-emerald-700'
    case 'At Risk':
      return 'bg-amber-50 text-amber-700'
    case 'Delayed':
      return 'bg-rose-50 text-rose-700'
    case 'Completed':
      return 'bg-slate-100 text-slate-600'
  }
}

const progressColor = (p: number) =>
  p >= 90 ? 'bg-emerald-500' : p >= 50 ? 'bg-blue-600' : 'bg-amber-500'

const teamColor = (initials: string) => {
  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500']
  const sum = initials.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return colors[sum % colors.length]
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead>
        <tr class="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
          <th class="py-3 pr-4 font-medium">Project</th>
          <th class="py-3 px-4 font-medium hidden md:table-cell">Service</th>
          <th class="py-3 px-4 font-medium">Progress</th>
          <th class="py-3 px-4 font-medium">Status</th>
          <th class="py-3 px-4 font-medium hidden lg:table-cell">Team</th>
          <th class="py-3 pl-4 font-medium text-right">Due</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-for="p in rows" :key="p.id" class="hover:bg-slate-50/60 transition-colors">
          <td class="py-3 pr-4">
            <p class="font-medium text-slate-900">{{ p.name }}</p>
            <p class="text-xs text-slate-500">{{ p.client }} · {{ p.id }}</p>
          </td>
          <td class="py-3 px-4 hidden md:table-cell text-slate-600">{{ p.service }}</td>
          <td class="py-3 px-4 w-48">
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div :class="['h-full rounded-full', progressColor(p.progress)]" :style="{ width: `${p.progress}%` }" />
              </div>
              <span class="w-9 text-right text-xs font-medium text-slate-600 tabular-nums">{{ p.progress }}%</span>
            </div>
          </td>
          <td class="py-3 px-4">
            <span :class="['inline-flex px-2 py-0.5 text-xs font-medium rounded-full', statusBadge(p.status)]">
              {{ p.status }}
            </span>
          </td>
          <td class="py-3 px-4 hidden lg:table-cell">
            <div class="flex -space-x-2">
              <span
                v-for="member in p.team"
                :key="member"
                :class="['w-7 h-7 rounded-full ring-2 ring-white text-[10px] font-semibold text-white flex items-center justify-center', teamColor(member)]"
              >
                {{ member }}
              </span>
            </div>
          </td>
          <td class="py-3 pl-4 text-right text-slate-600 tabular-nums">{{ p.dueDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
