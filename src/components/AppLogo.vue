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
  <!-- Favicon -->
  <img
    v-if="variant === 'favicon'"
    src="/icon/icon_color_transparent.webp"
    alt="Integerant"
    :class="$attrs.class || 'w-8 h-8'"
    loading="eager"
  />

  <!-- Icon only -->
  <img
    v-else-if="variant === 'icon'"
    :src="dark
      ? (isArabic ? '/icon/arabic-icon-dark.webp' : '/icon/icon_white_on_navy.webp')
      : (isArabic ? '/icon/arabic-icon-light.webp' : '/icon/icon_color_transparent.webp')"
    :alt="isArabic ? 'إنتجرأنت' : 'Integerant'"
    :class="$attrs.class || 'h-10 w-auto'"
    loading="eager"
  />

  <!-- Horizontal (default) -->
  <img
    v-else
    :src="dark
      ? (isArabic ? '/logo/arabic-logo-horizontal-dark.webp' : '/logo/primary_horizontal_white_on_navy.webp')
      : (isArabic ? '/logo/arabic-logo-horizontal-light.webp' : '/logo/primary_horizontal_transparent.webp')"
    :alt="isArabic ? 'إنتجرأنت — حلول برمجية واستشارات' : 'Integerant — Custom Software for Egypt & GCC'"
    :class="$attrs.class || 'h-9 w-auto'"
    loading="eager"
  />
</template>
