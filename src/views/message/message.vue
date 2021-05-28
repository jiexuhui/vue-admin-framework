<template>
  <div class="mixin-components-container">
    <el-row :gutter="20" style="margin-top:25px;">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>邮件</span>
          </div>
          <div class="component-item" style="height:580px;">
            <el-form :model="mailparams" ref="mailrefs" :rules="mailrules" label-position="left">
              <el-form-item prop="gid">
                <md-input
                  type="number"
                  name="userid"
                  placeholder="输入用户ID"
                  v-model="mailparams.gid"
                >推送用户</md-input>
              </el-form-item>
              <!-- <label class="el-form-item__label" style= "color:red">* tips：0为所有用户</label></br> -->
              <el-form-item prop="mailtitle">
                <md-input name="title" placeholder="输入标题" v-model="mailparams.mailtitle">标题</md-input>
              </el-form-item>
              <el-form-item prop="mailcontent" label="邮件内容：">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{ minRows: 12}"
                  v-model="mailparams.mailcontent"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-form>
            <!-- <span style="margin-left: 100px;font-size:14px">已输入字数：{{words}}</span> -->
            <div style="margin-top:20px;margin-left:100px ">
              <span style="color:red;font-size:14px">{{tips}}</span>
            </div>
            <div style="margin-bottom:50px;float:right">
              <el-col :span="150" class="text-center">
                <button class="pan-btn yellow-btn" @click="sendmail">推送</button>
              </el-col>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发弹窗</span>
          </div>
          <div class="component-item" style="height:580px;">
            <el-form :model="params" ref="refs" :rules="rules" label-position="left">
              <el-form-item prop="gid" label="对象">
                <el-input type="number" name="userid" placeholder v-model="params.gid">推送用户</el-input>
                <label class="el-form-item__label" style="color:red">* tips：0为所有用户弹框,1为全服滚屏</label>
              </el-form-item>

              <el-form-item prop="content" label="推送内容：">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{ minRows: 12}"
                  v-model="params.content"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-form>
            <span style="font-size:14px">已输入字数：{{words}}</span>
            <div style="margin-top:20px;margin-left:100px ">
              <span style="color:red;font-size:14px">{{tips}}</span>
            </div>
            <div style="margin-bottom:50px;float:right">
              <el-col :span="150" class="text-center">
                <button class="pan-btn yellow-btn" @click="submit">推送</button>
              </el-col>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:25px;">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发送喇叭内容</span>
          </div>
          <div class="component-item" style="height:580px;">
            <el-form :model="params" ref="refs" :rules="rules" label-position="left">
              <el-form-item prop="gid" label="对象">
                <el-input type="number" name="userid" placeholder v-model="params.gid">推送用户</el-input>
                <label class="el-form-item__label" style="color:red">* tips：0为所有用户弹框,1为全服滚屏</label>
              </el-form-item>
              <el-form-item prop="content" label="推送内容：">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{ minRows: 12}"
                  v-model="params.content"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-form>
            <span style="font-size:14px">已输入字数：{{words}}</span>
            <div style="margin-top:20px;margin-left:100px ">
              <span style="color:red;font-size:14px">{{tips}}</span>
            </div>
            <div style="margin-bottom:50px;float:right">
              <el-col :span="150" class="text-center">
                <button class="pan-btn yellow-btn" @click="horm">推送</button>
              </el-col>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发循环滚屏</span>
          </div>
          <div class="component-item" style="height:580px;">
            <el-form :model="gm" ref="loop" :rules="looprules" label-position="left">
              <el-form-item label="标题" prop="aa">
                <input type="text" v-model="gm.title" />
              </el-form-item>
              <el-form-item prop="time" label="时间">
                <el-date-picker
                  v-model="gm.time"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                ></el-date-picker>
                <br />
                <label class="el-form-item__label" style="color:red">* tips：3分钟发送一次</label>
              </el-form-item>
              <el-form-item prop="content" label="推送内容：">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{ minRows: 12}"
                  v-model="gm.content"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-form>
            <!-- <span style="font-size:14px">已输入字数：{{words}}</span> -->
            <!-- <div style="margin-top:20px;margin-left:100px ">
              <span style="color:red;font-size:14px">{{tips}}</span>
            </div>-->
            <div style="margin-bottom:50px;float:right">
              <el-col :span="150" class="text-center">
                <button class="pan-btn yellow-btn" @click="loopnotity">推送</button>
              </el-col>
            </div>
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
import { browser, quickDate, currentUser } from "@/utils/tools";

import { pushmsg, sendmail, pushloopmsg, gm } from "@/api/yunying";
import { getByteLen } from "@/utils/index";

export default {
  name: "componentMixin-demo",
  components: {
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu,
    gm
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
      pickerOptions: quickDate,
      params: {
        gid: 0,
        content: ""
      },
      loopparams: {
        time: "",
        content: ""
      },
      gm: {
        title: "",
        time: "",
        content: "",
        isvalid: 1
      },
      mailparams: {
        gid: undefined,
        mailtitle: "",
        mailcontent: ""
      },
      rules: {
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      },
      looprules: {
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],
        aa: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],
        time: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ]
      },
      mailrules: {
        gid: [
          {
            required: true,
            message: "请输入用户ID",
            trigger: "blur"
          }
        ],
        mailcontent: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],
        mailtitle: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ]
      },
      words: 0,
      tips: ""
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
  methods: {
    submit() {
      this.$refs.refs.validate(valid => {
        if (valid) {
          pushmsg(this.params)
            .then(res => {
              if (res.code === 200) {
                this.$message.success("操作成功");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },

    loopnotity() {
      this.$refs.loop.validate(valid => {
        if (valid) {
          gm(this.loopparams)
            .then(res => {
              if (res.code === 200) {
                this.$message.success("操作成功");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              // this.$message.error(err);
            });
        }
      });
    },
    sendmail() {
      this.$refs.mailrefs.validate(valid => {
        if (valid) {
          sendmail(this.mailparams)
            .then(res => {
              if (res.code === 200) {
                this.$message.success("操作成功");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              // this.$message.error(err);
            });
        }
      });
    },
    horm() {}
  }
};
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}

.component-item {
  min-height: 100px;
}
</style>
