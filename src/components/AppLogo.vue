<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'horizontal' | 'icon' | 'favicon'
    dark?: boolean
  }>(),
  {
    variant: 'horizontal',
    dark: false,
  }
)

const navy = '#1e3a5f'
const blue = '#3b82f6'
</script>

<template>
  <!-- Favicon -->
  <svg
    v-if="variant === 'favicon'"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="$attrs.class"
    aria-label="Integrant favicon"
  >
    <rect width="32" height="32" rx="7" :fill="navy" />
    <rect x="7" y="10" width="4" height="16" rx="1" fill="#ffffff" />
    <rect x="21" y="10" width="4" height="16" rx="1" fill="#ffffff" />
    <path d="M9 10 L23 26" :stroke="blue" stroke-width="3.5" stroke-linecap="round" />
    <path d="M8 10 L5.5 5.5" :stroke="blue" stroke-width="2" stroke-linecap="round" />
    <path d="M10.5 10 L13 5.5" :stroke="blue" stroke-width="2" stroke-linecap="round" />
    <circle cx="5" cy="5" r="1.5" :fill="blue" />
    <circle cx="13.5" cy="5" r="1.5" :fill="blue" />
  </svg>

  <!-- Icon -->
  <svg
    v-else-if="variant === 'icon'"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="$attrs.class || 'w-10 h-10'"
    aria-label="Integrant logo"
  >
    <rect width="32" height="32" rx="8" :fill="navy" />
    <rect x="7" y="10" width="4" height="16" rx="1" fill="#ffffff" />
    <rect x="21" y="10" width="4" height="16" rx="1" fill="#ffffff" />
    <path d="M9 10 L23 26" :stroke="blue" stroke-width="3.5" stroke-linecap="round" />
    <path d="M8 10 L5.5 5.5" :stroke="blue" stroke-width="2" stroke-linecap="round" />
    <path d="M10.5 10 L13 5.5" :stroke="blue" stroke-width="2" stroke-linecap="round" />
    <circle cx="5" cy="5" r="1.5" :fill="blue" />
    <circle cx="13.5" cy="5" r="1.5" :fill="blue" />
  </svg>

  <!-- Horizontal (default) -->
  <div v-else class="flex items-center gap-3">
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-9 h-9 flex-shrink-0"
      aria-label="Integrant logo"
    >
      <rect width="32" height="32" rx="8" :fill="navy" />
      <rect x="7" y="10" width="4" height="16" rx="1" fill="#ffffff" />
      <rect x="21" y="10" width="4" height="16" rx="1" fill="#ffffff" />
      <path d="M9 10 L23 26" :stroke="blue" stroke-width="3.5" stroke-linecap="round" />
      <path d="M8 10 L5.5 5.5" :stroke="blue" stroke-width="2" stroke-linecap="round" />
      <path d="M10.5 10 L13 5.5" :stroke="blue" stroke-width="2" stroke-linecap="round" />
      <circle cx="5" cy="5" r="1.5" :fill="blue" />
      <circle cx="13.5" cy="5" r="1.5" :fill="blue" />
    </svg>
    <div class="flex flex-col leading-none">
      <span
        class="text-[22px] font-bold tracking-tight"
        :style="{ color: dark ? '#ffffff' : navy }"
      >
        Integr<span :style="{ color: blue }">ant</span>
      </span>
      <span
        class="text-[8.5px] font-semibold tracking-[0.18em] uppercase mt-[3px]"
        :style="{ color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(30,58,95,0.45)' }"
      >
        Software Solutions
      </span>
    </div>
  </div>
</template>
