<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

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

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

const handleSystemThemeChange = (event: MediaQueryListEvent) => {
  // 只有用户未手动设置主题时，才跟随系统主题变化。
  if (getStoredTheme() === null) {
    theme.value = event.matches ? 'dark' : 'light'
  }
}

onMounted(() => {
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleSystemThemeChange)
})
</script>

<template>
  <button
    class="theme-button"
    type="button"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    :aria-pressed="isDark"
    @click="toggleTheme"
  >
    <Moon v-if="isDark" />
    <Sunny v-else />
  </button>
</template>

<style scoped>
.theme-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0rem;
  border: none;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  width: 1rem;
}

.theme-button:hover {
  color: var(--accent);
}
</style>
