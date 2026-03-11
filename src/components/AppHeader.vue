<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { MenuIcon, XIcon } from 'lucide-vue-next'
import AppLogo from './AppLogo.vue'

const router = useRouter()
const route = useRoute()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

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
    :class="scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/70 backdrop-blur-sm'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-18">
        <a href="/" @click.prevent="router.push('/')">
          <AppLogo variant="horizontal" />
        </a>

        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
            :class="isActiveLink(item.to) ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:text-blue-700'"
          >
            {{ item.label }}
          </RouterLink>

          <RouterLink
            to="/contact"
            class="ml-4 px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            :class="isActiveLink('/contact') ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'"
          >
            Get Started
          </RouterLink>
        </nav>

        <button
          class="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <XIcon v-if="isMenuOpen" :size="22" />
          <MenuIcon v-else :size="22" />
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-slate-100">
      <div class="px-4 py-4 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="block px-4 py-3 text-sm font-medium rounded-lg transition-colors"
          :class="isActiveLink(item.to) ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink
          to="/contact"
          class="block mt-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg text-center transition-colors"
          @click="closeMenu"
        >
          Get Started
        </RouterLink>
      </div>
    </div>
  </header>
</template>
