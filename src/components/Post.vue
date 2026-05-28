<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MiCard from '@/components/mi/MiCard.vue'
import { getPostSync } from '@/api/post'
import MarkdownViewer from './MarkdownViewer.vue'

const route = useRoute()
const post = computed(() => getPostSync(String(route.params.slug ?? route.params.id)))
</script>

<template>
  <el-empty v-if="!post" description="Post not found." />

  <MiCard v-else as="article" class="page">
    <p class="eyebrow">{{ post.date }}</p>
    <h1>{{ post.title }}</h1>
    <MarkdownViewer :value="post.content" />
  </MiCard>
</template>
