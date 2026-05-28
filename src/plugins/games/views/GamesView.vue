<script setup lang="ts">
import { computed, ref } from 'vue'
import MiCard from '@/components/mi/MiCard.vue'

const count = ref(0)
const target = 10
const done = computed(() => count.value >= target)
</script>

<template>
  <MiCard class="page">
    <p class="eyebrow">Games</p>
    <h1>十次点击。</h1>
    <div class="panel stack">
      <p class="muted">这是一个最小插件示例，用来验证小游戏可以独立挂载。</p>
      <p>当前：{{ count }} / {{ target }}</p>
      <div class="cluster">
        <el-button type="primary" :disabled="done" @click="count += 1">点击</el-button>
        <el-button @click="count = 0">重置</el-button>
      </div>
      <p v-if="done">完成。</p>
    </div>
  </MiCard>
</template>
