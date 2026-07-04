<script setup lang="ts">
import MiCard from '@/components/MiCard.vue'
</script>

<template>
  <MiCard headingLevel="h1">
    <template #heading>页面不存在</template>
    <RouterLink to="/">返回首页</RouterLink>
  </MiCard>
</template>
