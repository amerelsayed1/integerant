<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon, PlusIcon, Trash2Icon, SaveIcon } from 'lucide-vue-next'
import { useServicesStore } from '../../stores/services'
import { iconNames, getIcon } from '../../data/serviceIcons'
import type { ServiceData } from '../../data/services'

const route = useRoute()
const router = useRouter()
const { bySlug, create, update } = useServicesStore()

const editingSlug = computed(() => {
  const slug = route.params.slug as string | undefined
  return slug && slug !== 'new' ? slug : null
})
const isNew = computed(() => editingSlug.value === null)

const original = computed(() => (editingSlug.value ? bySlug(editingSlug.value) : null))

const form = reactive<ServiceData>({
  slug: '',
  title: '',
  tagline: '',
  description: '',
  iconName: 'globe',
  problems: [''],
  technologies: [''],
  useCases: [{ title: '', description: '' }],
  ctaText: '',
})

watch(
  original,
  (svc) => {
    if (svc) {
      Object.assign(form, JSON.parse(JSON.stringify(svc)))
    }
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

function addProblem() { form.problems.push('') }
function removeProblem(i: number) { form.problems.splice(i, 1) }

function addTech() { form.technologies.push('') }
function removeTech(i: number) { form.technologies.splice(i, 1) }

function addUseCase() { form.useCases.push({ title: '', description: '' }) }
function removeUseCase(i: number) { form.useCases.splice(i, 1) }

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!form.title.trim()) e.title = 'Title is required'
  if (!form.tagline.trim()) e.tagline = 'Tagline is required'
  if (!form.description.trim()) e.description = 'Description is required'
  if (!form.ctaText.trim()) e.ctaText = 'CTA text is required'
  if (isNew.value) {
    if (!form.slug.trim()) e.slug = 'Slug is required'
    else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug))
      e.slug = 'Lowercase letters, numbers, and hyphens only'
    else if (bySlug(form.slug)) e.slug = 'This slug is already in use'
  }
  errors.value = e
  return Object.keys(e).length === 0
}

function clean<T extends string>(arr: T[]): T[] {
  return arr.map((v) => v.trim() as T).filter(Boolean) as T[]
}

function save() {
  if (!validate()) return
  const payload: ServiceData = {
    ...form,
    problems: clean(form.problems),
    technologies: clean(form.technologies),
    useCases: form.useCases
      .map((u) => ({ title: u.title.trim(), description: u.description.trim() }))
      .filter((u) => u.title || u.description),
  }
  if (isNew.value) {
    create(payload)
  } else {
    const { slug: _ignored, ...patch } = payload
    update(editingSlug.value!, patch)
  }
  router.push('/dashboard/services')
}

const previewIcon = computed(() => getIcon(form.iconName))
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-5">
    <div>
      <RouterLink
        to="/dashboard/services"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeftIcon :size="14" />
        Back to services
      </RouterLink>
      <h1 class="mt-2 text-xl font-semibold text-slate-900">
        {{ isNew ? 'New service' : 'Edit service' }}
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
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Title</span>
            <input
              v-model="form.title"
              type="text"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span v-if="errors.title" class="mt-1 text-xs text-rose-600 block">{{ errors.title }}</span>
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">
              Slug
              <span v-if="!isNew" class="text-slate-400 font-normal">(immutable)</span>
            </span>
            <input
              v-model="form.slug"
              type="text"
              :disabled="!isNew"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
            <span v-if="errors.slug" class="mt-1 text-xs text-rose-600 block">{{ errors.slug }}</span>
            <span v-else class="mt-1 text-xs text-slate-500 block">URL: /services/{{ form.slug || '...' }}</span>
          </label>
        </div>

        <label class="block">
          <span class="text-sm font-medium text-slate-700">Tagline</span>
          <input
            v-model="form.tagline"
            type="text"
            class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.tagline" class="mt-1 text-xs text-rose-600 block">{{ errors.tagline }}</span>
        </label>

        <label class="block">
          <span class="text-sm font-medium text-slate-700">Description</span>
          <textarea
            v-model="form.description"
            rows="4"
            class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.description" class="mt-1 text-xs text-rose-600 block">{{ errors.description }}</span>
        </label>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Icon</span>
            <div class="mt-1 flex items-center gap-3">
              <select
                v-model="form.iconName"
                class="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="name in iconNames" :key="name" :value="name">{{ name }}</option>
              </select>
              <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <component :is="previewIcon" :size="18" class="text-blue-600" />
              </div>
            </div>
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">CTA button text</span>
            <input
              v-model="form.ctaText"
              type="text"
              class="mt-1 w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span v-if="errors.ctaText" class="mt-1 text-xs text-rose-600 block">{{ errors.ctaText }}</span>
          </label>
        </div>
      </fieldset>

      <!-- Problems -->
      <fieldset class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div class="flex items-center justify-between">
          <legend class="px-2 text-sm font-semibold text-slate-700">Problems we solve</legend>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-md"
            @click="addProblem"
          >
            <PlusIcon :size="14" />
            Add
          </button>
        </div>
        <div v-for="(_, i) in form.problems" :key="i" class="flex gap-2">
          <input
            v-model="form.problems[i]"
            type="text"
            placeholder="A pain point this service addresses"
            class="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            class="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md"
            :aria-label="`Remove problem ${i + 1}`"
            @click="removeProblem(i)"
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
              placeholder="e.g. React"
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

      <!-- Use cases -->
      <fieldset class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div class="flex items-center justify-between">
          <legend class="px-2 text-sm font-semibold text-slate-700">Example use cases</legend>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-md"
            @click="addUseCase"
          >
            <PlusIcon :size="14" />
            Add
          </button>
        </div>
        <div v-for="(useCase, i) in form.useCases" :key="i" class="border border-slate-200 rounded-xl p-4 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-500">Use case {{ i + 1 }}</span>
            <button
              type="button"
              class="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md"
              :aria-label="`Remove use case ${i + 1}`"
              @click="removeUseCase(i)"
            >
              <Trash2Icon :size="14" />
            </button>
          </div>
          <input
            v-model="useCase.title"
            type="text"
            placeholder="Title"
            class="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            v-model="useCase.description"
            rows="2"
            placeholder="What problem this solves and the outcome"
            class="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </fieldset>

      <!-- Actions -->
      <div class="flex justify-end gap-2">
        <RouterLink
          to="/dashboard/services"
          class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Cancel
        </RouterLink>
        <button
          type="submit"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium"
        >
          <SaveIcon :size="16" />
          {{ isNew ? 'Create service' : 'Save changes' }}
        </button>
      </div>
    </form>
  </div>
</template>
