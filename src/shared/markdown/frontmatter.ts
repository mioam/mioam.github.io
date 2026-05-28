export type FrontmatterValue = boolean | string | string[]

export interface ParsedMarkdown {
  meta: Record<string, FrontmatterValue>
  body: string
}

export function parseMarkdownFile(raw: string): ParsedMarkdown {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/m
  const match = raw.match(frontmatterPattern)

  if (!match) {
    return {
      meta: {},
      body: raw.trim(),
    }
  }

  return {
    meta: parseFrontmatter(match[1]),
    body: match[2].trim(),
  }
}

export function parseFrontmatter(input: string): Record<string, FrontmatterValue> {
  const result: Record<string, FrontmatterValue> = {}

  for (const line of input.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separator = trimmed.indexOf(':')
    if (separator === -1) {
      continue
    }

    const key = trimmed.slice(0, separator).trim()
    const rawValue = trimmed.slice(separator + 1).trim()
    result[key] = parseFrontmatterValue(rawValue)
  }

  return result
}

export function stringifyMarkdownFile(meta: Record<string, FrontmatterValue>, body: string): string {
  const lines = Object.entries(meta)
    .filter(([, value]) => value !== '' && !(Array.isArray(value) && value.length === 0))
    .map(([key, value]) => `${key}: ${stringifyFrontmatterValue(value)}`)

  return `---\n${lines.join('\n')}\n---\n\n${body.trim()}\n`
}

function parseFrontmatterValue(rawValue: string): FrontmatterValue {
  const cleaned = rawValue.replace(/^['"]|['"]$/g, '')

  if (cleaned === 'true') {
    return true
  }

  if (cleaned === 'false') {
    return false
  }

  if (/^\[.*\]$/.test(cleaned)) {
    return cleaned
      .slice(1, -1)
      .split(',')
      .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return cleaned
}

function stringifyFrontmatterValue(value: FrontmatterValue): string {
  if (Array.isArray(value)) {
    return `[${value.map(item => JSON.stringify(item)).join(', ')}]`
  }

  if (typeof value === 'boolean') {
    return String(value)
  }

  if (/[:#\[\]{},]/.test(value)) {
    return JSON.stringify(value)
  }

  return value
}
