<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'

type BreadcrumbValue = string | ((route: RouteLocationNormalizedLoaded) => string)

const route = useRoute()

const breadcrumbs = computed(() => {
  const items = route.matched
    .filter((record) => record.meta?.breadcrumb)
    .map((record, index, records) => {
      const raw = record.meta.breadcrumb as BreadcrumbValue
      const title = typeof raw === 'function' ? raw(route) : String(raw ?? '')

      return {
        path: index === records.length - 1 ? route.path : record.path,
        title,
      }
    })

  const trail = [{ path: '/', title: 'Home' }]

  return [...trail, ...items.filter((item) => item.path !== '/')].map((item, index, records) => ({
    ...item,
    isLast: index === records.length - 1,
  }))
})
</script>

<template>
  <nav class="mi-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="item in breadcrumbs" :key="item.path">
        <RouterLink v-if="!item.isLast" :to="item.path">
          {{ item.title }}
        </RouterLink>
        <span v-else aria-current="page">{{ item.title }}</span>
        <span v-if="!item.isLast" class="separator" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.mi-breadcrumb {
  color: var(--muted);
  font-size: 0.8rem;
}

.mi-breadcrumb ol,
.mi-breadcrumb li {
  display: flex;
  align-items: center;
}

.mi-breadcrumb ol {
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mi-breadcrumb li {
  gap: 0.35rem;
}

.mi-breadcrumb a,
.mi-breadcrumb span[aria-current='page'] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mi-breadcrumb span[aria-current='page'] {
  color: var(--accent);
}
</style>
