<!-- 空间位置 -->
<template>
  <div class="app-container">
    <div class="title">
      <span>选择楼号添加房间</span>
    </div>
    <transfer />
  </div>
</template>

<script>
import Transfer from './components/Transfer.vue'
export default {
  components: { Transfer },
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
    color: #337ab7;
    font-size: 14px;
    background: #f5f7fa;
  }
}
</style>
