# AGENTS.md

## 项目定位

这是一个使用 `Vue 3 + TypeScript + Vite + pnpm` 构建的极简、可扩展个人站点。

后续协作默认使用中文回复。代码标识、命令、路径、接口名保持英文。

核心目标：

- 前端视觉保持克制、简洁、易修改。
- 用插件架构承载可选功能。
- 支持 GitHub Pages 静态部署。
- 从 Markdown 文件读取博客文章。
- 通过 GitHub Contents API 保存博客编辑结果。

## 常用命令

只能使用 `pnpm`。

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

不要添加 `npm`、`yarn`、`bun` 的 lockfile。

## 部署与路由

站点通过 `.github/workflows/deploy.yml` 部署到 GitHub Pages。

路由使用 Vue Router history 模式：

```ts
createWebHistory(import.meta.env.BASE_URL)
```

GitHub Pages 深层路径刷新依赖 404 fallback：

```bash
dist/index.html -> dist/404.html
```

不要改成 hash 路由，除非用户明确要求。

## 架构约定

核心文件：

- `src/main.ts`：应用启动，手动注册 Element Plus 组件。
- `src/App.vue`：整体壳布局、面包屑、顶部操作区。
- `src/app/plugin.ts`：插件接口。
- `src/app/plugins.ts`：插件注册表。
- `src/app/router.ts`：路由组装。

功能插件放在：

```text
src/plugins/<plugin-name>/
```

每个插件导出一个 `AppPlugin`，包含：

- `id`
- `title`
- `routes`
- 可选 `navItems`

插件之间不要相互耦合。跨插件复用的能力放到 `src/shared`。

## 视觉系统

视觉系统使用少量 token 推导，不要在组件里随手写零散尺寸。

主舞台：

- 所有有效内容默认位于居中的 `1024px` 主区域内。
- 主舞台变量是 `--stage-width`。
- 正文阅读宽度变量是 `--content-width`。
- 浮动目录轨道变量是 `--rail-width`。

组件命名前缀使用 `Mi`，表示 minimal/simple。

当前已有视觉组件：

- `src/components/mi/MiCard.vue`

卡片规则：

- 卡片只表示内容容器，不负责列表语义。
- 卡片只有一个视觉层级。
- 卡片宽高默认由父布局决定。
- 多卡片并排时，由父级 `flex` 或 `grid` 控制。

列表规则：

- 列表就是列表，不要伪装成卡片。
- 列表容器负责流式排列。
- 列表项使用分隔线、间距、标题层级表达结构。

浮动元素：

- 文章页目录和回到顶部优先放在主内容右侧轨道。
- 如果右侧轨道不好看，后续可以改成浏览器右下角固定按钮。
- 不要提前引入复杂 portal 或浮层系统。

## UI 规则

视觉风格必须保持克制。

优先：

- 窄顶部导航。
- 面包屑优先的导航方式。
- 简单内容卡片。
- 清晰排版。
- 少量、必要、可读的 CSS。

避免：

- 装饰性动画。
- 大面积视觉特效。
- 复杂背景。
- 为简单布局创建重型抽象。
- 额外 UI 库。

允许使用 Element Plus，但必须在 `src/main.ts` 中手动按需注册组件。不要引入完整 Element Plus bundle。

新增 Element Plus 组件时：

1. 在 `src/main.ts` 导入组件。
2. 只导入该组件需要的 `element-plus/theme-chalk` CSS。
3. 在 app 链式调用中注册该组件。

## 样式约定

全局样式位于：

```text
src/styles/main.css
```

新增样式前，优先复用已有工具类：

- `.page`
- `.page-wide`
- `.mi-card`
- `.panel`
- `.stack`
- `.cluster`
- `.muted`
- `.meta`

不要把 layout 用的 inline style 写进 Vue 模板。需要复用的布局语义放进 CSS class。

## 博客约定

博客源文件放在：

```text
src/content/posts/*.md
```

博客读取逻辑位于：

```text
src/plugins/blog/source.ts
```

Markdown frontmatter 解析和序列化位于：

```text
src/shared/markdown/frontmatter.ts
```

文章页目录从 Markdown 的 `h2`、`h3` 生成，工具位于：

```text
src/shared/markdown/toc.ts
```

兼容旧路径的 `src/api/post.ts` 只做 re-export，不要重新堆业务逻辑。

## GitHub 编辑

博客编辑通过 GitHub Contents API 写回 Markdown：

```text
src/shared/github/contentApi.ts
```

不要硬编码 token。

编辑器从 Vite 环境变量读取默认仓库配置：

- `VITE_GITHUB_OWNER`
- `VITE_GITHUB_REPO`
- `VITE_GITHUB_BRANCH`
- `VITE_GITHUB_POSTS_PATH`

token 由用户手动提供，默认只保存在 `sessionStorage`。除非用户明确要求，不要引入 OAuth 或后端鉴权流程。

## TypeScript

保持 TypeScript strict。

完成改动前运行：

```bash
pnpm build
```

插件、博客、API 边界优先使用显式 interface/type。

## 依赖策略

依赖要保守。

新增 package 前先确认是否能用以下内容解决：

- Vue
- Vue Router
- 现有 Element Plus 组件
- 现有 shared 工具
- 原生 TypeScript

除非用户明确要求，不要添加状态管理库、动画库、CSS 框架、自动导入工具。

## 生成文件

不要提交本地生成物：

- `node_modules/`
- `dist/`

这些已经由 `.gitignore` 忽略。
