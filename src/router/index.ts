// router/index.js - 路由总入口
import { createRouter, createWebHistory, RouterView } from 'vue-router'

// // 1. 模块化路由 (按功能拆分)
// import articleRoutes from './modules/article'
// import userRoutes from './modules/user'
import Login from '@/views/Login.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Article from '@/views/Article.vue'

// 2. 基础路由
export const constantRoutes = [
    {
        path: '/',
        component: RouterView,
        meta: { breadcrumb: 'Home' },
        children: [
            {
                path: '',
                component: HelloWorld,
                name: 'Home',
            },
            {
                path: '/login',
                component: Login,
            },
            {
                path: '/article',
                component: Article,
                meta: { breadcrumb: 'Articles' },
                children: [
                    {
                        path: '',
                        name: 'Articles',
                        component: () => import('@/components/List.vue'),
                    },
                    {
                        path: ':id',
                        component: () => import('@/components/Post.vue'),
                        meta: {
                            breadcrumb: (route: any) => `${route.params.id}` // 动态面包屑
                        }
                    },
                ]
            },
        ]
    },
    // {
    //     path: '/404',
    //     component: () => import('@/views/404.vue'),
    //     hidden: true
    // },
    // 404必须放最后
    { path: '/:pathMatch(.*)*', redirect: '/404' }
]

// 3. 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior: () => ({ top: 0 }) // 切换页面滚动到顶部
})

// // 4. 路由守卫
// router.beforeEach(async (to, from, next) => {
//     // 白名单
//     if (to.path === '/login' || to.path === '/404') return next()

//     // 检查登录
//     const token = localStorage.getItem('token')
//     if (!token) return next('/login')

//     next()
// })

export default router