<!-- 横栏显示当前房间的插座列表 -->
<template>
  <div class="nav-wrapper">
    <el-tabs v-model="editableTabsValue"
             type="card"
             :stretch='false'
             :closable='true'
             @tab-click="handleClick"
             ref="tabs">
      <el-tab-pane v-for="(item) in editableTabs"
                   :key="item.name"
                   :label="item.title"
                   :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
        { title: 'A1202-1', name: '1', state: 'on' }, { title: 'A1202-2', name: '2', state: 'off' }, { title: 'A1202-3', name: '3', state: 'on' },
        { title: 'A1202-4', name: '4', state: 'off' }, { title: 'A1202-5', name: '5', state: 'off' }, { title: 'A1202-6', name: '6', state: 'on' },
        { title: 'A1202-7', name: '7', state: 'on' }, { title: 'A1202-8', name: '8', state: 'off' }, { title: 'A1202-9', name: '9', state: 'on' }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setState()
      // this.$refs['tabs'].$el.getElementsByTagName('span')[0].classList.value = ''
    })
  },
  methods: {
    setState() {
      var tabsArray = this.$refs['tabs'].$el.getElementsByClassName('el-tabs__item')
      for (let i = 0; i < tabsArray.length; i++) {
        if (this.editableTabs[i].state === 'on') {
          tabsArray[i].classList.add('on')
        }
      }
    },
    handleClick(tab) {
      this.$nextTick(() => {
        this.setState()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  width: 33.3%;
  top: 10%;
  // min-width: 300px;
  position: fixed;
  margin-left: 80px;
  box-shadow: 0 2px 5px #00000015;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
  z-index: 99;
  &:hover {
    opacity: 1;
  }
  .el-tabs {
    /deep/ .el-tabs__header {
      margin: 0;
    }
    /deep/ .el-tabs__content {
      display: none;
    }
    /deep/ .el-tabs__item {
      background-color: #e9eef3;
      margin: 0;
      font-size: 13px;
      color: #a7a7a7;
      &:hover {
        span {
          // width: 20px !important;
        }
      }
      .el-icon-star-on {
        &::before {
          transform: scale(9);
          display: inline-block;
        }
      }
    }
    /deep/ .on {
      .el-icon-star-on {
        color: #2baa5d;
      }
    }
    /deep/ span[class*='icon'] {
      margin: 0;
      color: #e55d5d;
      // height: 20px;
      // line-height: 20px;
    }
    /deep/ span[class*='el-tabs__nav'] {
      width: 20px;
      height: 40px;
      background-color: #e9eef3;
    }
    /deep/ .is-active {
      border: none;
      color: #5952c7;
      background-color: #ffc200;
      .el-icon-star-on {
        // width: 20px !important;
      }
    }
    // /deep/
    //   .el-tabs--card
    //   > .el-tabs__header
    //   .el-tabs__item.is-active.is-closable
    //   .el-icon-star-on {
    //   width: 20px !important;
    // }
  }
}
</style>
