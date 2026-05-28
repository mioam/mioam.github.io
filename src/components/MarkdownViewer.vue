<script setup lang="ts">
import SharedMarkdownViewer from '@/shared/markdown/MarkdownViewer.vue'

defineProps<{
  value: string
}>()
</script>

<template>
  <SharedMarkdownViewer :value="value" />
</template>
