<!--  -->
<template>
  <div class="transfer-container">
    <el-transfer filterable
                 :filter-method="filterMethod"
                 filter-placeholder="请输入房间号"
                 :button-texts="['撤销', '添加']"
                 :titles="['待选', '已选择']"
                 v-model="value"
                 :data="data">
    </el-transfer>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = [];
      const rooms = ['101', '102', '103', '104', '105', '201', '202'];
      const number = rooms;
      rooms.forEach((room, index) => {
        data.push({
          label: room,
          key: index,
          number: number[index]
        });
      });
      return data;
    };
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.number.indexOf(query) > -1;
      }
    };
  }
};
</script>

<style scoped>
</style>
