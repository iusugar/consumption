<!-- 树形控件展示空间位置 -->
<template>
  <div class="room-tree-container">
    <el-input placeholder="输入关键字进行过滤"
              :clearable="true"
              style="width:200px"
              v-model="filterText">
    </el-input>
    <el-tree :data="roomData"
             v-loading="treeLoading"
             ref="tree"
             node-key="id"
             :expand-on-click-node="false"
             :props="defaultProps"
             :filter-node-method="filterNode"
             @node-click="handleNodeClick">
    </el-tree>
    <div class="button-group">
      <!-- <el-button @click="getCheckedNodes">操作选择项</el-button> -->
      <el-button @click="addNewNodes">添加新位置</el-button>
      <!-- <el-button @click="resetChecked">清空选择</el-button> -->
    </div>
    <!-- 添加新位置表单 -->
    <el-dialog title="添加新的位置"
               custom-class="add-dialog"
               :visible.sync="dialogFormVisible">
      <el-form :model="addNewForm"
               ref="addNewForm"
               label-position="left">
        <el-form-item label="楼号"
                      label-width="80px"
                      prop="checkedBuilding"
                      :rules="{required: true, message: '请选择或输入楼号', trigger: 'change'}">
          <el-select v-model="addNewForm.checkedBuilding"
                     filterable
                     allow-create
                     clearable
                     default-first-option
                     placeholder="请选择楼号或手动输入"
                     @change="buildingChange">
            <el-option v-for="item in buildingOption"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-input style="width: 200px"
                    clearable
                    placeholder="楼位置的描述"
                    :disabled="buildingDis"
                    v-model="addNewForm.buildingDesc">
          </el-input> -->
        </el-form-item>
        <el-form-item label="门牌号"
                      label-width="80px"
                      prop="checkedRoom"
                      :rules="{required: true, message: '请选择或输入门牌号', trigger: 'change'}">
          <el-select v-model="addNewForm.checkedRoom"
                     filterable
                     allow-create
                     clearable
                     default-first-option
                     placeholder="请选择门牌号或手动输入">
            <el-option v-for="item in roomOption"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-input style="width: 200px"
                    clearable
                    placeholder="房间的描述"
                    :disabled="roomDis"
                    v-model="addNewForm.roomDesc">
          </el-input> -->
        </el-form-item>
        <el-form-item label="具体位置"
                      label-width="80px"
                      prop="location"
                      :rules="{required: true, message: '请输入房间中的具体位置', trigger: 'change'}">
          <el-input v-model="addNewForm.location"
                    placeholder="请输入具体位置"
                    clearable
                    autocomplete="off"
                    style="width:250px"
                    @blur="locationChange">
          </el-input>
          <!-- <el-input style="width: 200px"
                    clearable
                    placeholder="具体位置描述"
                    :disabled="locationDis"
                    v-model="addNewForm.locationDesc">
          </el-input> -->
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAddNewForm('addNewForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="具体信息"
               custom-class="info-dialog"
               :visible.sync="dialogInfoVisible">
      <el-form :model="infoForm"
               ref="infoForm"
               label-position="left">
        <el-form-item label="位置"
                      label-width="80px"
                      prop="infoRoom"
                      :rules="{required: true, message: '不能为空白', trigger: 'blur'}">
          <el-input v-model="infoForm.infoRoom"
                    @change="checkInfoRoomIsExist"
                    autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="位置描述"
                      label-width="80px"
                      prop="infoRoomDesc">
          <el-input v-model="infoForm.infoRoomDesc"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="updateRoomOrLocation('infoForm')">修 改</el-button>
        <el-popover placement="top"
                    width="150"
                    v-model="popoverVisible">
          <p>可能导致下级元素都被删除 确认删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini"
                       type="text"
                       @click="popoverVisible = false">取消</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="deleteRoomOrLocation">确定</el-button>
          </div>
          <el-button slot="reference">删 除</el-button>
        </el-popover>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchAllRoom, addNewRoom, fetchRoomInfo, updateRoomInfo, deleteRoom } from '@/api/room.js'
import { fetchAllLocation, fetchLocationInfo, updateLocationInfo, deleteLocation } from '@/api/location.js'

