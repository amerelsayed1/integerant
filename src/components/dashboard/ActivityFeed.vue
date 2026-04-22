<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  BriefcaseIcon,
  UsersIcon,
  ReceiptIcon,
  AlertTriangleIcon,
} from 'lucide-vue-next'
import type { ActivityEntry } from '../../data/dashboard'

defineProps<{ entries: ActivityEntry[] }>()

const iconFor = (kind: ActivityEntry['kind']): Component => {
  switch (kind) {
    case 'project':
      return BriefcaseIcon
    case 'lead':
      return UsersIcon
    case 'invoice':
      return ReceiptIcon
    case 'system':
      return AlertTriangleIcon
  }
}

const accentFor = (kind: ActivityEntry['kind']) =>
  computed(() => {
    switch (kind) {
      case 'project':
        return 'bg-blue-50 text-blue-700'
      case 'lead':
        return 'bg-violet-50 text-violet-700'
      case 'invoice':
        return 'bg-emerald-50 text-emerald-700'
      case 'system':
        return 'bg-amber-50 text-amber-700'
    }
  })
</script>

<template>
  <ol class="space-y-4">
    <li v-for="entry in entries" :key="entry.id" class="flex gap-3">
      <div :class="['w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', accentFor(entry.kind).value]">
        <component :is="iconFor(entry.kind)" :size="16" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm text-slate-700">
          <span class="font-medium text-slate-900">{{ entry.actor }}</span>
          {{ entry.message }}
        </p>
        <p class="text-xs text-slate-400 mt-0.5">{{ entry.timestamp }}</p>
      </div>
    </li>
  </ol>
</template>
