/**
 * Vuex 状态管理
 */
import { createStore } from "vuex"
import storage from "../utils/storage"
import system from "./main/system/system"
import audit from "./main/audit/audit"
import login from './login/login'
import api from '../api'
import { mapMenusToRoutes } from '../utils/map-menus'
import router from '../router'

const store = createStore({
  state: {
    // userInfo: '' || storage.getItem('userInfo'),
    menuList: storage.getItem('menuList') || []
  },
  mutations: {
    // saveUserInfo(state, userInfo) {
    //   state.userInfo = userInfo
    //   storage.setItem('userInfo', userInfo)
    // },
    saveMenuList(state, menuList) {
      storage.setItem('menuList', menuList)
      state.menuList = menuList
    }
  },
  actions: {
    async getMenuList(ctx) {
      // 不加 async 会报错 'Uncaught SyntaxError: Unexpected reserved word'
      const menuList = await api.getMenuList()
      let newMenus = await mapMenusToRoutes(menuList)
  
      // 将 routes => router.main.children
      newMenus.forEach((item) => {
        router.addRoute('main', item)
      })
      // newMenus = storage.getItem('menuList')
      if (newMenus) {
        console.log(newMenus)
        ctx.commit('saveMenuList', newMenus)
      }
    },
  },
  modules: {
    system,
    audit,
    login,
  }
})

export function setupStore() {
  store.dispatch('getMenuList')
}

export default store
