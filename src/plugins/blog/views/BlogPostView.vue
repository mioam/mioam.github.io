<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MiCard from '@/components/mi/MiCard.vue'
import { parseMarkdown } from '../source'
import { PostDetail } from '../types'

const route = useRoute()
const post = ref<PostDetail>()

onMounted(async () => {
  post.value = await parseMarkdown(String(route.params.slug))
})
</script>

<template>
  <MiCard v-if="!post" class="page">
    <el-empty description="文章不存在。" />
  </MiCard>

  <MiCard v-else as="article" class="page">
    <template #label>
      {{ post.date }} · {{ post.readingTime }}
    </template>
    <template #heading>
      {{ post.title }}
    </template>
    <template #actions>
      <RouterLink class="text-action" :to="`/blog/${post.slug}/edit`">编辑</RouterLink>
    </template>
    <div v-html="post.content" />
  </MiCard>
</template>
