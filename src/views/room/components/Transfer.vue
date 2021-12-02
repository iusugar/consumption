<!-- 添加房间 -->
<template>
  <div class="transfer-container">
    <el-transfer filterable
                 :filter-method="filterMethod"
                 filter-placeholder="请输入房间号"
                 :button-texts="['撤销', '选择']"
                 :titles="['待选', '已选择']"
                 v-model="value"
                 @change="handleChange"
                 :data="transferData"
                 target-order="unshift"
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
                 size="small"
                 @click="openConfirmAlert"
                 :disabled="checkedRoom.length === 0">添加</el-button>

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
import roomArray from '@/assets/json/room.json'
import buildingArray from '@/assets/json/building.json'
import { addRoom } from '@/api/room.js'

export default {
  data() {
    return {
      transferData: [],
      value: [],
      buildings: buildingArray,
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
    generateData() {
      let rooms = roomArray;
      let number = rooms;
      rooms.forEach((room, index) => {
        this.transferData.push({
          label: room,
          key: index,
          number: number[index]
        });
      });
    },
    filterMethod(query, item) {
      return item.number.indexOf(query) > -1;
    },
    handleChange(value, direction, movedKeys) {
      this.checkedRoom.splice(0, this.checkedRoom.length)
      for (let i = 0; i < value.length; i++) {
        this.checkedRoom[i] = (this.buildingNum + '-' + this.transferData[value[i]].label)
      }
    },
    handlePopoverClick(item) {
      this.visible = false;
      this.buildingNum = item;
      this.value.splice(0, this.value.length)
      this.checkedRoom.splice(0, this.checkedRoom.length)
    },
    openConfirmAlert() {
      let str = JSON.stringify(this.checkedRoom).replace(/\[|]/g, '')
      this.$confirm(str, '确认添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        addRoom(this.checkedRoom).then(response => {
          console.log(response);
          if (response.status === 200 && response.data === 'success') {
            this.value.splice(0, this.value.length)
            this.checkedRoom.splice(0, this.checkedRoom.length)
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      });
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
