<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  currentPath: string
}>()

const navItems = [
  { href: '/reverse-shell', title: 'Reverse Shell' },
  { href: '/url-injection', title: 'URL Injection' },
  { href: '/base64', title: 'Base64' },
]

const path = ref(props.currentPath)
const isDrawerOpen = ref(false)

function isActive(href: string) {
  return path.value === href || (href === '/reverse-shell' && path.value === '/')
}

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

function closeDrawer() {
  isDrawerOpen.value = false
}

onMounted(() => {
  const sync = () => { path.value = window.location.pathname }
  sync()
  document.addEventListener('astro:page-load', sync)
  document.addEventListener('astro:after-swap', () => {
    closeDrawer()
    sync()
  })
})
</script>

<template>
  <header class="z-40 w-full py-6 px-6 flex justify-between items-center max-w-3xl mx-auto">
    <a href="/" class="font-bold text-xl text-link decoration-none">Offensive Web</a>

    <nav class="hidden sm:flex items-center gap-x-6">
      <a
        v-for="item in navItems"
        :key="item.href"
        :href="item.href"
        :class="['nav-link', isActive(item.href) ? '!opacity-100' : '']"
      >
        {{ item.title }}
      </a>
    </nav>

    <button
      type="button"
      class="sm:hidden bg-transparent border-none text-link cursor-pointer p-2 -m-2"
      aria-label="Toggle menu"
      @click="toggleDrawer"
    >
      <i :class="isDrawerOpen ? 'i-mdi-close' : 'i-mdi-menu'" class="text-2xl" />
    </button>
  </header>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isDrawerOpen"
        class="sm:hidden fixed inset-0 z-49 bg-black/50"
        @click="closeDrawer"
      />
    </Transition>
    <Transition name="slide">
      <nav
        v-if="isDrawerOpen"
        class="sm:hidden fixed h-screen z-50 right-0 top-0 min-w-60vw max-w-80vw bg-main p-6 text-lg flex flex-col gap-5"
      >
        <button
          type="button"
          class="self-end bg-transparent border-none text-link cursor-pointer p-2 -m-2"
          aria-label="Close menu"
          @click="closeDrawer"
        >
          <i class="i-mdi-close text-2xl" />
        </button>
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          :class="['nav-link', isActive(item.href) ? '!opacity-100' : '']"
          @click="closeDrawer"
        >
          {{ item.title }}
        </a>
      </nav>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
