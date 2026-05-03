import { createI18n } from 'vue-i18n'
import ar from './locales/ar'
import en from './locales/en'

export const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'en',
  messages: { ar, en },
})
