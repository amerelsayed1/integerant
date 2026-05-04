<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/auth'
import AppLogo from '../components/AppLogo.vue'
import { useSeo } from '../composables/seo'

const router = useRouter()
const { login } = useAuth()

useSeo({
  title: 'Sign In',
  description: 'Sign in to the BunyanX client dashboard.',
  path: '/login',
  noindex: true,
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 400))
  const ok = login(email.value, password.value)
  loading.value = false
  if (ok) {
    router.push('/dashboard')
  } else {
    error.value = 'Invalid email or password.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="flex justify-center mb-8">
        <AppLogo variant="horizontal" />
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 class="text-xl font-semibold text-slate-900 mb-1">Sign in</h1>
        <p class="text-sm text-slate-500 mb-6">Access your workspace dashboard</p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="admin@integrant.com"
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>

          <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 bg-teal hover:bg-navy disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {{ loading ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>

        <p class="mt-6 text-xs text-slate-400 text-center">
          Demo credentials: admin@integrant.com / password
        </p>
      </div>
    </div>
  </div>
</template>
