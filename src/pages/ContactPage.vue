<script setup lang="ts">
import { useI18n } from '../i18n'

const { current } = useI18n()
</script>

<template>
  <div class="pt-24 pb-16">
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ current.contact.title }}</h1>
      <p class="text-lg text-slate-600 max-w-3xl">{{ current.contact.subtitle }}</p>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
      <form class="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 class="text-xl font-semibold text-slate-900 mb-2">{{ current.contact.formTitle }}</h2>
        <input type="text" :placeholder="current.contact.fields.name" class="w-full px-4 py-3 border border-slate-300 rounded-lg" />
        <input type="email" :placeholder="current.contact.fields.email" class="w-full px-4 py-3 border border-slate-300 rounded-lg" />
        <input type="text" :placeholder="current.contact.fields.company" class="w-full px-4 py-3 border border-slate-300 rounded-lg" />
        <input type="text" :placeholder="current.contact.fields.budget" class="w-full px-4 py-3 border border-slate-300 rounded-lg" />
        <textarea :placeholder="current.contact.fields.message" rows="5" class="w-full px-4 py-3 border border-slate-300 rounded-lg" />
        <button type="button" class="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium">{{ current.contact.submit }}</button>
      </form>

      <aside class="bg-slate-900 text-white rounded-2xl p-6 h-fit">
        <h2 class="text-xl font-semibold mb-3">{{ current.contact.detailsTitle }}</h2>
        <p class="text-slate-300 text-sm leading-relaxed mb-4">{{ current.contact.detailsText }}</p>
        <a href="mailto:info@integrant.com" class="text-blue-300 hover:text-blue-200">info@integrant.com</a>
      </aside>
    </section>
  </div>
</template>
