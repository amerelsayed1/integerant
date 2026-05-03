<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'
import { useServicesStore } from '../stores/services'
import { getIcon } from '../data/serviceIcons'

const { t } = useI18n()
const { list } = useServicesStore()

const serviceList = computed(() =>
  list.value.map((s) => ({
    ...s,
    title: t(`services.items.${s.slug}.title`),
    tagline: t(`services.items.${s.slug}.tagline`),
  })),
)
</script>

<template>
  <section id="services" class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-14">
        <span class="text-sm font-semibold uppercase tracking-wider" style="color: #C5A15A">{{ t('services.label') }}</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold tracking-tight" style="color: #0D1B3D">{{ t('services.title') }}</h2>
        <p class="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">{{ t('services.subtitle') }}</p>
      </div>

      <div v-animate.stagger class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="(service, i) in serviceList"
          :key="service.slug"
          :to="`/services/${service.slug}`"
          class="group block bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
          style="hover:border-color: #0FA4A6"
        >
          <!-- Number watermark -->
          <div
            class="absolute top-4 ltr:right-5 rtl:left-5 text-6xl font-black opacity-[0.035] leading-none select-none"
            style="color: #0D1B3D"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </div>

          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
            style="background: #0FA4A610"
          >
            <component :is="getIcon(service.iconName)" :size="22" style="color: #0FA4A6" />
          </div>

          <h3 class="text-base font-semibold mb-2 transition-colors duration-200" style="color: #0D1B3D">{{ service.title }}</h3>
          <p class="text-slate-500 leading-relaxed text-sm mb-5">{{ service.tagline }}</p>

          <span
            class="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
            style="color: #0FA4A6"
          >
            {{ t('services.learnMore') }} <ArrowRightIcon :size="14" />
          </span>

          <!-- Bottom hover accent -->
          <div
            class="absolute bottom-0 ltr:left-0 rtl:right-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
            style="background: linear-gradient(90deg, #0FA4A6, #C5A15A)"
          />
        </router-link>
      </div>

      <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link
          to="/services"
          class="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 hover:border-[#0FA4A6] text-slate-700 hover:text-[#0FA4A6] font-medium rounded-xl transition-colors duration-200"
        >
          {{ t('services.viewAll') }} <ArrowRightIcon :size="14" />
        </router-link>
        <router-link
          to="/projects"
          class="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-xl transition-colors duration-200 hover:bg-[#0FA4A6]/5"
          style="color: #0FA4A6"
        >
          {{ t('services.caseStudies') }} <ArrowRightIcon :size="14" />
        </router-link>
      </div>
    </div>
  </section>
</template>
