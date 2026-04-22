<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { MenuIcon, XIcon } from 'lucide-vue-next'
import AppLogo from './AppLogo.vue'

const router = useRouter()

const navItems = ['Home', 'About', 'Services', 'Process', 'Contact']

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

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <a
            v-for="item in navItems"
            :key="item"
            :href="`#${item.toLowerCase()}`"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg transition-colors duration-200"
            @click="scrollToSection($event, item.toLowerCase())"
          >
            {{ item }}
          </a>
          <a
            href="/dashboard"
            class="ml-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg transition-colors duration-200"
            @click.prevent="router.push('/dashboard')"
          >
            Dashboard
          </a>
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
          @click="isMenuOpen = !isMenuOpen"
        >
          <XIcon v-if="isMenuOpen" :size="22" />
          <MenuIcon v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-slate-100">
      <div class="px-4 py-4 space-y-1">
        <a
          v-for="item in navItems"
          :key="item"
          :href="`#${item.toLowerCase()}`"
          class="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
          @click="scrollToSection($event, item.toLowerCase())"
        >
          {{ item }}
        </a>
        <a
          href="/dashboard"
          class="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors"
          @click.prevent="router.push('/dashboard'); isMenuOpen = false"
        >
          Dashboard
        </a>
        <a
          href="#contact"
          class="block mt-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg text-center transition-colors"
          @click="scrollToSection($event, 'contact')"
        >
          Get Started
        </a>
      </div>
    </div>
  </header>
</template>
