<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import BackgroundDecoration from './components/BackgroundDecoration.vue'
</script>

<template>
  <div class="relative bg-white min-h-screen w-full overflow-x-hidden">
    <BackgroundDecoration />
    <AppHeader />
    <main class="relative z-10">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
