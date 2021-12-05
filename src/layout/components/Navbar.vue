<!-- 顶栏 -->
<template>
  <div class="bg-nav">
    <el-row >
      <el-col :span="19">
        <el-row class="search-bar"
                type="flex"
                justify="center"
                align="middle">
          <!-- <el-col :span="10"> -->
            <!-- <el-input placeholder="请输入查询内容"
                      size="mini"
                      v-model="content"
                      class="input-with-select hidden-xs-only">
              <el-select v-model="select"
                         slot="prepend"
                         :popper-append-to-body="false">
                <el-option label="插座"
                           value="1"></el-option>
                <el-option label="用户"
                           value="2"></el-option>
              </el-select>
              <el-button slot="append"
                         icon="el-icon-search"></el-button>
            </el-input> -->
          <!-- </el-col> -->
        </el-row>
      </el-col>
      <el-col :span="4">
        <div class="right-container">
          <el-row type="flex"
                  justify="end"
                  align="middle"
                  :gutter="20">
            <el-col :span="7" class="hidden-sm-and-down" >
              <badge />
            </el-col>
            <el-col :span="7" class="hidden-sm-and-down">
              <add-new  />
            </el-col>
            <el-col :span="7">
              <user-avatar />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import AddNew from './navbar-choice/AddNew'
import Badge from './navbar-choice/Badge'
import UserAvatar from './navbar-choice/UserAvatar'
export default {
  components: { Badge, UserAvatar, AddNew },
  data() {
    return {
      content: '',
      select: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-nav {
  width: 100%;
  height: 45px;
  border: none;
  .search-bar {
    height: 45px;
    margin-left: 50px;
    float: left;
    .input-with-select {
      min-width: 300px;
      max-width: 400px;
      width: 70%;
      /deep/ .el-input__inner {
        padding: 0 0 0 10px;
      }
      /deep/ .el-select {
        width: 60px;
         .el-select-dropdown {
          margin: 5px 0 0 0;
          .el-select-dropdown__item {
            height: 30px;
            font-size: 6px;
            padding: 0;
            text-align: center;
          }
        }
      }
      /deep/ .el-input-group__append {
        padding: 5px;
      }
    }
  }
  .right-container {
    float: right;
    height: 45px;
    width: 200px;
    text-align: center;
    box-sizing: border-box;
    padding: 7px 0 5px 0;
    .el-row {
      .el-col {
        line-height: 32px;
        padding: 0;
      }
    }
  }
}
</style>
