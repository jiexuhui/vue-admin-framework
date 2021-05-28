<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="ID">
          <el-input placeholder="ID" v-model="params.redid"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-table-column prop="red_id" label="ID" align="center"></el-table-column>
        <el-table-column prop="card1" label="card1" align="center">
          <template slot-scope="scope">
            <span>
              <img :src="'../../../static/poker/Card_'+scope.row.card1+'.png'" alt width="40px">
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="card2" label="card2" align="center">
          <template slot-scope="scope">
            <span>
              <img :src="'../../../static/poker/Card_'+scope.row.card2+'.png'" alt width="40px">
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="dealerWin" label="庄赢" align="center"></el-table-column>
        <el-table-column prop="systemWin" label="系统赢" align="center"></el-table-column>
        <el-table-column label="门押注（1|2|3|4|5|6|7|8|9|10|11）" align="center" min-width="150">
          <template slot-scope="scope">
            {{scope.row.doorbet1}} || {{scope.row.doorbet2}} || {{scope.row.doorbet3}}
            || {{scope.row.doorbet4}} || {{scope.row.doorbet5}} || {{scope.row.doorbet6}}
            || {{scope.row.doorbet7}} || {{scope.row.doorbet8}} || {{scope.row.doorbet9}}
            || {{scope.row.doorbet10}} || {{scope.row.doorbet11}}
          </template>
        </el-table-column>
        <el-table-column label="门赢（1|2|3|4|5|6|7|8|9||10|11）" align="center" min-width="150">
          <template slot-scope="scope">
            {{scope.row.doorwin1}} || {{scope.row.doorwin2}} || {{scope.row.doorwin3}}
            || {{scope.row.doorwin4}} || {{scope.row.doorwin5}} || {{scope.row.doorwin6}}
            || {{scope.row.doorwin7}} || {{scope.row.doorwin8}} || {{scope.row.doorwin9}}
            || {{scope.row.doorwin10}} || {{scope.row.doorwin11}}
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
import { redwar } from "@/api/kefu";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      params: {
        redid: undefined,
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
      sessionStorage.setItem("gid", row.userId);
      this.$router.push({ name: "profit", params: { gid: row.userId } });
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
      redwar(this.params).then(res => {
        if (res && res.data.length > 0) {
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
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

