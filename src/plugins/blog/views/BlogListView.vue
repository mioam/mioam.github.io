<script setup lang="ts">
import MiCard from '@/components/mi/MiCard.vue'
import { getPostSummariesSync } from '../source'

const posts = getPostSummariesSync()
</script>

<template>
  <MiCard class="page">
    <div class="section-head">
      <div>
        <p class="eyebrow">Blog</p>
        <h1>文章</h1>
      </div>
      <RouterLink class="text-action" to="/blog/new">写文章</RouterLink>
    </div>

    <el-empty v-if="posts.length === 0" description="还没有文章。" />

    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.slug" class="post-list-item">
        <RouterLink class="post-link" :to="`/blog/${post.slug}`">
          <h2>{{ post.title }}</h2>
          <p class="muted">{{ post.description }}</p>
          <div class="meta cluster">
            <span>{{ post.date }}</span>
            <span>{{ post.readingTime }}</span>
            <span v-if="post.draft">draft</span>
          </div>
        </RouterLink>
      </li>
    </ul>
  </MiCard>
</template>
