<script setup lang="ts">
import MiBreadcrumb from './components/MiBreadcrumb.vue'
import { navItems } from './app/plugins'
import MiThemeButton from './components/MiThemeButton.vue'
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-left">
        <RouterLink class="brand" to="/">Minimal Site</RouterLink>
        <MiBreadcrumb />
      </div>

      <div class="header-actions">
        <nav class="site-nav" aria-label="Main navigation">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
            {{ item.label }}
          </RouterLink>
        </nav>
        <MiThemeButton />
      </div>
    </header>

    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.site-shell {
  width: min(100% - var(--gutter), var(--stage-width));
  margin-inline: auto;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 2.5rem;
  padding-block: var(--space-1);
  border-bottom: 1px solid var(--border);
}

.header-left,
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
}

.header-left {
  flex: 1;
}

.brand {
  flex: 0 0 auto;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  color: var(--muted);
  font-size: 0.8rem;
}

.site-nav a.router-link-active {
  color: var(--accent);
}

.site-main {
  padding-block: var(--space-5) 0;
}
</style>
