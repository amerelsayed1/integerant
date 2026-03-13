<script setup lang="ts">
import { reactive } from 'vue'
import { MailIcon, SendIcon, BuildingIcon } from 'lucide-vue-next'
import { vAnimate } from '../composables/animate'
import { useI18n } from '../i18n'

const { current } = useI18n()
const form = reactive({ name: '', email: '', subject: '', message: '' })
const handleSubmit = () => {}
</script>

<template>
  <section id="contact" class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-14">
        <span class="text-sm font-semibold text-blue-700 uppercase tracking-wider">{{ current.home.contact.eyebrow }}</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{{ current.home.contact.title }}</h2>
        <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{{ current.home.contact.subtitle }}</p>
      </div>

      <div v-animate.delay-100 class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div class="lg:col-span-3">
            <div class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label for="name" class="block text-sm font-medium text-slate-700 mb-1.5">{{ current.home.contact.form.name }}</label>
                  <input id="name" v-model="form.name" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" :placeholder="current.home.contact.form.namePlaceholder" />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">{{ current.home.contact.form.email }}</label>
                  <input id="email" v-model="form.email" type="email" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" :placeholder="current.home.contact.form.emailPlaceholder" />
                </div>
              </div>
              <div class="mb-5">
                <label for="subject" class="block text-sm font-medium text-slate-700 mb-1.5">{{ current.home.contact.form.subject }}</label>
                <input id="subject" v-model="form.subject" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" :placeholder="current.home.contact.form.subjectPlaceholder" />
              </div>
              <div class="mb-6">
                <label for="message" class="block text-sm font-medium text-slate-700 mb-1.5">{{ current.home.contact.form.message }}</label>
                <textarea id="message" v-model="form.message" rows="5" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl resize-none" :placeholder="current.home.contact.form.messagePlaceholder" />
              </div>
              <button type="button" class="inline-flex items-center gap-2 px-7 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl" @click="handleSubmit">
                {{ current.home.contact.form.submit }}
                <SendIcon :size="16" />
              </button>
            </div>
          </div>

          <div class="lg:col-span-2 flex flex-col gap-6">
            <div class="bg-slate-50 rounded-2xl border border-slate-200 p-7">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5"><BuildingIcon :size="22" class="text-blue-600" /></div>
              <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ current.home.contact.companyTitle }}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{{ current.home.contact.companyText }}</p>
            </div>
            <div class="bg-slate-50 rounded-2xl border border-slate-200 p-7">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5"><MailIcon :size="22" class="text-blue-600" /></div>
              <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ current.home.contact.emailTitle }}</h3>
              <a href="mailto:info@integrant.com" class="text-blue-700 hover:text-blue-800 text-sm font-medium">info@integrant.com</a>
              <p class="text-slate-500 text-sm mt-2">{{ current.home.contact.emailResponse }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
