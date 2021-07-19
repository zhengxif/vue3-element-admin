import { Module, MutationTree, ActionTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import store, { IRootState } from '../index'
import { asyncRoutes } from '../../router/index'
import { MenuData } from './menu'
import path from 'path'

// 生成路由路径数组
const generateRoutePaths = (menus: Array<MenuData>): string[] => {
    return menus.map(menu => menu.path)
}
// 白名单
const whiteList = ['/:pathMatch(.*)*']
// 生成可访问路由表
const generateRoutes = (routes: Array<RouteRecordRaw>, routePaths: string[], basePath = '/') => {
    const routerData: Array<RouteRecordRaw> = []
    routes.forEach(route => {
        const routePath = path.resolve(basePath, route.path)

        if (route.children) { // 先看子路由 是否有匹配上的路由
            route.children = generateRoutes(route.children, routePaths, routePath)
        }

        // 如果当前路由子路由 数量大于0有匹配上 或 paths中包含当面路由path 就需要把当前父路由添加上
        if (routePaths.includes(routePath) || (route.children && route.children.length >= 1) || whiteList.includes(routePath)) {
            routerData.push(route)
        }
    })
    return routerData
}

const filterAsyncRoutes = (menus: Array<MenuData>, routes: Array<RouteRecordRaw>) => {
    // 生成要匹配的路由path数组
    const routePaths = generateRoutePaths(menus)
    // 生成匹配path的路由表
    const routerList = generateRoutes(routes, routePaths)
    return routerList
}

// 定义state类型
export interface IPermissionState {
  routes: Array<RouteRecordRaw>;
  accessRoutes: Array<RouteRecordRaw>;
}

// mutations类型
type IMutations = MutationTree<IPermissionState>

// actions类型
type IActions = ActionTree<IPermissionState, IRootState>

// 定义state
const state: IPermissionState = {
    routes: [],
    accessRoutes: []
}

// 定义mutation
const mutations: IMutations = {
    SET_ROUTES(state, data: Array<RouteRecordRaw>) {
        state.routes = data
    },
    SET_ACCESS_ROUTES(state, data: Array<RouteRecordRaw>) {
        state.accessRoutes = data
    }
}

// 定义actions
const actions: IActions = {
    generateRoutes({ dispatch }, type?: number) { // 1 针对菜单排序更新
        return new Promise((resolve, reject) => {
            let accessedRoutes: Array<RouteRecordRaw> = []
            if (store.getters.roleNames.includes('super_admin')) { // 超级管理员角色
                accessedRoutes = asyncRoutes
                dispatch('menu/getAllMenuListByAdmin', null, { root: true })
                resolve(accessedRoutes)
            } else { // 根据角色过滤菜单
                const roles = store.getters.roleIds
                dispatch('menu/getAccessByRoles', roles, { root: true }).then(menus => {
                    if (type !== 1) { // 菜单重新排序 不需要再过次滤路由
                        accessedRoutes = filterAsyncRoutes(menus, asyncRoutes)
                    }
                    resolve(accessedRoutes)
                }).catch(reject)
            }
        })
    }
}

// 定义user module
const permission: Module<IPermissionState, IRootState> = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default permission
