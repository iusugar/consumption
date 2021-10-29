<!-- 主要数据展示区域 -->
<template>
  <section class="app-main">
    <transition name="fade-transform"
                mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
        <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      key: this.$route.path
    }
  },
  mounted () {
    console.log('app-main组件 --->' + this.key)
  }
}
</script>

<style scoped>
.app-main {
  height: 100%;
  width: 100%;
}
</style>
