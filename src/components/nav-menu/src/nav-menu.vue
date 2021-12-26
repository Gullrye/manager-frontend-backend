<template>
  <div class="nav-menu">
    <div class="menu-title">
      <span v-if="!collapse"> Vue3 + Koa2 </span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="collapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <i-ic-outline-settings />
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <i-ic-outline-local-post-office />
          <span>Navigator Four</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuList: []
    }
  },
  methods: {},
  async mounted() {
    this.menuList = await this.$api.getMenuList({
      menuName: '查看',
      // menuState: '1',
    }).then((res) => {
      console.log(res)
    })
  },
}
</script>

<style lang="scss" scoped>
.menu-title {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  color: blueviolet;
  span {
    white-space: nowrap;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}
.el-menu.el-menu--collapse.v-enter-to {
  border: none;
}
</style>
