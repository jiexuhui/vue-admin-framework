<template>
  <div class="mixin-components-container">
    <el-row :gutter="20" style="margin-top:25px;">
      <el-col :xs="24" :sm="24" :lg="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:20px">消息列表</span>
            <el-button
              style="float: right; padding: 3px 0"
              icon="iconfont fontIcon-shuaxin"
              @click="getList"
            >刷新</el-button>
          </div>

          <div
            style="margin-bottom:50px; height:520px;  overflow-y: scroll;"
            v-loading="listLoading"
          >
            <el-row v-for="(v,i) in list" :class="classname==i?'active':'row'" :key="i">
              <div class="userlist" @click="showDialog(i,v)">
                <el-col :xs="24" :sm="24" :lg="2">
                  <el-badge :value="v.unread" :hidden="v.unread<=0">
                    <img :src="v.headurl" alt width="50px" v-if="v.headurl">
                    <img
                      :src="'http://hh1.jwcj2009.com:10080/images/avatars/'+ v.uid + '.jpg'"
                      alt
                      width="50px"
                      v-else
                    >
                  </el-badge>
                </el-col>
                <el-col :xs="30" :sm="30" :md="24" :lg="24" :xl="24" class="text-center">
                  <div class="username">{{v.name}}({{v.uid}})</div>
                  <div class="time">
                    <i class="el-icon-time"></i>
                    {{v.ctime}}
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="10" class="text-center">
                  <span>
                    <i class="el-icon-message" style="font-size:30px;" v-if="v.isreply===1"></i>
                  </span>
                </el-col>
              </div>
            </el-row>
          </div>
          <div class="custom" style="height:50px;border-top: 1px solid #d2d6de;">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="11" v-bind:class="customClass">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span @click="viewuser()" class="link-type">{{dialogtitle}}</span>
          </div>

          <div
            style="margin-bottom:50px; height:520px;  overflow-y: scroll;"
            v-loading="cuatomLoading"
          >
            <div v-for="(v,i) in dilogmsg" :key="i" style="width:100%;">
              <el-col :xs="24" :sm="24" :lg="12" v-if="v.uid !== 1000" class="custom_msg">
                <img :src="v.headurl" alt width="50px;" height="50" v-if="v.headurl">
                <img
                  :src="'http://hh1.jwcj2009.com:10080/images/avatars/'+ v.uid + '.jpg'"
                  alt
                  width="50px"
                  height="50"
                  v-else
                >
                <div class="direct-chat-text" v-if="v.uid !== 1000">
                  <p>{{v.msg}}</p>
                </div>
              </el-col>

              <el-col :xs="24" :sm="24" :lg="3" v-if="v.uid === 1000" class="rightava">
                <img :src="v.headurl" alt width="50px"  height="50" v-if="v.headurl">
                <img
                  :src="'http://hh1.jwcj2009.com:10080/images/avatars/1000.jpg'"
                  alt
                  width="50px"
                  height="50"
                  v-else
                >
              </el-col>
              <el-col
                :xs="24"
                :sm="24"
                :lg="18"
                v-if="v.uid === 1000"
                class="direct-chat-text-right"
              >
                <p>{{v.msg}}</p>
              </el-col>
            </div>
          </div>
          <div class="custom" style="height:50px;border-top: 1px solid #d2d6de;padding-top:20px">
            <el-input placeholder="请输入内容" v-model="replay.msg" class="input-with-select">
              <el-button @click="submit" slot="append">发送</el-button>
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import MdInput from "@/components/MDinput";
import Mallki from "@/components/TextHoverEffect/Mallki";
import DropdownMenu from "@/components/Share/dropdownMenu";
import waves from "@/directive/waves/index.js"; // 水波纹指令

import { cslist, usercustomerservicemsg, sendmsg } from "@/api/yunying";
import { getByteLen } from "@/utils/index";

