import type { GitHubRepoConfig } from '@/shared/github/contentApi'

export const defaultRepoConfig: GitHubRepoConfig = {
  owner: import.meta.env.VITE_GITHUB_OWNER ?? '',
  repo: import.meta.env.VITE_GITHUB_REPO ?? '',
  branch: import.meta.env.VITE_GITHUB_BRANCH ?? 'main',
  postsPath: import.meta.env.VITE_GITHUB_POSTS_PATH ?? 'src/content/posts',
}
