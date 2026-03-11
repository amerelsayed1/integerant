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
    { path: '/', component: HomePage, meta: { titleKey: 'meta.homeTitle', descriptionKey: 'meta.homeDescription' } },
    { path: '/about', component: AboutPage, meta: { titleKey: 'meta.aboutTitle', descriptionKey: 'meta.aboutDescription' } },
    {
      path: '/services',
      component: ServicesPage,
      meta: { titleKey: 'meta.servicesTitle', descriptionKey: 'meta.servicesDescription' },
    },
    { path: '/services/:slug', component: ServiceDetailPage, meta: { descriptionKey: 'meta.servicesDescription' } },
    { path: '/process', component: ProcessPage, meta: { titleKey: 'meta.processTitle', descriptionKey: 'meta.processDescription' } },
    { path: '/contact', component: ContactPage, meta: { titleKey: 'meta.contactTitle', descriptionKey: 'meta.contactDescription' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
