<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabvalue" @tab-click="handleClick">
      <el-tab-pane label="总计" name="total"></el-tab-pane>
           <!-- <el-tab-pane label="玩家" name="player"></el-tab-pane> -->
      <!--      <el-tab-pane label="机器人" name="robot"></el-tab-pane>-->
      <!--      <el-tab-pane label="测试号" name="tester"></el-tab-pane>-->
      <div class="filter">
        <el-form :inline="true">
          <el-form-item label="类型">
            <el-select v-model="params.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in typeOptions"
                :key="item.cid"
                :label="item.cname"
                :value="item.cid"
              >
                <span style="float: left">{{ item.cid }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cname }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="params.time"
              type="daterange"
              start-placeholder="开始日期"
              value-format="yyyy-MM-dd"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchData"
              @keyup.enter="searchData"
            >搜索
            </el-button>
            <el-button
              class="filter-item"
              type="primary"
              :loading="downloadLoading"
              icon="el-icon-download"
              @click="handleDownload"
            >{{$t('table.export')}}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box-body">
        <el-table
          highlight-current-row
          stripe
          :data="tableData.data"
          v-loading="listLoading"
          element-loading-text="给我一点时间，我会尽快处理的"
          border
          fit
        >
          <el-table-column prop="date" label="日期" width="150" align="center"></el-table-column>
          <el-table-column prop="cname" label="类型" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.change_type}}:{{scope.row.cname}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sum_coin" label="总金额" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.sum_coin==null?0:scope.row.sum_coin}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="poscoin" label="产生金额" align="center">
          </el-table-column>
          <el-table-column prop="negcoin" label="消耗金额" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="box-footer clearfix">
        <el-col class="toolbar">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            :page-size="params.limit"
            :page-sizes="[20,50,100, 200, 300, 400,1000,5000,10000]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
            :current-page.sync="params.page"
            style="float:right;"
          ></el-pagination>
        </el-col>
      </div>
    </el-tabs>
<!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-if="dchannel==0">-->
<!--      <span>近7日金币变化</span>-->
<!--      <line-chart :chart-data="lineChartData"></line-chart>-->
<!--    </el-row>-->
  </div>
</template>
<script>
  import {dailyticketchange} from "@/api/dailydata";
  import {parseTime} from "@/utils/index";

  import PanelGroup from "./components/PanelGroup";
  import LineChart from "./components/LineChart";
  import RaddarChart from "./components/RaddarChart";
  import PieChart from "./components/PieChart";
  import BarChart from "./components/BarChart";
  import TransactionTable from "./components/TransactionTable";
  import TodoList from "./components/TodoList";
  import BoxCard from "./components/BoxCard";

  export default {
    components: {
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
        params: {
          type: undefined,
          time: [],
          page: 1,
          limit: 20,
          tabindex: 0
        },
        listLoading: false,
        tableData: {
          total: 0,
          data: []
        },
        typeOptions: [],
        downloadLoading: false,
        lineChartData: {
          title: [],
          data: {},
          date: []
        },
        tabvalue: "total",
        tabindex: 0,
        dchannel: undefined,
        linetitle: ["全局金币变化"]
      };
    },
    created() {
      var lett = this;
      document.onkeydown = function (e) {
        var key = window.event.keyCode;
        console.log(key);
        if (key == 13) {
          lett.searchData();
        }
      };
    },
    methods: {
      viewuser(row) {
        this.$router.push({name: "账号", params: {uid: row.userId}});
      },
      viewuserlogs(row) {
        this.$router.push({name: "金币变化日志", params: {gid: row.userId}});
        this.initData();
      },
      formatTime(time) {
        return parseTime(time);
      },
      handleClick(tab, event) {
        this.params.tabindex = tab.index;
        console.log(this.tabindex);
        this.initData();
        this.listLoading = true;
      },
      handlePageChange(val) {
        this.params.page = val;
        this.initData();
      },
      handleSizeChange(val) {
        this.params.limit = val;
        this.initData();
      },
      searchData() {
        this.params.page = 1;
        this.initData();
      },
      initData() {
        this.listLoading = true;
        if (this.params.time === null) {
          this.params.time = [];
        }
        dailyticketchange(this.params).then(res => {
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.dchannel = res.data[1][0].dchannel;
            this.typeOptions = res.data[2];
            this.lineChartData = res.data[3];
            this.lineChartData.title = this.linetitle;
            this.listLoading = false;
            console.log(this.lineChartData);
          }
        });
      },
      handleDownload() {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = ["日期", "类型", "总金额"];
          const filterVal = ["date", "cname", "sum_coin"];
          const data = this.formatJson(filterVal, this.tableData.data);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "每日金币数据"
          });
          this.downloadLoading = false;
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === "timestamp") {
              return parseTime(v[j]);
            } else {
              return v[j];
            }
          })
        );
      }
    },
    mounted() {
      this.params.gid = this.$route.params.gid;
      this.params.ext1 = this.$route.params.ext1;
      this.initData();
    }
  };
</script>
<style lang="scss" scoped>
</style>

