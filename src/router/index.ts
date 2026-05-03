import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/auth'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ServicesIndexPage from '../pages/ServicesIndexPage.vue'
import ServiceDetailPage from '../pages/ServiceDetailPage.vue'
import ProcessPage from '../pages/ProcessPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import ProjectsIndexPage from '../pages/ProjectsIndexPage.vue'
import ProjectDetailPage from '../pages/ProjectDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardLayout from '../pages/dashboard/DashboardLayout.vue'
import DashboardOverview from '../pages/dashboard/DashboardOverview.vue'
import ProjectsPage from '../pages/dashboard/ProjectsPage.vue'
import ClientsPage from '../pages/dashboard/ClientsPage.vue'
import LeadsPage from '../pages/dashboard/LeadsPage.vue'
import ServicesPage from '../pages/dashboard/ServicesPage.vue'
import ServiceEditPage from '../pages/dashboard/ServiceEditPage.vue'
import CaseStudiesPage from '../pages/dashboard/CaseStudiesPage.vue'
import CaseStudyEditPage from '../pages/dashboard/CaseStudyEditPage.vue'
import SettingsPage from '../pages/dashboard/SettingsPage.vue'
import HelpPage from '../pages/dashboard/HelpPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/services', component: ServicesIndexPage },
    { path: '/services/:slug', component: ServiceDetailPage },
    { path: '/process', component: ProcessPage },
    { path: '/contact', component: ContactPage },
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
        { path: 'services/new', component: ServiceEditPage },
        { path: 'services/:slug', component: ServiceEditPage },
        { path: 'case-studies', component: CaseStudiesPage },
        { path: 'case-studies/new', component: CaseStudyEditPage },
        { path: 'case-studies/:slug', component: CaseStudyEditPage },
        { path: 'settings', component: SettingsPage },
        { path: 'help', component: HelpPage },
      ],
    },
  ],
  scrollBehavior(_to, _from, _savedPosition) {
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
