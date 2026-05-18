<script setup lang="ts">
import { ref } from 'vue'

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
  <div class="card w-full p-6 space-y-6">
    <div class="space-y-1">
      <h1 class="text-2xl font-800 text-link">Base64 Encoder/Decoder</h1>
      <p class="text-sm text-neutral-400">Encode or decode Base64 strings</p>
    </div>

    <div class="space-y-2">
      <label for="input-area" class="text-sm text-main">Input</label>
      <textarea
        id="input-area"
        v-model="input"
        class="w-full min-h-[120px] px-3 py-2 rd-1 border border-neutral-700 bg-neutral-800 text-sm font-mono text-main placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors duration-200"
        placeholder="Enter text to encode or Base64 to decode..."
      />
    </div>

    <div class="flex gap-2">
      <button @click="encode" class="btn-primary flex-1">Encode</button>
      <button @click="decode" class="btn-primary flex-1">Decode</button>
    </div>

    <div v-if="output" class="space-y-2">
      <label class="text-sm text-main">Output</label>
      <div class="relative">
        <pre class="bg-hex-161b22 rd-1 p-4 text-sm font-mono whitespace-pre-wrap break-all min-h-[80px]">{{ output }}</pre>
        <button
          @click="copyToClipboard"
          class="absolute top-2 right-2 btn-ghost h-7 w-7 p-0"
        >
          <i v-if="copied" class="i-mdi-check text-green-500" />
          <i v-else class="i-mdi-content-copy" />
        </button>
      </div>
    </div>
  </div>
</template>
