<script setup lang="ts">
const clients = [
  { name: 'Apex Logistics', abbr: 'AL', color: '#1d4ed8', bg: '#dbeafe' },
  { name: 'PulseFit', abbr: 'PF', color: '#7e22ce', bg: '#f3e8ff' },
  { name: 'Northwind', abbr: 'NW', color: '#065f46', bg: '#d1fae5' },
  { name: 'Lumen Analytics', abbr: 'LA', color: '#c2410c', bg: '#ffedd5' },
  { name: 'TechCore', abbr: 'TC', color: '#0369a1', bg: '#e0f2fe' },
  { name: 'Orion SaaS', abbr: 'OS', color: '#6d28d9', bg: '#ede9fe' },
  { name: 'Meridian', abbr: 'MR', color: '#0f766e', bg: '#ccfbf1' },
  { name: 'Vantage', abbr: 'VG', color: '#b45309', bg: '#fef3c7' },
]
</script>

<template>
  <section class="py-14 bg-white border-y border-slate-100 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10" />

      <!-- Infinite scroll track -->
      <div class="relative">
        <!-- Left / right fade masks -->
        <div class="absolute inset-y-0 ltr:left-0 rtl:right-0 w-24 z-10 pointer-events-none"
          style="background: linear-gradient(to right, white, transparent)" />
        <div class="absolute inset-y-0 ltr:right-0 rtl:left-0 w-24 z-10 pointer-events-none"
          style="background: linear-gradient(to left, white, transparent)" />

        <div class="flex overflow-hidden">
          <!-- Duplicated for seamless loop -->
          <div class="flex gap-8 items-center animate-marquee whitespace-nowrap flex-none">
            <div
              v-for="(client, i) in [...clients, ...clients]"
              :key="`a-${i}`"
              class="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex-none hover:shadow-md transition-shadow duration-200"
            >
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-none"
                :style="{ background: client.bg, color: client.color }"
              >
                {{ client.abbr }}
              </div>
              <span class="text-sm font-semibold text-slate-700">{{ client.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 28s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}

[dir='rtl'] .animate-marquee {
  animation-direction: reverse;
}
</style>
