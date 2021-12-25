// 环境配置封装。设置环境和对应接口，是否使用 mock
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'http://rap2api.taobao.org/app/mock/296258/api',
  },
  test: {
    baseApi: '',
    mockApi: 'http://rap2api.taobao.org/app/mock/296258/api',
  },
  prod: {
    baseApi: '',
    mockApi: 'http://rap2api.taobao.org/app/mock/296258/api',
  },
}
export default {
  env,
  mock: false,
  namespace: 'manager',
  // 解构出对应环境下的两个 api
  ...EnvConfig[env],
}
