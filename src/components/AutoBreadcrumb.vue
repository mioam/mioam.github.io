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
      const title = typeof raw === 'function' ? raw(route) : raw

      return {
        path: index === records.length - 1 ? route.path : record.path,
        title,
        isLast: index === records.length - 1,
      }
    })

  const trail = [{ path: '/', title: 'Home', isLast: false }]

  if (route.path.startsWith('/blog') && route.path !== '/blog') {
    trail.push({ path: '/blog', title: 'Blog', isLast: false })
  }

  return [...trail, ...items.filter((item) => item.path !== '/')]
    .filter(
      (item, index, records) => records.findIndex((record) => record.path === item.path) === index
    )
    .map((item, index, records) => ({
      ...item,
      isLast: index === records.length - 1,
    }))
})
</script>

<template>
  <nav class="auto-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="item in breadcrumbs" :key="item.path">
        <RouterLink v-if="!item.isLast" :to="{ path: item.path }">
          {{ item.title }}
        </RouterLink>
        <span v-else aria-current="page">{{ item.title }}</span>
        <span v-if="!item.isLast" class="separator" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.auto-breadcrumb {
  min-width: 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.auto-breadcrumb ol,
.auto-breadcrumb li {
  display: flex;
  align-items: center;
  min-width: 0;
}

.auto-breadcrumb ol {
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.auto-breadcrumb li {
  gap: 0.35rem;
}

.auto-breadcrumb a,
.auto-breadcrumb span[aria-current='page'] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.auto-breadcrumb span[aria-current='page'] {
  color: var(--accent);
}
</style>
