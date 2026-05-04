<script setup lang="ts">
import { computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import WhyUsSection from '../components/WhyUsSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useSeo } from '../composables/seo'
import { useServicesStore } from '../stores/services'

const { list: servicesList } = useServicesStore()

useSeo({
  title: 'Software Development Company for Startups & Growing Businesses',
  description:
    'Integerant builds custom web platforms, mobile apps, SaaS systems, and business automation tools for startups and growing businesses in Egypt and the GCC.',
  path: '/',
  jsonLd: computed(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Services',
      itemListElement: servicesList.value.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://bunyanx.com/services/${service.slug}`,
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
  <WhyUsSection />
  <ProcessSection />
  <TestimonialsSection />
  <ContactSection />
</template>
