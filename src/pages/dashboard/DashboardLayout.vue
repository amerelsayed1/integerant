<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar.vue'
import DashboardTopbar from '../../components/dashboard/DashboardTopbar.vue'

const route = useRoute()
const sidebarOpen = ref(false)

const pageMeta = computed(() => {
  const map: Record<string, { title: string; subtitle: string }> = {
    '/dashboard': {
      title: 'Overview',
      subtitle: 'A snapshot of your business right now',
    },
    '/dashboard/projects': {
      title: 'Projects',
      subtitle: 'Active engagements across the team',
    },
    '/dashboard/clients': {
      title: 'Clients',
      subtitle: 'Accounts and relationships',
    },
    '/dashboard/leads': {
      title: 'Leads',
      subtitle: 'Pipeline and inbound interest',
    },
    '/dashboard/services': {
      title: 'Services',
      subtitle: 'Offerings and performance',
    },
    '/dashboard/settings': {
      title: 'Settings',
      subtitle: 'Workspace configuration',
    },
    '/dashboard/help': {
      title: 'Help & Support',
      subtitle: 'Resources and contact',
    },
  }
  return map[route.path] ?? { title: 'Dashboard', subtitle: '' }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <DashboardSidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="flex-1 flex flex-col min-w-0">
      <DashboardTopbar
        :title="pageMeta.title"
        :subtitle="pageMeta.subtitle"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />
      <main class="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
