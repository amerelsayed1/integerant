<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon, PlusIcon, Trash2Icon, SaveIcon } from 'lucide-vue-next'
import { useProjectsStore } from '../../stores/projects'
import { useServicesStore } from '../../stores/services'
import type { ProjectData } from '../../data/projects'

const route = useRoute()
const router = useRouter()
const { bySlug, create, update } = useProjectsStore()
const { list: servicesList } = useServicesStore()

const editingSlug = computed(() => {
  const slug = route.params.slug as string | undefined
  return slug && slug !== 'new' ? slug : null
})
const isNew = computed(() => editingSlug.value === null)

const original = computed(() => (editingSlug.value ? bySlug(editingSlug.value) : null))

const form = reactive<ProjectData>({
  slug: '',
  title: '',
  client: '',
  industry: '',
  year: String(new Date().getFullYear()),
  duration: '',
  summary: '',
  challenge: '',
  solution: '',
  results: '',
  metrics: [{ label: '', value: '' }],
  technologies: [''],
  services: [],
})

watch(
  original,
  (proj) => {
    if (proj) Object.assign(form, JSON.parse(JSON.stringify(proj)))
  },
  { immediate: true }
)

const errors = ref<Record<string, string>>({})

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

watch(
  () => form.title,
  (title) => {
    if (isNew.value && !form.slug) form.slug = slugify(title)
  }
)

function addMetric() { form.metrics.push({ label: '', value: '' }) }
function removeMetric(i: number) { form.metrics.splice(i, 1) }
function addTech() { form.technologies.push('') }
function removeTech(i: number) { form.technologies.splice(i, 1) }

function isServiceSelected(slug: string): boolean {
  return form.services.some((s) => s.slug === slug)
}
function toggleService(slug: string, label: string) {
  if (isServiceSelected(slug)) {
    form.services = form.services.filter((s) => s.slug !== slug)
  } else {
    form.services = [...form.services, { slug, label }]
  }
}

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!form.title.trim()) e.title = 'Title is required'
  if (!form.client.trim()) e.client = 'Client is required'
  if (!form.industry.trim()) e.industry = 'Industry is required'
  if (!form.summary.trim()) e.summary = 'Summary is required'
  if (!form.challenge.trim()) e.challenge = 'Challenge is required'
  if (!form.solution.trim()) e.solution = 'Solution is required'
  if (!form.results.trim()) e.results = 'Results is required'
  if (isNew.value) {
    if (!form.slug.trim()) e.slug = 'Slug is required'
    else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug))
      e.slug = 'Lowercase letters, numbers, and hyphens only'
    else if (bySlug(form.slug)) e.slug = 'This slug is already in use'
  }
  errors.value = e
  return Object.keys(e).length === 0
}

