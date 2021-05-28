<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="WAR ID">
          <el-input placeholder="WAR ID" v-model="params.warid"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
        <el-table-column prop="war_id" label="warId" width="150" align="center"></el-table-column>
        <el-table-column prop="cards" label="牌(庄|1|2|3|4)" align="center">
          <template slot-scope="scope">
            <span v-for="(value, i) in scope.row.cards" :key="i">
              <span v-for="(v, i) in value.split(',')" :key="i">
                <img :src="'../../../static/poker/Card_'+v+'.png'" alt width="40px">
              </span>
              <br>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="门押注（1|2|3|4）" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.odd_1}} || {{scope.row.odd_2}} || {{scope.row.odd_3}} || {{scope.row.odd_4}}</template>
        </el-table-column>
        <el-table-column label="门胜负（1|2|3|4）" align="center">
          <template slot-scope="scope">
            {{scope.row.door_1==0?'负':'胜'}} || {{scope.row.door_2==0?'负':'胜'}}
            || {{scope.row.door_3==0?'负':'胜'}} || {{scope.row.door_4==0?'负':'胜'}}
          </template>
        </el-table-column>
        <el-table-column prop="banker" label="庄ID" align="center"></el-table-column>
        <el-table-column prop="bankerWin" label="庄盈利" align="center"></el-table-column>
        <el-table-column prop="ctime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.ctime?formatTime(scope.row.ctime): ""}}</template>
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
import { warlog } from "@/api/kefu";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      params: {
        warid: undefined,
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
      downloadLoading: false
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
      sessionStorage.setItem("gid", row.userid);
      this.$router.push({ name: "profit", params: { gid: row.userid } });
    },
    viewuserlogs(row) {
      this.$router.push({ name: "金币变化日志", params: { gid: row.userId } });
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
      warlog(this.params).then(res => {
        if (res && res.data.length > 0) {
          res.data[0].forEach((item, index) => {
            item.cards = item.cards.split("|");
          });
          console.log("cards:", res.data[0]);
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
          this.changeTypes = res.data[2];
          this.listLoading = false;
        }
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
    this.params.ext1 = this.$route.params.ext1;
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

