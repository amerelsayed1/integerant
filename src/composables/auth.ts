import { ref } from 'vue'

const STORAGE_KEY = 'integrant_auth'

export interface AuthUser {
  name: string
  email: string
  role: string
}

const user = ref<AuthUser | null>(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'))

export function useAuth() {
  const isAuthenticated = () => user.value !== null

  function login(email: string, password: string): boolean {
    if (email === 'admin@integrant.com' && password === 'password') {
      user.value = { name: 'Adam Mansour', email, role: 'Workspace owner' }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, isAuthenticated, login, logout }
}
