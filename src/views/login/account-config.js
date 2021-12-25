/**
 * 表单验证规则
 */
export const rules = {
  name: [
    {
      required: true,
      message: '账号不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{4,10}$/,
      message: '请输入 4~10 个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,}$/,
      message: '请输入 5 位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
