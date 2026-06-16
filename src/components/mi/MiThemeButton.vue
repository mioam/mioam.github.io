<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type ThemeMode = 'light' | 'dark'

const themeStorageKey = 'mi-theme'

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === 'light' || value === 'dark'

const getStoredTheme = (): ThemeMode | null => {
  try {
    const storedTheme = localStorage.getItem(themeStorageKey)
    return isThemeMode(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

const getPreferredTheme = (): ThemeMode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const theme = ref<ThemeMode>(getStoredTheme() ?? getPreferredTheme())
const isDark = computed(() => theme.value === 'dark')

const storeTheme = (nextTheme: ThemeMode) => {
  try {
    localStorage.setItem(themeStorageKey, nextTheme)
  } catch {
    // Theme persistence is optional if browser storage is unavailable.
  }
}

const toggleTheme = () => {
  theme.value = isDark.value ? 'light' : 'dark'
  storeTheme(theme.value)
}

watch(
  theme,
  (nextTheme) => {
    document.documentElement.dataset.theme = nextTheme
  },
  { immediate: true }
)
</script>

<template>
  <button class="theme-button" type="button" @click="toggleTheme">
    {{ isDark ? 'Light' : 'Dark' }}
  </button>
</template>

<style scoped>
.theme-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  width: 3rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.theme-button:hover {
  border-color: var(--accent);
}
</style>
