<!-- 显示网关盒子 -->
<template>
  <div class="gateway-container">
    <el-tabs v-model="activePane"
             type="card"
             @tab-click="handlePaneClick">
      <el-tab-pane v-for="item in gatewayList"
                   :key="item.id"
                   :label="item.label"
                   :name="item.name">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="deviceId"
                           label="设备号"
                           width="280">
          </el-table-column>
          <el-table-column prop="createTime"
                           label="添加日期"
                           width="180">
          </el-table-column>
          <el-table-column prop="topic"
                           label="订阅主题">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="bottom-container">
      <el-button type="primary">添加网关</el-button>
    </div>

  </div>
</template>

<script>
import { fetchAllGateway } from '@/api/gateway.js'
import { fetchByGateway } from '@/api/device.js'

export default {
  data() {
    return {
      tableData: [],
      activePane: 'first',
      gatewayList: [],
      deviceList: []
    }
  },
  mounted() {
    this.getAllGateway()
  },
  methods: {
    getAllGateway() {
      fetchAllGateway().then(response => {
        var gatewayList = []
        for (let gateway of response.data) {
          gatewayList.push({ 'label': gateway.name, 'name': gateway.name, 'id': gateway.id })
        }
        this.gatewayList = gatewayList
        if (gatewayList.length > 0) {
          this.activePane = gatewayList[0].name
        }
        this.getGatewayDevice(this.activePane)
      })
    },
    getGatewayDevice(gateway) {
      fetchByGateway(gateway).then(response => {
        var deviceList = []
        for (let device of response.data) {
          deviceList.push({ 'deviceId': device.deviceId, 'createTime': new Date(Date.parse(device.createTime)).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-') })
        }
        this.tableData = deviceList
      })
    },
    handlePaneClick(e) {
      this.getGatewayDevice(e.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.gateway-container {
  width: 100%;
  height: 100%;
  .el-table {
    min-height: 300px;
  }
  .bottom-container {
    padding: 30px 20px;
  }
}
</style>
