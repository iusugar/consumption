<!-- 右侧选择房间号界面 -->
<template>
  <div class="drawer-wrapper">
    <div class="drawer-button"
         @click="openDrawer"><i class="iconfont icon-menpaihao1"></i></div>
    <el-drawer title="选择位置"
               :visible.sync="drawer"
               :direction="direction"
               :modal="true">
      <div class="room-number-wrapper">
        <el-scrollbar style="height: 100%;width: 100%;">
          <el-row type="flex"
                  justify="space-between"
                  align="middle"
                  v-for="(room, index) in roomList"
                  :key="index"
                  ref="elRow"
                  @click.native="getRowIndex(index)">
            <el-col :span="6"
                    class="avatar">
              <el-avatar icon="iconfont icon-icon_font"
                         size="small"
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
        </el-scrollbar>
      </div>
    </el-drawer>
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
        { number: '302', type: '小教室', quantity: 1 },
        { number: '304', type: '小教室', quantity: 1 }
      ],
      roomActiveIndex: 0
    }
  },
  methods: {
    openDrawer() {
      this.drawer = true
      this.$nextTick(() => {
        this.$refs.elRow[this.roomActiveIndex].$el.classList.add('active')
      })
      // console.log(this.$refs.elRow[0].$el.classList)
      // this.$refs.elRow[0].$el.classList.add('active')
    },
    getRowIndex(index) {
      // this.$refs.elRow[index].$el.className += ' active'
      if (index === this.roomActiveIndex) {
        return
      }
      this.$refs.elRow[this.roomActiveIndex].$el.classList.remove('active')
      this.roomActiveIndex = index
      this.$refs.elRow[index].$el.classList.add('active')
      console.log(this.$refs.elRow[index].$el.classList);
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  /deep/ .el-drawer {
    width: 200px !important;
    height: 400px;
    min-height: 300px;
    // margin: auto;
    top: 20%;
    background-color: #eff1f7;
    box-shadow: 0 2px 5px #00000015;

    // box-shadow: none;
    .el-drawer__header {
      margin-bottom: 10px;
      // padding-left: 0;
      span {
        text-align: left;
        outline: none;
        font-size: 12px;
        font-weight: 800;
      }
    }
    .el-drawer__body {
      overflow: hidden;
    }
    .room-number-wrapper {
      height: 350px;
      // vertical-align: middle;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .active {
        background-color: #e55d5d;
        color: #fff;
        .room-number {
          .number {
            color: #eff1f7 !important;
          }
          .type {
            color: #ffc200 !important;
          }
        }
        .quantity {
          color: #eff1f7 !important;
        }
      }
      .el-row {
        margin: 5px 0 10px 0;
        height: 40px;

        &:active {
          background-color: #00000015;
        }
        &:hover {
          // background-color: #e55d5d;
          // background-color: #00000005;
          box-shadow: 0 0 5px 2px #00000015;
          transition: background-color 0.2s ease-in-out;
          .room-number {
            .number {
              // color: #eff1f7;
            }
            .type {
              // color: #eff1f7;
            }
          }
          .quantity {
            // color: #eff1f7;
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
          font-size: 13px;
          font-weight: 600;
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
    opacity: 0.9;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
    i {
      color: #ffffff;
      font-size: 25px;
      line-height: 50px;
    }
  }
}
</style>
