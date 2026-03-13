<script setup lang="ts">
import { MailIcon } from 'lucide-vue-next'
import AppLogo from './AppLogo.vue'
import { useI18n } from '../i18n'
import { serviceKeys, services, localizeText } from '../data/services'

const { t, locale } = useI18n()
const currentYear = new Date().getFullYear()

const quickLinks = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.services', to: '/services' },
  { labelKey: 'nav.process', to: '/process' },
  { labelKey: 'nav.contact', to: '/contact' },
]
</script>

<template>
  <footer class="bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div class="mb-4"><AppLogo variant="horizontal" dark /></div>
          <p class="text-slate-400 text-sm leading-relaxed mb-5">{{ t('footer.about') }}</p>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{{ t('footer.quickLinks') }}</h3>
          <nav>
            <ul class="space-y-2.5">
              <li v-for="item in quickLinks" :key="item.to">
                <router-link :to="item.to" class="text-slate-400 hover:text-white text-sm transition-colors">
                  {{ t(item.labelKey) }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{{ t('footer.services') }}</h3>
          <ul class="space-y-2.5">
            <li v-for="key in serviceKeys" :key="key">
              <router-link :to="`/services/${key}`" class="text-slate-400 hover:text-white text-sm transition-colors">
                {{ localizeText(services[key].title, locale) }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">{{ t('footer.contact') }}</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-2.5 text-slate-400 text-sm">
              <MailIcon :size="16" class="text-blue-500 flex-shrink-0" />
              <a href="mailto:info@integrant.com" class="hover:text-white transition-colors">info@integrant.com</a>
            </li>
          </ul>
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
