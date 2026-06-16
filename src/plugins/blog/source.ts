import { getPost } from '@/api/post'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'

import rehypeStringify from 'rehype-stringify'
import 'katex/dist/katex.min.css'
import remarkFrontmatter from 'remark-frontmatter'
import YAML from 'yaml'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import type { Plugin } from 'unified'
import { PostDetail } from './types'


function extractFrontmatter() {
  return (tree: Root, file: VFile) => {
    const yamlNode = tree.children.find(

      (node): node is { type: 'yaml'; value: string } =>
        node.type === 'yaml'
    )

    file.data.frontmatter = yamlNode
      ? YAML.parse(yamlNode.value)
      : {}
  }
}
const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(extractFrontmatter)

  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeRaw)
  // .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeKatex)
  .use(rehypeShiki, {
    themes: {
      light: 'github-light',
      dark: 'github-dark-dimmed'
    },
  })
  .use(rehypeStringify)

export async function parseMarkdown(slug: string) {
  const raw = await getPost(slug)
  const result = await processor.process(raw.trim())
  return {
    raw: raw,
    content: String(result),
    title: result.data.frontmatter.title,
    date: result.data.frontmatter.date,
    readingTime: estimateReadingTime(raw),
    slug: slug,
  } as PostDetail
}

function estimateReadingTime(body: string): string {
  const words = body
    .split(/\s+/)
    .map(item => item.trim())
    .filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))

  return `${minutes} min read`
}
