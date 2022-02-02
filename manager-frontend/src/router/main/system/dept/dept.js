// 普通加载路由
// import dept from './dept.vue'
// 懒加载路由
const dept = () => import('@/views/main/system/dept/dept.vue')
export default {
  path: 'main/system/dept',
  name: 'dept',
  component: dept,
  children: [
  ]
}
