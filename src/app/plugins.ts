import { blogPlugin } from '@/plugins/blog'
import { embedPlugin } from '@/plugins/embed'
import { gamesPlugin } from '@/plugins/games'
import type { AppPlugin, NavItem } from './plugin'

export const plugins: AppPlugin[] = [blogPlugin, gamesPlugin, embedPlugin]

export const pluginRoutes = plugins.flatMap((plugin) => plugin.routes)

export const navItems: NavItem[] = plugins.flatMap((plugin) => plugin.navItems ?? [])
