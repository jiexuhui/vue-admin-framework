<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.gid"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input placeholder="用户名" v-model="params.name"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input placeholder="ip" v-model="params.ip"></el-input>
        </el-form-item>
        <el-form-item label="UUid">
          <el-input placeholder="uuid" v-model="params.uuid"></el-input>
        </el-form-item>
        <el-form-item label="设备版本">
          <el-input placeholder="appver" v-model="params.appver"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00','23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
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
        <el-table-column prop="gid" label="用户ID" align="center">
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="viewuser(scope.row)"
            >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
            <br />
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="osver" label="系统版本" align="center"></el-table-column>
        <el-table-column prop="appver" label="设备版本" align="center"></el-table-column>
        <el-table-column prop="lineNo" label="手机设备型号" align="center"></el-table-column>
        <el-table-column prop="channel" label="渠道号" align="center"></el-table-column>
        <el-table-column prop="uuid" label="uuid" align="center"></el-table-column>
        <el-table-column prop="resversion" label="游戏版本" align="center"></el-table-column>
        <el-table-column prop="request_ip" label="IP" align="center">
          <template slot-scope="scope">
            <span>
              <a :href="'http://ip138.com/ips138.asp?ip='+scope.row.request_ip+'&action=2'">
                {{ scope.row.request_ip }}
                <svg-icon icon-class="eye" />
              </a>
            </span>
            <br />
            <span>{{scope.row.b}}</span>
          </template>
        </el-table-column>
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
          :page-size="params.pagesize"
          :page-sizes="[20,30,50,100, 200, 300, 400,1000,5000,10000]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          :current-page.sync="params.pageindex"
          style="float:right;"
        ></el-pagination>
      </el-col>
    </div>
  </div>
</template>
<script>
import { loginlogs } from "@/api/account";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      params: {
        gid: undefined,
        uuid: undefined,
        ip: undefined,
        name: "",
        time: [],
        pageindex: 1,
        pagesize: 30
      },
      listLoading: false,
      boxCardData: {},
      ipData: {},
      tableData: {
        total: 0,
        data: []
      }
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      // console.log(key);
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
    viewuserlogs(row) {
      this.$router.push({
        name: "金币变化日志",
        params: { gid: row.uid }
      });
    },
    loginlos(row) {
      this.$router.push({
        name: "登陆日志",
        params: { uid: row.uid }
      });
    },
    handlePageChange(val) {
      this.params.pageindex = val;
      this.initData();
    },
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.initData();
    },
    formatTime(time) {
      return parseTime(time);
    },
    searchData() {
      this.params.pageindex = 1;
      this.initData();
    },
    initData() {
      this.listLoading = true;
      if (this.params.time === null) {
        this.params.time = [];
      }
      loginlogs(this.params)
        .then(res => {
          this.listLoading = false;
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.boxCardData = res.data[0][0];
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    ipdize() {
      // console.log(this.tableData.data);
      var ipdata = this.tableData.data;
      // console.log(ipdata,'aaaaaaaaaa')
      var i = 0;
      let than = this;
      function ip() {
        than
          .$jsonp(
            "http://ip-api.com/json/" + ipdata[i].request_ip + "?lang=zh-CN"
          )
          .then(res => {
            if (i < ipdata.length) {
              ipdata[i]["b"] = res.country + res.regionName + res.city;
              i++;
              ip();
            }
          })
          .catch(error => {
            if (i < ipdata.length) {
              i++;
              ip();
            }
          });
        if (i == ipdata.length - 1) {
          than.tableData.data = ipdata;
        }
      }
      ip();
      console.log(than.ipData);
    }
  },
  activated() {
    this.params.gid = this.$route.params.gid;
    this.params.uuid = this.$route.params.uuid;
    this.params.ip = this.$route.params.ip;
    this.initData();
  },
  mounted() {
    this.params.gid = this.$route.params.gid;
    this.params.uuid = this.$route.params.uuid;
    this.params.ip = this.$route.params.ip;
    // this.params.ip = this.$route.params.ip2;
    this.initData();
  },
  updated() {
    this.ipdize();
  }
};
</script>
<style lang="scss" scoped>
</style>

