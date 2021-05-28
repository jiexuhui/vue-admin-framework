<template>
  <div class="dashboard-editor-container">
    <!--     <github-corner></github-corner>-->
    <panel-group :boxdata="boxdata" :recharge="recharge" :tableData="tableData"></panel-group>
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
