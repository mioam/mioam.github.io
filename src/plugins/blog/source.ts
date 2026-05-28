import { parseMarkdownFile, type FrontmatterValue } from '@/shared/markdown/frontmatter'
import type { PostDetail, PostSummary } from './types'

const postFiles = import.meta.glob('../../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const postIndex = Object.entries(postFiles)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'post'
    const { meta, body } = parseMarkdownFile(raw)
    const summary = buildPostSummary(slug, path, meta, body)

    return {
      summary,
      body,
      raw,
    }
  })
  .sort((left, right) => right.summary.date.localeCompare(left.summary.date))

export function getPostSummariesSync(): PostSummary[] {
  return postIndex.map(item => item.summary)
}

export function getPostSync(slug: string): PostDetail | undefined {
  const item = postIndex.find(entry => entry.summary.slug === slug)

  if (!item) {
    return undefined
  }

  return {
    ...item.summary,
    content: item.body,
    raw: item.raw,
  }
}

export async function getList(): Promise<PostSummary[]> {
  return getPostSummariesSync()
}

export async function getPost(slug: string): Promise<PostDetail | undefined> {
  return getPostSync(slug)
}

function buildPostSummary(
  slug: string,
  sourcePath: string,
  meta: Record<string, FrontmatterValue>,
  body: string,
): PostSummary {
  const description = toText(meta.description ?? meta.excerpt, body.slice(0, 120))

  return {
    slug,
    title: toText(meta.title, slug),
    description,
    date: toText(meta.date, '2026-01-01'),
    updatedAt: toOptionalText(meta.updatedAt),
    tags: toTags(meta.tags),
    readingTime: toText(meta.readingTime, estimateReadingTime(body)),
    contentLength: body.length,
    draft: meta.draft === true,
    sourcePath,
  }
}

function toText(value: FrontmatterValue | undefined, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function toOptionalText(value: FrontmatterValue | undefined): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function toTags(value: FrontmatterValue | undefined): string[] {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim()) {
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
  }

  return []
}

function estimateReadingTime(body: string): string {
  const words = body
    .split(/\s+/)
    .map(item => item.trim())
    .filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))

  return `${minutes} min read`
}
