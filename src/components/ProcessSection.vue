<script setup lang="ts">
import {
  SearchIcon, ClipboardListIcon, CodeIcon,
  TestTubeIcon, RocketIcon, HeadphonesIcon,
} from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'

const steps = [
  { icon: SearchIcon, label: 'Step 1', title: 'Discovery', description: 'Understanding your vision, goals, and requirements' },
  { icon: ClipboardListIcon, label: 'Step 2', title: 'Planning', description: 'Defining scope, architecture, and project roadmap' },
  { icon: CodeIcon, label: 'Step 3', title: 'Development', description: 'Building your solution with agile methodology' },
  { icon: TestTubeIcon, label: 'Step 4', title: 'Testing', description: 'Rigorous QA to ensure quality and reliability' },
  { icon: RocketIcon, label: 'Step 5', title: 'Delivery', description: 'Deploying your product and ensuring smooth launch' },
  { icon: HeadphonesIcon, label: 'Step 6', title: 'Support', description: 'Ongoing maintenance and continuous improvement' },
]
</script>

<template>
  <section id="process" class="py-20 md:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-16">
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">How We Work</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Our Process</h2>
        <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          A proven methodology that ensures quality delivery, every time.
        </p>
      </div>

      <div class="relative">
        <div class="hidden lg:block absolute top-[52px] left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-0.5 bg-slate-200" />
        <div v-animate.stagger class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          <div v-for="step in steps" :key="step.title" class="flex flex-col items-center text-center">
            <div class="relative z-10 w-[52px] h-[52px] bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <component :is="step.icon" :size="20" class="text-blue-600" />
            </div>
            <span class="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">{{ step.label }}</span>
            <h3 class="text-base font-semibold text-slate-900 mb-1.5">{{ step.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed max-w-[180px]">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
