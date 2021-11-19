<!-- 选择楼号的侧边栏 -->
<template>
  <div class="building-number-wrapper">
    <el-scrollbar style="height: 100%;width: 100%;">
      <el-radio-group v-model="currentBuilding">
        <el-radio-button v-for="(item, index) in buildings"
                         :key="index"
                         :label="item.number" @click.native="getIndex(index,$event)"></el-radio-button>
      </el-radio-group>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentBuilding: 'A1',
      buildings: [
        { number: 'A1' },
        { number: 'A2' },
        { number: 'A3' },
        { number: 'B1' },
        { number: 'C1' },
        { number: 'C2' },
        { number: 'B2' },
        { number: 'B3' }
      ]
    }
  },
  methods: {
    getIndex(index, event) {
      if (event.target.tagName === 'SPAN') {
        return
      }
      console.log(event.target.tagName);
      console.log(event.target.classList);
      console.log(index);
    }
  }
}
</script>

<style lang="scss" scoped>
  .building-number-wrapper {
    width: 60px;
    height: 300px;
    padding: 20px 0 20px 0;
    border-radius: 5px;
    background: #e9eef3;
    position: fixed;
    top: 30%;
    // left: 220px;
    // margin-top: 180px;
    box-shadow: 0 2px 5px #00000025;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    /deep/ .el-scrollbar__bar {
      display: none;
    }
    .el-radio-button {
      width: 40px;
      height: 40px;
      margin: 10px 0 0 0;
      /deep/ span {
        padding: 0 !important;
        width: 100%;
        height: 100%;
        background-color: #fafafa;
        line-height: 40px;
        border-radius: 5px;
        transition: background-color 0.2s ease-in-out;
        border: none;
        box-shadow: 0 2px 5px #00000015;
        &:hover {
          color: #e55d5d;
        }
      }
    }
    .is-active {
      /deep/ span {
        background-color: #e55d5d;
        border: none;
        box-shadow: 0 0 5px 2px #00000015;
        color: #eff1f7 !important;
      }
    }
  }
</style>
