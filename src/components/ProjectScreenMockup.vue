<script setup lang="ts">
import type { ProjectScreen } from '../data/projects'

const props = defineProps<{ screen: ProjectScreen; index: number }>()
const isBrowser = props.screen.layout === 'browser'
</script>

<template>
  <!-- Browser shell (web projects) -->
  <div v-if="isBrowser" class="flex-none w-[320px] sm:w-[360px] flex flex-col gap-4">
    <div
      class="relative w-full rounded-xl border border-white/10 shadow-2xl overflow-hidden"
      style="aspect-ratio: 16/10"
      :style="{ background: screen.bg }"
    >
      <!-- Browser chrome -->
      <div class="flex items-center gap-1.5 px-3 py-2 border-b border-white/10" :style="{ background: 'rgba(0,0,0,0.35)' }">
        <div class="w-2 h-2 rounded-full bg-red-400/70" />
        <div class="w-2 h-2 rounded-full bg-yellow-400/70" />
        <div class="w-2 h-2 rounded-full bg-green-400/70" />
        <div class="flex-1 mx-2 h-4 rounded px-2 flex items-center" style="background: rgba(255,255,255,0.08)">
          <div class="h-1 rounded w-3/4" :style="{ background: screen.accent + '55' }" />
        </div>
      </div>
      <!-- Content area: sidebar + main -->
      <div class="flex h-full">
        <!-- Sidebar -->
        <div class="w-14 flex-none flex flex-col gap-2 p-2 border-e border-white/5" style="background: rgba(0,0,0,0.2)">
          <div v-for="i in 6" :key="i" class="h-4 rounded" :style="{ background: i === 2 ? screen.accent + '55' : 'rgba(255,255,255,0.07)', width: i === 2 ? '90%' : `${[70,90,60,80,55][i-1] ?? 70}%` }" />
        </div>
        <!-- Main content -->
        <div class="flex-1 p-2 flex flex-col gap-1.5 overflow-hidden">
          <!-- Stat cards row -->
          <div class="flex gap-1.5 flex-none">
            <div v-for="(_, si) in [85, 62, 91]" :key="si"
              class="flex-1 rounded p-1.5" style="background: rgba(255,255,255,0.06)">
              <div class="h-2 rounded mb-1 w-1/2" :style="{ background: screen.accent + '66' }" />
              <div class="h-3 rounded w-3/4" :style="{ background: screen.accent + (si === 0 ? 'cc' : '44') }" />
            </div>
          </div>
          <!-- Chart area -->
          <div class="flex-1 rounded p-1.5 overflow-hidden" style="background: rgba(255,255,255,0.04)">
            <div class="flex items-end gap-0.5 h-full pb-1">
              <div v-for="(bar, bi) in [40, 65, 50, 80, 60, 90, 70, 55, 85, 75]" :key="bi"
                class="flex-1 rounded-t-sm" :style="{ height: bar + '%', background: bi === 5 ? screen.accent : screen.accent + '33' }" />
            </div>
          </div>
          <!-- Table rows -->
          <div class="flex-none flex flex-col gap-0.5">
            <div v-for="i in 3" :key="i" class="flex gap-1 rounded px-1.5 py-1" style="background: rgba(255,255,255,0.04)">
              <div class="h-1.5 rounded flex-1" :style="{ background: screen.accent + '55', width: [60,80,45][i-1] + '%' }" />
              <div class="h-1.5 rounded w-8" style="background: rgba(255,255,255,0.15)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <p class="text-sm font-semibold text-slate-900 leading-snug">{{ screen.title }}</p>
      <p class="text-xs text-slate-500 mt-1 leading-snug">{{ screen.description }}</p>
    </div>
  </div>

  <!-- Phone shell (mobile projects) -->
  <div v-else class="flex-none w-[220px] sm:w-[240px] flex flex-col items-center gap-4">
    <div
      class="relative w-full rounded-[2rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden"
      style="aspect-ratio: 9/18"
      :style="{ background: screen.bg }"
    >
      <!-- Status bar -->
      <div class="flex items-center justify-between px-4 pt-2 pb-1">
        <span class="text-[8px] font-semibold" :style="{ color: screen.accent + 'cc' }">9:41</span>
        <div class="flex items-center gap-1">
          <div class="w-3 h-1 rounded-full opacity-60" :style="{ background: screen.accent }" />
          <div class="w-1 h-1 rounded-full opacity-60" :style="{ background: screen.accent }" />
        </div>
      </div>

      <!-- Map layout -->
      <template v-if="screen.layout === 'map'">
        <div class="relative flex-1 mx-2 mb-2 rounded-xl overflow-hidden" style="height: calc(100% - 60px)">
          <!-- Map grid -->
          <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" :stroke="screen.accent" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <!-- Route line -->
          <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polyline points="30,80 80,55 120,90 160,40 200,70" fill="none" :stroke="screen.accent" stroke-width="2" stroke-dasharray="4 2" opacity="0.7"/>
            <polyline points="20,140 60,120 100,145 150,110 190,130" fill="none" :stroke="screen.accent" stroke-width="2" stroke-dasharray="4 2" opacity="0.5"/>
          </svg>
          <!-- Vehicle dots -->
          <div v-for="(pos, i) in [{x:'22%',y:'38%'},{x:'50%',y:'25%'},{x:'67%',y:'55%'},{x:'80%',y:'22%'}]" :key="i"
            class="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
            :style="{ left: pos.x, top: pos.y, background: screen.accent }">
            <div class="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <!-- Bottom panel -->
          <div class="absolute bottom-0 left-0 right-0 p-2 rounded-t-xl backdrop-blur-sm" style="background: rgba(0,0,0,0.6)">
            <div class="text-[9px] font-bold mb-1" :style="{ color: screen.accent }">FLEET OVERVIEW</div>
            <div class="flex gap-2">
              <div v-for="stat in ['212 Active','8 Alert','4 Late']" :key="stat"
                class="flex-1 text-center py-1 rounded text-[8px] font-medium text-white" style="background: rgba(255,255,255,0.1)">
                {{ stat }}
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Kanban layout -->
      <template v-else-if="screen.layout === 'kanban'">
        <div class="mx-2 mt-1 mb-2 flex gap-1.5 overflow-hidden" style="height: calc(100% - 50px)">
          <div v-for="(col, ci) in [{label:'Queued',n:3},{label:'Assigned',n:4},{label:'In Transit',n:2}]" :key="ci"
            class="flex-1 rounded-lg p-1.5 flex flex-col gap-1" style="background: rgba(255,255,255,0.05)">
            <div class="text-[7px] font-bold uppercase tracking-wide mb-1 text-center" :style="{ color: screen.accent }">{{ col.label }}</div>
            <div v-for="j in col.n" :key="j"
              class="rounded py-1.5 px-1" style="background: rgba(255,255,255,0.08)">
              <div class="h-1 rounded mb-1 w-3/4" :style="{ background: screen.accent + '66' }" />
              <div class="h-0.5 rounded w-1/2" style="background: rgba(255,255,255,0.2)" />
            </div>
          </div>
        </div>
      </template>

      <!-- Mobile form layout -->
      <template v-else-if="screen.layout === 'mobile-form'">
        <div class="mx-2 mt-1 mb-2 flex flex-col gap-2" style="height: calc(100% - 50px)">
          <!-- Photo capture area -->
          <div class="rounded-xl flex-none h-24 flex flex-col items-center justify-center border-2 border-dashed" :style="{ borderColor: screen.accent + '66', background: screen.accent + '11' }">
            <div class="w-6 h-6 rounded-full flex items-center justify-center mb-1" :style="{ background: screen.accent + '33' }">
              <div class="w-2.5 h-2.5 rounded-full" :style="{ background: screen.accent }" />
            </div>
            <div class="text-[8px]" :style="{ color: screen.accent }">Tap to capture photo</div>
          </div>
          <!-- Checklist -->
          <div v-for="item in ['Package handed over','ID verified','Condition checked']" :key="item"
            class="flex items-center gap-2 px-2 py-1.5 rounded-lg" style="background: rgba(255,255,255,0.06)">
            <div class="w-3 h-3 rounded flex-none border" :style="{ borderColor: screen.accent, background: screen.accent + '33' }" />
            <div class="text-[8px] text-white/70 flex-1">{{ item }}</div>
          </div>
          <!-- Signature area -->
          <div class="rounded-xl flex-1 flex flex-col items-center justify-center border" style="background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1)">
            <div class="text-[8px] text-white/40 mb-1">Customer signature</div>
            <svg width="80" height="24" viewBox="0 0 80 24"><path d="M10,18 C20,8 30,20 40,12 C50,4 60,16 70,10" fill="none" :stroke="screen.accent" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <!-- Submit button -->
          <div class="rounded-xl py-2 text-center text-[9px] font-bold text-white" :style="{ background: screen.accent }">
            Confirm Delivery
          </div>
        </div>
      </template>

      <!-- Chart layout -->
      <template v-else-if="screen.layout === 'chart'">
        <div class="mx-2 mt-1 mb-2 flex flex-col gap-2" style="height: calc(100% - 50px)">
          <!-- Metric rings -->
          <div class="flex gap-2 px-1">
            <div v-for="(ring, ri) in [{v:78},{v:65},{v:92}]" :key="ri"
              class="flex-1 flex flex-col items-center py-2 rounded-lg" style="background: rgba(255,255,255,0.05)">
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="4"/>
                <circle cx="18" cy="18" r="14" fill="none" :stroke="screen.accent" stroke-width="4"
                  :stroke-dasharray="`${ring.v * 0.88} 88`" stroke-dashoffset="22" stroke-linecap="round" transform="rotate(-90 18 18)"/>
                <text x="18" y="22" text-anchor="middle" font-size="8" font-weight="bold" fill="white">{{ ring.v }}</text>
              </svg>
            </div>
          </div>
          <!-- Bar chart -->
          <div class="flex-1 px-2 flex flex-col justify-end">
            <div class="flex items-end gap-1 h-full pb-1">
              <div v-for="(bar, bi) in [40,65,55,80,70,90,75]" :key="bi"
                class="flex-1 rounded-t-sm min-h-[4px]" :style="{ height: bar + '%', background: bi === 5 ? screen.accent : screen.accent + '44' }" />
            </div>
            <div class="flex justify-between mt-1">
              <span v-for="d in ['M','T','W','T','F','S','S']" :key="d" class="text-[7px] text-white/30">{{ d }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Feed layout -->
      <template v-else-if="screen.layout === 'feed'">
        <div class="mx-2 mt-1 mb-2 flex flex-col gap-1.5 overflow-hidden" style="height: calc(100% - 50px)">
          <div v-for="i in 5" :key="i" class="flex items-center gap-2 p-2 rounded-lg" style="background: rgba(255,255,255,0.06)">
            <div class="w-6 h-6 rounded-lg flex-none" :style="{ background: screen.accent + (i % 2 === 0 ? '44' : '22') }" />
            <div class="flex-1 min-w-0">
              <div class="h-1.5 rounded mb-1" :style="{ width: [70,55,80,65,75][i-1] + '%', background: screen.accent + '88' }" />
              <div class="h-1 rounded w-1/2" style="background: rgba(255,255,255,0.15)" />
            </div>
            <div class="w-8 h-4 rounded text-[7px] flex items-center justify-center font-bold" :style="{ background: screen.accent + '33', color: screen.accent }">
              {{ ['→','✓','↑','·','→'][i-1] }}
            </div>
          </div>
        </div>
      </template>

      <!-- Table layout -->
      <template v-else-if="screen.layout === 'table'">
        <div class="mx-2 mt-1 mb-2" style="height: calc(100% - 50px)">
          <!-- Header row -->
          <div class="flex gap-1 px-1 py-1 mb-1 rounded" :style="{ background: screen.accent + '22' }">
            <div v-for="col in ['Status','Route','ETA']" :key="col" class="flex-1 text-[7px] font-bold" :style="{ color: screen.accent }">{{ col }}</div>
          </div>
          <!-- Rows -->
          <div v-for="(row, ri) in [['🟢','R-041','On time'],['🟡','R-088','−4 min'],['🔴','R-103','Late'],['🟢','R-117','On time'],['🟡','R-125','−2 min'],['🟢','R-139','On time']]" :key="ri"
            class="flex items-center gap-1 px-1 py-1.5 border-b" style="border-color: rgba(255,255,255,0.06)">
            <div class="flex-1 text-[8px]">{{ row[0] }}</div>
            <div class="flex-1 text-[8px] font-mono" :style="{ color: screen.accent }">{{ row[1] }}</div>
            <div class="flex-1 text-[8px] text-white/60">{{ row[2] }}</div>
          </div>
        </div>
      </template>

      <!-- API layout -->
      <template v-else-if="screen.layout === 'api'">
        <div class="mx-2 mt-1 mb-2 flex flex-col gap-1.5" style="height: calc(100% - 50px)">
          <!-- Endpoint pills -->
          <div v-for="(ep, ei) in [{m:'GET',p:'/invoices',c:'#34d399'},{m:'POST',p:'/invoices',c:'#60a5fa'},{m:'GET',p:'/clients',c:'#34d399'},{m:'DELETE',p:'/invoice/:id',c:'#f87171'}]" :key="ei"
            class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg" style="background: rgba(255,255,255,0.05)">
            <span class="text-[7px] font-bold px-1.5 py-0.5 rounded font-mono" :style="{ background: ep.c + '33', color: ep.c }">{{ ep.m }}</span>
            <span class="text-[8px] font-mono text-white/70 truncate">{{ ep.p }}</span>
          </div>
          <!-- Response block -->
          <div class="flex-1 rounded-lg p-2 font-mono text-[7px] leading-4" style="background: rgba(0,0,0,0.4)">
            <span :style="{ color: screen.accent }">200 OK</span><br/>
            <span class="text-white/40">{"data": [</span><br/>
            <span class="text-white/40 pl-2">{"id": "inv_01",</span><br/>
            <span class="text-white/40 pl-2"> "total": 4250,</span><br/>
            <span class="text-white/40 pl-2"> "status": "paid"}</span><br/>
            <span class="text-white/40">]}</span>
          </div>
        </div>
      </template>

      <!-- Wizard layout -->
      <template v-else-if="screen.layout === 'wizard'">
        <div class="mx-2 mt-1 mb-2 flex flex-col gap-2" style="height: calc(100% - 50px)">
          <!-- Step progress -->
          <div class="flex items-center gap-1 px-1">
            <div v-for="(step, si) in [1,2,3,4,5]" :key="si" class="flex items-center flex-1">
              <div class="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold flex-none"
                :style="{ background: si < 3 ? screen.accent : 'rgba(255,255,255,0.1)', color: si < 3 ? '#000' : 'rgba(255,255,255,0.3)' }">
                {{ step }}
              </div>
              <div v-if="si < 4" class="flex-1 h-0.5 mx-0.5" :style="{ background: si < 2 ? screen.accent : 'rgba(255,255,255,0.1)' }" />
            </div>
          </div>
          <!-- Step title -->
          <div class="px-1">
            <div class="text-[9px] font-bold text-white mb-0.5">Connect your data</div>
            <div class="text-[7px] text-white/50">Step 3 of 5 — pick a data source</div>
          </div>
          <!-- Options -->
          <div v-for="opt in ['Google Analytics','Segment','Mixpanel']" :key="opt"
            class="flex items-center gap-2 px-2 py-2 rounded-lg border" :style="{ borderColor: opt === 'Segment' ? screen.accent : 'rgba(255,255,255,0.1)', background: opt === 'Segment' ? screen.accent + '15' : 'rgba(255,255,255,0.04)' }">
            <div class="w-4 h-4 rounded flex-none" :style="{ background: screen.accent + '44' }" />
            <div class="text-[8px] text-white/80">{{ opt }}</div>
            <div v-if="opt === 'Segment'" class="ml-auto w-3 h-3 rounded-full" :style="{ background: screen.accent }" />
          </div>
          <!-- CTA -->
          <div class="mt-auto rounded-xl py-2 text-center text-[9px] font-bold text-black" :style="{ background: screen.accent }">
            Continue →
          </div>
        </div>
      </template>

      <!-- Notch at the top -->
      <div class="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-slate-800 rounded-full" />
    </div>

    <!-- Screen label below device -->
    <div class="text-center">
      <p class="text-sm font-semibold text-slate-900 leading-snug">{{ screen.title }}</p>
      <p class="text-xs text-slate-500 mt-1 leading-snug">{{ screen.description }}</p>
    </div>
  </div>
</template>
