<script setup lang="ts">
import { computed } from 'vue'
import { LinkedinIcon, TwitterIcon, GithubIcon, MailIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import AppLogo from './AppLogo.vue'

const { t } = useI18n()

const currentYear = new Date().getFullYear()

const quickLinks = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'services', to: '/services' },
  { key: 'process', to: '/process' },
  { key: 'contact', to: '/contact' },
] as const

const serviceLinks = computed(() => [
  { label: t('services.items.web-development.title'), to: '/services/web-development' },
  { label: t('services.items.mobile-development.title'), to: '/services/mobile-development' },
  { label: t('services.items.saas-development.title'), to: '/services/saas-development' },
  { label: t('services.items.consulting.title'), to: '/services/consulting' },
  { label: t('services.items.ui-ux.title'), to: '/services/ui-ux' },
  { label: t('services.items.support.title'), to: '/services/support' },
])

const socialLinks = [
  { icon: LinkedinIcon, label: 'LinkedIn' },
  { icon: TwitterIcon, label: 'Twitter' },
  { icon: GithubIcon, label: 'GitHub' },
]
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
          <p class="text-slate-400 text-sm leading-relaxed mb-5">{{ t('footer.desc') }}</p>
          <div class="flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              href="#"
              class="w-9 h-9 bg-slate-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200"
              :aria-label="social.label"
            >
              <component :is="social.icon" :size="16" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{{ t('footer.quickLinks') }}</h3>
          <nav>
            <ul class="space-y-2.5">
              <li v-for="item in quickLinks" :key="item.key">
                <router-link :to="item.to" class="text-slate-400 hover:text-white text-sm transition-colors">
                  {{ t(`nav.${item.key}`) }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{{ t('footer.services') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="item in serviceLinks" :key="item.to">
              <router-link :to="item.to" class="text-slate-400 hover:text-white text-sm transition-colors">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{{ t('footer.contact') }}</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-2.5 text-slate-400 text-sm">
              <MailIcon :size="16" class="text-blue-500 flex-shrink-0" />
              <a href="mailto:info@integrant.com" class="hover:text-white transition-colors">info@integrant.com</a>
            </li>
          </ul>
          <div class="mt-6 p-4 bg-slate-800/60 rounded-xl">
            <p class="text-slate-400 text-xs leading-relaxed">{{ t('footer.contactPrompt') }}</p>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-8">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-500 text-sm">
          <p>&copy; {{ currentYear }} Integrant. {{ t('footer.rights') }}</p>
          <p>{{ t('footer.tagline') }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>
