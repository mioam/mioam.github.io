import { getPost, getList, type FileInfo } from '@/api/post'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import 'katex/dist/katex.min.css'
import type { Plugin } from 'unified'
import type { PostDetail, PostSummary } from './types'
import { extractFrontmatter, type PostFrontmatter } from './frontmatter'
import { estimateReadingTime } from './readingTime'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(extractFrontmatter as unknown as Plugin)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeRaw)
  .use(rehypeSanitize)
  .use(rehypeKatex)
  .use(rehypeShiki, {
    themes: {
      light: 'github-light',
      dark: 'github-dark-dimmed',
    },
  })
  .use(rehypeStringify)

function toSummary(file: FileInfo): PostSummary {
  return {
    slug: file.slug,
    title: file.title,
    date: file.date,
    description: file.summary,
    tags: [],
    sourcePath: `md/${file.slug}.md`,
  }
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  const files = await getList()
  return files.map(toSummary)
}

export async function parseMarkdown(slug: string): Promise<PostDetail> {
  const raw = await getPost(slug)
  const result = await processor.process(raw.trim())
  const frontmatter = (result.data.frontmatter ?? {}) as PostFrontmatter

  return {
    slug,
    raw,
    content: String(result),
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? '',
    description: frontmatter.description ?? '',
    tags: frontmatter.tags ?? [],
    sourcePath: `md/${slug}.md`,
    readingTime: estimateReadingTime(raw),
  }
}
