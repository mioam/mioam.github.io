import type { RouteRecordRaw } from 'vue-router'

export interface NavItem {
  label: string
  to: string
}

export interface AppPlugin {
  id: string
  title: string
  routes: RouteRecordRaw[]
  navItems?: NavItem[]
}
