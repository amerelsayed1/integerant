<script setup lang="ts">
import { computed } from 'vue'
import { LinkedinIcon, TwitterIcon, GithubIcon, MailIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import AppLogo from './AppLogo.vue'
import { useServicesStore } from '../stores/services'

const router = useRouter()
const currentYear = new Date().getFullYear()
const { list: servicesList } = useServicesStore()

type QuickLink =
  | { kind: 'anchor'; label: string; sectionId: string }
  | { kind: 'route'; label: string; to: string }

const quickLinks: QuickLink[] = [
  { kind: 'anchor', label: 'Home', sectionId: 'home' },
  { kind: 'anchor', label: 'About', sectionId: 'about' },
  { kind: 'route', label: 'Services', to: '/services' },
  { kind: 'route', label: 'Projects', to: '/projects' },
  { kind: 'anchor', label: 'Process', sectionId: 'process' },
  { kind: 'anchor', label: 'Contact', sectionId: 'contact' },
]

const serviceLinks = computed(() => [
  { label: 'All services', to: '/services' },
  ...servicesList.value.map((s) => ({ label: s.title, to: `/services/${s.slug}` })),
])

const socialLinks = [
  { icon: LinkedinIcon, label: 'LinkedIn' },
  { icon: TwitterIcon, label: 'Twitter' },
  { icon: GithubIcon, label: 'GitHub' },
]

const scrollToSection = (e: Event, sectionId: string) => {
  e.preventDefault()
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  } else {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- About -->
        <div>
          <div class="mb-4">
            <AppLogo variant="horizontal" dark />
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-5">
            Software solutions and consulting for startups and growing businesses. We turn ideas into scalable, reliable products.
          </p>
          <div class="flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              href="#"
              rel="nofollow noopener"
              class="w-9 h-9 bg-slate-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200"
              :aria-label="social.label"
            >
              <component :is="social.icon" :size="16" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Quick Links</h3>
          <nav aria-label="Footer quick links">
            <ul class="space-y-2.5">
              <li v-for="item in quickLinks" :key="item.label">
                <a
                  v-if="item.kind === 'anchor'"
                  :href="`#${item.sectionId}`"
                  class="text-slate-400 hover:text-white text-sm transition-colors"
                  @click="scrollToSection($event, item.sectionId)"
                >
                  {{ item.label }}
                </a>
                <router-link
                  v-else
                  :to="item.to"
                  class="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Services</h3>
          <nav aria-label="Footer services">
            <ul class="space-y-2.5">
              <li v-for="item in serviceLinks" :key="item.label">
                <router-link :to="item.to" class="text-slate-400 hover:text-white text-sm transition-colors">
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">Contact</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-2.5 text-slate-400 text-sm">
              <MailIcon :size="16" class="text-blue-500 flex-shrink-0" />
              <a href="mailto:info@integrant.com" class="hover:text-white transition-colors">info@integrant.com</a>
            </li>
          </ul>
          <div class="mt-6 p-4 bg-slate-800/60 rounded-xl">
            <p class="text-slate-400 text-xs leading-relaxed">
              Have a project in mind? We'd love to hear about it. Drop us a line and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-500 text-sm">
          <p>&copy; {{ currentYear }} Integrant. All rights reserved.</p>
          <p>Software Solutions &amp; Consulting</p>
        </div>
      </div>
    </div>
  </footer>
</template>
