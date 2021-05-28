<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.gid"></el-input>
        </el-form-item>
        <el-form-item label="对局ID">
          <el-input placeholder="对局ID" v-model="params.tableid"></el-input>
        </el-form-item>
        <el-form-item label="变更类型">
          <el-select v-model="params.type" placeholder="请选择" clearable>
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
            .
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
        <el-table-column prop="tableid" label="桌子ID">
          <template slot-scope="scope">
            <span class="link-type" @click="viewtable(scope.row)">tableid: {{scope.row.tableid}}查看此局</span>
          </template>
        </el-table-column>
        <el-table-column prop="gamelevel" label="场次类型">
          <template slot-scope="scope">
            <span v-if="scope.row.gamelevel === 1">初级场</span>
            <span v-if="scope.row.gamelevel === 2">中级场</span>
            <span v-if="scope.row.gamelevel === 3">高级场</span>
          </template>
        </el-table-column>
        <el-table-column prop="typename" label="变更类型"></el-table-column>
        <el-table-column prop="beans" label="变更值"></el-table-column>
        <el-table-column prop="ext1" label="ext1"></el-table-column>
        <el-table-column prop="ext2" label="ext2">
          <template slot-scope="scope">
            <span v-for="(v, i) in scope.row.ext2" :key="i">
              <img :src="'../../../static/poker/Card_'+v+'.png'" alt width="40px">
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ext3" label="ext3">
          <template slot-scope="scope">
            <span v-for="(v, i) in scope.row.ext3" :key="i">
              <img :src="'../../../static/poker/Card_'+v+'.png'" alt width="40px">
            </span>
          </template>
        </el-table-column>
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
// import { beanschangelog } from "@/api/kefu";
export default {
  data() {
    return {
      params: {
        gid: undefined,
        type: undefined,
        tableid: "",
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
      sessionStorage.setItem("gid", row.gid);
      this.$router.push({ name: "profit", params: { gid: row.gid } });
    },
    viewuserlogs(row) {
      this.params.gid = row.gid;
      this.initData();
    },
    viewtable(row) {
      this.params.tableid = row.tableid;
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
      console.log("params", this.params);
      beanschangelog(this.params)
        .then(res => {
          if (res && res.data.length > 0) {
            res.data[0].forEach((item, index) => {
              item.ext2 = item.ext2.split(",");
              item.ext3 = item.ext3.split(",");
            });
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

