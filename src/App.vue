<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import BackgroundDecoration from './components/BackgroundDecoration.vue'

const route = useRoute()
const isDashboard = computed(() => route.meta.layout === 'dashboard')
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
  </div>
</template>
