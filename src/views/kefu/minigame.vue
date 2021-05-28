<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.uid"></el-input>
        </el-form-item>
        <el-form-item label="游戏ID">
          <el-input placeholder="游戏ID" v-model="params.gameId"></el-input>
        </el-form-item>
        <el-form-item label="游戏类型">
          <el-select v-model="params.gameType" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.cid"
              :label="item.c_name"
              :value="item.cid"
            >
              <span style="float: left">{{ item.cid }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.c_name }}</span>
            </el-option>
          </el-select>
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
        <el-table-column prop="uid" label="用户ID" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="gameId" label="游戏ID" align="center"></el-table-column>
        <el-table-column label="游戏类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.gameType}}：{{scope.row.c_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="betKey" label="下注类型" align="center"></el-table-column>
        <el-table-column prop="betCoin" label="下注金额" align="center"></el-table-column>
        <el-table-column prop="showKey" label="开奖类型" align="center"></el-table-column>
        <el-table-column prop="showCoin" label="返奖金额'" align="center"></el-table-column>
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
  import { minigame } from "@/api/kefu";
  import { parseTime } from "@/utils/index";
  export default {
    data() {
      return {
        params: {
          uid:undefined,
          gameId:undefined,
          gameType:undefined,
          page:1,
          limit:20
        },
        listLoading: false,
        channelOptions: [],
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
          name: '登陆日志',
          params: {uid: row.uid }})
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
        minigame(this.params)
          .then(res => {
            this.listLoading = false;
            if (res && res.data.length > 0) {
              this.tableData.data = res.data[0];
              this.tableData.total = res.data[1][0].count;
              this.channelOptions = res.data[2];
            }
          })
          .catch(err => {
            this.$message.error(`获取信息失败:${err}`);
            this.listLoading = false;
          });
      }
    },
    activated(){
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
    }
  };
</script>
<style lang="scss" scoped>
</style>

