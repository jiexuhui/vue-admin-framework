  <template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="公告ID">
          <el-input placeholder="公告ID" v-model="params.id"></el-input>
        </el-form-item>
        <el-form-item label="公告名称">
          <el-input placeholder="公告名称" v-model="params.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="params.type" placeholder="类型" clearable>
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="params.status" placeholder="请选择" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker
                v-model="params.time"
               type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
           <el-button
              type="success"
              @click="handleAdd()" icon="el-icon-circle-plus" style="margin-left: 0">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-body">
      <el-table highlight-current-row stripe :data="tableData.data" v-loading="listLoading" element-loading-text="给我一点时间" border fit>
        <el-table-column prop="id" label="ID" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="tag" label="TAG" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.tag == 1">
              热门
            </el-tag>
            <el-tag type="success" v-if="scope.row.tag == 2">
              显示
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type == 1">
              公告
            </el-tag>
            <el-tag type="success" v-if="scope.row.type == 2">
              活动
            </el-tag>
            <el-tag type="success" v-if="scope.row.type == 3">
              送礼
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="content" label="正文" align="center">
        </el-table-column>
        <el-table-column prop="contentTime" label="正文显示时间" align="center">
        </el-table-column>
        <el-table-column prop="jumpType" label="跳转类型" align="center">
          <template slot-scope="scope" >
            {{v.value}} :{{scope.row.jumpType}}
            <!-- <span v-for="(v, i) in jumptypes" > 
              <el-tag type="success" v-if="v.value == scope.row.jumpType" >
                {{scope.row.jumpType }}:{{v.label}}
              </el-tag>
            </span> -->
          </template>
        </el-table-column>
        <el-table-column prop="tips" label="提示" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 0">
              正常
            </el-tag>
            <el-tag type="success" v-if="scope.row.status == 1">
              暂不开放
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="handleEdit(scope.row)" style="margin-left: 0">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)" style="margin-left: 0">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination layout="total, prev, pager, next, jumper" 
          @current-change="handlePageChange" 
          :page-size="params.pagesize" 
          :total="tableData.total"
          :current-page.sync="params.page" style="float:right;">
        </el-pagination>
      </el-col>
    </div>
     <!-- 编辑Form -->
    <el-dialog :title="temp.dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="temp" ref="editParams" :rules="rules" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item prop="name" label="名称">
          <el-input v-model="temp.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="tag" label="角标">
          <el-select class="filter-item" v-model="temp.tag" placeholder="请选择" clearable>
            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="标题">
          <el-input v-model="temp.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="正文">
          <el-input v-model="temp.content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="contentTime" label="正文时间">
          <el-input v-model="temp.contentTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="类型">
          <el-select class="filter-item" v-model="temp.type" placeholder="请选择" clearable >
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="jumpType" label="跳转类型">
          <el-select class="filter-item" v-model="temp.jumpType" placeholder="请选择" clearable >
            <el-option v-for="item in jumptypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="tips" label="提示">
          <el-input v-model="temp.tips" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择" clearable >
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="formSubmitClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { notices, addnotice, editnotice, delnotice } from "@/api/yunying";
export default {
  data() {
    return {
      params: {
        id: undefined,
        name: "",
        type: undefined,
        status: undefined,
        time: [],
        page: 1,
        limit: 30
      },
      temp: {
        name: "",
        tag: 1,
        title: "",
        content: "",
        type: 1,
        content_time: "",
        jump_type: "1",
        tips: "",
        status: 1
      },
      formSubmitClick: () => {},
      rules: {
        cname: [
          {
            required: true,
            message: "请输入渠道名称",
            trigger: "blur"
          }
        ],
        cur_version: [
          {
            required: true,
            message: "请输入当前版本",
            trigger: "blur"
          }
        ]
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      dialogFormVisible: false,
      dialogTitle: "",
      types: [
        {
          label: "无",
          value: 0
        },
        {
          label: "公告",
          value: 1
        },
        {
          label: "活动",
          value: 2
        },
        {
          label: "送礼",
          value: 3
        }
      ],
      jumptypes: [
        {
          label: "无",
          value: "0"
        },
        {
          label: "跳转三张",
          value: "1"
        },
        {
          label: "跳转斗地主",
          value: "2"
        },
        {
          label: "跳转百人场",
          value: "3"
        },
        {
          label: "跳转商城",
          value: "4"
        },
        {
          label: "打开任务界面",
          value: "5"
        },
        {
          label: "打开vip界面",
          value: "6"
        },
        {
          label: "打开时时乐界面",
          value: "7"
        },
        {
          label: "打开签到界面",
          value: "8"
        },
        {
          label: "打开新手奖励界面",
          value: "9"
        },
        {
          label: "打开超值礼包界面",
          value: "10"
        }
      ],
      tags: [
        {
          label: "热门",
          value: 1
        },
        {
          label: "限时",
          value: 2
        }
      ],
      statusOptions: [
        {
          label: "正常",
          value: 0
        },
        {
          label: "关闭",
          value: 1
        }
      ]
    };
  },
  methods: {
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
      notices(this.params)
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    handleEdit(data) {
      this.dialogTitle = "修改活动：" + data.id;
      this.temp = Object.assign({}, data);
      // this.editparams.time = [data.bg_tm, data.end_tm];
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.editSubmit();
      };
    },
    handleAdd() {
      this.$refs.editParams && this.$refs.editParams.resetFields();
      this.dialogTitle = "新建活动";
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.addSubmit();
      };
    },
    editSubmit() {
      this.$refs.editParams.validate(valid => {
        if (valid) {
          editnotice(this.temp)
            .then(res => {
              if (res.code === 200) {
                for (const v of this.tableData.data) {
                  if (v.id === this.temp.id) {
                    // this.temp.utime = this.formatTime(res.data[0].utime);
                    const index = this.tableData.data.indexOf(v);
                    this.tableData.data.splice(index, 1, this.temp);
                    break;
                  }
                }
                this.$message.success("操作成功");
                // this.initData();
                this.dialogFormVisible = false;
              }
            })
            .catch(err => {
              this.loading.role = false;
              this.$message.error(err);
            });
        }
      });
    },
    addSubmit() {
      this.$refs.editParams.validate(valid => {
        if (valid) {
          addnotice(this.temp)
            .then(res => {
              if (res.code === 200) {
                this.temp.id = res.data[0].id;
                this.temp.utime = res.data[0].utime;
                this.tableData.data.unshift(this.temp);
                this.$message.success("操作成功");
                // this.initData();
                this.dialogFormVisible = false;
              }
            })
            .catch(err => {
              // this.loading.role = false;
              this.$message.error(err);
            });
        }
      });
    },
    handleDelete(row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delnotice(row).then(res => {
            console.log("delchannel:", res);
            if (res.code === 200) {
              // this.getList();
              const index = this.tableData.data.indexOf(row);
              this.tableData.data.splice(index, 1);
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style>
</style>
