<!-- 插座管理 -->
<template>
  <div class="app-container">
    <el-card class="box-card"
             shadow="hover">
      <div slot="header"
           class="clearfix header">
        <i class="el-icon-edit">添加新的插座</i>
        <el-button style="float: right; padding: 3px 0"
                   type="text">查看所有插座</el-button>
      </div>
      <div class="form-wrapper">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px">
          <el-row type="flex">
            <el-col :span="11">
              <el-form-item label="插座型号"
                            prop="type">
                <el-input placeholder="请输入插座型号"
                          v-model="ruleForm.type"><i slot="prefix"
                     class="iconfont icon-4qichexinghao"></i></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="插座用途"
                            prop="used">
                <el-input placeholder="请输入用途"
                          v-model="ruleForm.used"><i slot="prefix"
                     class="iconfont icon-xuqiu-hui"></i></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="11">
              <el-form-item label="所在楼号"
                            prop="buildingNumber">
                <el-select v-model="ruleForm.buildingNumber"
                           placeholder="请选择楼号">
                  <el-option v-for="(option, index) in buildingOption"
                             :key="index"
                             :label="option.label"
                             :value="option.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="门牌号码"
                            prop="roomNumber">
                <el-select v-model="ruleForm.roomNumber"
                           placeholder="请选择门牌号">
                  <el-option v-for="(option, index) in roomOption"
                             :key="index"
                             :label="option.label"
                             :value="option.value"></el-option>

                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="8">
              <el-form-item label="额定电压"
                            prop="voltage">
                <el-input placeholder="请输入电压"
                          :value="220"
                          v-model="ruleForm.voltage"><i slot="prefix"
                     class="iconfont icon-dianya"></i></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="额定电流"
                            prop="electricCurrent">
                <el-input placeholder="请输入电流"
                          v-model="ruleForm.electricCurrent"><i slot="prefix"
                     class="iconfont icon-dianliu"></i></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最大功率"
                            prop="power">
                <el-input placeholder="请输入功率"
                          v-model="ruleForm.power"><i slot="prefix"
                     class="iconfont icon-gongshuai"></i></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-form-item label="具备功能"
                          prop="checkedFunctions">
              <el-checkbox :indeterminate="ruleForm.isIndeterminate"
                           v-model="ruleForm.checkAll"
                           @change="handleCheckAllChange" class="all-checked-box">全选</el-checkbox>

              <el-checkbox-group v-model="ruleForm.checkedFunctions"
                                 @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in ruleForm.socketFunctions"
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
export default {
  data() {
    return {
      ruleForm: {
        type: '',
        used: '',
        buildingNumber: '',
        roomNumber: '',
        voltage: '220',
        electricCurrent: '',
        power: '',
        socketFunctions: ['监测电流', '监测电压', '监测功率', '远程控制', '记录电量', '红外功能'],
        checkAll: false,
        checkedFunctions: ['监测功率', '记录电量'],
        isIndeterminate: true
      },
      rules: {
        // type: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      },
      buildingOption: [{
        'label': 'A1', 'value': 'A1'
      }, {
        'label': 'A2', 'value': 'A2'
      }, {
        'label': 'A3', 'value': 'A4'
      }],
      roomOption: [{
        'label': '101', 'value': '101'
      }, {
        'label': '102', 'value': '102'
      }, {
        'label': '103', 'value': '103'
      }, {
        'label': '104', 'value': '104'
      }, {
        'label': '105', 'value': '105'
      }]
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.ruleForm.checkedFunctions = val ? this.ruleForm.socketFunctions : [];
      this.ruleForm.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.ruleForm.checkAll = checkedCount === this.ruleForm.socketFunctions.length;
      this.ruleForm.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleForm.socketFunctions.length;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .box-card {
    width: 700px;
    // max-width: 100%;
    margin: 20px auto;
    .header {
      text-align: left;
      i {
        font-size: 15px;
        color: #999999;
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
