<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import MiCard from '@/components/mi/MiCard.vue'
import MarkdownViewer from '@/shared/markdown/MarkdownViewer.vue'
import { saveMarkdownFile } from '@/shared/github/contentApi'
import { stringifyMarkdownFile } from '@/shared/markdown/frontmatter'
import { defaultRepoConfig } from '../config'
import { getPostSync } from '../source'

const route = useRoute()
const existingPost = computed(() => getPostSync(String(route.params.slug ?? '')))
const token = ref(sessionStorage.getItem('github_token') ?? '')
const saving = ref(false)
const message = ref('')
const error = ref('')

const form = reactive({
  slug: existingPost.value?.slug ?? 'new-post',
  title: existingPost.value?.title ?? '',
  description: existingPost.value?.description ?? '',
  date: existingPost.value?.date ?? new Date().toISOString().slice(0, 10),
  tags: existingPost.value?.tags.join(', ') ?? '',
  draft: existingPost.value?.draft ?? false,
  content: existingPost.value?.content ?? '# New post\n',
  owner: defaultRepoConfig.owner,
  repo: defaultRepoConfig.repo,
  branch: defaultRepoConfig.branch,
  postsPath: defaultRepoConfig.postsPath,
})

const markdown = computed(() =>
  stringifyMarkdownFile(
    {
      title: form.title || form.slug,
      description: form.description,
      date: form.date,
      tags: form.tags
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),
      draft: form.draft,
    },
    form.content,
  ),
)

async function savePost() {
  error.value = ''
  message.value = ''

  if (!token.value.trim()) {
    error.value = '需要 GitHub fine-grained token 才能保存。'
    return
  }

  if (!form.owner || !form.repo || !form.branch || !form.postsPath) {
    error.value = '请补全 GitHub 仓库配置。'
    return
  }

  saving.value = true
  sessionStorage.setItem('github_token', token.value)

  try {
    const result = await saveMarkdownFile({
      token: token.value,
      config: {
        owner: form.owner,
        repo: form.repo,
        branch: form.branch,
        postsPath: form.postsPath,
      },
      path: `${form.slug.replace(/\.md$/, '')}.md`,
      content: markdown.value,
      message: `Update post: ${form.title || form.slug}`,
    })

    message.value = result.commit?.html_url
      ? `已保存：${result.commit.html_url}`
      : '已保存到 GitHub。'
  } catch (saveError) {
    error.value = saveError instanceof Error ? saveError.message : '保存失败。'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <MiCard class="page-wide">
    <p class="eyebrow">Editor</p>
    <h1>{{ existingPost ? '编辑文章' : '写文章' }}</h1>

    <div class="editor-grid">
      <div class="stack">
        <div class="panel stack">
          <el-input v-model="form.slug" placeholder="post-slug">
            <template #prepend>slug</template>
          </el-input>
          <el-input v-model="form.title" placeholder="标题">
            <template #prepend>title</template>
          </el-input>
          <el-input v-model="form.description" placeholder="描述">
            <template #prepend>description</template>
          </el-input>
          <el-input v-model="form.date" placeholder="2026-05-28">
            <template #prepend>date</template>
          </el-input>
          <el-input v-model="form.tags" placeholder="vue, notes">
            <template #prepend>tags</template>
          </el-input>
          <el-checkbox v-model="form.draft">draft</el-checkbox>
        </div>

        <div class="panel stack">
          <el-input v-model="token" type="password" show-password placeholder="GitHub token">
            <template #prepend>token</template>
          </el-input>
          <el-input v-model="form.owner" placeholder="owner">
            <template #prepend>owner</template>
          </el-input>
          <el-input v-model="form.repo" placeholder="repo">
            <template #prepend>repo</template>
          </el-input>
          <el-input v-model="form.branch" placeholder="main">
            <template #prepend>branch</template>
          </el-input>
          <el-input v-model="form.postsPath" placeholder="src/content/posts">
            <template #prepend>path</template>
          </el-input>
        </div>

        <el-input
          v-model="form.content"
          class="editor-textarea"
          type="textarea"
          :rows="18"
          resize="vertical"
        />

        <div class="cluster">
          <el-button type="primary" :loading="saving" @click="savePost">保存到 GitHub</el-button>
          <span v-if="message" class="meta">{{ message }}</span>
          <span v-if="error" class="meta">{{ error }}</span>
        </div>
      </div>

      <div class="panel">
        <MarkdownViewer :value="form.content" />
      </div>
    </div>
  </MiCard>
</template>
