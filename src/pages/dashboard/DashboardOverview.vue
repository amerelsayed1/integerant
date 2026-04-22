<script setup lang="ts">
import { ref } from 'vue'
import { CalendarIcon, DownloadIcon } from 'lucide-vue-next'
import StatCard from '../../components/dashboard/StatCard.vue'
import RevenueChart from '../../components/dashboard/RevenueChart.vue'
import ServiceMix from '../../components/dashboard/ServiceMix.vue'
import ProjectsTable from '../../components/dashboard/ProjectsTable.vue'
import LeadsList from '../../components/dashboard/LeadsList.vue'
import ActivityFeed from '../../components/dashboard/ActivityFeed.vue'
import {
  stats,
  revenueSeries,
  serviceBreakdown,
  projects,
  leads,
  activity,
} from '../../data/dashboard'

const ranges = ['7D', '30D', '90D', '1Y'] as const
const range = ref<(typeof ranges)[number]>('30D')
</script>

<template>
  <div class="space-y-6">
    <!-- Stat cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        v-for="s in stats"
        :key="s.key"
        :label="s.label"
        :value="s.value"
        :change="s.change"
        :trend="s.trend"
        :icon="s.icon"
        :accent="s.accent"
      />
    </section>

    <!-- Chart + Service Mix -->
    <section class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
        <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h2 class="text-base font-semibold text-slate-900">Revenue</h2>
            <p class="text-xs text-slate-500">Monthly performance vs. target</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="inline-flex bg-slate-100 rounded-lg p-0.5 text-xs font-medium">
              <button
                v-for="r in ranges"
                :key="r"
                @click="range = r"
                :class="[
                  'px-2.5 py-1 rounded-md transition-colors',
                  range === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700',
                ]"
              >
                {{ r }}
              </button>
            </div>
            <button class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50">
              <DownloadIcon :size="13" />
              Export
            </button>
          </div>
        </div>
        <RevenueChart :data="revenueSeries" />
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-5">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-slate-900">Service mix</h2>
            <p class="text-xs text-slate-500">Revenue share by offering</p>
          </div>
          <span class="inline-flex items-center gap-1 text-xs text-slate-500">
            <CalendarIcon :size="13" />
            This month
          </span>
        </div>
        <ServiceMix :items="serviceBreakdown" />
      </div>
    </section>

    <!-- Projects + Leads -->
    <section class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="xl:col-span-2 bg-white border border-slate-200 rounded-xl">
        <div class="p-5 flex items-center justify-between border-b border-slate-100">
          <div>
            <h2 class="text-base font-semibold text-slate-900">Active projects</h2>
            <p class="text-xs text-slate-500">{{ projects.length }} engagements in flight</p>
          </div>
          <a
            href="#"
            class="text-xs font-medium text-blue-700 hover:text-blue-800"
            @click.prevent
          >
            View all
          </a>
        </div>
        <div class="px-5 pb-3">
          <ProjectsTable :projects="projects" />
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl">
        <div class="p-5 flex items-center justify-between border-b border-slate-100">
          <div>
            <h2 class="text-base font-semibold text-slate-900">Recent leads</h2>
            <p class="text-xs text-slate-500">Latest pipeline activity</p>
          </div>
          <a
            href="#"
            class="text-xs font-medium text-blue-700 hover:text-blue-800"
            @click.prevent
          >
            View all
          </a>
        </div>
        <div class="px-5 pb-3">
          <LeadsList :leads="leads" />
        </div>
      </div>
    </section>

    <!-- Activity -->
    <section class="bg-white border border-slate-200 rounded-xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-semibold text-slate-900">Activity</h2>
          <p class="text-xs text-slate-500">What happened across the workspace</p>
        </div>
      </div>
      <ActivityFeed :entries="activity" />
    </section>
  </div>
</template>
