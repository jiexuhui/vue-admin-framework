<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="渠道" v-if="dchannel==0">
          <el-select v-model="params.channel" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
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
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
          <el-button
            class="filter-item"
            type="primary"
            :loading="downloadLoading"
            icon="el-icon-download"
            @click="handleDownload"
          >{{$t('table.export')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-body">
      <el-table
        highlight-current-row
        stripe
        :data="tableData.data"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border
        fit
      >
        <el-table-column prop="date" label="日期" width="150" align="center"></el-table-column>
        <el-table-column prop="cname" label="渠道" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.channel}}:{{scope.row.cname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalreg" label="注册人数" align="center"></el-table-column>
        <el-table-column prop="loginp" label="登录人数" align="center"></el-table-column>
        <el-table-column prop="loginnum" label="登录人次" align="center"></el-table-column>
        <el-table-column prop="activenum" label="活跃人数" align="center"></el-table-column>
        <el-table-column prop="regactive" label="注册活跃用户" align="center"></el-table-column>
        <el-table-column prop="allreg" label="不限IME注册人数" align="center"></el-table-column>
        <el-table-column prop="allregactive" label="不限IME注册活跃" align="center"></el-table-column>
        <el-table-column prop="totalfee" label="总金额" align="center"></el-table-column>
        <el-table-column prop="pnum" label="充值人数" align="center"></el-table-column>
        <el-table-column prop="new_recharge" label="首次充值人数" align="center"></el-table-column>
        <el-table-column prop="s_num2" label="次日留存" align="center"></el-table-column>
        <el-table-column prop="s_num3" label="3日信服" align="center"></el-table-column>
        <el-table-column prop="s_num7" label="7日留存" align="center"></el-table-column>
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
    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-if="dchannel==0">
      <span >近7日变化</span>
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>-->
  </div>
</template>
<script>
import { datachannelinfo } from "@/api/dailydata";
import { parseTime } from "@/utils/index";

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
        channel: undefined,
        source: "",
        time: [],
        page: 1,
        limit: 20
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      channelOptions: [],
      sourceOptions: [],
      downloadLoading: false,
      lineChartData: {
        title: [],
        data: {},
        date: []
      },
      dchannel: undefined,
      linetitle: ["注册活跃", "次日留存", "3日留存", "7日留存"]
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      console.log(key);
      if (key == 13) {
        lett.searchData();
      }
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      console.log(key);
      if (key == 13) {
        lett.searchData();
      }
    };
  },
  methods: {
    viewuser(row) {
      this.$router.push({ name: "账号", params: { uid: row.userId } });
    },
    viewuserlogs(row) {
      this.$router.push({ name: "金币变化日志", params: { gid: row.userId } });
      this.initData();
    },
    formatTime(time) {
      return parseTime(time);
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
      datachannelinfo(this.params).then(res => {
        if (res && res.data.length > 0) {
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
          this.dchannel = res.data[1][0].dchannel;
          this.channelOptions = res.data[2];
          this.listLoading = false;
        }
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "日期",
          "渠道",
          "注册人数",
          "登录人数",
          "登录人次",
          "活跃人数",
          "注册活跃用户",
          "不限IME注册人数",
          "不限IME注册活跃",
          "总金额",
          "充值人数",
          "首次充值人数",
          "次日留存",
          "3日留存",
          "7日留存"
        ];
        const filterVal = [
          "date",
          "cname",
          "totalreg",
          "loginp",
          "loginnum",
          "activenum",
          "regactive",
          "allreg",
          "allregactive",
          "totalfee",
          "pnum",
          "new_recharge",
          "s_num2",
          "s_num3",
          "s_num7"
        ];
        const data = this.formatJson(filterVal, this.tableData.data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "渠道数据汇总"
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

