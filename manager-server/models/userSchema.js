/**
 * 数据库表 模型
 */
const mongoose = require('mongoose')
// Models are defined through the Schema interface.
const userSchema = mongoose.Schema({
  userId: Number, //用户ID，自增长
  name: String, //用户名称
  password: String, //用户密码，md5加密
  userEmail: String, //用户邮箱
  mobile: String, //手机号
  sex: Number, //性别 0:男  1：女
  deptId: [], //部门
  job: String, //岗位
  state: {
    type: Number,
    default: 1,
  }, // 1: 在职 2: 离职 3: 试用期
  role: {
    type: Number,
    default: 1,
  }, // 用户角色 0：系统管理员  1： 普通用户
  roleList: [], //系统角色
  createTime: {
    type: Date,
    default: Date.now(),
  }, //创建时间
  lastLoginTime: {
    type: Date,
    default: Date.now(),
  }, //更新时间
  remark: String,
})

// mongoose 官方文档：https://mongoosejs.com/docs/models.html
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. 即第一个参数为 collection 单数名称。Mongoose 会自动查找 model 名称的复数小写版本。
// The model user is for the "users" collection **in the database**.
module.exports = mongoose.model('user', userSchema)
