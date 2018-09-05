<template>
    <div>
         <span style="font-size: 16px;font-family: serif;font-style: italic;color:#1f2d3d;">© 2018 All rights reserved | 皖ICP备18014983号</span>
        <div class="ms-doc">
            <h3>
                <div class="el-form-item">
                  <el-col :span="2">
                    <p>用户活跃度：</p>
                  </el-col>
                  <el-col :span="4">
                      <div class="demo-color-box bg-success">当前在线<div class="value">{{actives.CURRENT}}</div></div>
                  </el-col>
                  <el-col :span="4">
                      <div class="demo-color-box bg-warning">近三月UV<div class="value">{{actives.LATEST_THREE_MONTH}}</div></div>
                  </el-col>
                  <el-col :span="4">
                      <div class="demo-color-box bg-danger">近一年UV<div class="value">{{actives.LATEST_YEAR}}</div></div>
                  </el-col>
                  <el-col :span="4">
                      <div class="demo-color-box bg-info">累计UV<div class="value">{{actives.ADD_UP}}</div></div>
                  </el-col>
                  <el-col :span="4">
                      <div class="demo-color-box bg-blue">累计PV<div class="value">{{actives.ADD_UP_PV}}</div></div>
                  </el-col>
              </div>
            </h3>
            <h3>
          
            <div class="el-form-item">
               <el-col :span="2">
                   <p>接口调用：</p>
               </el-col>
                <el-col :span="10">
                    <!--  岂止日期 -->
                    <el-date-picker type="date" placeholder="开始日期" v-model="startDate" format="yyyy-MM-dd"></el-date-picker>
                    <el-date-picker type="date" placeholder="截至日期" v-model="endDate" format="yyyy-MM-dd"></el-date-picker>
                     <el-button type="info" @click="getFuncsStartend" >统计</el-button>
                </el-col>
                <el-col :span="10">
                    <!-- 日期选择 -->
                    <el-tabs  v-model="activeName" @tab-click="getFuncsDateType">
                        <el-tab-pane label="今天" name="TODAY"></el-tab-pane>
                        <el-tab-pane label="近一周" name="LATEST_WEEK"></el-tab-pane>
                        <el-tab-pane label="近一月" name="LATEST_MONTH"></el-tab-pane>
                        <el-tab-pane label="近三月" name="LATEST_THREE_MONTH"></el-tab-pane>
                        <el-tab-pane label="近一年" name="LATEST_YEAR"></el-tab-pane>
                        <el-tab-pane label="累计" name="ADD_UP"></el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>
            </h3>
            <h4>
                <div class="el-form-item">
                    <el-col :span="12">
                        <div class="echarts">
                            <IEcharts :option="bar" :loading="loading"></IEcharts>
                        </div>
                    </el-col>
                </div>
            </h4>
        </div>

    </div>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/full.js";
import dateUtils from "../utils/dateUtils";
export default {
  components: {
    IEcharts
  },
  data: function() {
    return {
      actives: {
        ADD_UP: 129,
        ADD_UP_PV: 1999,
        CURRENT: 102,
        LATEST_THREE_MONTH: 2001,
        LATEST_YEAR: 1201
      },
      funcDatas: [{ name: "", value: 0 }],
      startDate: null,
      endDate: null,
      activeName: "ADD_UP",
      loading: false,
      bar: {
        tooltip: {},
        color: ["#76a5af", "#13CE66", "#F7BA2A", "#FF4949"],
        xAxis: {
          data: ["A"]
        },
        yAxis: {},
        series: [
          {
            name: "接口访问量",
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.loadFuncData(this.activeName);
  },
  methods: {
    getFuncsStartend() {
      let paramsStr = "?";
      if (this.startDate) {
        paramsStr =
          paramsStr +
          "&startDate=" +
          dateUtils.formatDate(this.startDate, "yyyy-MM-dd");
      }
      if (this.endDate) {
        paramsStr =
          paramsStr +
          "&endDate=" +
          dateUtils.formatDate(this.endDate, "yyyy-MM-dd");
      }
    },
    getFuncsDateType(tab, event) {
      // console.log('切换日期：',tab.name)
      this.loadFuncData(tab.name);
    },
    loadFuncData(datatype) {
      //TEST-DATA
      this.funcDatas = [
        { name: "文件上传", value: 400 },
        { name: "文件提取", value: 1300 },
        { name: "手机验证码", value: 5 },
        { name: "更改密码", value: 110 },
        { name: "标记已读", value: 127 },
        { name: "设定密码", value: 2 },
        { name: "邮箱校验", value: 100 },
        { name: "首页", value: 3241 }
      ];
      const _funcDatas = this.funcDatas;
      if (_funcDatas) {
        this.bar.xAxis.data = [];
        this.bar.series[0].data = [];
        for (let i in _funcDatas) {
          let temp = _funcDatas[i];
          this.bar.xAxis.data.push(temp.name);
          this.bar.series[0].data.push(temp.value);
        }
      }
    }
  }
};
</script>

<style scoped>
.echarts {
  float: left;
  width: 800px;
  height: 400px;
}
.bg-blue {
  background-color: #409eff;
}
.bg-success {
  background-color: #67c23a;
}
.bg-warning {
  background-color: #e6a23c;
}
.bg-danger {
  background-color: #f56c6c;
}
.bg-info {
  background-color: #909399;
}
.demo-color-box {
  border-radius: 50%;
  padding: 20px;
  width: 90px;
  height: 90px;
  font-size: 12px;
  text-align: center;
}

.demo-color-box .value {
  padding: 25px 10px;
  font-size: 20px;
  color: #fbfdff;
}
.ms-doc {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
}
.ms-doc h3 {
  padding: 9px 10px 10px;
  margin: 0;
  font-size: 14px;
  line-height: 17px;
  background-color: #f5f5f5;
  border: 1px solid #d8d8d8;
  border-bottom: 0;
  border-radius: 3px 3px 0 0;
}
.ms-doc h4 {
  padding: 9px 10px 10px;
  margin: 0;
  font-size: 14px;
  line-height: 17px;
  background-color: #cac1c1;
  border: 1px solid #d8d8d8;
  border-bottom: 0;
  border-radius: 3px 3px 0 0;
}
</style>