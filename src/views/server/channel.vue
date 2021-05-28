  <template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="渠道ID">
          <el-input placeholder="渠道ID" v-model="params.cid"></el-input>
        </el-form-item>
        <el-form-item label="渠道名称">
          <el-input placeholder="渠道名称" v-model="params.cname"></el-input>
        </el-form-item>
        <el-form-item label="游戏">
          <el-select v-model="params.gameid" placeholder="请选择" clearable>
            <el-option v-for="item in games" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.id }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="时间">
            <el-date-picker
                v-model="params.ctime"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
            </el-date-picker>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
          <el-button
            type="success"
            @click="handleAdd()"
            icon="el-icon-circle-plus"
            style="margin-left: 0"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-body">
      <el-table
        highlight-current-row
        stripe
        :data="tableData.data"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border
        fit
      >
        <el-table-column prop="cid" label="ID" width="60" align="center"></el-table-column>
        <el-table-column prop="cname" label="渠道名称" align="center"></el-table-column>
        <el-table-column prop="channel_desc" label="渠道描述" align="center"></el-table-column>
        <el-table-column prop="version_code" label="版本号" align="center"></el-table-column>
        <el-table-column prop="opname" label="账号" align="center"></el-table-column>
        <el-table-column prop="oppasswd" label="密码" align="center"></el-table-column>
        <el-table-column prop="update_url" label="更新地址" align="center">
          <template slot-scope="scope">
            {{scope.row.update_url}}
            <a :href="scope.row.update_url">
              <i class="el-icon-download"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="handleEdit(scope.row)"
              style="margin-left: 0"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              style="margin-left: 0"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          @current-change="handlePageChange"
          :page-size="params.pagesize"
          :total="tableData.total"
          :current-page.sync="params.page"
          style="float:right;"
        ></el-pagination>
      </el-col>
    </div>
    <!-- 编辑Form -->
    <el-dialog :title="editparams.title" :visible.sync="dialogFormVisible" @close="clearfrom()">
      <el-form :model="editparams" ref="editParams" :rules="rules">
        <el-form-item prop="cid" label="渠道ID">
          <el-input type="number" v-model="editparams.cid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="cname" label="渠道名称">
          <el-input v-model="editparams.cname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="channel_desc" label="渠道描述">
          <el-input v-model="editparams.channel_desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  label="操作人账号">
          <el-input v-model="editparams.opname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  label="操作人密码">
          <el-input v-model="editparams.oppasswd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新地址">
          <el-input v-model="editparams.update_url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  label="版本号">
          <el-input v-model="editparams.version_code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formSubmitClick">确 定</el-button>
      </div>
    </el-dialog>

    <div style="text-align: center">
      <el-dialog title="配置游戏功能" :visible.sync="capsVisible">
        <el-transfer
          style="text-align: left; display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入功能"
          v-model="deCaps"
          :titles="['已关闭功能', '开启功能']"
          :data="caps"
        ></el-transfer>
        <div slot="footer" class="dialog-footer">
          <el-button @click="capsVisible = false">取 消</el-button>
          <el-button type="primary" @click="capsSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style>
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>

