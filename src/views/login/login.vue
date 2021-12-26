<template>
  <div class="login-wrapper">
    <div class="login-panel">
      <h1 class="title">后台管理系统</h1>
      <el-form
        ref="ruleForm"
        :model="account"
        status-icon
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="account.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="account.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即登录</el-button
          >
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { rules } from './account-config'
export default {
  data() {
    return {
      rules,
      account: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$api.login(this.account).then((res) => {
            console.log(res)
            this.$store.commit('saveUserInfo', res)
            this.$router.push({ path: '/main/system/welcome' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  mounted() {
    // console.log(this.rules)
  },
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .login-panel {
    width: 400px;
    padding: 20px;
    box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.3);
    h1.title {
      text-align: center;
      color: #000;
    }
  }
}
</style>
