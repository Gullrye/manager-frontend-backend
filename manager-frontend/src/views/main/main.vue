<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>

      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <!-- 表格、表单显示区 -->
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleFoldChange(isFold) {
      this.isCollapse = isFold
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}
.el-header {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 10px 0 6px;
  text-align: center;
  background-color: #7a88fe;
}
.page-info {
  background-color: #fff;
}
.el-aside {
  overflow: hidden auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear;
  scrollbar-width: none; // firefox
  -ms-overflow-style: none; // IE10+

  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  background-color: #e9eef3;
  text-align: center;
  line-height: 60px;
}
</style>
