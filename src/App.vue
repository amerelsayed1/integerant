<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import BackgroundDecoration from './components/BackgroundDecoration.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'

const route = useRoute()
const isDashboard = computed(() => route.meta.layout === 'dashboard')

const { locale } = useI18n()

watch(
  locale,
  (lang) => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="isDashboard" class="min-h-screen w-full">
    <router-view />
  </div>
  <div v-else class="relative bg-white min-h-screen w-full overflow-x-hidden">
    <BackgroundDecoration />
    <AppHeader />
    <main class="relative z-10">
      <router-view />
    </main>
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
