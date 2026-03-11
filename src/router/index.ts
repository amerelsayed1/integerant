import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ServicesPage from '../pages/ServicesPage.vue'
import ProcessPage from '../pages/ProcessPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import ServiceDetailPage from '../pages/ServiceDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/services', component: ServicesPage },
    { path: '/services/:slug', component: ServiceDetailPage },
    { path: '/process', component: ProcessPage },
    { path: '/contact', component: ContactPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
