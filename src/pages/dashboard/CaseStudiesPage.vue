<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PlusIcon, PencilIcon, Trash2Icon, ExternalLinkIcon, RotateCcwIcon, SearchIcon } from 'lucide-vue-next'
import { useProjectsStore } from '../../stores/projects'

const { list, remove, resetToDefaults } = useProjectsStore()

const search = ref('')
const filtered = computed(() =>
  list.value.filter(
    (p) =>
      p.title.toLowerCase().includes(search.value.toLowerCase()) ||
      p.client.toLowerCase().includes(search.value.toLowerCase()) ||
      p.industry.toLowerCase().includes(search.value.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.value.toLowerCase())
  )
)

const confirmSlug = ref<string | null>(null)
function askDelete(slug: string) { confirmSlug.value = slug }
function cancelDelete() { confirmSlug.value = null }
function confirmDelete() {
  if (confirmSlug.value) {
    remove(confirmSlug.value)
    confirmSlug.value = null
  }
}

const showResetConfirm = ref(false)
function doReset() {
  resetToDefaults()
  showResetConfirm.value = false
}
</script>

<template>
  <div class="space-y-5">
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <SearchIcon :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="search"
          type="search"
          placeholder="Search case studies…"
          class="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
        @click="showResetConfirm = true"
      >
        <RotateCcwIcon :size="14" />
        Reset to defaults
      </button>
      <RouterLink
        to="/dashboard/case-studies/new"
        class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium"
      >
        <PlusIcon :size="16" />
        New case study
      </RouterLink>
    </div>

    <div
      v-if="filtered.length === 0"
      class="bg-white rounded-2xl border border-slate-200 p-12 text-center"
    >
      <p class="text-slate-600">No case studies match your search.</p>
    </div>

    <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <ul class="divide-y divide-slate-100">
        <li v-for="project in filtered" :key="project.slug" class="px-6 py-4">
          <div class="flex items-start gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <p class="font-medium text-slate-900 truncate">{{ project.title }}</p>
                <code class="text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{{ project.slug }}</code>
              </div>
              <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded">{{ project.industry }}</span>
                <span>{{ project.client }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ project.year }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ project.duration }}</span>
              </div>
              <p class="mt-1.5 text-sm text-slate-600 line-clamp-2">{{ project.summary }}</p>
            </div>
            <div class="flex items-center gap-1 flex-shrink-0">
              <a
                :href="`/projects/${project.slug}`"
                target="_blank"
                rel="noopener"
                class="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                :aria-label="`View ${project.title} on the public site`"
                title="View public page"
              >
                <ExternalLinkIcon :size="16" />
              </a>
              <RouterLink
                :to="`/dashboard/case-studies/${project.slug}`"
                class="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                :aria-label="`Edit ${project.title}`"
                title="Edit"
              >
                <PencilIcon :size="16" />
              </RouterLink>
              <button
                type="button"
                class="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                :aria-label="`Delete ${project.title}`"
                title="Delete"
                @click="askDelete(project.slug)"
              >
                <Trash2Icon :size="16" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div
      v-if="confirmSlug"
      class="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      @click.self="cancelDelete"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 class="text-lg font-semibold text-slate-900">Delete this case study?</h2>
        <p class="mt-2 text-sm text-slate-600">
          This will remove <code class="bg-slate-100 px-1.5 py-0.5 rounded">{{ confirmSlug }}</code>
          from the public site and projects listing. You can restore the originals by resetting to defaults.
        </p>
        <div class="mt-5 flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            @click="cancelDelete"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white"
            @click="confirmDelete"
          >
            Delete case study
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showResetConfirm"
      class="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      @click.self="showResetConfirm = false"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 class="text-lg font-semibold text-slate-900">Reset case studies to defaults?</h2>
        <p class="mt-2 text-sm text-slate-600">
          All custom case studies will be removed and the original 4 will be restored. This cannot be undone.
        </p>
        <div class="mt-5 flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            @click="showResetConfirm = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white"
            @click="doReset"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
