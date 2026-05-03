<script setup lang="ts">
// Replace with actual WhatsApp number
const waNumber = '966500000000'
const waUrl = `https://wa.me/${waNumber}`
</script>

<template>
  <a
    :href="waUrl"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    class="fixed bottom-6 ltr:right-6 rtl:left-6 z-50 group flex items-center gap-3 transition-all duration-300"
  >
    <!-- Pulsing ring -->
    <span class="absolute inset-0 rounded-full animate-ping opacity-25" style="background: #25D366" />

    <!-- Button -->
    <span
      class="relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
      style="background: #25D366"
    >
      <!-- WhatsApp SVG icon -->
      <svg viewBox="0 0 24 24" fill="white" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.103 1.523 5.824L.057 23.536a.5.5 0 00.614.614l5.712-1.466A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.823 9.823 0 01-5.027-1.38l-.36-.214-3.73.957.975-3.617-.235-.372A9.818 9.818 0 012.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z"/>
      </svg>
    </span>

    <!-- Tooltip label -->
    <span
      class="absolute ltr:right-16 rtl:left-16 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg"
    >
      Chat with us
    </span>
  </a>
</template>
