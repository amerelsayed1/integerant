<script setup lang="ts">
import { reactive } from 'vue'
import { MailIcon, SendIcon, BuildingIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { vAnimate } from '../composables/animate'

const { t } = useI18n()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const handleSubmit = () => { /* UI only */ }
</script>

<template>
  <section id="contact" class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-animate class="text-center mb-14">
        <span class="text-sm font-semibold text-gold uppercase tracking-wider">{{ t('contact.label') }}</span>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{{ t('contact.title') }}</h2>
        <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{{ t('contact.subtitle') }}</p>
      </div>

      <div v-animate.delay-100 class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div class="lg:col-span-3">
            <div class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label for="name" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.name') }}</label>
                  <input id="name" v-model="form.name" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" :placeholder="t('contact.form.namePlaceholder')" />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.email') }}</label>
                  <input id="email" v-model="form.email" type="email" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" :placeholder="t('contact.form.emailPlaceholder')" />
                </div>
              </div>
              <div class="mb-5">
                <label for="subject" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.subject') }}</label>
                <input id="subject" v-model="form.subject" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" :placeholder="t('contact.form.subjectPlaceholder')" />
              </div>
              <div class="mb-6">
                <label for="message" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.message') }}</label>
                <textarea id="message" v-model="form.message" rows="5" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors resize-none" :placeholder="t('contact.form.messagePlaceholder')" />
              </div>
              <button type="button" class="inline-flex items-center gap-2 px-7 py-3 bg-teal hover:bg-navy text-white font-medium rounded-xl transition-colors duration-200 shadow-sm shadow-teal/20" @click="handleSubmit">
                {{ t('contact.form.send') }}
                <SendIcon :size="16" />
              </button>
            </div>
          </div>

          <div class="lg:col-span-2 flex flex-col gap-6">
            <div class="bg-slate-50 rounded-2xl border border-slate-200 p-7">
              <div class="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <BuildingIcon :size="22" class="text-teal" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ t('contact.company.title') }}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{{ t('contact.company.desc') }}</p>
            </div>
            <div class="bg-slate-50 rounded-2xl border border-slate-200 p-7">
              <div class="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                <MailIcon :size="22" class="text-teal" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ t('contact.emailCard.title') }}</h3>
              <a href="mailto:info@bunyanx.com" class="text-teal hover:text-navy text-sm font-medium transition-colors">info@bunyanx.com</a>
              <p class="text-slate-500 text-sm mt-2">{{ t('contact.emailCard.response') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
