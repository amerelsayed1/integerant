<script setup lang="ts">
import { MenuIcon, SearchIcon, BellIcon, PlusIcon } from 'lucide-vue-next'

defineProps<{
  title: string
  subtitle?: string
}>()

const emit = defineEmits<{ (e: 'toggleSidebar'): void }>()
</script>

<template>
  <header class="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
    <div class="h-16 px-4 sm:px-6 lg:px-8 flex items-center gap-4">
      <button
        class="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
        aria-label="Open sidebar"
        @click="emit('toggleSidebar')"
      >
        <MenuIcon :size="20" />
      </button>

      <div class="min-w-0 flex-1">
        <h1 class="text-base sm:text-lg font-semibold text-slate-900 truncate">{{ title }}</h1>
        <p v-if="subtitle" class="text-xs text-slate-500 truncate">{{ subtitle }}</p>
      </div>

      <div class="hidden md:flex items-center w-72 max-w-sm relative">
        <SearchIcon :size="16" class="absolute left-3 text-slate-400" />
        <input
          type="search"
          placeholder="Search projects, clients, leads…"
          class="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
        />
      </div>

      <button
        class="relative p-2 rounded-md text-slate-600 hover:bg-slate-100"
        aria-label="Notifications"
      >
        <BellIcon :size="18" />
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
      </button>

      <button
        class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <PlusIcon :size="16" />
        New project
      </button>

      <div class="flex items-center gap-2 pl-1">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-semibold flex items-center justify-center">
          AM
        </div>
        <div class="hidden md:block leading-tight">
          <p class="text-sm font-medium text-slate-900">Adam Mansour</p>
          <p class="text-xs text-slate-500">Workspace owner</p>
        </div>
      </div>
    </div>
  </header>
</template>
