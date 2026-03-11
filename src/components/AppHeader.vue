<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { MenuIcon, LanguagesIcon, XIcon } from 'lucide-vue-next'
import AppLogo from './AppLogo.vue'
import { useI18n } from '../i18n'

const route = useRoute()
const { t, locale, toggleLocale } = useI18n()

const navItems = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.about'), to: '/about' },
  { label: t('nav.services'), to: '/services' },
  { label: t('nav.process'), to: '/process' },
  { label: t('nav.contact'), to: '/contact' },
])

const isMenuOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const isActiveLink = (path: string) => {
  if (path === '/services') return route.path === '/services' || route.path.startsWith('/services/')
  return route.path === path
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-18">
        <RouterLink to="/" @click="closeMenu">
          <AppLogo variant="horizontal" />
        </RouterLink>

        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
            :class="isActiveLink(item.to) ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:text-blue-700'"
          >
            {{ item.label }}
          </RouterLink>
          <button
            class="ml-2 inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-700 hover:text-blue-700"
            @click="toggleLocale"
          >
            <LanguagesIcon :size="16" />
            {{ t('nav.switchLanguage') }}
          </button>
          <RouterLink
            to="/contact"
            class="ml-2 px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            :class="isActiveLink('/contact') ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'"
          >
            {{ t('nav.getStarted') }}
          </RouterLink>
        </nav>

        <div class="md:hidden flex items-center gap-2">
          <button
            class="p-2 text-slate-700 hover:text-slate-900 rounded-lg"
            :aria-label="locale === 'en' ? 'Switch to Arabic' : 'Switch to English'"
            @click="toggleLocale"
          >
            <LanguagesIcon :size="20" />
          </button>
          <button
            class="p-2 text-slate-700 hover:text-slate-900 rounded-lg"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
            @click="isMenuOpen = !isMenuOpen"
          >
            <XIcon v-if="isMenuOpen" :size="22" />
            <MenuIcon v-else :size="22" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-slate-100">
      <div class="px-4 py-4 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="block px-4 py-3 text-sm font-medium rounded-lg transition-colors"
          :class="isActiveLink(item.to) ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
