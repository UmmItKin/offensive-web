<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const input = ref('')
const output = ref('')
const copied = ref(false)

function encode() {
  try {
    output.value = btoa(input.value)
  } catch { /* invalid chars */ }
}

function decode() {
  try {
    output.value = atob(input.value)
  } catch { /* invalid base64 */ }
}

async function copyToClipboard() {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch { /* ignore */ }
}
</script>

<template>
  <div class="w-full max-w-4xl rounded-xl border bg-card text-card-foreground shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Base64 Encoder/Decoder</h3>
      <p class="text-sm text-muted-foreground">
        Encode or decode Base64 strings
      </p>
    </div>
    <div class="p-6 pt-0 space-y-6">
      <div class="space-y-2">
        <label for="input-area" class="text-sm font-medium leading-none">Input</label>
        <textarea
          id="input-area"
          v-model="input"
          class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
          placeholder="Enter text to encode or Base64 to decode..."
        />
      </div>

      <div class="flex gap-2">
        <button
          @click="encode"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1"
        >
          Encode
        </button>
        <button
          @click="decode"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1"
        >
          Decode
        </button>
      </div>

      <div v-if="output" class="space-y-2">
        <label class="text-sm font-medium leading-none">Output</label>
        <div class="relative">
          <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap break-all min-h-[80px] font-mono">{{ output }}</pre>
          <button
            @click="copyToClipboard"
            class="absolute top-2 right-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-7 w-7"
          >
            <Icon v-if="copied" icon="mdi:check" class="h-4 w-4 text-green-500" />
            <Icon v-else icon="mdi:content-copy" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
