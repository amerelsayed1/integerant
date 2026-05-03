<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'

const { t } = useI18n()

/* Animated counters — triggered when section becomes visible */
const sectionRef = ref<HTMLElement | null>(null)
const counts = ref([0, 0, 0])
const targets = [50, 30, 5]
let animated = false

function animateCounters() {
  if (animated) return
  animated = true
  const duration = 1800
  const start = performance.now()
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    counts.value = targets.map((t) => Math.round(eased * t))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting) animateCounters() },
    { threshold: 0.3 },
  )
  if (sectionRef.value) io.observe(sectionRef.value)
})

const stats = [
  { key: 'projects', suffix: '+' },
  { key: 'clients',  suffix: '+' },
  { key: 'years',    suffix: '+' },
] as const
</script>

<template>
  <section id="about" ref="sectionRef" class="py-20 md:py-28" style="background: #E6E9ED20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div v-animate class="text-center mb-12">
          <span class="text-sm font-semibold uppercase tracking-wider" style="color: #C5A15A">{{ t('about.label') }}</span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold tracking-tight" style="color: #0D1B3D">{{ t('about.title') }}</h2>
        </div>

        <div v-animate.delay-100 class="space-y-5 text-center">
          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">{{ t('about.p1') }}</p>
          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">{{ t('about.p2') }}</p>
        </div>

        <!-- Animated stat counters -->
        <div v-animate.stagger class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="stat.key"
            class="bg-white rounded-2xl border border-slate-200 p-7 text-center shadow-sm hover:shadow-md transition-shadow duration-300 group"
          >
            <!-- Accent top bar -->
            <div class="w-10 h-1 rounded-full mx-auto mb-5 transition-all duration-500 group-hover:w-16" style="background: linear-gradient(90deg, #0FA4A6, #C5A15A)" />

            <div class="text-4xl font-black mb-1 tabular-nums" style="color: #0D1B3D">
              {{ counts[i] }}{{ stat.suffix }}
            </div>
            <div class="text-sm font-medium text-slate-500">{{ t(`about.stats.${stat.key}`) }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