function save() {
  if (!validate()) return
  const payload: ProjectData = {
    ...form,
    metrics: form.metrics
      .map((m) => ({ label: m.label.trim(), value: m.value.trim() }))
      .filter((m) => m.label || m.value),
    technologies: form.technologies.map((t) => t.trim()).filter(Boolean),
  }
  if (isNew.value) {
    create(payload)
  } else {
    const { slug: _ignored, ...patch } = payload
    update(editingSlug.value!, patch)
  }
  router.push('/dashboard/case-studies')
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-5">
    <div>
      <RouterLink
        to="/dashboard/case-studies"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeftIcon :size="14" />
        Back to case studies
      </RouterLink>
      <h1 class="mt-2 text-xl font-semibold text-slate-900">
        {{ isNew ? 'New case study' : 'Edit case study' }}
      </h1>
      <p v-if="!isNew" class="text-sm text-slate-500 mt-0.5">
        Editing <code class="bg-slate-100 px-1.5 py-0.5 rounded text-[12px]">{{ form.slug }}</code>
      </p>
    </div>

    <form class="space-y-6" @submit.prevent="save">
      <!-- Basics -->
      <fieldset class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <legend class="px-2 text-sm font-semibold text-slate-700">Basics</legend>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="block sm:col-span-2">
            <span class="text-sm font-medium text-slate-700">Title</span>
            <input
              v-model="form.title"
              type="text"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span v-if="errors.title" class="mt-1 text-xs text-rose-600 block">{{ errors.title }}</span>
          </label>

          <label class="block sm:col-span-2">
            <span class="text-sm font-medium text-slate-700">
              Slug <span v-if="!isNew" class="text-slate-400 font-normal">(immutable)</span>
            </span>
            <input
              v-model="form.slug"
              type="text"
              :disabled="!isNew"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
            <span v-if="errors.slug" class="mt-1 text-xs text-rose-600 block">{{ errors.slug }}</span>
            <span v-else class="mt-1 text-xs text-slate-500 block">URL: /projects/{{ form.slug || '...' }}</span>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Client</span>
            <input
              v-model="form.client"
              type="text"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span v-if="errors.client" class="mt-1 text-xs text-rose-600 block">{{ errors.client }}</span>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Industry</span>
            <input
              v-model="form.industry"
              type="text"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span v-if="errors.industry" class="mt-1 text-xs text-rose-600 block">{{ errors.industry }}</span>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Year</span>
            <input
              v-model="form.year"
              type="text"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Duration</span>
            <input
              v-model="form.duration"
              type="text"
              placeholder="e.g. 14 weeks"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label class="block sm:col-span-2">
            <span class="text-sm font-medium text-slate-700">Summary</span>
            <textarea
              v-model="form.summary"
              rows="2"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span v-if="errors.summary" class="mt-1 text-xs text-rose-600 block">{{ errors.summary }}</span>
          </label>
        </div>
      </fieldset>

      <!-- Story -->
      <fieldset class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <legend class="px-2 text-sm font-semibold text-slate-700">The story</legend>

        <label class="block">
          <span class="text-sm font-medium text-slate-700">Challenge</span>
          <textarea
            v-model="form.challenge"
            rows="4"
            class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.challenge" class="mt-1 text-xs text-rose-600 block">{{ errors.challenge }}</span>
        </label>

        <label class="block">
          <span class="text-sm font-medium text-slate-700">Solution</span>
          <textarea
            v-model="form.solution"
            rows="4"
            class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.solution" class="mt-1 text-xs text-rose-600 block">{{ errors.solution }}</span>
        </label>

        <label class="block">
          <span class="text-sm font-medium text-slate-700">Results</span>
          <textarea
            v-model="form.results"
            rows="4"
            class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.results" class="mt-1 text-xs text-rose-600 block">{{ errors.results }}</span>
        </label>
      </fieldset>

      <!-- Metrics -->
      <fieldset class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div class="flex items-center justify-between">
          <legend class="px-2 text-sm font-semibold text-slate-700">Key metrics</legend>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-md"
            @click="addMetric"
          >
            <PlusIcon :size="14" />
            Add
          </button>
        </div>
        <div v-for="(metric, i) in form.metrics" :key="i" class="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-2">
          <input
            v-model="metric.label"
            type="text"
            placeholder="Label (e.g. On-time delivery)"
            class="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="metric.value"
            type="text"
            placeholder="Value (e.g. 78% → 96%)"
            class="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            class="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md justify-self-start sm:justify-self-auto"
            :aria-label="`Remove metric ${i + 1}`"
            @click="removeMetric(i)"
          >
            <Trash2Icon :size="16" />
          </button>
        </div>
      </fieldset>

      <!-- Technologies -->
      <fieldset class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div class="flex items-center justify-between">
          <legend class="px-2 text-sm font-semibold text-slate-700">Technologies</legend>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-md"
            @click="addTech"
          >
            <PlusIcon :size="14" />
            Add
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div v-for="(_, i) in form.technologies" :key="i" class="flex gap-2">
            <input
              v-model="form.technologies[i]"
              type="text"
              placeholder="e.g. PostgreSQL"
              class="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              class="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md"
              :aria-label="`Remove technology ${i + 1}`"
              @click="removeTech(i)"
            >
              <Trash2Icon :size="16" />
            </button>
          </div>
        </div>
      </fieldset>

      <!-- Services applied -->
      <fieldset class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <legend class="px-2 text-sm font-semibold text-slate-700">Services delivered</legend>
        <p class="text-xs text-slate-500">
          Select the Integrant services applied on this engagement. The case study links back to each.
        </p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="svc in servicesList"
            :key="svc.slug"
            type="button"
            class="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
            :class="
              isServiceSelected(svc.slug)
                ? 'bg-blue-700 border-blue-700 text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:border-blue-400'
            "
            @click="toggleService(svc.slug, svc.title)"
          >
            {{ svc.title }}
          </button>
        </div>
      </fieldset>

      <!-- Actions -->
      <div class="flex justify-end gap-2">
        <RouterLink
          to="/dashboard/case-studies"
          class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Cancel
        </RouterLink>
        <button
          type="submit"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium"
        >
          <SaveIcon :size="16" />
          {{ isNew ? 'Create case study' : 'Save changes' }}
        </button>
      </div>
    </form>
  </div>
</template>
