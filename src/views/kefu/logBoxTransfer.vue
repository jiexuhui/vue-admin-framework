<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.gid"></el-input>
        </el-form-item>
        <el-form-item label="接收人ID">
          <el-input placeholder="接收人ID" v-model="params.togid"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-table-column prop="gid" label="用户ID" width="300" align="center">
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="viewuser(scope.row)"
            >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
            <br>
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="otheruid" label="接收人ID" align="center">
          <template slot-scope="scope">
            <span>gid:{{scope.row.otheruid}},name:{{scope.row.othername}}</span>
            <br>
          </template>
        </el-table-column>
        <el-table-column prop="change_coin" label="变更值" align="center"></el-table-column>
        <el-table-column prop="mybefore" label="我的变更前" align="center"></el-table-column>
        <el-table-column prop="otherbefore" label="对方变更前" align="center"></el-table-column>
        <el-table-column prop="resbox" label="我的银行余额" align="center"></el-table-column>
        <el-table-column prop="otherbox" label="对方银行余额" align="center"></el-table-column>

        <el-table-column prop="show" label="我是否展示" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.show == 1?'展示':'不展示'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="othershow" label="对方是否展示" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.othershow == 1?'展示':'不展示'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="时间" align="center"></el-table-column>
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
          :current-page.sync="params.page"
          style="float:right;"
        ></el-pagination>
      </el-col>
    </div>
  </div>
</template>
<script>
import { logBoxTransfer } from "@/api/kefu";
export default {
  data() {
    return {
      params: {
        gid: undefined,
        type: undefined,
        time: [],
        playertype: undefined,
        page: 1,
        limit: 30,
        ext1: ""
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      changeTypes: undefined,
      downloadLoading: false,
      typeoptions: [
        {
          label: "正常账号",
          value: 0
        },
        {
          label: "陪玩账号",
          value: 1
        }
      ]
    };
  },
  methods: {
    viewtable(row) {
      this.$router.push({
        name: "三张牌详细金币",
        params: { tableid: row.ext2 }
      });
      this.initData();
    },
    viewuser(row) {
      sessionStorage.setItem("gid", row.uid);
      this.$router.push({ name: "profit", params: { gid: row.uid } });
    },
    viewuserlogs(row) {
      this.params.gid = row.uid;
      this.initData();
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
      logBoxTransfer(this.params)
        .then(res => {
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "用户ID",
          "变更类型",
          "变更值",
          "变更前",
          "变更后",
          "ext1",
          "ext2",
          "ext3",
          "时间"
        ];
        const filterVal = [
          "uid",
          "typename",
          "changeCoin",
          "changeBefore",
          "changeAfter",
          "ext1",
          "ext2",
          "ext3",
          "ctime"
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
    }
  },
  mounted() {
    this.params.gid = this.$route.params.gid;
    this.params.type = this.$route.params.type;
    this.params.ext1 = this.$route.params.ext1;
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

