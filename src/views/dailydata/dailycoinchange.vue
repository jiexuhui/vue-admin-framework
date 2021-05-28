<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="类型">
          <el-select v-model="params.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeOptions"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid"
            >
              <span style="float: left">{{item.cid}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cname }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="daterange"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchData"
            @keyup.enter="searchData"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-body">
      <el-table
        highlight-current-row
        stripe
        :data="tableData.data"
        v-loading="listLoading"
        element-loading-text="给我一点时间，我会尽快处理的"
        border
        fit
      >
        <el-table-column prop="date" label="日期" width="150" align="center"></el-table-column>
        <el-table-column prop="cname" label="类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.change_type}}:{{scope.row.cname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sum_coin" label="总金额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sum_coin==null?0:scope.row.sum_coin}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="poscoin" label="产生金额" align="center"></el-table-column>
        <el-table-column prop="negcoin" label="消耗金额" align="center"></el-table-column>
        <el-table-column label="下注金币 / 下注人数 / 压注次数 / 人均下注次数 / 人均金币" align="center" width="350">
          <template slot-scope="scope">
            <span>{{scope.row.negcoin}}&nbsp;/&nbsp;{{scope.row.betUserNum}} /&nbsp;{{scope.row.betTime}} /&nbsp;{{scope.row.avgBetTime==null?0:scope.row.avgBetTime}} /&nbsp;{{scope.row.avgBetCoin==null?0:scope.row.avgBetCoin}}</span>
          </template>
        </el-table-column>
        <el-table-column label="返奖金币 / 返奖人数 / 返奖次数 / 人均返奖次数 / 人均金币" align="center" width="350">
          <template slot-scope="scope">
            <span>{{scope.row.poscoin}}&nbsp;/&nbsp;{{scope.row.posUserNum}} /&nbsp;{{scope.row.posTime}} /&nbsp;{{scope.row.avgPosTime}} /&nbsp;{{scope.row.avgPosCoin}}</span>
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
          :page-sizes="[20,30,50,100, 200, 300, 400,1000,5000,10000]"
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
import { dailycoinchange } from "@/api/dailydata";

export default {
  data() {
    return {
      params: {
        type: undefined,
        time: [],
        page: 1,
        limit: 20,
        tabindex: 0
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      typeOptions: [],
      downloadLoading: false,
      lineChartData: {
        title: [],
        data: {},
        date: []
      },
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
      dailycoinchange(this.params).then(res => {
        if (res && res.data.length > 0) {
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
          this.dchannel = res.data[1][0].dchannel;
          this.typeOptions = res.data[2];
          this.listLoading = false;
        }
      });
    },
  
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

