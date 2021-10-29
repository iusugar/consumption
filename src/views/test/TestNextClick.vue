<!-- 插座空间位置分布展示页 -->
<template>
  <div class="app-containerr">

    <div class="building-number-wrapper">
      1
    </div>
    <div class="drawer-wrapper">
      <div class="drawer-button"
           @click="drawer=true"><i class="iconfont icon-menpaihao1"></i></div>
      <el-drawer title="选择位置"
                 :visible.sync="drawer"
                 :direction="direction"
                 :modal="false"
                 :before-close="handleClose">
        <div class="room-number-wrapper">
          <el-scrollbar style="height: 100%;width: 100%;">
            <el-row type="flex"
                    justify="space-between"
                    align="middle"
                    v-for="room in roomList"
                    :key="room">
              <el-col :span="6"
                      class="avatar">
                <el-avatar icon="iconfont icon-icon_font" size="small"
                           shape="square"></el-avatar>
              </el-col>
              <el-col :span="8"
                      class="room-number">
                <div class="number">{{room.number}}</div>
                <div class="type">{{room.type}}</div>
              </el-col>
              <el-col :span="10"
                      class="quantity">{{room.quantity}}个</el-col>
            </el-row>

            <!-- <div class="avatar"><el-avatar icon="el-icon-user-solid"
                     shape="square"></el-avatar></div>
          <div class="room-number">101</div>
          <div class="quantity">123</div> -->
          </el-scrollbar>
        </div>
      </el-drawer>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      roomList: [
        { number: '102', type: '小教室', quantity: 4 },
        { number: '105', type: '小教室', quantity: 1 },
        { number: '202', type: '小教室', quantity: 1 },
        { number: '222', type: '大教室', quantity: 2 },
        { number: '512', type: '办公室', quantity: 3 },
        { number: '516', type: '办公室', quantity: 2 },
        { number: '412', type: '电脑教室', quantity: 7 },
        { number: '302', type: '小教室', quantity: 1 }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .building-number-wrapper {
    width: 60px;
    height: 200px;
    border-radius: 15px;
    background: #eff1f7;
    position: relative;
    top: 60%;
    left: 30px;
    box-shadow: 0 2px 5px #00000015;
  }
  .drawer-wrapper {
    /deep/ .el-drawer {
      width: 250px !important;
      height: 400px;
      min-height: 300px;
      margin: auto;
      box-shadow: 0 2px 5px #00000015;
      .el-drawer__header {
        text-align: left;
      }
      .room-number-wrapper {
        height: 300px;
        vertical-align: middle;
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
        .el-row {
          margin: 5px 0 10px 0;
          height: 40px;
          &:hover {
            background-color: #e55d5d;
            box-shadow: 0 0 5px 2px #00000015;
            transition: background-color 0.2s ease-in-out;
            .room-number {
              .number {
                color: #fff;
              }
              .type {
                color: #fff;
              }
            }
            .quantity {
              color: #fff;
            }
          }
          .avatar {
            .el-avatar {
              display: block;
              margin: 0 0 0 10px;
              background: #5952c7;
              i {
                font-size: 20px;
                color: #ffc200;
              }
            }
          }
          .room-number {
            .number {
              color: #3c3f54;
              font-size: 12px;
              font-weight: 600;
            }
            .type {
              color: #b7bacf;
              font-size: 8px;
            }
          }
          .quantity {
            color: #6f78cb;
            font-size: 14px;
            font-weight: 800;
          }
        }
      }
    }
    .drawer-button {
      width: 50px;
      height: 50px;
      border-radius: 15px;
      background: #5952c7;
      position: fixed;
      top: 60%;
      right: 30px;
      box-shadow: 0 2px 5px #00000035;
      i {
        color: #ffffff;
        font-size: 25px;
        line-height: 50px;
      }
    }
  }
}
</style>
