<script setup lang="ts">
const faqs = [
  { q: 'How do I add a new project?', a: 'Click the "+ New project" button in the top bar and fill in the project details.' },
  { q: 'How do I invite team members?', a: 'Go to Settings → Workspace and use the Members tab to send invitations.' },
  { q: 'Can I export revenue data?', a: 'Yes — use the Export button on the Revenue chart in the Overview page.' },
  { q: 'How are lead statuses defined?', a: 'New → Contacted → Qualified → Proposal → Won/Lost. You can update status from the Leads page.' },
]
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 class="text-base font-semibold text-slate-900 mb-1">Contact support</h2>
      <p class="text-sm text-slate-500 mb-5">We typically respond within 24 hours.</p>
      <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
        <div class="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">IN</div>
        <div>
          <p class="text-sm font-medium text-slate-900">Integerant Support</p>
          <a href="mailto:info@integerant.com" class="text-sm text-blue-700 hover:underline">info@integerant.com</a>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 class="text-base font-semibold text-slate-900 mb-5">Frequently asked questions</h2>
      <dl class="space-y-5">
        <div v-for="faq in faqs" :key="faq.q" class="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
          <dt class="text-sm font-medium text-slate-900 mb-1">{{ faq.q }}</dt>
          <dd class="text-sm text-slate-500">{{ faq.a }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
