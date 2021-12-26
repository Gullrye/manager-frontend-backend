/**
 * api 管理
 */
import request from '../utils/request'

export default {
  // 用户管理
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
    })
  },
  // 菜单管理
  getMenuList(params) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: params,
    })
  },
  // 审批管理
  getNoticeCount(params) {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
    })
  },
}
