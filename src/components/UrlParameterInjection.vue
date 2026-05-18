<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
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
  <div class="w-full max-w-4xl rounded-xl border bg-card text-card-foreground shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">URL Parameter Injection</h3>
      <p class="text-sm text-muted-foreground">
        Generate URLs with various injection payloads for testing
      </p>
    </div>
    <div class="p-6 pt-0 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2 md:col-span-2">
          <label for="baseUrl" class="text-sm font-medium leading-none">Base URL</label>
          <input
            id="baseUrl"
            v-model="baseUrl"
            type="text"
            placeholder="http://example.com/page.php"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div class="space-y-2 md:col-span-2">
          <label for="parameter" class="text-sm font-medium leading-none">Parameter Name</label>
          <input
            id="parameter"
            v-model="parameter"
            type="text"
            placeholder="id"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div class="w-full">
        <div class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full grid-cols-4 grid">
          <button
            v-for="key in Object.keys(urlPayloads)"
            :key="key"
            @click="activeTab = key"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              activeTab === key ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50 hover:text-foreground'
            ]"
          >
            {{ key.toUpperCase() }}
          </button>
        </div>

        <div v-for="(list, key) in urlPayloads" :key="key" v-show="activeTab === key" class="mt-3 space-y-3">
          <div v-for="(payload, index) in list" :key="index" class="relative">
            <div class="bg-muted p-3 rounded-lg pr-12">
              <div class="text-xs text-muted-foreground mb-1 font-mono">Payload: {{ payload }}</div>
              <div class="text-sm font-mono whitespace-pre-wrap break-all">{{ generateUrl(payload) }}</div>
            </div>
            <button
              @click="copyToClipboard(generateUrl(payload), `${key}-${index}`)"
              class="absolute top-2 right-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-7 w-7"
            >
              <Icon v-if="copied === `${key}-${index}`" icon="mdi:check" class="h-4 w-4 text-green-500" />
              <Icon v-else icon="mdi:content-copy" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
