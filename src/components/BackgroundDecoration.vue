<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div
      class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
      :style="{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }"
    />
    <div
      class="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full opacity-[0.03]"
      :style="{ background: 'radial-gradient(circle, #1e40af 0%, transparent 70%)' }"
    />
    <div
      class="absolute inset-0 opacity-[0.03]"
      :style="{
        backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }"
    />
  </div>
</template>
