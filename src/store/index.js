/**
 * Vuex 状态管理
 */
import { createStore } from "vuex"
import mutations from './mutations'
import storage from "../utils/storage"
import system from "./main/system/system"
import audit from "./main/audit/audit"

const state = {
  userInfo: '' || storage.getItem('userInfo')
}

export default createStore({
  state,
  mutations,
  modules: {
    system,
    audit
  }
})
