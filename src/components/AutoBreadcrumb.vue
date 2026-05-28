<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'

type BreadcrumbValue = string | ((route: RouteLocationNormalizedLoaded) => string)

const route = useRoute()

const breadcrumbs = computed(() => {
  const items = route.matched
    .filter(record => record.meta?.breadcrumb)
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

  return [...trail, ...items.filter(item => item.path !== '/')]
    .filter((item, index, records) => records.findIndex(record => record.path === item.path) === index)
    .map((item, index, records) => ({
      ...item,
      isLast: index === records.length - 1,
    }))
})
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="item.isLast ? undefined : { path: item.path }"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
