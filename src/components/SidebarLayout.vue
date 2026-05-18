<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  currentPath: string
  defaultOpen?: boolean
}>()

const isOpen = ref(props.defaultOpen ?? true)

const menuItems = [
  { href: '/reverse-shell', title: 'Reverse Shell', icon: 'mdi:console' },
  { href: '/url-injection', title: 'URL Injection', icon: 'mdi:web' },
  { href: '/base64', title: 'Base64', icon: 'mdi:code-string' },
]

function isActive(href: string) {
  return props.currentPath === href || (href === '/reverse-shell' && props.currentPath === '/')
}
</script>

<template>
  <div class="flex min-h-screen w-full">
    <aside
      :class="[
        'flex flex-col border-r bg-sidebar transition-all duration-300 ease-in-out',
        isOpen ? 'w-56' : 'w-14'
      ]"
    >
      <div class="flex h-14 items-center border-b px-3">
        <button
          @click="isOpen = !isOpen"
          class="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          :title="isOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        >
          <Icon :icon="isOpen ? 'mdi:menu-open' : 'mdi:menu'" class="h-5 w-5" />
        </button>
        <transition name="fade">
          <span v-if="isOpen" class="ml-3 text-base font-bold text-sidebar-foreground truncate">
            Offensive Web
          </span>
        </transition>
      </div>

      <nav class="flex-1 p-2 space-y-1">
        <a
          v-for="item in menuItems"
          :key="item.href"
          :href="item.href"
          :class="[
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          ]"
          :title="isOpen ? '' : item.title"
        >
          <Icon :icon="item.icon" class="h-5 w-5 shrink-0" />
          <transition name="fade">
            <span v-if="isOpen">{{ item.title }}</span>
          </transition>
        </a>
      </nav>
    </aside>

    <main class="flex-1 overflow-auto flex flex-col">
      <div class="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <button
          @click="isOpen = !isOpen"
          class="flex h-8 w-8 items-center justify-center rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors lg:hidden"
        >
          <Icon icon="mdi:menu" class="h-5 w-5" />
        </button>
      </div>
      <div class="container mx-auto flex-1 p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
