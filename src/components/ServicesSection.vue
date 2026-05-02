<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useServicesStore } from '../stores/services'
import { getIcon } from '../data/serviceIcons'

const { list } = useServicesStore()
</script>

<template>
  <section id="services" class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-14">
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">What We Do</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Our Services</h2>
        <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Comprehensive software solutions to help your business grow and succeed in the digital landscape.
        </p>
      </div>

      <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="service in list"
          :key="service.slug"
          :to="`/services/${service.slug}`"
          class="group block bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
        >
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors duration-300">
            <component :is="getIcon(service.iconName)" :size="22" class="text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ service.title }}</h3>
          <p class="text-slate-600 leading-relaxed text-sm mb-4">{{ service.tagline }}</p>
          <span class="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 group-hover:gap-2.5 transition-all duration-200">
            Learn more <ArrowRightIcon :size="14" />
          </span>
        </router-link>
      </div>

      <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link
          to="/services"
          class="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 hover:border-blue-700 text-slate-800 hover:text-blue-700 font-medium rounded-xl transition-colors duration-200"
        >
          View all services <ArrowRightIcon :size="14" />
        </router-link>
        <router-link
          to="/projects"
          class="inline-flex items-center gap-2 px-6 py-3 text-blue-700 hover:text-blue-800 font-medium rounded-xl transition-colors duration-200"
        >
          See case studies <ArrowRightIcon :size="14" />
        </router-link>
      </div>
    </div>
  </section>
</template>
