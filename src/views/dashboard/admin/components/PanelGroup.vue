<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel'>
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="user" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新增用户</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="boxdata.tuser || 0" :duration="2600"></count-to>
        </div>
        <div class="card-panel-rate" v-if="boxdata.tuserrate>0" style="color:red">
          {{boxdata.tuserrate || 0}}%<i class="iconfont fontIcon-jiantouarrow499" style="color:red"></i>
        </div>
        <div class="card-panel-rate" v-if="boxdata.tuserrate<=0" style="color: #00aa00">
          {{boxdata.tuserrate || 0}}%<i class="iconfont fontIcon-jiantou" style="color: #00aa00"></i>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel'>
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">注册活跃</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="boxdata.regactive  || 0" :duration="2600"></count-to>
        </div>
        <div class="card-panel-rate" v-if="boxdata.rerate>0" style="color:red">
          {{boxdata.rerate || 0}}%<i class="iconfont fontIcon-jiantouarrow499" style="color:red"></i>
        </div>
        <div class="card-panel-rate" v-if="boxdata.rerate<=0" style="color: #00aa00">
          {{boxdata.rerate || 0}}%<i class="iconfont fontIcon-jiantou" style="color: #00aa00"></i>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">活跃人数</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="boxdata.activenum  || 0" :duration="3000"></count-to>
        </div>
        <div class="card-panel-rate" v-if="boxdata.acrate>0" style="color:red">
          {{boxdata.acrate || 0}}%<i class="iconfont fontIcon-jiantouarrow499" style="color:red"></i>
        </div>
        <div class="card-panel-rate" v-if="boxdata.acrate<=0" style="color: #00aa00">
          {{boxdata.acrate || 0}}%<i class="iconfont fontIcon-jiantou" style="color: #00aa00"></i>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">充值总数</div>
          <div class="card-panel-num">￥{{recharge.totalfee || 0}}</div>
        </div>
        <div class="card-panel-rate" v-if="recharge.trate>0" style="color:red">
          {{recharge.trate || 0}}%<i class="iconfont fontIcon-jiantouarrow499" style="color:red"></i>
        </div>
        <div class="card-panel-rate" v-if="recharge.trate<=0" style="color: #00aa00">
          {{recharge.trate || 0}}%<i class="iconfont fontIcon-jiantou" style="color: #00aa00"></i>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="people" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">充值人数</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="recharge.pnum  || 0" :duration="3200"></count-to>
        </div>
        <div class="card-panel-rate" v-if="recharge.pnumrate>0" style="color:red">
          {{recharge.pnumrate || 0}}%<i class="iconfont fontIcon-jiantouarrow499" style="color:red"></i>
        </div>
        <div class="card-panel-rate" v-if="recharge.pnumrate<=0" style="color: #00aa00">
          {{recharge.pnumrate || 0}}%<i class="iconfont fontIcon-jiantou" style="color: #00aa00"></i>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">充值UP</div>
          <div class="card-panel-num">{{recharge.up || 0}}</div>
        </div>
        <div class="card-panel-rate" v-if="recharge.uprate>0" style="color:red">
          {{recharge.uprate || 0}}%<i class="iconfont fontIcon-jiantouarrow499" style="color:red"></i>
        </div>
        <div class="card-panel-rate" v-if="recharge.uprate<=0" style="color: #00aa00">
          {{recharge.uprate || 0}}%<i class="iconfont fontIcon-jiantou" style="color: #00aa00"></i>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo
  },
  props: {
    boxdata: {
      type: Object,
      required: true
    },
    recharge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
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
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;
      // margin-left: 50%;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
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
}
</style>
