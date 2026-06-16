export interface PostSummary {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  sourcePath: string
}

export interface PostDetail extends PostSummary {
  content: string
  raw: string
  readingTime: string
}
