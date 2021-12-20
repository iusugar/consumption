<!-- 查看设备列表 -->
<template>
  <div class="list-container">
    <div class="filter-container">
      <el-input placeholder="设备用途"
                prefix-icon="el-icon-search"
                v-model="queryList.usageDesc"
                clearable
                class="filter-item"
                style="width:200px">
      </el-input>

      <el-select v-model="queryList.deviceId"
                 clearable
                 filterable
                 remote
                 reserve-keyword
                 placeholder="设备编号"
                 :remote-method="remoteMethod"
                 :loading="loading"
                 class="filter-item"
                 style="width:250px">
        <el-option v-for="item in deviceNumList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="queryList.buildNum"
                 clearable
                 @change="buildingChange"
                 placeholder="楼号"
                 class="filter-item"
                 style="width:100px">
        <el-option v-for="item in buildingList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="queryList.roomNum"
                 clearable
                 placeholder="门牌号"
                 class="filter-item"
                 style="width:100px">
        <el-option v-for="item in roomList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-button class="filter-item search-btn"
                 type="primary"
                 icon="el-icon-search"
                 @click="getDeviceByQuery">
        查找
      </el-button>
      <el-button class="filter-item refresh-btn"
                 type="success"
                 icon="el-icon-refresh"
                 @click="refreshDevice">
        刷新
      </el-button>
    </div>

    <div class="table-container">
      <el-table :data="pageData"
                v-loading="tableLoading"
                highlight-current-row
                border
                fit
                stripe>
        <el-table-column prop="deviceId"
                         label="设备ID"
                         align="center"
                         width="250">
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
                         width="200">
        </el-table-column>
        <el-table-column prop="state"
                         label="状态"
                         align="center"
                         width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === 'ON' ? 'success' : 'danger'"
                    class="state-tag"
                    @click="clickItemInfo(scope.$index, scope.row,scope.column,scope.row.id)">{{scope.row.state}}</el-tag>
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
        <el-table-column prop="usageDesc"
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
            <el-popconfirm confirm-button-text='确定'
                           cancel-button-text='再想想'
                           icon="el-icon-info"
                           icon-color="red"
                           title="确定删除吗？"
                           @confirm="handleDelete(scope.$index, scope.row)">
              <el-button size="mini"
                         type="danger"
                         slot="reference">删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background
                     layout="prev, pager, next"
                     :total="this.tableData.length"
                     :page-size="pageSize"
                     :current-page.sync="currentPage"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog title="编辑"
               :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm"
               ref="dialogForm"
               :rules="rules"
               label-position="top">
        <el-row type="flex"
                :gutter="50">
          <el-col :span="12">
            <el-form-item label="设备ID">
              <el-input v-model="dialogForm.deviceId"
                        :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="添加时间">
              <el-input v-model="dialogForm.addDate"
                        :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex"
                justify="space-between">
          <el-form-item label="空间位置"
                        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
            <el-col :span="6">
              <el-form-item prop="buildNum">
                <el-select v-model="dialogForm.buildNum"
                           @change="buildingChange">
                  <el-option v-for="option in buildingOption"
                             :key="option.value"
                             :label="option.label"
                             :value="option.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="roomNum">
                <el-select v-model="dialogForm.roomNum"
                           @change="roomChange">
                  <el-option v-for="option in roomOption"
                             :key="option.value"
                             :label="option.label"
                             :value="option.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="location">
                <el-select v-model="dialogForm.location">
                  <el-option v-for="option in locationOption"
                             :key="option.value"
                             :label="option.label"
                             :value="option.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm('dialogForm')">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchAllDevice, fetchDeviceList, updateDevice, deleteDevice } from '@/api/device.js'
import { fetchAllRoom } from '@/api/room.js'
import { fetchLocationByRoom } from '@/api/location.js'
// import buildingArray from '@/assets/json/building.json'
// import roomArray from '@/assets/json/room.json'

