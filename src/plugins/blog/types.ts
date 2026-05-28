export interface PostSummary {
  slug: string
  title: string
  description: string
  date: string
  updatedAt?: string
  tags: string[]
  readingTime: string
  contentLength: number
  draft: boolean
  sourcePath: string
}

export interface PostDetail extends PostSummary {
  content: string
  raw: string
}
