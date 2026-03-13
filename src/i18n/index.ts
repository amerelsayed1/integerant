import { computed, ref } from 'vue'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

export type Locale = 'en' | 'ar'

const messages = { en, ar } as const
const STORAGE_KEY = 'integrant-locale'
const saved = (typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null) as Locale | null

export const locale = ref<Locale>(saved === 'ar' || saved === 'en' ? saved : 'en')

export const isRtl = computed(() => locale.value === 'ar')
export const dir = computed(() => (isRtl.value ? 'rtl' : 'ltr'))
export const current = computed(() => messages[locale.value])

export const setLocale = (next: Locale) => {
  locale.value = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, next)
  }
}

export const toggleLocale = () => setLocale(locale.value === 'en' ? 'ar' : 'en')

export const t = (path: string): string => {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return ''
  }, current.value)

  return typeof value === 'string' ? value : ''
}

export const useI18n = () => ({ locale, isRtl, dir, current, setLocale, toggleLocale, t })
