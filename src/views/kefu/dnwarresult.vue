<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="对局ID">
          <el-input placeholder="对局ID" v-model="params.dnwarid"></el-input>
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
        <el-table-column prop="war_id" label="对局ID" align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="viewtable(scope.row)">对局ID: {{scope.row.war_id}}查看此局</span>
          </template>
        </el-table-column>
        <el-table-column label="门（天||地||玄||黄）" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.door_1 == 0? "输":"赢"}}||{{scope.row.door_2 == 0? "输":"赢"}}
              ||{{scope.row.door_3 == 0? "输":"赢"}}||{{scope.row.door_4 == 0? "输":"赢"}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="cards" label="庄牌型" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-for="(v, i) in scope.row.cards" :key="i">
              <span v-for="(vx, ix) in v.split(',')" :key="ix">
                <img :src="'../../../static/poker/Card_'+vx+'.png'" alt width="40px">
              </span>
              <br>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="types" label="牌型（天||地||玄||黄||庄）" align="center">
          <template slot-scope="scope">
            <span
              v-for="(v, i) in scope.row.types.split(',')"
              :key="i"
            >{{types[v-1]}}{{i == 4?"":"||"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="banker" label="庄家" align="center">
          <template slot-scope="scope">
            <span>庄家：{{scope.row.banker}}；庄家盈利：{{scope.row.bankerWin}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shui" label="抽水" align="center"></el-table-column>
        <el-table-column prop="prize" label="奖池变化" align="center"></el-table-column>
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
import { dnwarresult } from "@/api/kefu";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      params: {
        dnwarid: undefined,
        time: [],
        page: 1,
        limit: 30
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      changeTypes: undefined,
      types: [
        "散牌",
        "牛1",
        "牛2",
        "牛3",
        "牛4",
        "牛5",
        "牛6",
        "牛7",
        "牛8",
        "牛9",
        "牛10",
        "4花",
        "5花",
        "炸弹",
        "<5"
      ]
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
        params: { ext1: row.war_id, type: 150 }
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
      dnwarresult(this.params).then(res => {
        if (res && res.data.length > 0) {
          res.data[0].forEach((item, index) => {
            item.cards = item.cards.split("|");
          });
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
          this.listLoading = false;
        }
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

