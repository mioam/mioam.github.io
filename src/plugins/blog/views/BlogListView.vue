<script setup lang="ts">
import MiCard from '@/components/mi/MiCard.vue'
import { getList } from '@/api/post'
import type { FileInfo } from '@/api/post'
import MiList from '@/components/mi/MiList.vue'
import { onMounted, ref } from 'vue'


const posts = ref<FileInfo[]>([])

onMounted(async () => {
  posts.value = await getList()
  console.log(posts)
})
</script>

<template>
  <MiCard class="page">
    <template #label>
      Blog
    </template>
    <template #heading>
      文章
    </template>
    <template #actions>
      <RouterLink class="text-action" to="/blog/new">写文章</RouterLink>
    </template>

    <el-empty v-if="posts.length === 0" description="还没有文章。" />
    <MiList :items="posts">
      <template #default="{ item }">
        <RouterLink class="post-link" :to="`/blog/${item.slug}`">
          <h2 class="title">{{ item.title }}</h2>
          <p class="muted">{{ item.summary }}</p>
          <div class="muted meta">
            <span>{{ item.date }}</span>
          </div>
        </RouterLink>
      </template>
    </MiList>

  </MiCard>
</template>

<style scoped>
.post-link:hover>.title {
  color: var(--accent);
}

.muted {
  color: var(--muted);
}
</style>
