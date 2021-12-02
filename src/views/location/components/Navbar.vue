<!-- 横栏显示当前房间的插座列表 -->
<template>
  <div class="nav-wrapper">
    <el-tabs v-model="deviceTabsValue"
             type="card"
             :stretch='false'
             :closable='true'
             @tab-click="handleClick"
             ref="tabs">
      <el-tab-pane v-for="(item) in deviceTabs"
                   :key="item.id"
                   :label="item.title"
                   :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchDevice } from '@/api/device.js'
import bus from '@/utils/bus.js'

export default {
  props: {
    roomList: {
    }
  },
  data() {
    return {
      deviceTabsValue: '0',
      deviceTabs: [
        // { title: 'A1201111111112-11', name: '1', state: 'on' }, { title: 'A1202-2', name: '2', state: 'off' }
      ],
      idKey: 0
    }
  },
  updated() {
    this.$nextTick(() => {
      this.setState()
    });
  },
  activated() {
    this.getCheckedRoom()
  },
  methods: {
    getCheckedRoom() {
      bus.$on('checkedRoom', e => {
        let tabs = []
        fetchDevice(e).then(response => {
          let deviceData = response.data
          let i = 0
          for (let d of deviceData) {
            tabs.push({ id: d.id, title: d.deviceId, name: i++ + '', state: d.currentState ? 'on' : 'off' })
          }
          this.deviceTabs = tabs
          // 中间定位板块接收
          bus.$emit('deviceDataList', deviceData)
          this.deviceTabsValue = '0'
          // 中间定位板块接收
          bus.$emit('checkedDevice', this.deviceTabsValue)
          if (tabs != null && tabs.length > 0) {
            bus.$emit('checkedDeviceId', tabs[0].id)
          } else {
            bus.$emit('checkedDeviceId', 0)
          }
        })
      })
    },
    setState() {
      var tabsArray = this.$refs['tabs'].$el.getElementsByClassName('el-tabs__item')
      for (let i = 0; i < tabsArray.length; i++) {
        tabsArray[i].classList.remove('on')
        tabsArray[i].classList.add(this.deviceTabs[i].state)
      }
    },
    handleClick(tab) {
      this.$nextTick(() => {
        this.setState()
      });
      // 中间定位板块接收
      bus.$emit('checkedDevice', tab.name)
      // 图表接收
      bus.$emit('checkedDeviceId', this.deviceTabs[tab.index].id)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  width: 40%;
  height: 40px;
  // min-width: 300px;
  position: relative;
  margin-left: 80px;
  box-shadow: 0 2px 5px #00000025;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
  z-index: 99;
  &:hover {
    opacity: 1;
  }
  .el-tabs {
    /deep/ .el-tabs__header {
      margin: 0;
      .el-tabs__nav-wrap {
        .el-tabs__nav-prev {
          background-color: #ffffff99;
        }
        .el-tabs__nav-next {
          background-color: #ffffff99;
        }
        .el-tabs__nav {
          border: none;
        }
      }
    }
    /deep/ .el-tabs__content {
      display: none;
    }
    /deep/ .el-tabs__item {
      background-color: #ffffff99;
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
