<!-- 空间位置 -->
<template>
  <div class="app-container">
    <div class="title">
      <span>空间位置</span>
    </div>
    <!-- <transfer /> -->
    <tree />
  </div>
</template>

<script>
import Transfer from './components/Transfer.vue'
import Tree from './components/Tree.vue'
export default {
  components: { Transfer, Tree },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px 0;
  box-sizing: border-box;
  .title {
    padding: 20px;
    color: #336699;
    font-weight: 600;
    font-size: 14px;
    background: #f5f7fa;
  }
}
</style>
