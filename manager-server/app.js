const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const router = require('koa-router')()
const users = require('./routes/users')
const menu = require('./routes/menu')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
const util = require('./utils/util')

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
)

// logger
app.use(async (ctx, next) => {
  await next().catch((err) => {
    if (err.status == 401) {
      ctx.status = 200
      ctx.body = util.fail('Token 认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw err
    }
  })
})

app.use(
  koajwt({ secret: 'gull' }).unless({
    path: [/^\/api\/users\/login/],
  })
)

router.prefix('/api') // 一级路由
router.use(users.routes(), users.allowedMethods()) // 二级路由
router.use(menu.routes(), menu.allowedMethods()) // 二级路由

app.use(router.routes(), router.allowedMethods()) // 全局路由

// error-handling
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
})

module.exports = app
