/**
 * 用户管理模块
 */
const router = require('koa-router')()
const util = require('../utils/util')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
router.prefix('/users')

router.post('/login', async (ctx) => {
  try {
    const { name, password } = ctx.request.body
    const res = await User.findOne({
      name,
      password,
    })
    if (res) {
      /**
       * 生成 token
       */
      const data = res._doc
      const token = jwt.sign(
        {
          data
        },
        'gull',
        { expiresIn: '1h' }
      )
      data.token = token
      ctx.body = util.success(data) // 请求成功，返回数据
      // ctx.body = util.success({...res, token}) // 可以查看 _doc 属性
    } else {
      ctx.body = util.fail('账号或密码不正确') // 这里只传了一个参数，则应该对应 util.js 中的第一个参数 msg
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response good bad'
})

module.exports = router