export default {
  data() {
    return {
      treeLoading: true,
      // 树数据
      roomData: [],
      nodeData: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 筛选树节点
      filterText: '',
      // 添加新位置的容器是否可见
      dialogFormVisible: false,
      // 添加新位置的表单
      addNewForm: {
        checkedBuilding: '',
        buildingDesc: '',
        checkedRoom: '',
        roomDesc: '',
        location: '',
        locationDesc: ''
      },
      // 表单楼号选项
      buildingOption: [],
      // 表单房间号选项
      roomOption: [],
      allRoomData: [],
      allLocationData: [],
      buildingDis: false,
      roomDis: false,
      locationDis: false,
      // 房间信息表单
      dialogInfoVisible: false,
      infoForm: {
        id: 0,
        infoRoom: '',
        infoRoomDesc: ''
      },
      // 确认删除弹出框
      popoverVisible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  activated() {
    this.getAllRoom()
  },
  methods: {
    async getAllRoom() {
      var setData = []
      // var building = {}
      // var room = {}
      setTimeout(() => {
        this.treeLoading = false
      }, 300);
      await fetchAllRoom().then(response => {
        this.allRoomData = response.data
        this.allRoomData.sort((a, b) => { return a.name.localeCompare(b.name) })
      })
      await fetchAllLocation().then(response => {
        this.allLocationData = response.data
      })
      this.allLocationData.sort((a, b) => { return a.position.localeCompare(b.position) })
      let buildingNumList = []
      let roomNumList = []
      for (let data of this.allRoomData) {
        if (data.pid == null || data.pid === '') {
          buildingNumList.push({ id: data.id, number: data.name })
        } else {
          roomNumList.push({ id: data.id, number: data.name, pId: data.pid })
        }
      }
      buildingNumList = buildingNumList.sort((a, b) => { return a.number.localeCompare(b.number) })
      roomNumList = roomNumList.sort((a, b) => { return a.number.localeCompare(b.number) })
      console.log(buildingNumList);
      for (let b of buildingNumList) {
        let building = {}
        let bChildren = []
        building['id'] = b.id
        building['label'] = b.number
        for (let r of roomNumList) {
          let rChildren = []
          let room = {}
          if (b.id === r.pId) {
            room['id'] = r.id
            room['label'] = r.number
            bChildren.push(room)
            // building['children'] = bChildren
          }
          for (let loc of this.allLocationData) {
            if (loc.roomId === r.id) {
              let location = {}
              location['id'] = loc.id
              location['label'] = loc.position
              rChildren.push(location)
            }
            room['children'] = rChildren
            building['children'] = bChildren
          }
        }
        setData.push(building)
      }
      this.roomData = setData
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data);
      this.nodeData = data
      this.dialogInfoVisible = true
      if (data.children != null) {
        fetchRoomInfo(data.label, data.id).then(response => {
          this.infoForm.id = data.id
          this.infoForm.infoRoom = response.data.name
          this.infoForm.infoRoomDesc = response.data.description
          if (response.data.description === '') {
            this.infoForm.infoRoomDesc = '无'
          }
        })
      } else {
        fetchLocationInfo(data.label, data.id).then(response => {
          this.infoForm.id = data.id
          this.infoForm.infoRoom = response.data.position
          this.infoForm.infoRoomDesc = response.data.description
          if (response.data.description === '') {
            this.infoForm.infoRoomDesc = '无'
          }
        })
      }
    },
    // 对树的操作
    addNewNodes() {
      this.dialogFormVisible = true
      let buildingList = []
      for (let r of this.allRoomData) {
        let building = []
        if (r.pid == null) {
          building['label'] = building['value'] = r.name
          buildingList.push(building)
        }
      }
      this.buildingOption = buildingList
      // this.buildingChange(this.checkedBuilding)
      // this.addNewForm.checkedRoom = ''
    },
    // 楼号变更时触发
    buildingChange(checked) {
      this.addNewForm.checkedRoom = ''
      let id = 0;
      let roomList = []
      for (let r of this.allRoomData) {
        if (checked === r.name) {
          id = r.id
        }
      }
      for (let r of this.allRoomData) {
        if (r.pid === id) {
          let room = {}
          room['label'] = room['value'] = r.name
          roomList.push(room)
        }
      }
      if (checked !== '' && roomList.length > 0) {
        this.addNewForm.checkedRoom = roomList[0].value
      }
      this.roomOption = roomList
    },
    // 提交添加新点位的表单
    submitAddNewForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addNewRoom(this.addNewForm).then(response => {
            if (response.data === 'exist') {
              this.$message({
                message: '已存在这个位置',
                type: 'warning'
              });
            } else if (response.data === 'success') {
              this.$notify({
                title: '成功',
                message: '成功添加新的位置',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
              this.getAllRoom()
              // this.clearForm()
            }
          })
        } else {
          console.log('失败');
        }
      })
    },
    locationChange() {
    },
    checkInfoRoomIsExist(data) {
    },
    updateRoomOrLocation(formName) {
      if (this.nodeData.children != null) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            updateRoomInfo(this.infoForm).then(response => {
              if (response.data === 'exist') {
                this.$message({
                  message: '相同信息 未做更新',
                  type: 'warning'
                })
              } else if (response.data === 'success') {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
                this.dialogInfoVisible = false
              }
            })
          }
        })
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let location = { 'id': this.infoForm.id, 'position': this.infoForm.infoRoom, 'description': this.infoForm.infoRoomDesc }
            updateLocationInfo(location).then(response => {
              if (response.data === 'exist') {
                this.$message({
                  message: '相同信息 未做更新',
                  type: 'warning'
                })
              } else if (response.data === 'success') {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
                this.dialogInfoVisible = false
              }
            })
          }
        })
      }
    },
    deleteRoomOrLocation() {
      if (this.nodeData.children != null) {
        deleteRoom(this.nodeData.id).then(response => {
          if (response.data === 'success') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.dialogInfoVisible = false
            this.getAllRoom()
          } else {
            this.$message({
              message: '出现错误',
              type: 'error'
            })
            this.getAllRoom()
          }
        }).catch(err => {
          console.log(err);
          this.$message({
            message: '出现错误 该位置下可能有设备存在 请先删除设备',
            type: 'error'
          })
        })
      } else {
        deleteLocation(this.nodeData.id).then(response => {
          if (response.data === 'success') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.dialogInfoVisible = false
            this.getAllRoom()
          } else {
            this.$message({
              message: '出现错误',
              type: 'error'
            })
            this.getAllRoom()
          }
        })
      }
      this.popoverVisible = false
    },
    clearForm() {
      this.addNewForm = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.room-tree-container {
  width: 100%;
  min-height: calc(100vh - 50px);
  padding: 20px 30px;
  /deep/ .el-tree {
    .el-tree-node__content {
      height: 30px;
      span {
        font-size: 14px;
      }
    }
  }
  .button-group {
    padding: 30px 20px;
  }
  /deep/ .el-dialog {
    min-width: 350px;
    .el-dialog__footer {
      text-align: center;
    }
  }
  /deep/ .add-dialog {
    width: 500px;
  }
  /deep/ .info-dialog {
    width: 400px;
  }
}
</style>
