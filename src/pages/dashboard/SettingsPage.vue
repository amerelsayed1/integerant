<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../../composables/auth'

const { user } = useAuth()

const name = ref(user.value?.name ?? '')
const email = ref(user.value?.email ?? '')
const saved = ref(false)

function save() {
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 class="text-base font-semibold text-slate-900 mb-5">Profile</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
          <input
            v-model="name"
            type="text"
            class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="save"
            class="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Save changes
          </button>
          <span v-if="saved" class="text-sm text-emerald-600">Saved!</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 class="text-base font-semibold text-slate-900 mb-1">Workspace</h2>
      <p class="text-sm text-slate-500 mb-5">General workspace configuration</p>
      <div class="space-y-3 text-sm text-slate-600">
        <div class="flex justify-between py-2 border-b border-slate-100">
          <span class="text-slate-500">Workspace name</span>
          <span class="font-medium text-slate-900">BunyanX</span>
        </div>
        <div class="flex justify-between py-2 border-b border-slate-100">
          <span class="text-slate-500">Plan</span>
          <span class="font-medium text-slate-900">Pro</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-slate-500">Role</span>
          <span class="font-medium text-slate-900">{{ user?.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
