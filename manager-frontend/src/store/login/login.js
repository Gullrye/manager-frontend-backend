import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import storage from '../../utils/storage'
import api from '../../api'

const loginModule = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      userMenus: [],
      // permissions: [],
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      storage.setItem('userInfo', userInfo)
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus

      console.log('注册动态路由')

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 将 routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      // const permissions = mapMenusToPermissions(userMenus)
      // state.permissions = permissions
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload) {
//       // 1.实现登录逻辑
//       const loginResult = await accountLoginRequest(payload)
//       const { id, token } = loginResult.data
//       commit('changeToken', token)
//       storage.setItem('token', token)
// 
//       // 发送初始化的请求(完整的 role/department)
//       dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = await api.login()
      commit('changeUserInfo', userInfo)
      storage.setItem('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      storage.setItem('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 页面刷新自动获取缓存的数据
    loadLocalLogin({ commit, dispatch }) {
      const token = storage.getItem('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整的 role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = storage.getItem('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = storage.getItem('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
  },
}

export default loginModule
