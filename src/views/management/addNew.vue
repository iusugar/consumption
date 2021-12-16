<!-- 插座管理 -->
<template>
  <div class="app-container">
    <el-card class="box-card"
             shadow="hover">
      <div slot="header"
           class="clearfix header">
        <i class="el-icon-edit">添加新的插座</i>
        <el-button style="float: right; padding: 3px 0"
                   type="text">
          <router-link to="/management/list">查看所有插座</router-link>
        </el-button>
      </div>
      <div class="form-wrapper">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="插座ID号"
                            prop="deviceId">
                <el-input placeholder="请输入插座ID"
                          v-model="ruleForm.deviceId"
                          clearable
                          show-word-limit
                          maxlength="24"
                          @blur="isExist"><i slot="prefix"
                     class="iconfont icon-4qichexinghao"></i></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="插座用途"
                            prop="usageDesc">
                <el-input placeholder="请输入用途"
                          v-model="ruleForm.usageDesc"
                          clearable><i slot="prefix"
                     class="iconfont icon-xuqiu-hui"></i></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="7">
              <el-form-item label="所在楼号"
                            prop="buildNum">
                <el-select v-model="ruleForm.buildNum"
                           placeholder="楼号"
                           @change="buildingChange">
                  <el-option v-for="(option, index) in buildingOption"
                             :key="index"
                             :label="option.label"
                             :value="option.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="门牌号码"
                            prop="roomNum">
                <el-select v-model="ruleForm.roomNum"
                           placeholder="门牌号"
                           @change="roomChange">
                  <el-option v-for="(option, index) in roomOption"
                             :key="index"
                             :label="option.label"
                             :value="option.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="具体位置"
                            prop="location">
                <el-select v-model="ruleForm.location"
                           placeholder="位置">
                  <el-option v-for="(option, index) in locationOption"
                             :key="index"
                             :label="option.label"
                             :value="option.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="7">
              <el-form-item label="额定电压"
                            prop="ratedVoltage">
                <el-input placeholder="请输入电压"
                          :value="220"
                          onkeyup="value=value.replace(/[^\d]/g,'')"
                          @blur="ruleForm.ratedVoltage=$event.target.value"
                          v-model="ruleForm.ratedVoltage">
                  <i slot="prefix"
                     class="iconfont icon-dianya">
                  </i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="额定电流"
                            prop="ratedCurrent">
                <el-input placeholder="请输入电流"
                          onkeyup="value=value.replace(/[^\d]/g,'')"
                          @blur="ruleForm.ratedCurrent=$event.target.value"
                          v-model="ruleForm.ratedCurrent">
                  <i slot="prefix"
                     class="iconfont icon-dianliu">
                  </i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="最大功率"
                            prop="ratedPower">
                <el-input placeholder="请输入功率"
                          onkeyup="value=value.replace(/[^\d]/g,'')"
                          @blur="ruleForm.ratedPower=$event.target.value"
                          v-model="ruleForm.ratedPower">
                  <i slot="prefix"
                     class="iconfont icon-gongshuai">
                  </i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-form-item label="具备功能"
                          prop="checkedFunctions">
              <el-checkbox :indeterminate="ruleForm.isIndeterminate"
                           v-model="ruleForm.checkAll"
                           @change="handleCheckAllChange"
                           class="all-checked-box">全选</el-checkbox>

              <el-checkbox-group v-model="ruleForm.checkedFunctions"
                                 @change="handleCheckedChange">
                <el-checkbox v-for="item in ruleForm.deviceFunctions"
                             :label="item"
                             :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row type="flex"
                  justify="center">
            <el-col>
              <el-form-item class="button-item">
                <el-button type="primary"
                           @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addDevice, checkIsExist } from '@/api/device.js'
import { fetchAllRoom } from '@/api/room.js'
import { fetchLocationByRoom } from '@/api/location.js'

