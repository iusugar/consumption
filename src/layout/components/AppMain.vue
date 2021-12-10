<!-- 主要数据展示区域 -->
<template>
  <section class="app-main">
    <transition name="fade-transform"
                mode="out-in">
      <keep-alive >
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
    }
  },
  computed: {
    key() {
      // console.log(this.$route.path);
      return this.$route.path
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
