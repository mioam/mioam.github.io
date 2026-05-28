import type { AppPlugin } from '@/app/plugin'

export const embedPlugin: AppPlugin = {
  id: 'embed',
  title: 'Embed',
  navItems: [{ label: 'Embed', to: '/embed' }],
  routes: [
    {
      path: '/embed',
      name: 'embed',
      component: () => import('./views/EmbedView.vue'),
      meta: { breadcrumb: 'Embed' },
    },
  ],
}
