<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const mounted = ref(false)
onMounted(() => requestAnimationFrame(() => { mounted.value = true }))
</script>

<template>
  <section id="home" class="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <!-- Left Content -->
        <div
          class="flex-1 text-center lg:text-start transition-all duration-[600ms] ease-out"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-teal/10 text-teal text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
            <span class="w-1.5 h-1.5 bg-teal/100 rounded-full" />
            {{ t('hero.badge') }}
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
            {{ t('hero.titleBefore') }}<span class="text-teal">{{ t('hero.titleHighlight') }}</span>{{ t('hero.titleAfter') }}
          </h1>

          <p class="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            {{ t('hero.subtitle') }}
          </p>

          <div class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <router-link
              to="/contact"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal hover:bg-navy text-white font-medium rounded-xl transition-colors duration-200 shadow-sm shadow-teal/20"
            >
              {{ t('hero.cta') }}
              <ArrowRightIcon :size="16" />
            </router-link>
            <router-link
              to="/services"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-slate-200 hover:border-navy text-slate-800 hover:text-teal font-medium rounded-xl transition-colors duration-200"
            >
              {{ t('hero.services') }}
            </router-link>
          </div>
        </div>

        <!-- Right Illustration -->
        <div
          class="flex-1 w-full max-w-lg lg:max-w-none transition-all duration-700 ease-out delay-200"
          :class="mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
          aria-hidden="true"
        >
          <div class="relative aspect-square max-w-md mx-auto">
            <div class="absolute inset-4 bg-teal/10 rounded-3xl" />
            <div class="absolute top-8 right-8 w-32 h-32 bg-teal/20 rounded-2xl rotate-12" />
            <div class="absolute bottom-12 left-8 w-24 h-24 bg-teal/20 rounded-full" />

            <div class="relative z-10 m-8 bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 p-6">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-3 h-3 rounded-full bg-red-400" />
                <div class="w-3 h-3 rounded-full bg-amber-400" />
                <div class="w-3 h-3 rounded-full bg-green-400" />
                <div class="ml-3 h-2.5 w-24 bg-slate-100 rounded" />
              </div>
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <div class="h-2.5 w-12 bg-teal/25 rounded" />
                  <div class="h-2.5 w-20 bg-slate-100 rounded" />
                  <div class="h-2.5 w-8 bg-teal/20 rounded" />
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <div class="h-2.5 w-16 bg-teal/20 rounded" />
                  <div class="h-2.5 w-28 bg-slate-100 rounded" />
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <div class="h-2.5 w-10 bg-teal/30 rounded" />
                  <div class="h-2.5 w-24 bg-slate-100 rounded" />
                  <div class="h-2.5 w-12 bg-teal/20 rounded" />
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <div class="h-2.5 w-20 bg-slate-100 rounded" />
                  <div class="h-2.5 w-14 bg-teal/25 rounded" />
                </div>
                <div class="flex items-center gap-2">
                  <div class="h-2.5 w-8 bg-teal/25 rounded" />
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <div class="h-2 w-16 bg-green-100 rounded" />
                </div>
                <div class="h-7 w-20 bg-teal rounded-md" />
              </div>
            </div>

            <div class="absolute top-4 left-4 z-20 bg-white rounded-xl shadow-md border border-slate-100 px-3 py-2 flex items-center gap-2">
              <div class="w-5 h-5 bg-teal/100 rounded-md" />
              <div class="h-2 w-12 bg-slate-200 rounded" />
            </div>
            <div class="absolute bottom-4 right-4 z-20 bg-white rounded-xl shadow-md border border-slate-100 px-3 py-2 flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full" />
              <span class="text-xs font-medium text-slate-600">{{ t('hero.deployed') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
