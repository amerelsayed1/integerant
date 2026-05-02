import { ref, computed, watch } from 'vue'
import { defaultServices, type ServiceData } from '../data/services'

const STORAGE_KEY = 'integrant_services_v1'

function loadInitial(): ServiceData[] {
  if (typeof localStorage === 'undefined') return [...defaultServices]
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as ServiceData[]
    }
  } catch {
    // fall through to defaults
  }
  return [...defaultServices]
}

const items = ref<ServiceData[]>(loadInitial())

watch(
  items,
  (next) => {
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore quota errors
    }
  },
  { deep: true }
)

export function useServicesStore() {
  const list = computed(() => items.value)
  const slugs = computed(() => items.value.map((s) => s.slug))

  function bySlug(slug: string): ServiceData | null {
    return items.value.find((s) => s.slug === slug) ?? null
  }

  function create(svc: ServiceData) {
    if (items.value.some((s) => s.slug === svc.slug)) {
      throw new Error(`Service with slug "${svc.slug}" already exists`)
    }
    items.value = [...items.value, svc]
  }

  function update(slug: string, patch: Partial<Omit<ServiceData, 'slug'>>) {
    const i = items.value.findIndex((s) => s.slug === slug)
    if (i < 0) return
    const next = [...items.value]
    next[i] = { ...next[i], ...patch }
    items.value = next
  }

  function remove(slug: string) {
    items.value = items.value.filter((s) => s.slug !== slug)
  }

  function resetToDefaults() {
    items.value = [...defaultServices]
  }

  return { list, slugs, bySlug, create, update, remove, resetToDefaults }
}
