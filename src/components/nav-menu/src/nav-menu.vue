<template>
  <div class="nav-menu">
    <div class="menu-title">
      <span v-if="!collapse"> Vue3 + Koa2 </span>
    </div>
    <el-menu
      default-active="/system/user"
      class="el-menu-vertical-demo"
      :collapse="collapse"
    >
      <!-- 一级菜单 -->
      <template v-for="(outerItem, index) in menuList" :key="outerItem._id">
        <el-sub-menu :index="outerItem.path">
          <template #title>
            <i-ic-outline-settings v-if="index === 0" />
            <i-ic-outline-local-post-office v-else />
            <span>{{ outerItem.menuName + outerItem.path }}</span>
          </template>
          <!-- 二级菜单 -->
          <template
            v-for="innerItem in outerItem.children"
            :key="innerItem._id"
          >
            <el-menu-item
              :index="innerItem.path"
              @click="handleMenuClick(innerItem.path)"
            >
              {{ innerItem.menuName + innerItem.path }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapMenusToRoutes } from '../../../utils/map-menus'
import router from '../../../router'
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuList: [],
    }
  },
  methods: {
    handleMenuClick(path) {
      router.push('/main'+path)
    },
  },
  async created() {
    this.menuList = await this.$api.getMenuList()
    let newMenus = await mapMenusToRoutes(this.menuList)
    console.log(newMenus)

    // 将 routes => router.main.children
    newMenus.forEach((item) => {
      router.addRoute('main', item)
    })
  },
  mounted() {},
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
.el-sub-menu__title svg {
  padding-right: 5px;
  color: #666;
}
.el-menu.el-menu--collapse.v-enter-to {
  border: none;
}
</style>
