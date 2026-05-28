export interface TocItem {
  id: string
  depth: number
  title: string
}

export function extractMarkdownHeadings(markdown: string): TocItem[] {
  return markdown
    .split(/\r?\n/)
    .map(line => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map(match => {
      const title = match[2].replace(/[#`*_]/g, '').trim()

      return {
        id: slugify(title),
        depth: match[1].length,
        title,
      }
    })
}

export function withHeadingAnchors(markdown: string): string {
  return markdown
    .split(/\r?\n/)
    .map(line => {
      const match = line.match(/^(#{2,3})\s+(.+)$/)

      if (!match) {
        return line
      }

      const title = match[2].trim()
      return `<span id="${slugify(title)}"></span>\n${line}`
    })
    .join('\n')
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[#`*_]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}
