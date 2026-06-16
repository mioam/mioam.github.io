import axios from 'axios'

// 远程博客 API 根地址。
// 这是一个静态站点，没有运行时配置能力；如果需要更换源，请修改此处后重新构建。
const BLOG_API_BASE = 'https://mioam.github.io/blog'

const api = axios.create({
  baseURL: BLOG_API_BASE,
  timeout: 5000,
})

/**
 * 获取指定文件名的文章内容
 * @param filename - 文件名，用于指定要获取的文章
 * @returns 返回从API获取的文章数据
 */
export async function getPost(slug: string): Promise<string> {
  const { data } = await api.get(`/md/${slug}.md`)
  return data
}
export async function getList(): Promise<FileInfo[]> {
  const { data } = await api.get(`/file_list.json`)
  return data
}

export type FileInfo = {
  id: string
  file: string
  slug: string
  title: string
  summary: string
  date: string
}
