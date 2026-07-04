import axios from 'axios'

// 远程博客 API 根地址。
const BLOG_API_BASE = 'https://mioam.github.io/blog'

const api = axios.create({
  baseURL: BLOG_API_BASE,
  timeout: 15000,
})

// signal：在 onUnmounted 时取消未完成的请求

export async function getPost(slug: string, signal?: AbortSignal): Promise<string> {
  const { data } = await api.get<string>(`/md/${slug}.md`, {
    signal,
    responseType: 'text',
    transformResponse: [(res) => res], // 避免 axios 自动 JSON.parse
  })
  return data
}
export async function getList(signal?: AbortSignal): Promise<FileInfo[]> {
  const { data } = await api.get(`/file_list.json`, {
    signal,
  })
  return data
}

export type FileInfo = {
  file: string
  slug: string
  title: string
  summary: string
  date: string
}
