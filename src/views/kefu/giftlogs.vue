<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="赠送人ID">
          <el-input placeholder="赠送人ID" v-model="params.gid"></el-input>
        </el-form-item>
        <el-form-item label="接收人ID">
          <el-input placeholder="接收人ID" v-model="params.to_uid"></el-input>
        </el-form-item>
        <el-form-item label="礼物">
          <el-select v-model="params.giftid" placeholder="请选择" clearable>
            <el-option
              v-for="item in giftTypes"
              :key="item.id"
              :label="item.prop_name"
              :value="item.id"
            >
              <span style="float: left">{{ item.id }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.prop_name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="datetimerange"
            :default-time="['00:00:00','23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
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
        :data="psData"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border
        fit
      >
        <el-table-column label="UID" align="center" prop="gid"></el-table-column>
        <el-table-column label="礼物" align="center">
          <template slot-scope="scope">{{scope.row.giftid}}:{{scope.row.giftname}}</template>
        </el-table-column>
        <el-table-column label="送出人数" align="center" prop="sendnums"></el-table-column>
        <el-table-column label="送出价值" align="center" prop="sendcoin"></el-table-column>
        <el-table-column label="获赠人数" align="center" prop="getnums"></el-table-column>
        <el-table-column label="获赠价值" align="center" prop="getcoin"></el-table-column>
      </el-table>
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
        <el-table-column label="序号" width="150" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="uid" label="赠送人" width="300" align="center">
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="viewuser(scope.row)"
            >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
            <br />
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="to_uid" label="接收人" width="300" align="center">
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="viewuser1(scope.row)"
            >gid:{{scope.row.touid}},name:{{scope.row.name2}}</span>
            <br />
            <span class="link-type" @click="viewuserlogs1(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column label="礼物" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.giftname}} * {{scope.row.num}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="coin" label="花费金币" align="center"></el-table-column>
        <el-table-column prop="ctime" label="时间" align="center">
          <template slot-scope="scope">
            <span>{{(scope.row.ctime)}}</span>
          </template>
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
  </div>
</template>
<script>
import { giftlogs } from "@/api/kefu";
import { parseTime } from "@/utils/index";
import { browser, quickDate, currentUser } from "@/utils/tools";

export default {
  data() {
    return {
      params: {
        gid: 0,
        to_uid: undefined,
        giftid: undefined,
        time: [],
        page: 1,
        limit: 20
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      giftTypes: undefined,
      downloadLoading: false,
      pickerOptions: quickDate,
      psData: []
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
      sessionStorage.setItem("uid", row.uid);
      this.$router.push({ name: "profit", params: { uid: row.uid } });
    },
    viewuser1(row) {
      sessionStorage.setItem("uid", row.touid);
      this.$router.push({ name: "profit", params: { uid: row.touid } });
    },
    viewuserlogs(row) {
      this.$router.push({ name: "金币变化日志", params: { gid: row.uid } });
      this.initData();
    },
    viewuserlogs1(row) {
      this.$router.push({ name: "金币变化日志", params: { gid: row.touid } });
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
      giftlogs(this.params).then(res => {
        if (res && res.data.length > 0) {
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
          this.giftTypes = res.data[2];
          this.psData = res.data[3];
          this.listLoading = false;
        }
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["赠送人", "接收人", "礼物", "花费金币", "时间"];
        const filterVal = ["name", "name2", "giftname", "coin", "ctime"];
        const data = this.formatJson(filterVal, this.tableData.data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "送礼日志"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "ctime") {
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
    this.params.to_uid = this.$route.params.to_uid;
    this.params.ext1 = this.$route.params.ext1;
    this.initData();
  },
};
</script>
<style lang="scss" scoped>
</style>

