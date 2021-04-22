<!-- 用户头像组件 -->
<template>
  <div>
    <el-dropdown>
      <el-avatar :src="imgUrl" size="small"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Profile</el-dropdown-item>
        <el-dropdown-item divided>Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  data() {
    return {
      imgUrl: require('@/assets/avatar/avatar.jpg')
    }
  }
}
</script>

<style scoped>
</style>
