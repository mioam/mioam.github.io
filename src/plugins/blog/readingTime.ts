export function estimateReadingTime(body: string): string {
  const words = body
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))

  return `${minutes} min read`
}
