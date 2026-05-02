import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/auth'
import HomePage from '../pages/HomePage.vue'
import ServicesIndexPage from '../pages/ServicesIndexPage.vue'
import ServiceDetailPage from '../pages/ServiceDetailPage.vue'
import ProjectsIndexPage from '../pages/ProjectsIndexPage.vue'
import ProjectDetailPage from '../pages/ProjectDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardLayout from '../pages/dashboard/DashboardLayout.vue'
import DashboardOverview from '../pages/dashboard/DashboardOverview.vue'
import ProjectsPage from '../pages/dashboard/ProjectsPage.vue'
import ClientsPage from '../pages/dashboard/ClientsPage.vue'
import LeadsPage from '../pages/dashboard/LeadsPage.vue'
import ServicesPage from '../pages/dashboard/ServicesPage.vue'
import SettingsPage from '../pages/dashboard/SettingsPage.vue'
import HelpPage from '../pages/dashboard/HelpPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/services', component: ServicesIndexPage },
    { path: '/services/:slug', component: ServiceDetailPage },
    { path: '/projects', component: ProjectsIndexPage },
    { path: '/projects/:slug', component: ProjectDetailPage },
    { path: '/login', component: LoginPage },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { layout: 'dashboard', requiresAuth: true },
      children: [
        { path: '', component: DashboardOverview },
        { path: 'projects', component: ProjectsPage },
        { path: 'clients', component: ClientsPage },
        { path: 'leads', component: LeadsPage },
        { path: 'services', component: ServicesPage },
        { path: 'settings', component: SettingsPage },
        { path: 'help', component: HelpPage },
      ],
    },
  ],
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { path: '/login' }
  }
})

export default router
