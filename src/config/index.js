// 环境配置封装。设置环境和对应接口，是否使用 mock
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi:
      'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
  },
  test: {
    baseApi: '',
    mockApi:
      'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
  },
  prod: {
    baseApi: '',
    mockApi:
      'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
  },
}
export default {
  env,
  mock: true,
  namespace: 'manager',
  // 解构出对应环境下的两个 api
  ...EnvConfig[env],
}
