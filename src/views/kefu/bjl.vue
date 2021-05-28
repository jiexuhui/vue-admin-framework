<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="百家乐ID">
          <el-input placeholder="百家乐ID" v-model="params.bjlid"></el-input>
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
        <!-- <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="bjl_id" label="百家乐ID" align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="viewtable(scope.row)">百家乐ID: {{scope.row.bjl_id}}查看此局</span>
          </template>
        </el-table-column>
        <el-table-column prop="banker_id" label="庄ID" align="center"></el-table-column>
        <el-table-column prop="card0" label="庄牌型" align="center">
          <template slot-scope="scope">
            <span v-for="(v, i) in scope.row.card0" :key="i">
              <img :src="'../../../static/poker/Card_'+v+'.png'" alt width="40px">
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="card1" label="闲牌型" align="center">
          <template slot-scope="scope">
            <span v-for="(v, i) in scope.row.card1" :key="i">
              <img :src="'../../../static/poker/Card_'+v+'.png'" alt width="40px">
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="coins" label="庄（点数|对子|天王）" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.point0}}|{{scope.row.pair0 === 1 ?"是":"否"}}|{{scope.row.tianwang0 === 1?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="coins" label="闲（点数|对子|天王）" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.point1}}|{{scope.row.pair1 === 1 ?"是":"否"}}|{{scope.row.tianwang1 === 1 ?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealerWin" label="庄家赢" align="center"></el-table-column>
        <el-table-column prop="systemWin" label="系统赢" align="center"></el-table-column>
        <el-table-column label="押注(庄|闲|平|同点平|庄天王|闲天王|庄对子|闲对子)" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.doorbet1}}|{{scope.row.doorbet2}}|{{scope.row.doorbet3}}|
              {{scope.row.doorbet4}}|{{scope.row.doorbet5}}|{{scope.row.doorbet6}}|
              {{scope.row.doorbet7}}|{{scope.row.doorbet8}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="赢(庄|闲|平|同点平|庄天王|闲天王|庄对子|闲对子)" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.doorwin1}}|{{scope.row.doorwin2}}|{{scope.row.doorwin3}}|
              {{scope.row.doorwin4}}|{{scope.row.doorwin5}}|{{scope.row.doorwin6}}|
              {{scope.row.doorwin7}}|{{scope.row.doorwin8}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="时间" align="center">
          <template slot-scope="scope">
            <span>{{formatTime(scope.row.ctime)}}</span>
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
import { bjlresult } from "@/api/kefu";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      params: {
        bjlid: undefined,
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
    viewtable(row) {
      this.$router.push({
        name: "金币变化日志",
        params: { ext1: row.bjl_id, type: 131 }
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
      bjlresult(this.params)
        .then(res => {
          if (res && res.data.length > 0) {
            res.data[0].forEach((item, index) => {
              item.card0 = item.card0.split(",");
              item.card1 = item.card1.split(",");
            });
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
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
    this.params.bjlid = this.$route.params.bjlid;
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

