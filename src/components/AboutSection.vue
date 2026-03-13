<script setup lang="ts">
import { UsersIcon, FolderIcon, CalendarIcon } from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useI18n } from '../i18n'

const { current } = useI18n()
</script>

<template>
  <section id="about" class="py-20 md:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div v-animate class="text-center mb-12">
          <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">{{ current.home.about.eyebrow }}</span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{{ current.home.about.title }}</h2>
        </div>

        <div v-animate.delay-100 class="space-y-5 text-center">
          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">{{ current.home.about.p1 }}</p>
          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">{{ current.home.about.p2 }}</p>
        </div>

        <div v-animate.stagger class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4"><FolderIcon :size="22" class="text-blue-600" /></div>
            <div class="text-3xl font-bold text-slate-900 mb-1">50+</div>
            <div class="text-sm text-slate-500 font-medium">{{ current.home.about.stats.projects }}</div>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4"><UsersIcon :size="22" class="text-blue-600" /></div>
            <div class="text-3xl font-bold text-slate-900 mb-1">30+</div>
            <div class="text-sm text-slate-500 font-medium">{{ current.home.about.stats.clients }}</div>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4"><CalendarIcon :size="22" class="text-blue-600" /></div>
            <div class="text-3xl font-bold text-slate-900 mb-1">5+</div>
            <div class="text-sm text-slate-500 font-medium">{{ current.home.about.stats.years }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
