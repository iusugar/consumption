<!-- 底部的控制设备开关面板 -->
<template>
  <div class="equipment-container">
    <el-row :gutter="20">
      <el-col :xs="8"
              :sm="6"
              :md="4"
              :lg="3"
              v-for="(item, index) in equipments"
              :key="index">
        <div class="equipment"
             ref="equipment"
             @click="getClick">
          <div class="state">
            <span>{{item.state}}</span>
            <el-switch v-model="item.value"
                       :name="item.name"
                       :width=40
                       active-color="#2baa5d"
                       inactive-color="#e55d5d"
                       @change="getChange($event,index)"
                       v-loading="loading"
                       element-loading-spinner="el-icon-loading">
            </el-switch>
          </div>
          <div class="name">
            {{item.name}}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipments: [
        { name: '打印机', state: 'on', value: true }, { name: '电脑', state: 'off', value: false }, { name: '投影仪', state: 'on', value: true },
        { name: '空调', state: 'off', value: false }, { name: '显示器', state: 'off', value: false }
      ],
      loading: false
    }
  },
  mounted() {
    this.setState()
  },
  methods: {
    setState() {
      for (let i = 0; i < this.equipments.length; i++) {
        if (this.equipments[i].state === 'on') {
          this.$refs.equipment[i].classList.add('is-on')
        }
      }
    },
    getChange(event, index) {
      let state = 'off'
      if (event) {
        state = 'on'
        this.$refs.equipment[index].classList.add('is-on')
      } else {
        this.$refs.equipment[index].classList.remove('is-on')
      }
      this.equipments[index].state = state
      console.log('index:' + index);
      console.log('event:' + event);
    },
    getClick() {
      console.log('点击事件');
    }
  }
}
</script>

<style lang="scss" scoped>
.equipment-container {
  padding: 10px 20px 10px 20px;
  margin: 0 50px 0 80px;
  background-color: #ffffff99;
  border-radius: 10px;
  box-shadow: 0 2px 5px #00000015;
  .equipment {
    height: 50px;
    // padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 30px;
    background-color: #a2acb0;
    box-shadow: 0 2px 5px #00000025;
    transition: background-color 0.4s ease-in-out;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
    .state {
      span {
        color: #cacaca;
      }
    }
    .name {
      color: #cacaca;
      font-size: 12px;
      line-height: 30px;
    }
  }
  .is-on {
    background-color: #6b61ee;
    .state {
      span {
        color: #ffffff;
      }
    }
    .name {
      color: #ffffff;
    }
  }
}
</style>
