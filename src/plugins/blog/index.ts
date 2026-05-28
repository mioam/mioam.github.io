import type { AppPlugin } from '@/app/plugin'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

function postBreadcrumb(route: RouteLocationNormalizedLoaded): string {
  return String(route.params.slug ?? 'Post')
}

export const blogPlugin: AppPlugin = {
  id: 'blog',
  title: 'Blog',
  navItems: [{ label: 'Blog', to: '/blog' }],
  routes: [
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/BlogListView.vue'),
      meta: { breadcrumb: 'Blog' },
    },
    {
      path: '/blog/new',
      name: 'blog-new',
      component: () => import('./views/BlogEditorView.vue'),
      meta: { breadcrumb: 'New' },
    },
    {
      path: '/blog/:slug/edit',
      name: 'blog-edit',
      component: () => import('./views/BlogEditorView.vue'),
      meta: { breadcrumb: 'Edit' },
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('./views/BlogPostView.vue'),
      meta: { breadcrumb: postBreadcrumb },
    },
  ],
}
