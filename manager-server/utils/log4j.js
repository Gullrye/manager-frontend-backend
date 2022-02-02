/**
 * 日志存储
 */
const log4js = require('log4js')
const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL,
}

log4js.configure({
  // log4js 官方文档 Appenders 介绍：https://log4js-node.github.io/log4js-node/appenders.html
  // Appenders serialise log events to some form of output. They can write to files, send emails, send data over the network. All appenders have a type which determines which appender gets used. 即将日志转为某种形式的输出，可以写入到文件，发送电子邮件，通过网络发送数据。所有追加器都有一个 type，该 type 决定了使用哪个追加器。
  appenders: {
    // 定义三个追加器，取名为 console、info、error
    // 给三个定义的追加器分别设置一个 type 来决定使用哪个追加器。(console、file、dateFile：都是包含在 log4js 中的 Core Appenders)
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: 'logs/all-logs.log',
    },
    error: {
      // 配置见官方文档 https://log4js-node.github.io/log4js-node/dateFile.html
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true, // 设置文件名称为 filename + pattern
    },
  },
  // https://log4js-node.github.io/log4js-node/api.html
  categories: {
    // You must define the default category which is used for all log events that do not match a specific category. 即必须定义 default，来给所有未指定 category 的 log events 使用
    default: { 
      // the list of appender names to be used for this category. A category must have at least one appender.
      appenders: ['console'], 
      level: 'debug' },
    info: {
      appenders: ['info', 'console'],
      level: 'info',
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error',
    },
  },
})

/**
 * 日志输出，level 为 debug (console)
 * @param {string} content
 */
exports.debug = (content) => {
  // 语法：log4js.getLogger([category])
  let logger = log4js.getLogger()
  logger.level = levels.debug
  logger.debug(content)
}

/**
 * 日志输出，level 为 info (写入到 all-logs 文件并 console)
 * @param {string} content
 */
exports.info = (content) => {
  let logger = log4js.getLogger('info')
  logger.level = levels.info
  logger.info(content)
}

/**
 * 日志输出，level 为 error (写入到 log.date.log 文件并 console)
 * @param {string} content
 */
exports.error = (content) => {
  let logger = log4js.getLogger('error')
  logger.level = levels.error
  logger.error(content)
}
