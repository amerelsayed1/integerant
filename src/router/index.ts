import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ServiceDetailPage from '../pages/ServiceDetailPage.vue'
import DashboardLayout from '../pages/dashboard/DashboardLayout.vue'
import DashboardOverview from '../pages/dashboard/DashboardOverview.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/services/:slug', component: ServiceDetailPage },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { layout: 'dashboard' },
      children: [
        { path: '', component: DashboardOverview },
      ],
    },
  ],
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
