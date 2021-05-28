<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input v-model="params.gid" placeholder="用户ID"/>
        </el-form-item>
        <el-form-item label="账号类型">
          <el-select v-model="params.playertype" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
            :default-time="['12:00:00']"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="单局ID">
          <el-input v-model="params.ext2" placeholder="单局ID"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
          <el-button
            :loading="downloadLoading"
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload"
          >{{ $t('table.export') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-body">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        highlight-current-row
        stripe
        element-loading-text="给我一点时间"
        border
        fit
      >
        <el-table-column prop="gid" label="用户ID" width="300" align="center">
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="viewuser(scope.row)"
            >gid:{{ scope.row.uid }},name:{{ scope.row.playername }}</span>
            <br>
            <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="typename" label="变更类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.changeType }}:{{ scope.row.typename }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changeCoin" label="变更值" align="center"/>
        <el-table-column prop="changeBefore" label="变更前" align="center"/>
        <el-table-column prop="changeAfter" label="变更后" align="center"/>
        <el-table-column prop="user_club_id" label="俱乐部/大厅" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.user_club_id == -1 ?'大厅':'俱乐部' }}:{{scope.row.user_club_id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ext1" label="ext1" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.changeType == 130">{{ scope.row.ext1 }}轮</span>
            <span v-else>{{ scope.row.ext1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ext2" label="ext2" align="center">
          <template slot-scope="scope">
            {{ scope.row.ext2 }}:
            <span
              v-if="scope.row.changeType == 110 || scope.row.changeType == 111"
              class="link-type"
              @click="viewtable(scope.row)"
            >跳转详情</span>
            <span v-if="scope.row.changeType == 120">
              <span v-if="scope.row.ext2 == 1">恭</span>
              <span v-else-if="scope.row.ext2 == 2">喜</span>
              <span v-else-if="scope.row.ext2 == 3">发</span>
              <span v-else-if="scope.row.ext2 == 4">财</span>
              <span v-else-if="scope.row.ext2 == 5">结算</span>
            </span>
            <span v-if="scope.row.changeType == 130">
              第{{scope.row.ext2}}门
            </span>
            <span v-if="scope.row.changeType == 131 && scope.row.changeCoin<0">
              <span v-if="scope.row.ext2 == 1">庄</span>
              <span v-else-if="scope.row.ext2 == 2">闲</span>
              <span v-else-if="scope.row.ext2 == 3">和</span>
              <span v-else-if="scope.row.ext2 == 4">同点平</span>
              <span v-else-if="scope.row.ext2 == 5">庄天王</span>
              <span v-else-if="scope.row.ext2 == 6">闲天王</span>
              <span v-else-if="scope.row.ext2 == 7">庄对子</span>
              <span v-else-if="scope.row.ext2 == 8">闲对子</span>
            </span>
            <span v-if="scope.row.changeType == 131 && scope.row.changeCoin>=0">
              <span v-if="scope.row.ext2 == 5">结算</span>
            </span>
            <span v-if="scope.row.changeType == 132 && scope.row.changeCoin<0">
              <span v-if="scope.row.ext2 == 1">保时捷（大）</span>
              <span v-else-if="scope.row.ext2 == 2">奔驰（大）</span>
              <span v-else-if="scope.row.ext2 == 3">宝马（大）</span>
              <span v-else-if="scope.row.ext2 == 4">大众（大）</span>
              <span v-else-if="scope.row.ext2 == 5">保时捷（小）</span>
              <span v-else-if="scope.row.ext2 == 6">奔驰（小）</span>
              <span v-else-if="scope.row.ext2 == 7">宝马（小）</span>
              <span v-else-if="scope.row.ext2 == 8">大众（小）</span>
            </span>
            <span v-if="scope.row.changeType == 132 && scope.row.changeCoin>=0">
              <span v-if="scope.row.ext2 == 5">结算</span>
            </span>
            <span v-if="scope.row.changeType == 135 && scope.row.changeCoin<0">
              <span v-if="scope.row.ext2 == 1">大</span>
              <span v-else-if="scope.row.ext2 == 2">小</span>
              <span v-else-if="scope.row.ext2 == 3">单</span>
              <span v-else-if="scope.row.ext2 == 4">双</span>
              <span v-else-if="scope.row.ext2 == 5">无牛</span>
              <span v-else-if="scope.row.ext2 == 6">牛小</span>
              <span v-else-if="scope.row.ext2 == 7">牛大</span>
              <span v-else-if="scope.row.ext2 == 8">牛牛</span>
            </span>
            <span v-if="scope.row.changeType == 136 && scope.row.changeCoin<0">
              <span v-if="scope.row.ext2 == 1">红</span>
              <span v-else-if="scope.row.ext2 == 2">黑</span>
              <span v-else-if="scope.row.ext2 == 3">黑桃（红）</span>
              <span v-else-if="scope.row.ext2 == 4">黑桃（红）</span>
              <span v-else-if="scope.row.ext2 == 5">红桃（红）</span>
              <span v-else-if="scope.row.ext2 == 6">梅花（红）</span>
              <span v-else-if="scope.row.ext2 == 7">方块（红）</span>
              <span v-else-if="scope.row.ext2 == 8">黑桃（黑）</span>
              <span v-else-if="scope.row.ext2 == 9">红桃（黑）</span>
              <span v-else-if="scope.row.ext2 == 10">梅花（黑）</span>
              <span v-else-if="scope.row.ext2 == 11">方块（黑）</span>
            </span>
            <span v-if="scope.row.changeType == 136 && scope.row.changeCoin>=0">
              <span v-if="scope.row.ext2 == 5">结算</span>
            </span>
            <span v-if="scope.row.changeType == 150">
              <span v-if="scope.row.ext2 == 1">天</span>
              <span v-else-if="scope.row.ext2 == 2">地</span>
              <span v-else-if="scope.row.ext2 == 3">玄</span>
              <span v-else-if="scope.row.ext2 == 4">黄</span>
              <span v-else-if="scope.row.ext2 == 5">结算</span>
              <span v-else-if="scope.row.ext2 == 7">返预扣</span>
            </span>
            <span v-if="scope.row.changeType == 160">
              <!-- {{scope.row.ext2}} -->
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ext3" label="ext3" align="center">
          <template slot-scope="scope">
            <span>操作者：{{ scope.row.ext3 }}</span>
            <span v-if="scope.row.changeType == 120">
              {{ scope.row.ext3 }}：
              <span v-if="scope.row.ext3 == 1">恭</span>
              <span v-else-if="scope.row.ext3 == 2">喜</span>
              <span v-else-if="scope.row.ext3 == 3">发</span>
              <span v-else-if="scope.row.ext3 == 4">财</span>
              <span v-else-if="scope.row.ext3 == 5">结算</span>
            </span>
            <span v-if="scope.row.changeType == 130">
              {{ scope.row.ext3 }}：
              <span v-if="scope.row.ext3 == 0">结算</span>
              <span v-else-if="scope.row.ext3 == 1">押注</span>
            </span>

            <span
              v-for="(item,index) in scope.row.ext3.split(',')"
              v-if="scope.row.changeType == 131 && scope.row.ext3"
            >
              <span v-if="index == 0">庄:{{ item }}</span>
              <span v-else-if="index == 1">闲:{{ item }}</span>
              <span v-else-if="index == 2">和:{{ item }}</span>
              <span v-else-if="index == 3">同点平:{{ item }}</span>
              <span v-else-if="index == 4">庄天王:{{ item }}</span>
              <span v-else-if="index == 5">闲天王:{{ item }}</span>
              <span v-else-if="index == 6">庄对子:{{ item }}</span>
              <span v-else-if="index == 7">闲对子:{{ item }}</span>
            </span>
            <span v-if="scope.row.changeType == 132 && scope.row.ext3">
              <span v-if="scope.row.ext2 == 1">保时捷（大）</span>
              <span v-else-if="scope.row.ext2 == 2">奔驰（大）</span>
              <span v-else-if="scope.row.ext2 == 3">宝马（大）</span>
              <span v-else-if="scope.row.ext2 == 4">大众（大）</span>
              <span v-else-if="scope.row.ext2 == 5">保时捷（小）</span>
              <span v-else-if="scope.row.ext2 == 6">奔驰（小）</span>
              <span v-else-if="scope.row.ext2 == 7">宝马（小）</span>
              <span v-else-if="scope.row.ext2 == 8">大众（小）</span>
            </span>
            <span v-if="scope.row.changeType == 135 && scope.row.ext3">
              {{ scope.row.ext3 }}：
              <span v-if="scope.row.ext3 == 0">结算</span>
              <span v-else-if="scope.row.ext3 == 1">押注</span>
            </span>
            <span
              v-for="(item,index) in scope.row.ext3.split(',')"
              v-if="scope.row.changeType == 136 && scope.row.ext3"
            >
              <span v-if="index == 0">红:{{ item }};</span>
              <span v-else-if="index == 1">黑:{{ item }};</span>
              <span v-else-if="index == 2">和:{{ item }};</span>
              <span v-else-if="index == 3">黑桃（红）:{{ item }};</span>
              <span v-else-if="index == 4">红桃（红）:{{ item }};</span>
              <span v-else-if="index == 5">梅花（红）:{{ item }};</span>
              <span v-else-if="index == 6">方块（红）:{{ item }};</span>
              <span v-else-if="index == 7">黑桃（黑）:{{ item }};</span>
              <span v-else-if="index == 8">红桃（黑）:{{ item }};</span>
              <span v-else-if="index == 9">梅花（黑）:{{ item }};</span>
              <span v-else-if="index == 10">方块（黑）:{{ item }};</span>
            </span>
            <span v-if="scope.row.changeType == 150 && scope.row.ext3">
              {{ scope.row.ext3 }}：
              <span v-if="scope.row.ext3 == 1">天</span>
              <span v-else-if="scope.row.ext3 == 2">地</span>
              <span v-else-if="scope.row.ext3 == 3">玄</span>
              <span v-else-if="scope.row.ext3 == 4">黄</span>
            </span>
            <span v-if="scope.row.changeType == 160 && scope.row.ext3">{{ scope.row.ext3 }}倍</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="时间" align="center"/>
      </el-table>
    </div>
    <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination
          :page-size="params.limit"
          :page-sizes="[20,50,100, 200, 300, 400,1000,5000,10000]"
          :current-page.sync="params.page"
          layout="total, sizes, prev, pager, next, jumper"
          style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </el-col>
    </div>
  </div>
</template>
<script>
import { coinchangelog } from "@/api/kefu";
export default {
  data() {
    return {
      params: {
        gid: undefined,
        type: undefined,
        time: [],
        playertype: undefined,
        page: 1,
        limit: 20,
        ext1: "",
        ext2: "",
        club: 1
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      changeTypes: undefined,
      downloadLoading: false,
      typeoptions: [
        {
          label: "玩家",
          value: 0
        },
        {
          label: "陪玩",
          value: 1
        },
        {
          label: "机器人",
          value: 2
        }
      ]
    };
  },
  activated() {
    this.params.gid = this.$route.params.gid;
    this.params.type = this.$route.params.type;
    this.params.ext1 = this.$route.params.ext1;
    this.params.ext2 = this.$route.params.ext2;
    this.initData();
  },
  mounted() {
    this.params.gid = this.$route.params.gid;
    this.params.type = this.$route.params.type;
    this.params.ext1 = this.$route.params.ext1;
    this.params.ext2 = this.$route.params.ext2;
    this.initData();
  },
  methods: {
    viewtable(row) {
      this.$router.push({
        name: "三张牌详细金币",
        params: { tableid: row.ext2 }
      });
      this.initData();
    },
    viewuser(row) {
      sessionStorage.setItem("gid", row.uid);
      this.$router.push({ name: "profit", params: { gid: row.uid } });
    },
    viewuserlogs(row) {
      this.params.gid = row.uid;
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
      coinchangelog(this.params)
        .then(res => {
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            // this.tableData.total = res.data[1][0].count;
            this.changeTypes = res.data[1];
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
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
  }
};
</script>
<style lang="scss" scoped>
</style>

