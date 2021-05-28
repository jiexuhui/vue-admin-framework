<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.uid"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00','23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
          <!-- <el-button
            class="filter-item"
            type="primary"
            :loading="downloadLoading"
            icon="el-icon-download"
            @click="handleDownload"
          >{{$t('table.export')}}</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="box-body">
      <el-table :data="texasList" border stripe>
        <el-table-column prop="uid" label="用户ID" align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="viewuser(scope.row)">gid:{{scope.row.uid}}</span>
            <br />
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="change_coin" label="变更值" align="center"></el-table-column>
        <el-table-column prop="change_before" label="变更前" align="center"></el-table-column>
        <el-table-column prop="change_after" label="变更后" align="center"></el-table-column>
        <el-table-column prop="ext1" label="ext1" align="center"></el-table-column>
        <el-table-column prop="ext2" label="ext2" align="center"></el-table-column>
        <el-table-column prop="ext3" label="ext3" align="center"></el-table-column>
        <el-table-column prop="ctime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.ctime?formatTime(scope.row.ctime): ""}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination
          :page-size="params.limit"
          :page-sizes="[20,50,100, 200, 300, 400,1000,5000,10000]"
          :current-page.sync="params.page"
          layout="total, sizes, prev, pager, next, jumper"
          style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </el-col>
    </div>
  </div>
</template>
<script>
import { texaschangelog } from "@/api/kefu";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      params: {
        uid: undefined,
        type: undefined,
        tableid: undefined,
        time: [],
        page: 1,
        limit: 30
      },
      listLoading: true,
      texasList: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    viewuser(row) {
      sessionStorage.setItem("uid", row.uid);
      this.$router.push({ name: "profit", params: { uid: row.uid } });
    },
    viewuserlogs(row) {
      this.$router.push({ name: "金币变化日志", params: { gid: row.uid } });
      this.initData();
    },
    searchData() {
      this.params.page = 1;
      this.initData();
    },
    initData() {
      texaschangelog(this.params)
        .then(res => {
          this.texasList = res.data[0];
          console.log(this.texasList);
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
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
    }
  }
};
</script>