<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { MenuIcon, XIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import AppLogo from './AppLogo.vue'

const { t, locale } = useI18n()

const navItems = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'services', to: '/services' },
  { key: 'process', to: '/process' },
  { key: 'contact', to: '/contact' },
] as const

const isMenuOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => { scrolled.value = window.scrollY > 20 }

const toggleLocale = () => {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/70 backdrop-blur-sm'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-18">
        <router-link to="/">
          <AppLogo variant="horizontal" />
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.key"
            :to="item.to"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg transition-colors duration-200"
            active-class="text-blue-700"
            exact-active-class="text-blue-700"
          >
            {{ t(`nav.${item.key}`) }}
          </router-link>

          <!-- Language switcher -->
          <button
            class="mx-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-700 transition-colors duration-200"
            @click="toggleLocale"
          >
            {{ locale === 'ar' ? 'EN' : 'عربي' }}
          </button>

          <router-link
            to="/contact"
            class="ml-1 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            {{ t('nav.getStarted') }}
          </router-link>
        </nav>

        <!-- Mobile right side -->
        <div class="md:hidden flex items-center gap-2">
          <button
            class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:text-blue-700 transition-colors duration-200"
            @click="toggleLocale"
          >
            {{ locale === 'ar' ? 'EN' : 'عربي' }}
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

    <!-- Mobile Navigation -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-slate-100">
      <div class="px-4 py-4 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
          active-class="text-blue-700 bg-blue-50"
          @click="isMenuOpen = false"
        >
          {{ t(`nav.${item.key}`) }}
        </router-link>
        <router-link
          to="/contact"
          class="block mt-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg text-center transition-colors"
          @click="isMenuOpen = false"
        >
          {{ t('nav.getStarted') }}
        </router-link>
      </div>
    </div>
  </header>
</template>
