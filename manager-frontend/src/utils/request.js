import axios from 'axios'
// import { ElMessage } from 'element-plus' // 不需要手动导入
import config from '../config'
import router from '../router'
import storage from './storage'

const TOKEN_INVALID = 'Token 认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
})

service.interceptors.request.use((config) => {
  const { token } = storage.getItem('userInfo')
  config.headers.Authorization = 'Bearer ' + token
  return config
})

service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 500001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

/**
 * 核心请求函数
 * @param {*} options 请求配置
 */
// 设置用法：request({method:'get', url:'xxx', data:{}, mock:true})
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    // `data` 是作为请求体被发送的数据，仅适用 'PUT', 'POST','DELETE 和 'PATCH' 请求方法
    // 对于 get，data 存为 params，用来区别 get 和 post
    options.params = options.data
  }
  // 获取 config 的 mock
  let isMock = config.mock
  // api 请求是否使用 mock
  if (typeof options.mock != 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
}

// 设置用法：request.get(url:'xxx', data:{}, options:{})
;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options,
    })
  }
})

export default request
