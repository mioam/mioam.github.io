export interface GitHubRepoConfig {
  owner: string
  repo: string
  branch: string
  postsPath: string
}

export interface SaveMarkdownInput {
  token: string
  config: GitHubRepoConfig
  path: string
  content: string
  message: string
}

interface GitHubContentResponse {
  sha?: string
  commit?: {
    html_url?: string
  }
  content?: {
    html_url?: string
  }
}

const apiBase = 'https://api.github.com'

export async function saveMarkdownFile(input: SaveMarkdownInput): Promise<GitHubContentResponse> {
  const filePath = joinPath(input.config.postsPath, input.path)
  const current = await getExistingFile(input.token, input.config, filePath)
  const response = await fetch(
    `${apiBase}/repos/${input.config.owner}/${input.config.repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${input.token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: input.message,
        content: toBase64(input.content),
        branch: input.config.branch,
        ...(current?.sha ? { sha: current.sha } : {}),
      }),
    }
  )

  if (!response.ok) {
    throw new Error(await toGitHubError(response))
  }

  return response.json() as Promise<GitHubContentResponse>
}

async function getExistingFile(
  token: string,
  config: GitHubRepoConfig,
  filePath: string
): Promise<GitHubContentResponse | undefined> {
  const url = `${apiBase}/repos/${config.owner}/${config.repo}/contents/${filePath}?ref=${encodeURIComponent(config.branch)}`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (response.status === 404) {
    return undefined
  }

  if (!response.ok) {
    throw new Error(await toGitHubError(response))
  }

  return response.json() as Promise<GitHubContentResponse>
}

async function toGitHubError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string }
    return body.message
      ? `GitHub API error: ${body.message}`
      : `GitHub API error: ${response.status}`
  } catch {
    return `GitHub API error: ${response.status}`
  }
}

function joinPath(left: string, right: string): string {
  return `${left.replace(/\/+$/, '')}/${right.replace(/^\/+/, '')}`
}

function toBase64(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}
