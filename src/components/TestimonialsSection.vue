<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'

const { t, tm } = useI18n()

type Testimonial = { quote: string; author: string; role: string; company: string }
const items = computed<Testimonial[]>(() => {
  const val = tm('testimonials.items') as unknown
  return Array.isArray(val) ? (val as Testimonial[]) : []
})

const active = ref(0)

function prev() { active.value = (active.value - 1 + items.value.length) % items.value.length }
function next() { active.value = (active.value + 1) % items.value.length }
</script>

<template>
  <section class="py-20 md:py-28 bg-navy overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div v-animate class="text-center mb-16">
        <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('testimonials.label') }}</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">{{ t('testimonials.title') }}</h2>
        <p class="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">{{ t('testimonials.subtitle') }}</p>
      </div>

      <!-- Carousel -->
      <div v-animate.delay-100 class="max-w-3xl mx-auto">
        <!-- Quote card -->
        <div
          class="relative bg-navy/60 rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl"
        >
          <!-- Decorative quote icon -->
          <div class="absolute top-8 ltr:right-8 rtl:left-8 opacity-10">
            <QuoteIcon :size="64" class="text-teal/70" />
          </div>

          <!-- Stars -->
          <div class="flex gap-1 mb-6">
            <div v-for="s in 5" :key="s" class="w-4 h-4 text-amber-400">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
          </div>

          <!-- Quote text - transitions -->
          <transition name="fade" mode="out-in">
            <blockquote :key="active" class="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 italic">
              "{{ items[active]?.quote }}"
            </blockquote>
          </transition>

          <!-- Author -->
          <transition name="fade" mode="out-in">
            <div :key="`author-${active}`" class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg flex-none"
              >
                {{ items[active]?.author?.charAt(0) }}
              </div>
              <div>
                <div class="font-semibold text-white">{{ items[active]?.author }}</div>
                <div class="text-sm text-slate-400">{{ items[active]?.role }} · {{ items[active]?.company }}</div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Dots + arrows -->
        <div class="flex items-center justify-center gap-6 mt-8">
          <button
            class="w-10 h-10 rounded-full border border-slate-600 hover:border-teal hover:bg-teal/100/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
            :aria-label="'Previous'"
            @click="prev"
          >
            <ChevronLeftIcon :size="18" />
          </button>

          <div class="flex gap-2">
            <button
              v-for="(_, i) in items"
              :key="i"
              class="rounded-full transition-all duration-300"
              :class="i === active ? 'w-6 h-2.5 bg-teal/100' : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'"
              :aria-label="`Go to testimonial ${i + 1}`"
              @click="active = i"
            />
          </div>

          <button
            class="w-10 h-10 rounded-full border border-slate-600 hover:border-teal hover:bg-teal/100/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
            :aria-label="'Next'"
            @click="next"
          >
            <ChevronRightIcon :size="18" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
