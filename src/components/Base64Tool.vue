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
  <div class="w-full space-y-6">
    <div class="space-y-1">
      <h1 class="text-title">Base64 Encoder/Decoder</h1>
      <p class="text-sm text-main op-70">Encode or decode Base64 strings</p>
    </div>

    <div class="space-y-2">
      <label for="input-area" class="text-sm text-main">Input</label>
      <textarea
        id="input-area"
        v-model="input"
        class="input min-h-30 py-2 font-mono"
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
        <pre class="bg-hex-161b22 rd-1 p-4 text-sm font-mono text-main whitespace-pre-wrap break-all min-h-20 m-0">{{ output }}</pre>
        <button
          @click="copyToClipboard"
          class="absolute top-2 right-2 btn-ghost h-7 w-7 p-0"
          aria-label="Copy"
        >
          <i v-if="copied" class="i-mdi-check text-green-500" />
          <i v-else class="i-mdi-content-copy" />
        </button>
      </div>
    </div>
  </div>
</template>
