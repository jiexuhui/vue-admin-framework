<template>
  <div>
    <el-row class="panel-group" :gutter="20">
      <el-col :span="3" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="user" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text mar-left">当前在线</div>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.now_online  || 0"
              :duration="3000"
            ></count-to>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="user" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text mar-left">机器人当前在线</div>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.now_online_robot  || 0"
              :duration="3000"
            ></count-to>
          </div>
        </div>
      </el-col>
      <el-col :span="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <!-- <svg-icon icon-class="money" class-name="card-panel-icon" /> -->
            <span style="padding: 13px">₹</span>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text mar-left">客户端收入</div>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.recharge_total  || 0"
              :duration="3000"
            ></count-to>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description" style="width: 100%;">
            <div class="card-panel-text">当前王座玩家----当前王座机器人</div>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.inWarUser || 0"
              :duration="2600"
            ></count-to>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.inWarRobot || 0"
              :duration="2600"
            ></count-to>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description" style="width: 100%;">
            <div class="card-panel-text">当前即开赛人数-当前即开赛机器人</div>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.inTimelyUser  || 0"
              :duration="3000"
            ></count-to>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.inTimelyRobot  || 0"
              :duration="3000"
            ></count-to>
          </div>
        </div>
      </el-col>-->
      <el-col :span="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-description" style="width: 100%;">
            <div class="card-panel-text">当前定时赛玩家----当前定时赛机器人</div>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.inTimingUser  || 0"
              :duration="3000"
            ></count-to>
            <count-to
              class="card-panel-num"
              :startVal="0"
              :endVal="boxdata.inTimingRobot  || 0"
              :duration="3000"
            ></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="panel-group" :gutter="20">
      <!-- <Barchart :data="data"></Barchart> -->
      <el-col>
        <el-card class="box-card">
          <el-table
            :data="tableData.slice((currentPage-1)
