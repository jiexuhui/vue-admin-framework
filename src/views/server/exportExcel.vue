<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <h3>导出金币变化</h3>
    <el-row :gutter="20">
      <el-input style="width:150px;" placeholder="游戏类型" v-model="params.changetype"></el-input>
      <el-input style="width:80px;" placeholder="用户ID" v-model="params.gid"></el-input>
      <el-select v-model="params.playertype" placeholder="请选择" clearable>
        <el-option
          v-for="item in typeoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="params.time"
        type="datetimerange"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <label class="radio-label" style="padding-left:0;">Filename:</label>
      <el-input
        style="width:300px;"
        :placeholder="$t('excel.placeholder')"
        prefix-icon="el-icon-document"
        v-model="filename"
      ></el-input>
      <label class="radio-label">Cell Auto Width:</label>
      <el-radio-group v-model="autoWidth">
        <el-radio :label="true" border>True</el-radio>
        <el-radio :label="false" border>False</el-radio>
      </el-radio-group>
      <el-button
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="document"
        @click="handleDownload(1)"
        :loading="downloadLoading"
      >{{$t('excel.export')}} excel</el-button>
    </el-row>
    <h3>导出玩家押注次数</h3>
    <el-row :gutter="20">
      <el-input style="width:150px;" placeholder="游戏类型" v-model="gparams.changetype"></el-input>
      <el-date-picker
        v-model="gparams.time"
        type="date"
        placeholder="选择日期"
        value-format="yyMMdd"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <label class="radio-label" style="padding-left:0;">Filename:</label>
      <el-input
        style="width:300px;"
        :placeholder="$t('excel.placeholder')"
        prefix-icon="el-icon-document"
        v-model="filename"
      ></el-input>
      <label class="radio-label">Cell Auto Width:</label>
      <el-radio-group v-model="autoWidth">
        <el-radio :label="true" border>True</el-radio>
        <el-radio :label="false" border>False</el-radio>
      </el-radio-group>
      <el-button
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="document"
        @click="handleDownload(2)"
        :loading="downloadLoading"
      >{{$t('excel.export')}} excel</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-table
        :data="list"
        v-loading.body="listLoading"
        element-loading-text="拼命加载中"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="Id" width="95">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="Title">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="Query" align="center">
          <template slot-scope="scope">{{scope.row.query}}</template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { exportList } from "@/api/yunying";
import { parseTime } from "@/utils";
import { browser, quickDate, currentUser } from "@/utils/tools";

export default {
  name: "exportExcel",
  data() {
    return {
      list: [
        {
          title: "查询某天某类型某人金币日志（正式环境）",
          query:
            "SELECT a.ctime '日期',c.c_name '变更类型',a.uid,a.change_before '变更前',a.change_coin '变更金币',a.change_after '变更后' " +
            "FROM zjhccc_logs.`log_coin_change_181222(数字为日期)` a LEFT JOIN zjhccc.gm_player_info b ON a.uid = b.userId LEFT JOIN cfg_coin_changetype c ON a.change_type = c.cid " +
            "WHERE a.ctime >= '2018-12-25 00:00:00' AND a.ctime <='2018-12-25 23:59:59' AND b.player_type = 0 AND a.change_type = 130 AND a.uid=11111"
        },
        {
          title: "查询某天金币日志（测试环境）",
          query:
            "SELECT a.ctime '日期',c.c_name '变更类型',a.uid,a.change_before '变更前',a.change_coin '变更金币',a.change_after '变更后' " +
            "FROM `log_coin_change` a LEFT JOIN gm_player_info b ON a.uid = b.userId LEFT JOIN cfg_coin_changetype c ON a.change_type = c.cid " +
            "WHERE a.ctime >= '2018-12-25 00:00:00' AND a.ctime <='2018-12-25 23:59:59' AND b.player_type = 0 AND a.change_type = 130 AND a.uid=11111"
        },
        {
          title: "查询某天某游戏押注金币局数",
          query:
            "SELECT DATE_FORMAT(a.ctime,'%Y-%m-%d') date,SUM(if(change_coin<0,change_coin,0)) '押注金额', count(DISTINCT a.ext1) '局数'" +
            " FROM log_coin_change a LEFT JOIN gm_player_info b ON a.uid = b.userId" +
            "WHERE a.ctime>='2018-12-25 00:00:00' AND a.ctime<='2018-12-25 23:59:59' AND a.change_type = 132 AND b.player_type = 0"
        }
      ],
      listLoading: false,
      downloadLoading: false,
      filename: "excel",
      autoWidth: true,
      exportData: [],
      pickerOptions: quickDate,
      params: {
        gid: undefined,
        time: [],
        playertype: 0,
        changetype: undefined
      },
      gparams: {
        gid: undefined,
        time: [],
        playertype: 0,
        changetype: undefined
      },
      typeoptions: [
        {
          label: "玩家",
          value: 0
        },
        {
          label: "陪玩账号",
          value: 1
        },
        {
          label: "机器人",
          value: 2
        }
      ],
      temp: {}
    };
  },
  created() {
    // this.fetchData();
  },
  methods: {
    fetchData() {
      //   this.listLoading = true;
      console.log("params>>", this.temp);
      exportList(this.temp).then(response => {
        this.exportData = response.data;
        console.log("exportData>>", this.exportData);
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [];
          for (const index in this.exportData[0]) {
            console.log("index>>", index);
            tHeader.push(index);
          }
          console.log("tHeader", tHeader);
          const filterVal = tHeader;
          const list = this.exportData;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
            //   autoWidth: this.autoWidth
          });
          this.downloadLoading = false;
        });
        // this.listLoading = false;
      });
    },
    handleDownload(type) {
      this.downloadLoading = true;
      if (type == 1) {
        this.params.type = type;
        this.temp = Object.assign(this.temp, this.params);
      }
      if (type == 2) {
        this.gparams.type = type;
        this.temp = Object.assign(this.temp, this.gparams);
      }
      console.log("type>>", type);
      this.fetchData();
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

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>

