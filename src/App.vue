<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import AutoBreadcrumb from './components/AutoBreadcrumb.vue'
import { navItems } from './app/plugins'

const isDark = ref(false)

watchEffect(() => {
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-left">
        <RouterLink class="brand" to="/">Minimal Lab</RouterLink>
        <AutoBreadcrumb />
      </div>

      <div class="header-actions">
        <nav class="site-nav" aria-label="主导航">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
            {{ item.label }}
          </RouterLink>
        </nav>
        <button class="theme-button" type="button" @click="isDark = !isDark">
          {{ isDark ? 'Light' : 'Dark' }}
        </button>
      </div>
    </header>

    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>
