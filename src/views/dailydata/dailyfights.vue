<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
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
        <el-table-column prop="quickMatch1Num" label="即开赛1局数" align="center"></el-table-column>
        <el-table-column prop="quickMatch1NumUser" label="即开赛1人局" align="center"></el-table-column>
        <el-table-column prop="quickMatch1NumRobot" label="即开赛1机器人局数" align="center"></el-table-column>
        <el-table-column prop="quickMatch2Num" label="即开赛2局数" align="center"></el-table-column>
        <el-table-column prop="quickMatch2NumUser" label="即开赛2人局" align="center"></el-table-column>
        <el-table-column prop="quickMatch2NumRobot" label="即开赛2机器人局数" align="center"></el-table-column>
        <el-table-column prop="warNumUser" label="王座人局" align="center"></el-table-column>
        <el-table-column prop="warNumRobot" label="机器人局数" align="center"></el-table-column>
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
  </div>
</template>
<script>
import { dailyfights } from "@/api/dailydata";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      params: {
        time: [],
        page: 1,
        limit: 20
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      changeTypes: undefined,
      downloadLoading: false
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
      dailyfights(this.params).then(res => {
        if (res && res.data.length > 0) {
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
          this.listLoading = false;
        }
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "日期",
          "ID",
          "即开赛1局数",
          "即开赛1人局",
          "即开赛1机器人局数",
          "即开赛2局数",
          "即开赛2人局",
          "即开赛2机器人局数",
          "王座开启局数",
          "王座人局",
          "王座机器人"
        ];
        const filterVal = [
          "date",
          "id",
          "quickMatch1Num",
          "quickMatch1NumUser",
          "quickMatch1NumRobot",
          "quickMatch2Num",
          "quickMatch2NumUser",
          "quickMatch2NumRobot",
          "warNum",
          "warNumUser",
          "warNumRobot"
        ];
        const data = this.formatJson(filterVal, this.tableData.data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "coinchange"
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
    },
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

