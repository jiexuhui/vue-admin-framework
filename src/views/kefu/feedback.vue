<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.gid"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.ctime"
            type="daterange"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
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
        <el-table-column label="序号">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="gid" label="用户ID" width="300">
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="viewuser(scope.row)"
            >gid:{{scope.row.gid}},name:{{scope.row.playername}}</span>
            ||
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="ctime" label="时间"></el-table-column>
      </el-table>
    </div>
    <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :page-size="params.limit"
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
// import { feedback } from "@/api/kefu";
export default {
  data() {
    return {
      params: {
        gid: undefined,
        time: [],
        page: 1,
        limit: 30
      },
      listLoading: false,
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
      console.log(key);
      if (key == 13) {
        lett.searchData();
      }
    };
  },
  methods: {
    viewuser(row) {
      sessionStorage.setItem("gid", row.gid);
      this.$router.push({ name: "profit", params: { gid: row.gid } });
    },
    viewuserlogs(row) {
      this.params.gid = row.gid;
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
      feedback(this.params)
        .then(res => {
          this.listLoading = false;
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

