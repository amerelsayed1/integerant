import { ref, computed, watch } from 'vue'
import { defaultProjects, type ProjectData } from '../data/projects'

const STORAGE_KEY = 'integrant_projects_v2'

function loadInitial(): ProjectData[] {
  if (typeof localStorage === 'undefined') return [...defaultProjects]
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed as ProjectData[]
    }
  } catch {
    // fall through
  }
  return [...defaultProjects]
}

const items = ref<ProjectData[]>(loadInitial())

watch(
  items,
  (next) => {
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
  },
  { deep: true }
)

export function useProjectsStore() {
  const list = computed(() => items.value)
  const slugs = computed(() => items.value.map((p) => p.slug))

  function bySlug(slug: string): ProjectData | null {
    return items.value.find((p) => p.slug === slug) ?? null
  }

  function indexOf(slug: string): number {
    return items.value.findIndex((p) => p.slug === slug)
  }

  function create(project: ProjectData) {
    if (items.value.some((p) => p.slug === project.slug)) {
      throw new Error(`Project with slug "${project.slug}" already exists`)
    }
    items.value = [...items.value, project]
  }

  function update(slug: string, patch: Partial<Omit<ProjectData, 'slug'>>) {
    const i = items.value.findIndex((p) => p.slug === slug)
    if (i < 0) return
    const next = [...items.value]
    next[i] = { ...next[i], ...patch }
    items.value = next
  }

  function remove(slug: string) {
    items.value = items.value.filter((p) => p.slug !== slug)
  }

  function resetToDefaults() {
    items.value = [...defaultProjects]
  }

  return { list, slugs, bySlug, indexOf, create, update, remove, resetToDefaults }
}
