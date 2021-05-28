<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
<!--      <pan-thumb-->
<!--        class="panThumb"-->
<!--        :image="'http://blapi.baile1688.com/images/avatars/'+ boxData.gid + '.jpg'"-->
<!--      ></pan-thumb>-->
      <mallki class="mallki-text" :text="boxData.昵称"></mallki>
<!--      <div style="padding-top:20px;">-->
<!--        <div style="padding-top:20px;" class="progress-item" v-for="(item,index) in boxData">-->
<!--          <el-tag type="success">{{index}}</el-tag>-->
<!--          <el-tag type="warn">{{boxData[index]}}</el-tag>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import Mallki from "@/components/TextHoverEffect/Mallki";

export default {
  components: { PanThumb, Mallki },
  props: {
    boxData: {
      type: Object
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger"
      };
      return statusMap[status];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 190px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 14px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    /deep/ .pan-info {
      box-shadow: none !important;
    }
  }
  .progress-item {
    // margin-bottom: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ededed;
  }
  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