export default {
  data() {
    return {
      queryList: {
        usageDesc: '',
        deviceId: '',
        buildNum: '',
        roomNum: ''
      },
      // 加载状态
      tableLoading: true,
      loading: false,
      // select自动补全快速搜索
      deviceNumList: [],
      value: [],
      list: [],
      alternateDeviceNum: [],
      // 房间数据
      buildingList: [],
      roomList: [],
      // 表格数据
      tableData: [
        // { deviceId: 'A1203', addDate: '2021-10-01 10:10', bNum: 'A1', rNum: '101', location: '6号桌', power: '21%' }
      ],
      // 分页展示数据
      pageData: [],
      percentage: 66,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 100 }
      ],
      // 所有设备数据
      allDeviceDataList: [],
      // 分页
      pageSize: 10,
      currentPage: 1,
      // dialog
      dialogFormVisible: false,
      dialogForm: {
        deviceId: '',
        addDate: '',
        buildNum: '',
        roomNum: '',
        location: ''
      },
      rules: {
        buildNum: [
          { required: true, message: '不能为空白', trigger: 'blur' }
        ],
        roomNum: [
          { required: true, message: '不能为空白', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '不能为空白', trigger: 'blur' }
        ]
      },
      // dialog下拉框选项
      buildingOption: [],
      roomOption: [],
      locationOption: [],
      roomData: []
    }
  },
  activated() {
    this.getAllDevice()
    this.getAllRoom()
  },
  methods: {
    // 初始化数据 获取全部
    getAllDevice() {
      this.currentPage = 1
      this.deviceNumList = []
      fetchAllDevice().then(response => {
        this.allDeviceDataList = response.data
        var addTableData = []
        for (let data of this.allDeviceDataList) {
          let device = {}
          device['deviceId'] = data.deviceId
          let strDate = new Date(Date.parse(data.createTime)).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')
          device['addDate'] = strDate
          device['bNum'] = data.buildNum
          device['rNum'] = data.roomNum
          device['location'] = data.location
          device['state'] = data.currentState ? 'ON' : 'OFF'
          addTableData.push(device)
          // 搜索框自动补全设备ID
          this.alternateDeviceNum.push(data.deviceId)
        }
        this.tableData = addTableData
        this.pageData = this.tableData.slice(0, this.pageSize)
        this.list = this.alternateDeviceNum.map(item => {
          return { value: `${item}`, label: `${item}` };
        })
        setTimeout(() => { this.tableLoading = false }, 500)
      }).catch(error => {
        this.tableLoading = false
        console.log(error);
      })
    },
    getDeviceByQuery() {
      this.deviceNumList = []
      this.tableLoading = true
      fetchDeviceList(this.queryList).then(response => {
        this.allDeviceDataList = response.data
        var addTableData = []
        for (let data of this.allDeviceDataList) {
          let device = {}
          device['deviceId'] = data.deviceId
          let strDate = new Date(Date.parse(data.createTime)).toLocaleString('chinese', { hour12: false })
          device['addDate'] = strDate.replace(/\//g, '-')
          device['bNum'] = data.buildNum
          device['rNum'] = data.roomNum
          device['location'] = data.location
          device['state'] = data.currentState ? 'ON' : 'OFF'
          addTableData.push(device)
          // 搜索框自动补全设备ID
          // this.alternateDeviceNum.push(data.deviceId)
        }
        this.tableData = addTableData
        this.pageData = this.tableData.slice(0, this.pageSize)
        setTimeout(() => { this.tableLoading = false }, 500)
      }).catch(error => {
        this.tableLoading = false
        console.log(error);
      })
    },
    refreshDevice() {
      this.queryList = {}
      this.getDeviceByQuery()
      this.currentPage = 1
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.deviceNumList = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.deviceNumList = [];
      }
    },
    // 修改数据使用
    getAllRoom() {
      fetchAllRoom()
        .then(response => {
          this.roomData = response.data
          this.roomData.sort((a, b) => { return a.name.localeCompare(b.name) })
          let buildingArray = []
          for (let o of this.roomData) {
            let building = []
            if (o.pid == null) {
              building['label'] = building['value'] = o.name
              buildingArray.push(building)
            }
          }
          this.buildingOption = buildingArray
          this.buildingList = buildingArray
        })
    },
    buildingChange(checked) {
      let id = 0;
      let roomArray = []
      for (let o of this.roomData) {
        if (checked === o.name) {
          id = o.id
        }
      }
      for (let o of this.roomData) {
        if (o.pid === id) {
          let room = {}
          room['label'] = room['value'] = o.name.substring(o.name.indexOf('-') + 1)
          roomArray.push(room)
        }
      }
      this.roomOption = roomArray
      this.roomList = roomArray
      this.dialogForm.roomNum = ''
      this.dialogForm.location = ''
    },
    roomChange(checked) {
      this.dialogForm.location = ''
      fetchLocationByRoom(this.dialogForm.buildNum + '-' + checked).then(response => {
        let locationList = []
        for (let loc of response.data) {
          locationList.push({ 'label': loc.position, 'value': loc.position })
        }
        locationList = locationList.sort((a, b) => { return a.value.localeCompare(b.value) })
        this.locationOption = locationList
      })
    },
    handleEdit(index, row) {
      if (this.$refs.dialogForm) {
        this.$refs.dialogForm.resetFields()
      }
      this.buildingChange(row.bNum)
      this.dialogForm.deviceId = row.deviceId
      this.dialogForm.addDate = row.addDate
      this.dialogForm.buildNum = row.bNum
      this.dialogForm.roomNum = row.rNum
      this.roomChange(row.rNum)
      this.dialogForm.location = row.location
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row);
      deleteDevice(row.deviceId).then(response => {
        if (response.data === 'success') {
          this.refreshDevice()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },
    handleCurrentChange(current) {
      this.pageData = this.tableData.slice((current - 1) * this.pageSize, (current - 1) * this.pageSize + this.pageSize)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateDevice(this.dialogForm).then(response => {
            let res = response.data
            if (res === 'same') {
              this.$message({
                message: '信息相同未做更改',
                type: 'warning'
              })
            } else if (res === 'success') {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
              });
              this.getDeviceByQuery()
              this.dialogFormVisible = false
            }
          })
        } else {
          this.$message({
            message: '请检查内容',
            type: 'error'
          })
        }
      })
    },
    // el-tag的click方法用来调试 无实际用途
    clickItemInfo(e1, e2, e3, e4) {
      console.log(e1)
      console.log(e2);
      console.log(e3);
      console.log(e4);
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: #FFF;
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
    min-height: 300px;
    position: relative;
    .el-table {
      width: 100%;
      // position: absolute;
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
  .pagination-container {
    text-align: center;
    padding: 50px;
  }
  /deep/ .el-dialog {
    .el-dialog__header {
      padding: 10px 20px;
      background-color: rgb(31, 62, 102);
      .el-dialog__headerbtn {
        top: 10px !important;
      }
      span,
      i {
        font-size: 14px;
        color: #fff;
      }
    }
    .el-dialog__body {
      padding: 10px 20px;
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
