<template>
  <div class="mixin-components-container">
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发送邮件</span>
          </div>
          <div class="component-item" style="height:520px;">
            <dropdown-menu style="margin:0 auto;" title="系列文章" :items="articleList"></dropdown-menu>
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
      demo: {
        title: ""
      },
      demoRules: {
        title: [{ required: true, trigger: "change", validator: validate }]
      },
      articleList: [
        {
          title: "基础篇",
          href: "https://segmentfault.com/a/1190000009275424"
        },
        {
          title: "登录权限篇",
          href: "https://segmentfault.com/a/1190000009506097"
        },
        {
          title: "实战篇",
          href: "https://segmentfault.com/a/1190000009762198"
        },
        {
          title: "vueAdmin-template 篇",
          href: "https://segmentfault.com/a/1190000010043013"
        },
        {
          title: "自行封装 component",
          href: "https://segmentfault.com/a/1190000009090836"
        },
        {
          title: "优雅的使用 icon",
          href:
            "https://segmentfault.com/a/https://segmentfault.com/a/1190000012213278"
        }
      ]
    };
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
