<script setup lang="ts">
import { computed } from 'vue'
import type { RevenuePoint } from '../../data/dashboard'

const props = defineProps<{ data: RevenuePoint[] }>()

const width = 720
const height = 260
const padX = 36
const padTop = 20
const padBottom = 32

const chart = computed(() => {
  const maxValue = Math.max(...props.data.flatMap((d) => [d.revenue, d.target])) * 1.1
  const stepX = (width - padX * 2) / (props.data.length - 1)
  const innerH = height - padTop - padBottom

  const toY = (v: number) => padTop + innerH - (v / maxValue) * innerH
  const toX = (i: number) => padX + i * stepX

  const points = props.data.map((d, i) => ({
    x: toX(i),
    y: toY(d.revenue),
    targetY: toY(d.target),
    label: d.label,
    value: d.revenue,
  }))

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padTop + innerH
  } L ${points[0].x} ${padTop + innerH} Z`

  const targetPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.targetY.toFixed(1)}`)
    .join(' ')

  const gridLines = Array.from({ length: 4 }).map((_, i) => {
    const v = (maxValue / 4) * (i + 1)
    return { y: toY(v), label: `$${Math.round(v / 1000)}k` }
  })

  return { points, linePath, areaPath, targetPath, gridLines }
})
</script>

<template>
  <div class="w-full">
    <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-auto" role="img" aria-label="Revenue trend">
      <defs>
        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- grid -->
      <g>
        <line
          v-for="g in chart.gridLines"
          :key="g.label"
          :x1="padX"
          :x2="width - padX"
          :y1="g.y"
          :y2="g.y"
          stroke="#e2e8f0"
          stroke-dasharray="3 4"
        />
        <text
          v-for="g in chart.gridLines"
          :key="`t-${g.label}`"
          :x="padX - 8"
          :y="g.y + 4"
          text-anchor="end"
          class="fill-slate-400"
          style="font-size: 10px"
        >
          {{ g.label }}
        </text>
      </g>

      <!-- target line -->
      <path :d="chart.targetPath" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5 4" />

      <!-- area + line -->
      <path :d="chart.areaPath" fill="url(#revFill)" />
      <path :d="chart.linePath" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round" />

      <!-- points -->
      <g>
        <g v-for="(p, i) in chart.points" :key="i">
          <circle :cx="p.x" :cy="p.y" r="4.5" fill="#ffffff" stroke="#1d4ed8" stroke-width="2" />
          <text
            :x="p.x"
            :y="height - 10"
            text-anchor="middle"
            class="fill-slate-500"
            style="font-size: 11px"
          >
            {{ p.label }}
          </text>
        </g>
      </g>
    </svg>

    <div class="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
      <span class="inline-flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-blue-700"></span>
        Revenue
      </span>
      <span class="inline-flex items-center gap-1.5">
        <span class="w-3 h-px border-t border-dashed border-slate-400"></span>
        Target
      </span>
    </div>
  </div>
</template>
