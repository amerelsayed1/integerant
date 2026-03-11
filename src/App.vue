<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import BackgroundDecoration from './components/BackgroundDecoration.vue'
import { useI18n } from './i18n'
import { services, localizeText } from './data/services'

const route = useRoute()
const { dir, locale, t } = useI18n()

watchEffect(() => {
  document.documentElement.lang = locale.value
  document.documentElement.dir = dir.value

  const titleKey = route.meta.titleKey as string | undefined
  const descriptionKey = route.meta.descriptionKey as string | undefined

  if (route.path.startsWith('/services/')) {
    const slug = route.params.slug as string
    const service = services[slug]
    document.title = service ? `${localizeText(service.title, locale.value)} | ${t('meta.serviceTitleSuffix')}` : t('meta.defaultTitle')
  } else {
    document.title = titleKey ? t(titleKey) : t('meta.defaultTitle')
  }

  const content = descriptionKey ? t(descriptionKey) : t('meta.defaultDescription')
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
})
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
