<script setup lang="ts">
import { computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useSeo } from '../composables/seo'
import { useServicesStore } from '../stores/services'

const { list: servicesList } = useServicesStore()

useSeo({
  title: 'Software Solutions & Consulting for Startups',
  description:
    'Integrant builds scalable web, mobile, and SaaS software and provides expert technical consulting for startups and growing businesses. From idea to deployment.',
  path: '/',
  jsonLd: computed(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Services',
      itemListElement: servicesList.value.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://integerant.com/services/${service.slug}`,
        name: service.title,
      })),
    },
  ]),
})
</script>

<template>
  <HeroSection />
  <AboutSection />
  <ServicesSection />
  <ProcessSection />
  <ContactSection />
</template>
