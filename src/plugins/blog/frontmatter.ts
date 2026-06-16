import type { Root } from 'mdast'
import YAML from 'yaml'

export interface PostFrontmatter {
  title?: string
  date?: string
  description?: string
  tags?: string[]
}

export function extractFrontmatter() {
  return (tree: Root, file: { data: Record<string, unknown> }) => {
    const yamlNode = tree.children.find(
      (node): node is { type: 'yaml'; value: string } => node.type === 'yaml'
    )

    file.data.frontmatter = yamlNode
      ? (YAML.parse(yamlNode.value) as PostFrontmatter)
      : {}
  }
}
