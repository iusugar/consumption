<!-- 树形控件展示空间位置 -->
<template>
  <div class="room-tree-container">
    <el-tree :data="roomData"
             :props="defaultProps"
             show-checkbox
             @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import {fetchAllRoom} from '@/api/room.js'

export default {
  data() {
    return {
      roomData: [{
        label: 'A1',
        children: [{
          label: 'A1-101'
        }]
      }, {
        label: 'B1',
        children: [{
          label: 'B1-202',
          children: [{
            label: '3号桌'
          }]
        }, {
          label: 'B1-302',
          children: [{
            label: '6号桌'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  activated() {
    this.getAllRoom()
  },
  methods: {
    getAllRoom() {
      var setRoomData = []
      var allRoomData;
      // var building = {}
      // var room = {}
      fetchAllRoom().then(response => {
        allRoomData = this.response.data
        console.log(response.data);
        let buildingNumList = []
        let roomNumList = []
        for (let data of response.data) {
          if (data.pid == null || data.pid === '') {
            buildingNumList.push({id: data.id, number: data.name})
          } else {
            roomNumList.push({id: data.id, number: data.name, pId: data.pid})
          }
        }
        buildingNumList = buildingNumList.sort((a, b) => { return a.number.localeCompare(b.number) })
        roomNumList = roomNumList.sort((a, b) => { return a.number.localeCompare(b.number) })
        for (let b of buildingNumList) {
          let building = {}
          let bChildren = []
          building['label'] = b.number
          for (let r of roomNumList) {
            if (b.id === r.pId) {
              let room = {}
              let rChildren = []
              room['label'] = r.number
              bChildren.push(room)
              building['children'] = bChildren
            }
          }
          setRoomData.push(building)
        }
        this.roomData = setRoomData
      })
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>

<style lang="scss" scoped>
.room-tree-container {
  padding: 20px 30px;
}
</style>
