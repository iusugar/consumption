<!-- 插座空间位置分布展示页 -->
<template>
  <div class="app-container">
    <navbar />
    <central-panel />
    <sidebar />
    <drawer />
      <control />
  </div>
</template>

<script>
import CentralPanel from './components/CentralPanel.vue'
import Control from './components/Control.vue'
import Drawer from './components/Drawer.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: { Drawer, Sidebar, Navbar, CentralPanel, Control },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  text-align: center;
  padding: 20px 20px 70px 20px;
  background-color: #FFFFFF;
}
</style>
