<!-- 添加房间 -->
<template>
  <div class="transfer-container"
       v-if="refresh">
    <el-transfer filterable
                 :filter-method="filterMethod"
                 filter-placeholder="请输入房间号"
                 :button-texts="['撤销', '添加']"
                 :titles="['待选', '已选择']"
                 v-model="value"
                 @change="handleChange"
                 :data="transferData"
                 ref="trans">
      <span slot-scope="{ option }">{{ buildingNum }} - {{ option.label }}</span>
      <el-button class="transfer-footer"
                 type="primary"
                 plain
                 slot="left-footer"
                 size="small"
                 v-popover:popover>{{buildingNum}}</el-button>
      <el-button class="transfer-footer"
                 type="primary"
                 plain
                 slot="right-footer"
                 size="small">提交</el-button>

    </el-transfer>
    <el-popover ref="popover"
                placement="right"
                width="200"
                trigger="click"
                popper-class="building-popover"
                v-model="visible">
      <el-scrollbar>
        <div class="building-item"
             @click="handlePopoverClick(item)"
             v-for="(item) in buildings"
             :key='item'>{{item}}</div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transferData: [],
      value: [],
      buildings: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2'],
      buildingNum: 'A1',
      visible: false,
      checkedRoom: [],
      refresh: true
    };
  },
  created() {
    this.generateData()
  },
  updated() {
  },
  methods: {
    getOne() {
      console.log('清空数据');
    },
    generateData() {
      console.log('执行generate');
      const rooms = ['101', '102', '103', '104', '105', '201', '202'];
      const number = rooms;
      rooms.forEach((room, index) => {
        this.transferData.push({
          label: room,
          key: index,
          number: number[index]
        });
      });
      // return tdata;
    },
    filterMethod(query, item) {
      return item.number.indexOf(query) > -1;
    },
    handleChange(value, direction, movedKeys) {
      for (let i = 0; i < value.length; i++) {
        console.log(this.buildingNum + '-' + this.transferData[value[i]].label);
      }
      this.checkedRoom = value
    },
    handlePopoverClick(item) {
      this.visible = false;
      this.buildingNum = item;
      // this.transferData = []
      // this.refresh = false;
      // this.refresh = true
      // this.generateData()
      // this.$refs.tran.$el.style.display = 'none'
      // console.log(this.$refs.tran.$children[0].$children[2].$el);
    }
  }
};
</script>

<style lang="scss" scoped>
.transfer-container {
  width: 100%;
  padding: 40px 50px;
  box-sizing: border-box;
  /deep/ .el-transfer {
    margin: 0 auto;
    .el-transfer-panel {
      box-shadow: 0 2px 5px #00000025;
    }
    .el-transfer__buttons {
      .el-button {
        box-shadow: 0 2px 5px #00000035;
      }
    }
    .el-transfer-panel__footer {
      .el-button {
        width: 100%;
        height: 100%;
        border: none;
        font-size: 16px;
      }
    }
  }
}
</style>

<style lang="scss">
.building-popover {
  width: 150px !important;
  min-width: 120px !important;
  height: 150px;
  padding: 0 !important;
  text-align: center;
  box-sizing: border-box;
  .building-item {
    padding: 5px 10px;
    &:hover {
      color: #ffffff;
      background-color: #409eff;
    }
  }
  .el-scrollbar {
    height: 100% !important;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