export default {
  name: "componentMixin-demo",
  components: {
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu
  },
  directives: {
    waves
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error("请输入六个字符"));
      } else {
        callback();
      }
    };
    return {
      listQuery: {
        title: "",
        page: 1,
        limit: 10
      },
      listLoading: true,
      cuatomLoading: true,
      classname: "row",
      customClass: "custom-none",
      total: 10,
      list: [],
      touser: undefined,
      dialogtitle: "",
      dilogmsg: [],
      replay: {
        uid: undefined,
        msg: ""
      },
      clickUserid: undefined
    };
  },
  watch: {
    params: {
      handler: function(val, oldval) {
        console.log(this.$refs.refs.model.content);
        this.words = getByteLen(this.$refs.refs.model.content);
      },
      deep: true
    }
  },
  created() {
    this.getList();
  },
  methods: {
    viewuser() {
      sessionStorage.setItem("gid", this.touser);
      this.$router.push({ name: "profit", params: { gid: this.touser } });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    showDialog(index, value) {
      this.touser = value.uid;
      this.dialogtitle = value.uid + "(" + value.name + ")";
      //   e.target.style.backgroundColor = "rgb(143, 148, 199)";
      this.classname = index;
      this.customClass = "custom-active";
      this.cuatomLoading = true;
      this.list[index].unread = 0
      usercustomerservicemsg(value.uid).then(res => {
        this.dilogmsg = res.data;
        this.cuatomLoading = false;
        // this.getList()
      });
    },
    getList() {
      this.listLoading = true;
      cslist(this.listQuery).then(response => {
        this.list = response.data[0];
        this.total = response.data[1][0].count;
        this.listLoading = false;
      });
    },
    submit() {
      if (this.replay.msg === "") {
        this.$message.error("回复内容不能为空！");
        return;
      }
      this.replay.uid = this.touser;
      console.log("replay>>", this.replay);

      sendmsg(this.replay).then(res => {
        if (res.code === 200) {
          let addmsg = { toid: undefined, msg: "", uid: 1000 };
          addmsg.toid = this.replay.uid;
          addmsg.msg = this.replay.msg;
          addmsg.uid = 1000;
          this.replay.msg = "";
          this.dilogmsg.push(addmsg);
          // this.$message.success("操作成功");
        }
      });
    }
  }
};
</script>

<style scoped>
.custom_msg {
  width: 100%;
  display: flex;
  margin-top: 10px;
}

.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.text-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
  white-space: nowrap;
  word-break: break-all;
}

.username {
  color: #444444;
  font-size: 14px;
  width: 25%
}

.time {
  color: #888888;
  font-size: 14px;
  width: 25%
}

.text {
  font-size: 14px;
}

.clearfix:after {
  clear: both;
}
.userlist {
  display: flex;
  width: 100%;
  align-content: center;
}
.cmsg {
  margin-bottom: 20px;
  height: 60px;
  background-color: #fff;
  margin-top: 10px;
}
.row {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  background-color:#ffffff;
  border-bottom: 1px solid #d2d6de;
  display: flex;
  align-items: center;
}
.active {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  /* margin-bottom: 20px; */
  /* height: 60px; */
  background-color: rgb(143, 148, 199);
  border-bottom: 1px solid #d2d6de;
  display: flex;
  align-items: center;
}
.row:hover {
  background: rgb(143, 148, 199);
}
.active:hover {
  background: rgb(143, 148, 199);
}
.custom-active {
  display: block;
}
.custom-none {
  display: none;
}
.direct-chat-text:before {
  position: absolute;
  right: 100%;
  top: 15px;
  border: solid transparent;
  border-right-color: #d2d6de;
  content: " ";
  height: 0;
  width: 0;
  pointer-events: none;
  border-width: 6px;
}
.direct-chat-text {
  width: 100%;
  border-radius: 5px;
  position: relative;
  padding: 5px 10px;
  background: #d2d6de;
  border: 1px solid #d2d6de;
  color: #444;
  margin-left: 5px;
}
.rightava {
  float: right;
  margin-top: 10px;
}

.direct-chat-text-right:before {
  position: absolute;
  left: 100%;
  right: auto;
  top: 15px;
  border: solid transparent;
  border-right-color: #d2d6de;
  content: " ";
  height: 0;
  width: 0;
  pointer-events: none;
  border-width: 6px;
}
.direct-chat-text-right:before {
  right: auto;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #d2d6de;
}
.direct-chat-text-right {
  border-radius: 5px;
  position: relative;
  padding: 5px 10px;
  float: right;
  background: #d2d6de;
  border: 1px solid #d2d6de;
  color: #444;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
