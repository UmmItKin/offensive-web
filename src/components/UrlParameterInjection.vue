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
  <div class="card w-full p-6 space-y-6">
    <div class="space-y-1">
      <h1 class="text-2xl font-800 text-link">URL Parameter Injection</h1>
      <p class="text-sm text-neutral-400">Generate URLs with various injection payloads for testing</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2 md:col-span-2">
        <label for="baseUrl" class="text-sm text-main">Base URL</label>
        <input id="baseUrl" v-model="baseUrl" type="text" placeholder="http://example.com/page.php" class="input" />
      </div>
      <div class="space-y-2 md:col-span-2">
        <label for="parameter" class="text-sm text-main">Parameter Name</label>
        <input id="parameter" v-model="parameter" type="text" placeholder="id" class="input" />
      </div>
    </div>

    <div class="flex gap-2 border-b border-neutral-700/50 pb-2">
      <button
        v-for="key in Object.keys(urlPayloads)"
        :key="key"
        @click="activeTab = key"
        :class="[
          'px-3 py-1.5 text-sm rd-1 transition-all duration-200 cursor-pointer decoration-none border-none',
          activeTab === key
            ? 'text-link op-100 bg-neutral-700/30'
            : 'text-link op-60 hover:op-100'
        ]"
      >
        {{ key.toUpperCase() }}
      </button>
    </div>

    <div v-for="(list, key) in urlPayloads" :key="key" v-show="activeTab === key" class="space-y-3">
      <div v-for="(payload, index) in list" :key="index" class="relative">
        <div class="bg-hex-161b22 rd-1 p-3 pr-10">
          <div class="text-xs text-neutral-500 mb-1 font-mono">Payload: {{ payload }}</div>
          <div class="text-sm font-mono whitespace-pre-wrap break-all text-neutral-300">{{ generateUrl(payload) }}</div>
        </div>
        <button
          @click="copyToClipboard(generateUrl(payload), `${key}-${index}`)"
          class="absolute top-2 right-2 btn-ghost h-7 w-7 p-0"
        >
          <i v-if="copied === `${key}-${index}`" class="i-mdi-check text-green-500" />
          <i v-else class="i-mdi-content-copy" />
        </button>
      </div>
    </div>
  </div>
</template>
