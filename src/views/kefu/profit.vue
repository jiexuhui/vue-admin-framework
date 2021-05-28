<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 24}"
        :xl="{span: 24}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="margin-right:15px">个人基础信息</span>
            <el-button
              type="primary"
              icon="el-icon-s-tools"
              @click="handleKickout"
              v-if="this.editParams.status == 0"
            >封号</el-button>
            <el-button type="danger" icon="el-icon-setting" @click="handleKickout" v-else>解封</el-button>
            <el-button icon="el-icon-s-goods" type="success" @click="btnBack">查看背包</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="viewuserlogs()">查看更多</el-button>
          </div>
          <el-table
            :data="coinchangelogs"
            :row-class-name="tableRowClassName"
            border
            style="width: 100%"
          >
            <el-table-column prop="uid" align="center" label="ID" width="100" />
            <el-table-column prop="玩家类型" align="center" label="玩家类型" />
            <el-table-column prop="金币" align="center" label="金币" />
            <el-table-column prop="钻石" align="center" label="钻石" />
            <el-table-column prop="vip" align="center" label="VIP" />
            <el-table-column align="center" label="UUID" width="180">
              <template slot-scope="scope">
                <span class="link-type" @click="loginlos(scope.row)">{{scope.row.UUID}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="状态" align="center" label="账号状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.状态 === '正常'">正常</el-tag>
                <el-tag v-else type="danger">封号中</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="注册方式" align="center" label="注册方式" />
            <el-table-column prop="注册渠道" align="center" label="注册渠道" />
            <el-table-column prop="注册时间" align="center" label="注册时间" width="180" />
            <el-table-column align="center" label="注册IP" width="180">
              <template slot-scope="scope">
                <span>
                  <a :href="'http://ip138.com/ips138.asp?ip='+scope.row.注册IP+'&action=2'">
                    {{ scope.row.注册IP }}
                    <svg-icon icon-class="eye" />
                  </a>
                </span>
                <br />
                <span
                  class="link-type"
                  @click="Signupip(scope.row)"
                >{{ipData.country}}-{{ipData.regionName}}-{{ipData.city}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="最近登录时间" align="center" label="最后登录时间" width="180" />
            <el-table-column prop="最近登录IP" align="center" label="最后登录IP" width="180"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- 统计图表 -->
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日实时数据</span>
          </div>
          <Realtime />
        </el-card>
      </el-col>
      <el-col style="padding-right:15px" :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>统计类数据</span>
          </div>
          <Statistics />
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最近五条记录</span>
          </div>
          <!-- 最近五条兑换记录 -->
          <el-card class="box-card bottom">
            <div slot="header" class="clearfix">
              <span>兑换记录</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="exchange()">查看更多</el-button>
            </div>
            <el-table
              :data="grecords"
              :row-class-name="tableRowClassName"
              border
              style="width: 100%"
            >
              <el-table-column label="序号" width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="coin" label="ID" width="60" align="center"></el-table-column>
              <el-table-column prop="gid" label="用户ID" align="center" width="300">
                <template slot-scope="scope">
                  <span class="link-type" @click="exchange(scope.row)">
                    gid:{{scope.row.uid}}
                    <br />
                    name:{{scope.row.name}}
                  </span>
                  <br />
                  <span class="link-type" @click="exchange(scope.row)">查看此人日志</span>
                </template>
              </el-table-column>
              <el-table-column prop="orderid" label="订单号" align="center"></el-table-column>
              <el-table-column prop="cname" label="渠道" align="center">
                <template slot-scope="scope">
                  <span>ID：{{scope.row.channel}},名称：{{scope.row.cname}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="pname" label="物品" align="center"></el-table-column>
              <el-table-column prop="cname" label="状态" align="center">
                <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.status == 1">已申请</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 2">已处理</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="point" label="钻石" align="center"></el-table-column>
              <el-table-column prop="coin" label="金币" align="center"></el-table-column>
              <el-table-column prop="prizeTicket" label="兑换券" width="100" align="center"></el-table-column>
            </el-table>
          </el-card>
          <!-- 最近五条充值记录 -->
          <el-card class="box-card bottom">
            <div slot="header" class="clearfix">
              <span>充值记录</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="rechange()">查看更多</el-button>
            </div>
            <el-table
              :data="grecharge"
              :row-class-name="tableRowClassName"
              border
              style="width: 100%"
            >
              <el-table-column label="序号" width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="id" label="ID" align="center"></el-table-column>
              <el-table-column prop="gid" label="用户ID" align="center" width="230">
                <template slot-scope="scope">
                  <span class="link-type" @click="rechange(scope.row)">
                    gid:{{scope.row.uid}}
                    <br />
                    name:{{scope.row.name}}
                  </span>
                  <br />
                  <span class="link-type" @click="rechange(scope.row)">查看此人日志</span>
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
              <el-table-column prop="transaction_time" label="交易时间" width="170" align="center">
                <template slot-scope="scope">
                  流水号：{{scope.row.transaction_id}}
                  <br />
                  交易时间：{{scope.row.ctime}}
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
            </el-table>
          </el-card>
          <!-- 最近五条礼物记录 -->
          <el-card class="box-card bottom">
            <div slot="header" class="clearfix">
              <span>礼物记录</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="giving()">查看更多</el-button>
            </div>
            <el-table :data="gift" :row-class-name="tableRowClassName" border style="width: 100%">
              <el-table-column label="序号" width="150" align="center">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column prop="uid" label="赠送人" width="300" align="center">
                <template slot-scope="scope">
                  <span
                    class="link-type"
                    @click="giving(scope.row)"
                  >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
                  <br />
                  <span class="link-type" @click="giving(scope.row)">查看此人日志</span>
                </template>
              </el-table-column>
              <el-table-column prop="to_uid" label="接收人" width="300" align="center">
                <template slot-scope="scope">
                  <span
                    class="link-type"
                    @click="viewuser1(scope.row)"
                  >gid:{{scope.row.touid}},name:{{scope.row.name2}}</span>
                  <br />
                  <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
                </template>
              </el-table-column>
              <el-table-column label="礼物" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.giftname}} * {{scope.row.num}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="coin" label="花费金币" align="center"></el-table-column>
              <el-table-column prop="ctime" label="时间" align="center">
                <template slot-scope="scope">
                  <span>{{formatTime(scope.row.ctime)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <!-- 最近五条后台赠送日志 -->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>后台赠送日志</span>
            </div>
            <el-table :row-class-name="tableRowClassName" style="width: 100%">
              <el-table-column prop="ctime" align="center" label="日期" />
              <el-table-column prop="ctime" align="center" label="后台赠送日志" />
            </el-table>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
    <!-- 背包 -->
    <el-dialog title="背包" :visible.sync="dialogVisible" width="50%">
      <el-table :data="backpackList" style="width: 100%">
        <el-table-column prop="propid" label="道具" align="center">
          <template slot-scope="scope">
            <img :src="'../../../static/props/icon' + scope.row.propid + '.png'" alt width="40px" />
          </template>
        </el-table-column>
        <el-table-column prop="num" label="数量" align="center"></el-table-column>
        <el-table-column prop="prop_name" label="道具名称" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "@/views/dashboard/admin/components/PieChart";
import Statistics from "./components/Statistics";
import Realtime from "./components/Realtime";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import Kanban from "@/components/Kanban";
import DropdownMenu from "@/components/Share/dropdownMenu";

import {
  profit,
  sendgift,
  gifttips,
  kickout, //封号接口
  order,
  exchange,
  giftlogs,
  backpack // 背包
} from "@/api/account";
import { parseTime } from "@/utils/index";
import { browser, quickDate, currentUser } from "@/utils/tools";

export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    Statistics, // 统计图
    Realtime, //实时数据图
    TransactionTable,
    TodoList,
    BoxCard,
    Kanban,
    DropdownMenu,
    order,
    exchange,
    giftlogs,
    parseTime,
    quickDate,
    backpack // 背包
  },
  data() {
    return {
      gid: 0,
      status: 0,
      uuid: 0,
      ip: "",
      boxCardData: {},
      ipData: {},
      coinchangelogs: [],
      giftLogs: [],
      editParams: {
        status: 0,
        uid: 0
      },
      dialogTableVisible: false,
      gridData: {},
      grecords: [], //兑换
      grecharge: [], //充值
      gift: [], //礼物
      params: {
        userid: undefined,
        orderid: "",
        channel: undefined,
        status: 99,
        time: [],
        page: 1,
        limit: 20
      },
      dialogVisible: false,
      backpackList: {},
      typeoptions: [
        {
          label: "正常账号",
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
      ]
    };
  },
  activated() {
    this.gid = sessionStorage.getItem("uid");
    this.status = sessionStorage.getItem("status");
    this.editParams.status = this.status;
    this.getDetail();
    this.records(); //兑换记录
    this.recharge(); //充值记录
    this.give(); //礼物赠送
    this.ipAddress(); //ip地址
  },
  created() {
    this.gid = sessionStorage.getItem("uid");
    this.status = sessionStorage.getItem("status");
    this.editParams.status = this.status;
    this.getDetail();
    this.records(); //兑换记录
    this.recharge(); //充值记录
    this.give(); //礼物赠送
    this.ipAddress(); //ip地址
  },

  methods: {
    formatTime(time) {
      return parseTime(time);
    },
    loginlos(row) {
      this.$router.push({ name: "登录日志", params: { uuid: this.uuid } });
    },
    Signupip(row) {
      this.$router.push({ name: "登录日志", params: { ip: this.ip } });
    },
    exchange() {
      this.$router.push({ name: "兑换订单", params: { gid: this.gid } });
    },
    rechange() {
      this.$router.push({ name: "订单", params: { gid: this.gid } });
    },
    giving() {
      this.$router.push({ name: "赠送礼物日志", params: { gid: this.gid } });
    },
    viewuser1(row) {
      this.$router.push({
        name: "赠送礼物日志",
        params: { to_uid: row.touid }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    getDetail() {
      profit({ gid: this.gid }).then(res => {
        this.boxCardData = res.data[0][0];
        this.uuid = res.data[0][0].UUID;
        this.ip = res.data[0][0].注册IP;
        this.coinchangelogs = res.data[1];
      });
    },
    // ip地址
    ipAddress() {
      let url = " http://ip-api.com/json/" + this.ip + "?lang=zh-CN";
      this.$jsonp(url)
        .then(res => {
          this.ipData = res;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查看背包
    btnBack() {
      backpack({ gid: this.gid }).then(res => {
        this.backpackList = res.data[0];
        this.dialogVisible = true;
        console.log(this.backpackList);
      });
    },
    //兑换记录
    records() {
      exchange({ userid: this.gid }).then(res => {
        this.grecords = res.data[0];
        this.grecords = this.grecords.slice(0, 5);
      });
    },
    //充值记录
    recharge() {
      order({ userid: this.gid }).then(res => {
        this.grecharge = res.data[0];
        this.grecharge = this.grecharge.slice(0, 5);
      });
    },
    //礼物赠送
    give() {
      giftlogs({ gid: this.gid }).then(res => {
        this.gift = res.data[0];
        this.gift = this.gift.slice(0, 5);
      });
    },
    handleKickout() {
      this.editParams.status == 1
        ? (this.editParams.status = 0)
        : (this.editParams.status = 1);
      this.editParams.uid = this.gid;
      sessionStorage.setItem("status", this.editParams.status);
      kickout(this.editParams).then(res => {
        this.$message.success(`操作成功`);
        this.getDetail();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pan-btn {
  margin-right: 0 !important;
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.bottom {
  margin-bottom: 20px;
}
</style>
