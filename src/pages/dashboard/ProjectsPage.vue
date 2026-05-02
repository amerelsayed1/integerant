<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '../../data/dashboard'
import ProjectsTable from '../../components/dashboard/ProjectsTable.vue'
import type { ProjectStatus } from '../../data/dashboard'

const search = ref('')
const statusFilter = ref<ProjectStatus | ''>('')

const statuses: ProjectStatus[] = ['On Track', 'At Risk', 'Delayed', 'Completed']

const filtered = computed(() =>
  projects.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.client.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = !statusFilter.value || p.status === statusFilter.value
    return matchSearch && matchStatus
  })
)
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-col sm:flex-row gap-3">
      <input
        v-model="search"
        type="search"
        placeholder="Search projects or clients…"
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

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-semibold text-slate-900">All Projects</h2>
          <p class="text-sm text-slate-500">{{ filtered.length }} engagements</p>
        </div>
      </div>
      <ProjectsTable :projects="filtered" />
    </div>
  </div>
</template>
