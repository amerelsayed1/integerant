<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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

const { locale } = useI18n()
const isArabic = computed(() => locale.value === 'ar')
</script>

<template>
  <!-- Favicon / small mark -->
  <img
    v-if="variant === 'favicon'"
    src="/logo/logo-mark.svg"
    alt="BunyanX"
    :class="$attrs.class || 'w-8 h-8'"
    loading="eager"
  />

  <!-- Icon mark only -->
  <img
    v-else-if="variant === 'icon'"
    :src="dark ? '/logo/logo-mark-white.svg' : '/logo/logo-mark.svg'"
    alt="BunyanX"
    :class="$attrs.class || 'h-10 w-auto'"
    loading="eager"
  />

  <!-- Horizontal lockup (default) -->
  <img
    v-else
    :src="dark
      ? (isArabic ? '/logo/logo-horizontal-ar-on-dark.svg' : '/logo/logo-horizontal-en-on-dark.svg')
      : (isArabic ? '/logo/logo-horizontal-ar-light.svg'   : '/logo/logo-horizontal-en-light.svg')"
    :alt="isArabic ? 'بنيان إكس — حلول برمجية' : 'BunyanX — Software Solutions'"
    :class="$attrs.class || 'h-9 w-auto'"
    loading="eager"
  />
</template>