<script>
import {
  channels,
  addChannel,
  editChannel,
  delChannel,
  channelCaps,
  addChannelCaps
} from "@/api/yunying";
export default {
  data() {
    return {
      params: {
        cid: undefined,
        cname: "",
        time: [],
        page: 1,
        pagesize: 30,
        gameid: undefined
      },
      editparams: {
        cid: undefined,
        any_channel: "",
        changelog: "",
        channel_desc: "",
        cname: "",
        cur_version: "",
        gameid: 100,
        inreviewbuild: 0,
        inreviewstat: 0,
        opname: "",
        oppasswd: "",
        p_gm: 1,
        p_recharge: 1,
        p_user: 1,
        pay_method: 0,
        update_url: "",
        version_code: ""
      },
      formSubmitClick: () => {},
      rules: {
        cid: [
          {
            required: true,
            message: "请输入渠道ID",
            trigger: "blur"
          }
        ],
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
        ],
        oppasswd: [
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      dialogFormVisible: false,
      capsVisible: false,
      games: [],
      caps: [],
      deCaps: [],
      dechannel: undefined,
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      temp: {
        username: undefined,
        password: undefined,
        nickname: "",
        introduction: "",
        avatar:
          "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        status: 1,
        roleid: 0,
        rolename: "",
        join_at: ""
      }
    };
  },
  methods: {
    handleChangeTime() {
      if (this.editparams.time && this.editparams.time.length > 0) {
        this.editparams.bg_tm = this.editparams.time[0];
        this.editparams.end_tm = this.editparams.time[1];
      }
    },
    handlePageChange(val) {
      this.params.page = val;
      this.initData();
    },
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.initData();
    },
    searchData() {
      this.params.page = 1;
      this.initData();
    },
    initData() {
      this.listLoading = true;
      channels(this.params)
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.games = res.data[2];
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    handleCaps(row) {
      this.capsVisible = true;
      this.dechannel = row.cid;
      channelCaps({ gameid: row.gameid, channel: row.cid })
        .then(res => {
          this.caps = res.data[0];
          res.data[1].forEach((cap, index) => {
            this.deCaps.push(cap.cap_id);
          });
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    handleEdit(data) {
      this.$refs.editParams && this.$refs.editParams.resetFields();
      this.editparams = Object.assign({}, data);
      // this.editparams.time = [data.bg_tm, data.end_tm];
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.editSubmit();
      };
    },
    clearfrom() {
      // this.$refs.editParams.resetFields();
      console.log(this.$refs["editParams"], "aaaaaaaaaaaaaaaaaaaaaaaaa");
      this.editparams = {
        cid: undefined,
        any_channel: "",
        changelog: "",
        channel_desc: "",
        cname: "",
        cur_version: "",
        gameid: 100,
        inreviewbuild: 0,
        inreviewstat: 0,
        opname: "",
        oppasswd: "",
        p_gm: 1,
        p_recharge: 1,
        p_user: 1,
        pay_method: 0,
        update_url: "",
        version_code: ""
      };
      // this.$refs['editParams'].resetFields()
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.addSubmit();
      };
    },
    capsSubmit() {
      console.log("decaps", this.deCaps);
      const capids = this.deCaps.toString();
      addChannelCaps({ capids, channel: this.dechannel })
        .then(res => {
          console.log("res", res);
          this.$message.success("操作成功");
          this.capsVisible = false;
        })
        .catch(err => {
          this.loading.role = false;
          this.$message.error(err);
        });
    },
    editSubmit() {
      this.$refs.editParams.validate(valid => {
        if (valid) {
          editChannel(this.editparams).then(res => {
            if (res.code === 200) {
              console.log("editparams", this.editparams);
              console.log("temp", this.temp);
              if (
                this.editparams.opname != "" &&
                this.editparams.oppasswd != ""
              ) {
                this.temp.username = this.editparams.opname;
                this.temp.password = this.editparams.oppasswd;
                this.temp.nickname = this.editparams.cname;
                this.temp.introduction = "渠道用户";
                this.$store.dispatch("AddAdminUser", this.temp).then(result => {
                  if (result.code == 200) {
                    this.$message.success("操作成功");
                    this.initData();
                    this.dialogFormVisible = false;
                  }
                });
              }
            }
          });
        }
      });
    },
    addSubmit() {
      this.$refs.editParams.validate(valid => {
        if (valid) {
          addChannel(this.editparams).then(res => {
            if (res.code === 200) {
              if (
                this.editparams.opname != "" &&
                this.editparams.oppasswd != ""
              ) {
                this.temp.username = this.editparams.opname;
                this.temp.password = this.editparams.oppasswd;
                this.temp.nickname = this.editparams.cname;
                this.temp.introduction = "渠道用户";
                this.$store.dispatch("AddAdminUser", this.temp).then(result => {
                  if (result.code == 200) {
                    this.$message.success("操作成功");
                    this.initData();
                    this.dialogFormVisible = false;
                  }
                });
              }
            }
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
          delChannel(row).then(res => {
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
