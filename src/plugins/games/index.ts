import type { AppPlugin } from '@/app/plugin'

export const gamesPlugin: AppPlugin = {
  id: 'games',
  title: 'Games',
  navItems: [{ label: 'Games', to: '/games' }],
  routes: [
    {
      path: '/games',
      name: 'games',
      component: () => import('./views/GamesView.vue'),
      meta: { breadcrumb: 'Games' },
    },
  ],
}
