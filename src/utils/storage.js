/**
 * Storage 二次封装
 * 如果有多个系统，都用到了 localStorage 中的 name，那么就会相互覆盖！可以用命名空间来隔开，这里使用 namespace 来存储。即本系统的信息都存在一个大对象 config.namespace 中。
 */

import config from '../config'

export default {
  // 获取存储命名空间
  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },
  setItem(key, val) {
    // 获取命名空间
    let storage = this.getStorage()
    // 给命名空间内添加键值对
    storage[key] = val
    // 存储整个命名空间
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  // 获取命名空间内的 key
  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let storage = this.getStorage()
    // 删除键值对
    delete storage[key]
    // 重新存储整个命名空间
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll() {
    window.localStorage.clear()
  },
}
