<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MiCard from '@/components/mi/MiCard.vue'
import MarkdownViewer from '@/shared/markdown/MarkdownViewer.vue'
import { extractMarkdownHeadings, withHeadingAnchors } from '@/shared/markdown/toc'
import { getPostSync } from '../source'

const route = useRoute()
const post = computed(() => getPostSync(String(route.params.slug ?? '')))
const headings = computed(() => (post.value ? extractMarkdownHeadings(post.value.content) : []))
const anchoredContent = computed(() => (post.value ? withHeadingAnchors(post.value.content) : ''))

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="article-stage">
    <MiCard v-if="!post" class="page">
      <el-empty description="文章不存在。" />
    </MiCard>

    <MiCard v-else as="article" class="page">
      <p class="eyebrow">Blog</p>
      <div class="section-head">
        <div>
          <h1>{{ post.title }}</h1>
          <p class="meta">{{ post.date }} · {{ post.readingTime }}</p>
        </div>
        <RouterLink class="text-action" :to="`/blog/${post.slug}/edit`">编辑</RouterLink>
      </div>
      <MarkdownViewer :value="anchoredContent" />
    </MiCard>

    <aside v-if="post" class="float-rail" aria-label="文章工具">
      <nav v-if="headings.length" class="toc" aria-label="文章目录">
        <a
          v-for="heading in headings"
          :key="heading.id"
          :class="['toc-link', `toc-link--${heading.depth}`]"
          :href="`#${heading.id}`"
        >
          {{ heading.title }}
        </a>
      </nav>
      <button class="rail-button" type="button" @click="backToTop">Top</button>
    </aside>
  </div>
</template>