export default {
  data() {
    return {
      ruleForm: {
        deviceId: '',
        usageDesc: '',
        buildNum: '',
        roomNum: '',
        location: '',
        ratedVoltage: '220',
        ratedCurrent: '',
        ratedPower: '',
        deviceFunctions: ['监测电流', '监测电压', '监测功率', '远程控制', '记录电量', '红外功能'],
        checkAll: false,
        checkedFunctions: ['监测功率', '记录电量'],
        isIndeterminate: true
      },
      rules: {
        deviceId: [
          { required: true, message: '请输入设备id编号', trigger: 'blur' },
          { min: 24, max: 24, message: '长度为24个字符', trigger: 'blur' }
        ],
        buildNum: [
          { required: true, message: '请选择楼号', trigger: 'change' }
        ],
        roomNum: [
          { required: true, message: '请选择门牌号', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请填写具体位置', trigger: 'change' }
        ]
      },
      buildingOption: [],
      roomOption: [],
      locationOption: [{ 'label': '2号桌', 'value': '2号桌' }],
      roomData: [],
      checkedBuilding: '',
      checkedRoom: ''
    };
  },
  // mounted() {
  //   this.getAllRoom();
  // },
  activated() {
    this.getAllRoom()
  },
  methods: {
    isExist() {
      checkIsExist(this.ruleForm.deviceId).then(response => {
        if (response.data === 'exist') {
          this.$message({
            message: '已存在这个插座id',
            type: 'warning'
          });
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleCheckAllChange(val) {
      this.ruleForm.checkedFunctions = val ? this.ruleForm.deviceFunctions : [];
      this.ruleForm.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.ruleForm.checkAll = checkedCount === this.ruleForm.deviceFunctions.length;
      this.ruleForm.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleForm.deviceFunctions.length;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addDevice(this.ruleForm)
            .then(response => {
              if (response.data === 'success') {
                console.log(response);
                this.$notify({
                  title: '成功',
                  message: '成功添加新的插座',
                  type: 'success',
                  duration: 2000
                })
              } else if (response.data === 'exist') {
                this.$message({
                  message: '已存在这个插座id',
                  type: 'warning'
                });
              }
            })
            .catch(error => {
              console.log('发生了错误');
              console.log(error);
            })
        } else {
          this.$message({
            message: '请按要求填写完整',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    roomChange(checked) {
      this.ruleForm.location = '';
      this.checkedRoom = checked;
      fetchLocationByRoom(checked).then(response => {
        let locationList = []
        for (let loc of response.data) {
          locationList.push({ 'label': loc.position, 'value': loc.position })
        }
        locationList = locationList.sort((a, b) => { return a.value.localeCompare(b.value) })
        this.locationOption = locationList
      })
    },
    buildingChange(checked) {
      this.ruleForm.roomNum = ''
      this.roomChange()
      this.checkedBuilding = checked;
      let id = 0;
      let roomList = []
      for (let o of this.roomData) {
        if (checked === o.name) {
          id = o.id
        }
      }
      for (let o of this.roomData) {
        if (o.pid === id) {
          let room = {}
          room['id'] = o.id
          room['pid'] = o.pid
          room['label'] = room['value'] = o.name
          roomList.push(room)
        }
      }
      this.roomOption = roomList
    },
    getAllRoom() {
      fetchAllRoom()
        .then(response => {
          this.roomData = response.data
          this.roomData.sort((a, b) => { return a.name.localeCompare(b.name) })
          let buildingList = []
          for (let o of this.roomData) {
            let building = []
            if (o.pid == null) {
              building['id'] = o.id
              building['label'] = building['value'] = o.name
              buildingList.push(building)
            }
          }
          this.buildingOption = buildingList
          // this.buildingChange(this.checkedBuilding)
          // this.ruleForm.roomNum = ''
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  text-align: center;
  .box-card {
    width: 850px;
    // max-width: 100%;
    margin: 20px auto;
    .header {
      text-align: left;
      i {
        font-size: 15px;
        color: #999999;
      }
      .el-button {
        span {
          a {
            color: #409eff;
          }
        }
      }
    }
    .all-checked-box {
      width: 100%;
      text-align: left;
    }
    .el-checkbox-group {
      text-align: left;
    }
    .button-item {
      /deep/ .el-form-item__content {
        margin: 0 !important;
      }
    }
  }
}
</style>