*pagesize,currentPage*pagesize)"
            style="width: 100%"
          >
            <el-table-column prop="cdate" label="日期" align="center"></el-table-column>
            <el-table-column label="德州场次1 / 当前在线人数" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.texaFights1 || 0}}&nbsp;/&nbsp;{{scope.row.texasUserNum1 ||0 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="德州场次2 / 当前在线人数" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.texaFights2 || 0 }}&nbsp;/&nbsp;{{scope.row.texasUserNum2 || 0 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="德州场次3 / 当前在线人数" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.texaFights3 || 0}}&nbsp;/&nbsp;{{scope.row.texasUserNum3 || 0}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="德州场次4 / 当前在线人数" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.texaFights4 || 0 }}&nbsp;/&nbsp;{{scope.row.texasUserNum4 || 0 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="德州场次5 / 当前在线人数" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.texaFights5 || 0}}&nbsp;/&nbsp;{{scope.row.texasUserNum5 || 0 }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="猜拳人数/次数/消耗" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.diceBetUserNum }}&nbsp;/&nbsp;{{scope.row.diceBetNum }}&nbsp;/&nbsp;{{scope.row.rockProfit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="骰子人数/次数/消耗" align="center" >
              <template slot-scope="scope">
                <span>{{scope.row.rockShowUserNum }}&nbsp;/&nbsp;{{scope.row.rockBetNum }}&nbsp;/&nbsp;{{scope.row.diceProfit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="轮盘人数/次数/消耗" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.wheelShowUserNum }}&nbsp;/&nbsp;{{scope.row.wheelBetNum }}&nbsp;/&nbsp;{{scope.row.wheelProfit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时时乐人数/次数/盈利" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.sslyzrs2 || 0}}&nbsp;/&nbsp;{{scope.row.sslyzcs2 || 0}}&nbsp;/&nbsp;{{scope.row.sslProfit || 0 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="max_online" label="最高在线/机器人最高在线" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.max_online}}&nbsp;/&nbsp;{{scope.row.max_online_robot}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="recharge_num" label="充值人数" align="center"></el-table-column>
            <el-table-column prop="recharge_total" label="客户端收入" align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col style="margin-top:20px">
        <el-card class="box-card">
          <el-table
            :data="tableData.slice((currentPage-1)
*pagesize,currentPage*pagesize)"
            style="width: 100%"
          >
            <el-table-column prop="cdate" label="日期" align="center" width="150"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope">
                新注册用户/新注册（排重设备）/新注册活跃
                <el-tooltip class="item" content="活跃定义：有参与过即开赛或王座的用户" placement="top">
                  <i class="el-icon-question">{{scope.row}}</i>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <span>{{scope.row.reg_all}}&nbsp;/&nbsp;{{scope.row.reg_num}}&nbsp;/&nbsp;{{scope.row.regact_num}}</span>
              </template>
            </el-table-column>
            <el-table-column label="登录用户数/登录用户（排重设备）/活跃人数" align="center">
              <template slot="header" slot-scope="scope">
                登录用户数/登录用户（排重设备）/活跃人数
                <el-tooltip class="item" content="活跃定义：有参与过即开赛或王座的用户" placement="top">
                  <i class="el-icon-question">{{scope.row}}</i>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <span>{{scope.row.login_all}}&nbsp;/&nbsp;{{scope.row.login_num}}&nbsp;/&nbsp;{{scope.row.active_num}}</span>
              </template>
            </el-table-column>
            <el-table-column label="即开赛人局/即开赛参与人数/即开赛发奖人次" align="center">
              <template slot="header" slot-scope="scope">
                即开赛人局/即开赛参与人数/即开赛发奖人次
                <el-tooltip class="item" content="即开赛人局：1个玩家参加1次比赛+1" placement="top">
                  <i class="el-icon-question">{{scope.row}}</i>
                </el-tooltip>
              </template>
              <template slot-scope="scope">
                <span>{{scope.row.timelyFights}}&nbsp;/&nbsp;{{scope.row.timelyUserNum}} /&nbsp;{{scope.row.timelyPrize}}</span>
              </template>
            </el-table-column>
            <el-table-column label="王座初级场(人局/参与人数/发奖人次)" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.warFights1}}&nbsp;/&nbsp;{{scope.row.warUserNum1}} /&nbsp;{{scope.row.warPrize1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="王座中级场(人局/参与人数/发奖人次)" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.warFights2}}&nbsp;/&nbsp;{{scope.row.warUserNum2}} /&nbsp;{{scope.row.warPrize2}}</span>
              </template>
            </el-table-column>
            <el-table-column label="王座高级场(人局/参与人数/发奖人次)" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.warFights3}}&nbsp;/&nbsp;{{scope.row.warUserNum3}} /&nbsp;{{scope.row.warPrize3}}</span>
              </template>
            </el-table-column>
            <el-table-column label="全局金币/全局钻石/全局奖券" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.totalCoin}}&nbsp;/&nbsp;{{scope.row.totalPoint}}&nbsp;/&nbsp;{{scope.row.totalTicket}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>  
<script>
import CountTo from "vue-count-to";
import Barchart from "./BarChart";
export default {
  props: ["boxdata", "recharge", "tableData"],
  components: {
    CountTo,
    Barchart
  },
  data() {
    return {
      pagesize: 20,
      currentPage: 1,
      data: []
    };
  },
  created() {
    this.data = this.tableData;
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  watch: {
    tableData(val, oldVal) {
      if (val !== oldVal) {
        this.data = this.tableData;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-message {
  font-size: 48px;
}

.panel-group {
  margin-top: 18px;

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shoppingCard {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shoppingCard {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 13px;
      padding: 13px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .mar-left {
      margin-left: 10px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px 0;
      text-align: center;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 28px;
        margin-right: 100px;
      }
    }

    .card-panel-num:last-of-type {
      margin-right: 0px;
    }
  }

  .card-panel-rate {
    float: left;
    font-weight: bold;
    margin: 26px;
    font-size: 20px;
    margin-top: 10%;
    // margin-left: 50%;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }
  }
}
</style>
