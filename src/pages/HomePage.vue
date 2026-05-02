<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useSeo } from '../composables/seo'

useSeo({
  title: 'Software Solutions & Consulting for Startups',
  description:
    'Integrant builds scalable web, mobile, and SaaS software and provides expert technical consulting for startups and growing businesses. From idea to deployment.',
  path: '/',
})
</script>

<template>
  <HeroSection />
  <AboutSection />
  <ServicesSection />
  <ProcessSection />
  <ContactSection />
</template>
