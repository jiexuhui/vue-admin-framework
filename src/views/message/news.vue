<template>
  <div class="mixin-components-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" style="height: 569px;">
          <el-form
            :model="sendmessage"
            :rules="looprules"
            ref="sendRef"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="标题" prop="title">
              <el-input name="title" placeholder="输入标题" v-model="sendmessage.title"></el-input>
            </el-form-item>
            <el-form-item prop="time" label="时间">
              <el-date-picker
                v-model="sendmessage.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="content" label="推送内容：">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows: 12}"
                v-model="sendmessage.content"
                style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="margin-bottom:50px;float:right">
            <el-col :span="150" class="text-center">
              <button class="pan-btn yellow-btn" @click="loopnotity">推送</button>
            </el-col>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>时间：</span>
            <el-date-picker
              v-model="newspage.ctime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00','23:59:59']"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <el-button type="primary" @click="ctimebtn">搜索</el-button>
          </div>
          <el-table :data="newsDate" border stripe style="width: 100%">
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column prop="content" label="内容" align="center"></el-table-column>
            <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
            <el-table-column prop="isvalid" label="是否有效" align="center" width="80">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isvalid"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="newswitch(scope.row.id,$event)"
                ></el-switch>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="newspage.page"
            :page-sizes="[5, 10, 30, 40]"
            :page-size="newspage.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { gm, list, newswitch, ctimesearch } from "@/api/yunying";
import { quickDate } from "@/utils/tools";
export default {
  components: { gm, list, newswitch, ctimesearch },
  data() {
    return {
      pickerOptions: quickDate,
      newsDate: [],
      total: 1,
      newspage: {
        ctime: "",
        page: 1,
        limit: 5
      },
      sendmessage: {
        title: "",
        time: "",
        content: "",
        isvalid: 1
      },
      looprules: {
        title: [
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
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.newslist();
  },
  methods: {
    // 列表
    newslist() {
      list(this.newspage).then(res => {
        if (res.code === 200) {
          this.newsDate = res.data[0];
          this.total = res.data[1][0].count;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 发送消息
    loopnotity() {
      this.$refs.sendRef.validate(valid => {
        if (valid) {
          gm(this.sendmessage)
            .then(res => {
              if (res.code === 200) {
                this.$message.success("操作成功");
                this.$refs["sendRef"].resetFields();
                this.newslist();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              this.$message.error("发送消息失败");
            });
        }
      });
    },
    // 搜索时间
    ctimebtn() {
      if (!this.newspage.ctime) {
        this.newslist();
      } else {
        ctimesearch(this.newspage).then(res => {
          this.newsDate = res.data[0];
          this.total = res.data[1][0].count;
        });
        console.log(this.ctime);
      }
    },
    // 开关
    newswitch(id, isvalid) {
      newswitch({ id: id, isvalid: isvalid }).then(res => {
        this.$message.success("操作成功");
      });
    },
    handleSizeChange(val) {
      this.newspage.limit = val;
      this.newslist();
    },
    handleCurrentChange(val) {
      this.newspage.page = val;
      this.newslist();
    }
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
.el-pagination {
  margin-top: 10px;
}
</style>