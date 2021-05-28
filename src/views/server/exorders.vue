<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="params.userid" clearable=""></el-input>
        </el-form-item>
        <el-form-item label="订单ID">
          <el-input placeholder="订单ID" v-model="params.orderid" clearable=""></el-input>
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
            type="datetimerange"
            :default-time="['00:00:00','23:59:59']"
            unlink-panels
            range-separator="-"
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
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="gid" label="用户ID" width="130" align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="viewuser(scope.row)">
              gid:{{scope.row.uid}}
              <br>
              name:{{scope.row.name}}
            </span>
            <br>
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderid" label="订单号"  align="center"></el-table-column>
        <el-table-column prop="cname" label="渠道"  align="center">
          <template slot-scope="scope">
            <span>ID：{{scope.row.channel}},名称：{{scope.row.cname}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pname" label="物品" align="center"></el-table-column>
        <el-table-column prop="cname" label="状态"  align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.status == 1">已申请</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已处理</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="point" label="钻石"  align="center"></el-table-column>
        <el-table-column prop="coin" label="金币"  align="center"></el-table-column>
        <el-table-column prop="prizeTicket" label="兑换券"  align="center"></el-table-column>
        <el-table-column prop="ctime" label="创建时间"  align="center">
          <template slot-scope="scope">{{scope.row.ctime?formatTime(scope.row.ctime): ""}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-if="showOperate">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleRecharge(scope.row)">
              <span v-if="scope.row.status == 2">撤回</span>
              <span v-if="scope.row.status == 1">已处理</span>
            </el-button>
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
import { list, modify } from "@/api/exorders";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      params: {
        userid: undefined,
        orderid: "",
        channel: undefined,
        status: 99,
        time: [],
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
          label: "已申请",
          value: 1
        },
        {
          label: "已处理",
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
      this.params.userid = row.uid;
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
          console.log("params>>", this.params);
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
      console.log("row.status>>>", row.status)
      if(row.status == 1) {
        row.status = 2
      } else if(row.status == 2) {
        row.status = 1
      }
      modify(row).then(res => {
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

