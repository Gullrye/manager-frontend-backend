<template>
  <div class="nav-header">
    <div class="fold-icon-wrapper" @click="handleIconClick">
      <i-ic-round-format-indent-increase style="font-size: 20px; color: #fff" v-if="isFold" />
      <i-ic-round-format-indent-decrease style="font-size: 20px; color: #fff" v-else />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFold: false,
    }
  },
  methods: {
    handleIconClick() {
      this.isFold = !this.isFold
      this.$emit('foldChange', this.isFold)
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-header {
  .fold-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 48px;
    height: 48px;
    &:hover {
      background: rgba(255,255,255,0.1)
    }
  }
}
</style>
