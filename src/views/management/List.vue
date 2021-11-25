<!-- 查看插座列表 -->
<template>
  <div class="list-container">
    <div class="filter-container">
      <el-input placeholder="插座用途"
                prefix-icon="el-icon-search"
                v-model="queryList.usage"
                clearable
                class="filter-item"
                style="width:200px">
      </el-input>

      <el-select v-model="queryList.number"
                 filterable
                 remote
                 reserve-keyword
                 placeholder="插座编号"
                 :remote-method="remoteMethod"
                 :loading="loading"
                 class="filter-item"
                 style="width:150px">
        <el-option v-for="item in deviceNums"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="queryList.building"
                 clearable
                 placeholder="楼号"
                 class="filter-item"
                 style="width:100px">
        <el-option v-for="item in buildingNumber"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>

      <el-select v-model="queryList.room"
                 clearable
                 placeholder="门牌号"
                 class="filter-item"
                 style="width:100px">
        <el-option v-for="item in roomNumber"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>

      <el-button class="filter-item search-btn"
                 type="primary"
                 icon="el-icon-search">
        查找
      </el-button>
      <el-button class="filter-item search-btn"
                 type="success"
                 icon="el-icon-refresh">
        刷新
      </el-button>
    </div>

    <div class="table-container">
      <el-table :data="tableData"
                highlight-current-row
                border
                fit
                stripe>
        <el-table-column prop="number"
                         label="编号"
                         align="center"
                         width="200">
        </el-table-column>
        <el-table-column prop="bNum"
                         label="所在楼号"
                         align="center"
                         width="80">
        </el-table-column>
        <el-table-column prop="rNum"
                         label="门牌号"
                         align="center"
                         width="80">
        </el-table-column>
        <el-table-column prop="location"
                         label="空间位置"
                         align="center"
                         width="120">
        </el-table-column>
        <el-table-column prop="addDate"
                         label="添加时间"
                         align="center"
                         width="150">
        </el-table-column>
        <el-table-column label="状态"
                         align="center"
                         width="80">
          <template>
            <el-tag type="success">ON</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="power"
                         label="剩余电量"
                         align="center"
                         width="80">
          <template>
            <el-progress type="dashboard"
                         :percentage="percentage"
                         :color="colors"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="usage"
                         label="设备负载"
                         align="center"
                         min-width="150">
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="180">
          <template v-slot="scope">
            <el-button size="mini"
                       type="primary"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryList: {
        usage: '',
        number: '',
        building: '',
        room: ''
      },
      deviceNums: [],
      value: [],
      list: [],
      loading: false,
      alternatedeviceNums: ['A1202', 'aswa', 'vsaa', 'asbw', 'busad', 'vvvv'],
      buildingNumber: ['A1', 'A2', 'A3', 'C1', 'C2'],
      roomNumber: ['101', '102', '202', '301'],
      tableData: [
        { number: 'A1203', addDate: '2021-10-01 10:10', bNum: 'A1', rNum: '101', location: '6号桌', power: '21%' },
        { number: 'A2303', addDate: '2021-10-02 09:19', bNum: 'A2', rNum: '303', location: '1号桌', power: '11%' }
      ],
      currentRow: null,
      percentage: 61,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 100 }
        // { color: '#1989fa', percentage: 80 },
        // { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  mounted() {
    this.list = this.alternatedeviceNums.map(item => {
      return { value: `value:${item}`, label: `${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.deviceNums = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.deviceNums = [];
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$axios({
        method: 'get',
        url: 'http://localhost:8090'
      }).then(res => {
        console.log(res);
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  // border-radius: 5px;
  // box-shadow: 0 2px 5px #00000025;
  box-sizing: border-box;
  padding: 20px;
  .filter-container {
    text-align: left;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
    .search-btn {
    }
  }
  .table-container {
    position: relative;
    .el-table {
      width: 100%;
      position: absolute;
      font-size: 14px;
      color: #606266;
      /deep/ .el-table__cell {
        padding: 5px 0;
        .cell {
          line-height: 20px;
          .el-tag {
            height: 35px;
            line-height: 35px;
          }
        }
      }
    }
  }
}
/deep/ .el-progress {
  .el-progress-circle {
    width: 35px !important;
    height: 35px !important;
  }
  .el-progress__text {
    font-size: 10px !important;
  }
}
/deep/ td:nth-child(7) {
  padding: 5px 0 0 0 !important;
}
</style>
