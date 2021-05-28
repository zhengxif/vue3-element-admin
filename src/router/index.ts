import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 看作是异步获取路由
export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: '/documentation',
        component: Layout, // 布局组件作为一级路由
        redirect: '/documentation/index',
        children: [
            {
                path: '/documentation/index',
                name: 'Documentation',
                component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
                meta: {
                    title: 'Documentation',
                    icon: 'documentation',
                    hidden: false, // 主要是控制某些路由不用渲染成菜单，比如login 404 401等路由
                    noCache: false, // 默认情况下没有 noCache属性 或为false 都会进行缓存 true不缓存
                }
            }
        ]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [
            {
                path: 'index',
                name: 'Guide',
                component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
                meta: {
                    title: 'Guide',
                    icon: 'guide'
                }
            }
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/user',
        meta: {
            title: 'System',
            icon: 'lock',
            alwaysShow: true
        },
        children: [
            {
                path: 'menu',
                name: 'Menu Management',
                component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu.vue'),
                meta: {
                    title: 'Menu Management',
                    hidden: true
                }
            },
            {
                path: 'role',
                name: 'Menu Management',
                component: () => import(/* webpackChunkName: "role" */ '@/views/system/role.vue'),
                meta: {
                    title: 'Role Management',
                    hidden: true
                }
            },
            {
                path: 'user',
                name: 'User Management',
                component: () => import(/* webpackChunkName: "user" */ '@/views/system/user.vue'),
                meta: {
                    title: 'User Management'
                }
            }
        ]
    },
    { // 外链路由
        path: '/external-link',
        component: Layout,
        children: [
            {
                path: 'https://www.baidu.com/',
                redirect: '/',
                meta: {
                    title: 'External Link',
                    icon: 'link'
                }
            }
        ]
    }
]

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
                meta: {
                    title: 'Dashboard',
                    icon: 'el-icon-platform-eleme',
                    affix: true, // 固定显示在tagView中
                }
            }
        ]
    },
    {
        path: '/redirect',
        component: Layout,
        meta: {
            hidden: true
        },
        children: [
            { // 带参数的动态路由正则匹配 文档说明
            // https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0
                path: '/redirect/:path(.*)', // 要匹配多级路由 应该加*号
                component: () => import('@/views/redirect/index.vue')
            }
        ]
    },
]

export const routes = [
    ...constantRoutes,
    ...asyncRoutes
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router