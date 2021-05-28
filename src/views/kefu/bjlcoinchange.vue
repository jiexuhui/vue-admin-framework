<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.gid"></el-input>
        </el-form-item>
        <el-form-item label="变更类型">
          <el-select v-model="params.type" placeholder="请选择">
            <el-option
              v-for="item in changeTypes"
              :key="item.cid"
              :label="item.c_name"
              :value="item.cid"
            >
              <span style="float: left">{{ item.cid }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.c_name }}</span>
            </el-option>
          </el-select>
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
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uid" label="用户ID" width="300">
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="viewuser(scope.row)"
            >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
            ||
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="change_coin" label="变更值"></el-table-column>
        <el-table-column prop="game_no" label="场次ID">
          <template slot-scope="scope">
            <span class="link-type" @click="viewtable(scope.row)">场次ID:{{scope.row.game_no}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prop_id" label="道具ID"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
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
import { bjlcoinchange } from "@/api/kefu";
export default {
  data() {
    return {
      params: {
        gid: undefined,
        gameno: undefined,
        time: [],
        page: 1,
        limit: 30
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      changeTypes: undefined
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
      sessionStorage.setItem("gid", row.uid);
      this.$router.push({ name: "profit", params: { gid: row.uid } });
    },
    viewuserlogs(row) {
      this.params.gid = row.uid;
      this.initData();
    },
    viewtable(row) {
      this.$router.push({ name: "百家乐", params: { bjlid: row.game_no } });
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
      bjlcoinchange(this.params)
        .then(res => {
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.changeTypes = res.data[2];
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    }
  },
  mounted() {
    // this.params = this.$route.params;
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

