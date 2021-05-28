<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input v-model="params.gid" placeholder="用户ID"/>
        </el-form-item>
        <!--        <el-form-item label="账号类型">-->
        <!--          <el-select v-model="params.playertype" placeholder="请选择" clearable>-->
        <!--            <el-option-->
        <!--              v-for="item in typeoptions"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
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
      <!--      v-loading="listLoading"-->
      <el-table
        v-loading="true"
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
        <el-table-column prop="changeTicket" label="变更值" align="center"/>
        <el-table-column prop="changeBefore" label="变更前" align="center"/>
        <el-table-column prop="changeAfter" label="变更后" align="center"/>

        <!-- <el-table-column prop="user_club_id" label="俱乐部/大厅" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.user_club_id == -1 ?'大厅':'俱乐部' }}:{{scope.row.user_club_id}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="ext1" label="ext1" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.changeType == 130">{{ scope.row.ext1 }}轮</span>
            <span v-else>{{ scope.row.ext1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ext2" label="ext2" align="center">
          <template slot-scope="scope">
            {{scope.row.ext2}}
          </template>
        </el-table-column>
        <el-table-column prop="ext3" label="ext3" align="center">
          <template slot-scope="scope">
            {{scope.row.ext3}}
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
  import {prizeticketlog} from "@/api/kefu";

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
          club: 0
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
    created() {
      var lett = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        console.log(key);
        if (key == 13) {
          lett.initData();
        }
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
        sessionStorage.setItem("uid", row.uid);
        this.$router.push({ name: "profit", params: { uid: row.uid } });
      },
      viewuserlogs(row) {
        this.params.uid = row.uid;
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
        prizeticketlog(this.params)
            .then(res => {
              if (res && res.data.length > 0) {
                this.tableData.data = res.data[0];
                this.tableData.total = res.data[1][0].count;
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
            "changeTicket",
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

