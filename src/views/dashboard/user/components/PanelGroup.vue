<!-- 卡片数据组件 -->
<template>
  <div class="panel-container">
    <el-row class="panel-group"
            type="flex"
            justify="space-around">
      <el-col :span="5"
              class="panel-col">
        <div class="monthly panel-card">
          <el-container>
            <el-header>
              <div class="tag">
                <el-tag><i class="el-icon-s-grid"></i>本月已用电量</el-tag>
              </div>
            </el-header>
            <el-main>
              <div class="monthly-bar ">
                <monthly-bar-chart />
              </div>
            </el-main>
          </el-container>
        </div>
      </el-col>

      <el-col :span="5"
              class="panel-col">
        <div class="daily panel-card">
          <el-container>
            <el-header>
              <div class="tag">
                <el-tag type="success"><i class="el-icon-s-grid"></i>今日已用电量</el-tag>
              </div>
            </el-header>
            <el-main>
              <div class="daily-bar">
                <daily-bar-chart />
              </div>
            </el-main>
          </el-container>
        </div>
      </el-col>

      <el-col :span="5"
              class="panel-col">
        <div class="weekly panel-card">
          <el-container>
            <el-header>
              <div class="tag">
                <el-tag type="warning"><i class="el-icon-s-data"></i>一周用电最多</el-tag>
              </div>
            </el-header>
            <el-main>
              <div class="weekly-bar">
                <weekly-bar-chart />
              </div>
            </el-main>
          </el-container>
        </div>
      </el-col>

      <el-col :span="5"
              class="panel-col">
        <div class="recently panel-card">
          <el-container>
            <el-header>
              <div class="tag">
                <el-tag type="danger"><i class="el-icon-s-data"></i>一周用电统计</el-tag>
              </div>
            </el-header>
            <el-main>
              <div class="recently-bar">
                <recently-bar-chart />
              </div>
            </el-main>
          </el-container>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import DailyBarChart from './chart/DailyBarChart'
import MonthlyBarChart from './chart/MonthlyBarChart'
import RecentlyBarChart from './chart/RecentlyBarChart.vue'
import WeeklyBarChart from './chart/WeeklyBarChart'

export default {
  components: { MonthlyBarChart, DailyBarChart, WeeklyBarChart, RecentlyBarChart },

  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.panel-container {
  .panel-group {
    .panel-col {
      & > div {
        height: 120px;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: 1px 1px 15px #ddd;
        // padding: 2px;
        .el-container {
          .el-header {
            width: 100% !important;
            height: 40px !important;
            overflow: hidden;
            padding: 0;
            .tag {
              // height: 40%;
              line-height: 40px;
              text-align: left;
            }
          }
          .el-main {
            width: 100%;
            height: 80px !important;
            padding: 0;
            overflow: hidden;
          }
        }
        &.monthly {
          .monthly-bar {
            height: 100%;
          }
        }
        &.daily {
          .daily-bar {
            height: 100%;
          }
        }
        &.weekly {
          .weekly-bar {
            height: 100%;
          }
        }
        &.recently {
        }
      }
    }
  }
}
</style>
