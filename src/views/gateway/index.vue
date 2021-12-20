<!-- 网关配置 -->
<template>
  <div class="app-container">
    <gateway-tabs></gateway-tabs>
  </div>
</template>

<script>
import GatewayTabs from './components/GatewayTabs.vue'
export default {
  components: { GatewayTabs },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  min-height: calc(100vh - 50px);
  background-color: #ffffff;
  padding: 30px 20px;
}
</style>
