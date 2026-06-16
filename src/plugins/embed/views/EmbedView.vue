<script setup lang="ts">
import { ref } from 'vue'
import MiCard from '@/components/mi/MiCard.vue'

const url = ref('')
</script>

<template>
  <MiCard class="page-wide">
    <p class="eyebrow">Embed</p>
    <h1>嵌入页面。</h1>
    <div class="stack">
      <el-input v-model="url" placeholder="https://example.com 或 Gradio 页面地址">
        <template #prepend>url</template>
      </el-input>
      <iframe v-if="url" class="embed-frame" :src="url" title="Embedded application" />
      <div v-else class="panel muted">输入一个 URL，用 iframe 预览单文件网站或 Gradio 应用。</div>
    </div>
  </MiCard>
</template>

<style scoped>
.embed-frame {
  width: 100%;
  min-height: 70vh;
}
</style>
