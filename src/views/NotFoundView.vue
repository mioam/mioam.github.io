<script setup lang="ts">
import MiCard from '@/components/mi/MiCard.vue'
</script>

<template>
  <MiCard class="page">
    <p class="eyebrow">404</p>
    <h1>页面不存在。</h1>
    <p class="muted">如果这是 GitHub Pages 刷新后的路径，应用已经接管路由，但没有找到对应页面。</p>
    <RouterLink to="/">返回首页</RouterLink>
  </MiCard>
</template>
