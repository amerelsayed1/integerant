<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar.vue'
import DashboardTopbar from '../../components/dashboard/DashboardTopbar.vue'
import { useSeo } from '../../composables/seo'

const route = useRoute()
const sidebarOpen = ref(false)

const pageMeta = computed(() => {
  const path = route.path
  const exact: Record<string, { title: string; subtitle: string }> = {
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
      subtitle: 'Manage the services shown on the public site',
    },
    '/dashboard/services/new': {
      title: 'New service',
      subtitle: 'Create a new public service page',
    },
    '/dashboard/case-studies': {
      title: 'Case Studies',
      subtitle: 'Manage the case studies shown on the public site',
    },
    '/dashboard/case-studies/new': {
      title: 'New case study',
      subtitle: 'Create a new public case study page',
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
  if (exact[path]) return exact[path]

  if (path.startsWith('/dashboard/services/')) {
    return { title: 'Edit service', subtitle: 'Update the public service page' }
  }
  if (path.startsWith('/dashboard/case-studies/')) {
    return { title: 'Edit case study', subtitle: 'Update the public case study page' }
  }
  return { title: 'Dashboard', subtitle: '' }
})

useSeo({
  title: () => `${pageMeta.value.title} — Dashboard`,
  description: 'BunyanX client dashboard.',
  path: () => route.path,
  noindex: true,
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
