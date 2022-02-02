/**
 * 菜单管理模块
 */
const router = require('koa-router')()
const util = require('../utils/util')
const Menu = require('../models/menuSchema')
router.prefix('/menu')

router.get('/list', async (ctx) => {
  const { menuName, menuState } = ctx.request.query
  const params = {}
  if (menuName) params.menuName = menuName
  if (menuState) params.menuState = menuState
  let rootList = (await Menu.find(params)) || []
  ctx.body = util.success(rootList) // 需要给 ctx.body 赋值，不然会一直报 404 错误！！！
})

module.exports = router
