# 代码审阅进度

> 本文件记录当前逐文件审阅进度。审阅完一个文件后勾选，并在 `current` 处更新到下一个待审文件。

## 审阅原则

- 每次只聚焦一个文件，理解其职责、依赖与边界。
- 已审文件不要反复回看，除非发现跨文件问题需要回头确认。
- 最后统一审阅 `src/app`（plugin / plugins / router）。

## 当前进度

**当前待审文件：** `src/shared/github/contentApi.ts`

## 已审阅

- [x] `src/api/post.ts`
- [x] `src/components/MiBreadcrumb.vue`
- [x] `src/main.ts`
- [x] `src/components/MiCard.vue`
- [x] `src/components/MiList.vue`
- [x] `src/components/MiThemeButton.vue`
- [x] `src/vite-env.d.ts`
- [x] `src/App.vue`
- [x] `src/styles/main.css`
- [x] `src/views/HomeView.vue`

## 待审阅清单（按推荐顺序）

1. [x] `src/main.ts` — 应用启动入口，Element Plus 手动注册
2. [x] `src/components/MiCard.vue` — 卡片容器组件
3. [x] `src/components/MiList.vue` — 列表组件
4. [x] `src/components/MiThemeButton.vue` — 主题切换按钮
5. [x] `src/vite-env.d.ts` — Vite 环境类型声明
6. [x] `src/App.vue` — 整体壳布局、面包屑、顶部操作区
7. [x] `src/styles/main.css` — 全局样式与设计 token
8. [x] `src/views/HomeView.vue` — 首页
9. [x] `src/views/NotFoundView.vue` — 404 页面
10. [x] `src/styles/github-markdown.css` — Markdown 渲染样式
11. [ ] `src/shared/github/contentApi.ts` — GitHub Contents API 封装
12. [ ] `src/plugins/blog/types.ts` — 博客数据模型
13. [ ] `src/plugins/blog/config.ts` — 博客配置
14. [ ] `src/plugins/blog/source.ts` — Markdown 解析管线
15. [ ] `src/plugins/blog/frontmatter.ts` — frontmatter 处理
16. [ ] `src/plugins/blog/readingTime.ts` — 阅读时间计算
17. [ ] `src/plugins/blog/index.ts` — 博客插件入口
18. [ ] `src/plugins/blog/views/BlogListView.vue` — 文章列表页
19. [ ] `src/plugins/blog/views/BlogPostView.vue` — 文章详情页
20. [ ] `src/plugins/blog/views/BlogEditorView.vue` — 文章编辑器（当前为空）
21. [ ] `src/plugins/embed/index.ts` — Embed 插件入口
22. [ ] `src/plugins/embed/views/EmbedView.vue` — Embed 页面
23. [ ] `src/plugins/games/index.ts` — Games 插件入口
24. [ ] `src/plugins/games/views/GamesView.vue` — Games 页面
25. [ ] `src/app/plugin.ts` — 插件接口
26. [ ] `src/app/plugins.ts` — 插件注册表
27. [ ] `src/app/router.ts` — 路由组装
