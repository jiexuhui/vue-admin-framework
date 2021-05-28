<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.userid"></el-input>
        </el-form-item>
        <el-form-item label="订单ID">
          <el-input placeholder="订单ID" v-model="params.orderid"></el-input>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select v-model="params.channel" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid"
            >
              <span style="float: left">{{ item.cid }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cname }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="params.status" placeholder="请选择" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            :default-time="['00:00:00','23:59:59']"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="gid" label="用户ID" align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="viewuser(scope.row)">
              gid:{{scope.row.uid}}
              <br />
              name:{{scope.row.name}}
            </span>
            <br />
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderid" label="订单号" align="center"></el-table-column>
        <el-table-column prop="cname" label="渠道" align="center">
          <template slot-scope="scope">
            <span>ID：{{scope.row.channel}},名称：{{scope.row.cname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pname" label="物品" align="center"></el-table-column>
        <el-table-column prop="price" label="价格(￥)" align="center"></el-table-column>
        <el-table-column prop="transaction_time" label="交易时间" align="center">
          <template slot-scope="scope">
            流水号：{{scope.row.transaction_id}}
            <br />
            交易时间：{{scope.row.transaction_time===''?scope.row.transaction_time:scope.row.utime?formatTime(scope.row.utime): ""}}
          </template>
        </el-table-column>
        <el-table-column prop="cname" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status == 0">未支付</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 1">已支付未处理</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已支付已处理</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="point" label="钻石" align="center"></el-table-column>
        <el-table-column prop="coin" label="金币" align="center"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" v-if="showOperate">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleRecharge(scope.row)">补单</el-button>
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
          :current-page.sync="params.page"
          :total="tableData.total"
          style="float:right;"
        ></el-pagination>
      </el-col>
    </div>
  </div>
</template>
<script>
import { list, recharge } from "@/api/orders";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      params: {
        userid: undefined,
        orderid: "",
        channel: undefined,
        status: 99,
        page: 1,
        limit: 20
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      channelOptions: [],
      statusOptions: [
        {
          label: "未支付",
          value: 0
        },
        {
          label: "已支付未处理",
          value: 1
        },
        {
          label: "已支付已处理",
          value: 2
        },
        {
          label: "所有",
          value: 99
        }
      ],
      showOperate: false
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.searchData();
      }
    };
  },
  methods: {
    viewuser(row) {
      sessionStorage.setItem("uid", row.uid);
      this.$router.push({ name: "profit", params: { gid: row.uid } });
    },
    viewuserlogs(row) {
      this.$router.push({ name: "金币变化日志", params: { gid: row.uid } });
      this.initData();
    },
    handlePageChange(val) {
      this.params.pageindex = val;
      this.initData();
    },
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.initData();
    },
    searchData() {
      this.params.pageindex = 1;
      this.initData();
    },
    formatTime(time) {
      return parseTime(time);
    },
    initData() {
      this.listLoading = true;
      if (this.params.time === null) {
        this.params.time = [];
      }
      list(this.params).then(res => {
        this.listLoading = false;
        if (res && res.data.length > 0) {
          this.tableData.data = res.data[0];
          this.tableData.total = res.data[1][0].count;
          this.channelOptions = res.data[2];
          if (this.params.status == 1 || this.params.status == 99) {
            this.showOperate = true;
          } else {
            this.showOperate = false;
          }
          this.listLoading = false;
        }
      });
    },
    handleRecharge(row) {
      recharge(row).then(res => {
        row.status = 2;
        this.$message.success(`补单成功`);
      });
    }
  },
  mounted() {
    this.params.userid = this.$route.params.gid;
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

