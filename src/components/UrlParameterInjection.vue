<script setup lang="ts">
import { ref } from 'vue'
import { urlPayloads } from '@/lib/payloads'

const baseUrl = ref('http://example.com/page.php')
const parameter = ref('id')
const copied = ref<string | null>(null)
const activeTab = ref('lfi')

function generateUrl(payload: string) {
  try {
    const url = new URL(baseUrl.value)
    url.searchParams.set(parameter.value, payload)
    return url.toString()
  } catch {
    return `${baseUrl.value}?${parameter.value}=${encodeURIComponent(payload)}`
  }
}

async function copyToClipboard(text: string, id: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = id
    setTimeout(() => { copied.value = null }, 2000)
  } catch { /* ignore */ }
}
</script>

<template>
  <div class="w-full space-y-6">
    <div class="space-y-1">
      <h1 class="text-title">URL Parameter Injection</h1>
      <p class="text-sm text-main op-70">Generate URLs with various injection payloads for testing</p>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div class="space-y-2">
        <label for="baseUrl" class="text-sm text-main">Base URL</label>
        <input id="baseUrl" v-model="baseUrl" type="text" placeholder="http://example.com/page.php" class="input" />
      </div>
      <div class="space-y-2">
        <label for="parameter" class="text-sm text-main">Parameter Name</label>
        <input id="parameter" v-model="parameter" type="text" placeholder="id" class="input" />
      </div>
    </div>

    <div class="flex gap-2 border-b border-main !border-op-30 pb-2 flex-wrap">
      <button
        v-for="key in Object.keys(urlPayloads)"
        :key="key"
        @click="activeTab = key"
        :class="[
          'px-3 py-1.5 text-sm rd-1 transition-opacity duration-200 cursor-pointer decoration-none border-none bg-transparent text-link',
          activeTab === key ? 'opacity-100 bg-neutral-500/15' : 'opacity-60 hover:opacity-100'
        ]"
      >
        {{ key.toUpperCase() }}
      </button>
    </div>

    <div v-for="(list, key) in urlPayloads" :key="key" v-show="activeTab === key" class="space-y-3">
      <div v-for="(payload, index) in list" :key="index" class="relative">
        <div class="bg-hex-161b22 rd-1 p-3 pr-10">
          <div class="text-xs text-main op-60 mb-1 font-mono">Payload: {{ payload }}</div>
          <div class="text-sm font-mono whitespace-pre-wrap break-all text-main">{{ generateUrl(payload) }}</div>
        </div>
        <button
          @click="copyToClipboard(generateUrl(payload), `${String(key)}-${index}`)"
          class="absolute top-2 right-2 btn-ghost h-7 w-7 p-0"
          aria-label="Copy"
        >
          <i v-if="copied === `${key}-${index}`" class="i-mdi-check text-green-500" />
          <i v-else class="i-mdi-content-copy" />
        </button>
      </div>
    </div>
  </div>
</template>
