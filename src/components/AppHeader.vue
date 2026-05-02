<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { MenuIcon, XIcon } from 'lucide-vue-next'
import AppLogo from './AppLogo.vue'

const router = useRouter()

type NavItem =
  | { kind: 'anchor'; label: string; sectionId: string }
  | { kind: 'route'; label: string; to: string }

const navItems: NavItem[] = [
  { kind: 'anchor', label: 'Home', sectionId: 'home' },
  { kind: 'anchor', label: 'About', sectionId: 'about' },
  { kind: 'route', label: 'Services', to: '/services' },
  { kind: 'route', label: 'Projects', to: '/projects' },
  { kind: 'anchor', label: 'Process', sectionId: 'process' },
  { kind: 'anchor', label: 'Contact', sectionId: 'contact' },
]

const isMenuOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const scrollToSection = (e: Event, sectionId: string) => {
  e.preventDefault()
  isMenuOpen.value = false

  // If not on home page, navigate there first then scroll
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  } else {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleRouteClick = () => {
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
        <router-link to="/" aria-label="Integrant home">
          <AppLogo variant="horizontal" />
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
          <template v-for="item in navItems" :key="item.label">
            <a
              v-if="item.kind === 'anchor'"
              :href="`#${item.sectionId}`"
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg transition-colors duration-200"
              @click="scrollToSection($event, item.sectionId)"
            >
              {{ item.label }}
            </a>
            <router-link
              v-else
              :to="item.to"
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg transition-colors duration-200"
              active-class="text-blue-700"
            >
              {{ item.label }}
            </router-link>
          </template>
          <a
            href="#contact"
            class="ml-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            @click="scrollToSection($event, 'contact')"
          >
            Get Started
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <XIcon v-if="isMenuOpen" :size="22" />
          <MenuIcon v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav v-if="isMenuOpen" class="md:hidden bg-white border-t border-slate-100" aria-label="Mobile">
      <div class="px-4 py-4 space-y-1">
        <template v-for="item in navItems" :key="item.label">
          <a
            v-if="item.kind === 'anchor'"
            :href="`#${item.sectionId}`"
            class="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
            @click="scrollToSection($event, item.sectionId)"
          >
            {{ item.label }}
          </a>
          <router-link
            v-else
            :to="item.to"
            class="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
            @click="handleRouteClick"
          >
            {{ item.label }}
          </router-link>
        </template>
        <a
          href="#contact"
          class="block mt-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg text-center transition-colors"
          @click="scrollToSection($event, 'contact')"
        >
          Get Started
        </a>
      </div>
    </nav>
  </header>
</template>
