<template>
  <div class="dashboard-editor-container">
    <!--     <github-corner></github-corner>-->

    <panel-group :boxdata="boxdata" :recharge="recharge" :tableData="tableData"></panel-group>

    <!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
    <!--      <line-chart :chart-data="lineChartData" :date="date" ></line-chart>-->
    <!--    </el-row>-->

    <!--    <el-row :gutter="32">-->
    <!-- <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
        <raddar-chart></raddar-chart>
      </div>
    </el-col> -->
    <!-- <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
         渠道注册汇总
        <pie-chart :piedata="piedata1"></pie-chart>
      </div>
    </el-col> -->
    <!--      <el-col :xs="24" :sm="24" :lg="8">-->
    <!--        <div class="chart-wrapper">-->
    <!--           渠道充值汇总-->
    <!--          <pie-chart :piedata="piedata2"></pie-chart>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="24" :sm="24" :lg="8">-->
    <!--        <div class="chart-wrapper">-->
    <!--           充值金额分布(元)-->
    <!--          <pie-chart :piedata="price"></pie-chart>-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!-- <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
        <bar-chart></bar-chart>
      </div>
    </el-col> -->
    <!--    </el-row>-->

    <!--    <el-row :gutter="8">-->
    <!-- <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}" style="padding-right:8px;margin-bottom:30px;">
      <transaction-table :tdsummary="tdsummary"></transaction-table>
    </el-col> -->
    <!-- <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
         金币分布
        <pie-chart :piedata="coin"></pie-chart>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="8">
      <div class="chart-wrapper">
         VIP分布
        <pie-chart :piedata="vip"></pie-chart>
      </div>
    </el-col> -->
    <!-- <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}" style="margin-bottom:30px;">
      <todo-list></todo-list>
    </el-col>
    <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}" style="margin-bottom:30px;" >
      <box-card></box-card>
    </el-col> -->
    <!--    </el-row>-->

  </div>
</template>

<script>
  import GithubCorner from "@/components/GithubCorner";
  import PanelGroup from "./components/PanelGroup";
  import LineChart from "./components/LineChart";
  import RaddarChart from "./components/RaddarChart";
  import PieChart from "./components/PieChart";
  import BarChart from "./components/BarChart";
  import TransactionTable from "./components/TransactionTable";
  import TodoList from "./components/TodoList";
  import BoxCard from "./components/BoxCard";

  import { datatdsummary } from "@/api/dailydata";

  // const lineChartData = {
  //   totalreg: [100, 120, 161, 134, 105, 160, 165],
  //   activenum: [120, 82, 91, 154, 162, 140, 145],
  //   pnum: [120, 82, 91, 154, 162, 140, 145],

  // };

  export default {
    name: "dashboard-admin",
    props:['boxdata','recharge','tableData'],
    components: {
      GithubCorner,
      PanelGroup,
      LineChart,
      RaddarChart,
      PieChart,
      BarChart,
      TransactionTable,
      TodoList,
      BoxCard
    },
    data() {
      return {
        lineChartData: {},
        date: [],
        piedata1: [],
        piedata2: [],
        // boxdata: {},
        // recharge: {},
        tdsummary: [],
        price: [],
        coin: [],
        vip: [],
        timer:null,
        // tableData:[]
      };
    },
    created() {
      this.handleSetLineChartData();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      text-align: center;
      color: rgb(179, 150, 23);
      font-size: 15px;
    }
  }
</style>
