# MiTerm

一个极简、可扩展的个人站点前端。

基于 `Vue 3 + TypeScript + Vite + pnpm` 构建，使用插件架构承载可选功能，默认部署到 GitHub Pages。

## 技术栈

- **框架**：Vue 3（Composition API）
- **语言**：TypeScript（strict 模式）
- **构建**：Vite
- **路由**：Vue Router（history 模式）
- **包管理**：pnpm
- **组件库**：Element Plus（手动按需注册）
- **Markdown**：unified / remark / rehype，支持 GFM、KaTeX、Shiki 高亮

## 常用命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm format
```

> 只使用 `pnpm`，不要添加 `npm`、`yarn`、`bun` 的 lockfile。

## 项目结构

```text
src/
├── api/            # 远程数据访问（博客等）
├── app/            # 应用核心：插件接口、注册表、路由
├── components/     # 全局组件，视觉组件以 Mi 前缀命名
├── plugins/        # 功能插件
├── shared/         # 跨插件复用的工具
├── styles/         # 全局样式
├── views/          # 顶层页面
├── App.vue         # 应用外壳
└── main.ts         # 应用入口
```

## 插件

每个插件位于 `src/plugins/<plugin-name>/`，导出一个 `AppPlugin`，包含：

- `id`
- `title`
- `routes`
- 可选 `navItems`

当前插件：

- `blog`：博客列表、文章展示、编辑（编辑功能待完善）
- `embed`：外部嵌入示例
- `games`：小游戏示例

## 部署

通过 `.github/workflows/deploy.yml` 自动部署到 GitHub Pages。

路由使用 Vue Router history 模式，GitHub Pages 深层路径刷新依赖 `dist/404.html` fallback（构建流程会自动从 `dist/index.html` 复制）。

## 博客数据源

博客文章从远程静态 API 读取，逻辑位于 `src/api/post.ts`：

- 文章列表：`/file_list.json`
- 单篇文章：`/md/<slug>.md`

远程站点的 `baseURL` 以常量形式硬编码在 `src/api/post.ts` 中。如需更换数据源，直接修改该常量后重新构建。

## GitHub 编辑

博客编辑通过 GitHub Contents API 写回 Markdown，默认仓库配置从 Vite 环境变量读取：

- `VITE_GITHUB_OWNER`
- `VITE_GITHUB_REPO`
- `VITE_GITHUB_BRANCH`
- `VITE_GITHUB_POSTS_PATH`

Token 由用户手动提供，默认仅保存在 `sessionStorage`。

## 开发约定

详见 `AGENTS.md`。
