<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  UsersIcon,
  TrendingUpIcon,
  LayersIcon,
  SettingsIcon,
  LifeBuoyIcon,
  XIcon,
} from 'lucide-vue-next'
import AppLogo from '../AppLogo.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const route = useRoute()

const navGroups = [
  {
    label: 'Workspace',
    items: [
      { name: 'Overview', to: '/dashboard', icon: LayoutDashboardIcon },
      { name: 'Projects', to: '/dashboard/projects', icon: BriefcaseIcon },
      { name: 'Clients', to: '/dashboard/clients', icon: UsersIcon },
      { name: 'Leads', to: '/dashboard/leads', icon: TrendingUpIcon },
      { name: 'Services', to: '/dashboard/services', icon: LayersIcon },
    ],
  },
  {
    label: 'Account',
    items: [
      { name: 'Settings', to: '/dashboard/settings', icon: SettingsIcon },
      { name: 'Help & Support', to: '/dashboard/help', icon: LifeBuoyIcon },
    ],
  },
]

const isActive = (to: string) =>
  to === '/dashboard'
    ? route.path === '/dashboard'
    : route.path.startsWith(to)

const wrapperClasses = computed(() => [
  'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
])
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="open"
    class="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
    @click="emit('close')"
  />

  <aside
    :class="[
      ...wrapperClasses,
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
    aria-label="Dashboard navigation"
  >
    <div class="h-16 px-5 flex items-center justify-between border-b border-slate-200">
      <RouterLink to="/" class="flex items-center" aria-label="Back to site">
        <AppLogo variant="horizontal" />
      </RouterLink>
      <button
        class="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
        aria-label="Close sidebar"
        @click="emit('close')"
      >
        <XIcon :size="18" />
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-6">
      <div v-for="group in navGroups" :key="group.label">
        <p class="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {{ group.label }}
        </p>
        <ul class="space-y-0.5">
          <li v-for="item in group.items" :key="item.to">
            <RouterLink
              :to="item.to"
              class="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="
                isActive(item.to)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              "
              @click="emit('close')"
            >
              <component
                :is="item.icon"
                :size="18"
                :class="isActive(item.to) ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'"
              />
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="p-3 border-t border-slate-200">
      <div class="rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 text-white p-4">
        <p class="text-sm font-semibold">Need a hand?</p>
        <p class="mt-1 text-xs text-blue-100">
          Talk to the Integrant team about scaling your engagement.
        </p>
        <RouterLink
          to="/#contact"
          class="mt-3 inline-flex items-center justify-center w-full px-3 py-2 bg-white text-blue-800 text-xs font-semibold rounded-md hover:bg-blue-50 transition-colors"
        >
          Contact us
        </RouterLink>
      </div>
    </div>
  </aside>
</template>
