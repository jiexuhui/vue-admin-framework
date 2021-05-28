  <template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <!-- <el-form-item label="类型ID">
          <el-input placeholder="类型ID" v-model="params.id"></el-input>
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input placeholder="类型名称" v-model="params.name"></el-input>
        </el-form-item>-->
        <el-form-item>
          <!-- <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button> -->
          <el-button
            type="success"
            @click="handleAdd()"
            icon="el-icon-circle-plus"
            style="margin-left: 0"
          >新增机器人</el-button>
          <el-button
            class="filter-item"
            type="primary"
            :loading="downloadLoading"
            icon="el-icon-download"
            @click="handleDownload"
          >导出机器人</el-button>
          <el-button class="filter-item" type="primary" @click="robotstart">开启机器人</el-button>
          <el-button class="filter-item" type="primary" @click="robotstop">关闭机器人</el-button>
          <span>
            <br>
            机器人总数：{{robotInfo.count}};小R:{{robotInfo.small}};中R:{{robotInfo.middle}};大R:{{robotInfo.big}}
            <br>
            三张小R:{{robotInfo.szsmall}};三张中R:{{robotInfo.szmiddle}};三张大R:{{robotInfo.szbig}};三张大R:{{robotInfo.szsuper}}
            <br>
            现有金币：{{robotInfo.coinSum}}；请求的正值：{{robotInfo.zcoin}}；请求的负值：{{robotInfo.fcoin}}；
          </span>
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
        <el-table-column prop="id" label="序号" align="center" width="60">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="gameid" label="gameid" align="center" width="80"></el-table-column>
        <el-table-column prop="desc" label="游戏名" align="center" width="100"></el-table-column>
        <el-table-column prop="srmin" label="小R" align="center">
          <template slot-scope="scope">
            <template>
              <div v-if="scope.row.display==1">
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.srmax"
                  :value="scope.row.srmax"
                  style="padding-right:0"
                >
                  <template slot="prepend">MAX</template>
                </el-input>
                  <br>
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.srmin"
                  :value="scope.row.srmin"
                  style="padding-right:0"
                >
                  <template slot="prepend">MIN</template>
                  {{scope.row.srmin}}
                </el-input>
              </div>
              <span v-else>最大人数:{{ scope.row.srmax }},最小人数:{{scope.row.srmin}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="mrmin" label="中R" align="center">
          <template slot-scope="scope">
            <template>
              <div v-if="scope.row.display==1">
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.mrmax"
                  :value="scope.row.mrmax"
                  style="padding-right:0"
                >
                  <template slot="prepend">MAX</template>
                </el-input>
                <br>
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.mrmin"
                  :value="scope.row.mrmin"
                  style="padding-right:0"
                >
                  <template slot="prepend">MIN</template>
                </el-input>
              </div>
              <span v-else>最大人数:{{ scope.row.mrmax }},最小人数:{{scope.row.mrmin}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="brmax" label="大R" align="center">
          <template slot-scope="scope">
            <template>
              <div v-if="scope.row.display==1">
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.brmax"
                  :value="scope.row.brmax"
                  style="padding-right:0"
                >
                  <template slot="prepend">MAX</template>
                </el-input>
                <br>
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.brmin"
                  :value="scope.row.brmin"
                  style="padding-right:0"
                >
                  <template slot="prepend">MIN</template>
                </el-input>
              </div>
              <span v-else>最大人数:{{ scope.row.brmax }},最小人数:{{scope.row.brmin}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="supermin" label="顶级" align="center">
          <template slot-scope="scope">
            <template>
              <div v-if="scope.row.display==1">
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.supermax"
                  :value="scope.row.supermax"
                  style="padding-right:0"
                >
                  <template slot="prepend">MAX</template>
                </el-input>
                <br>
                <el-input
                  class="edit-input"
                  type="number"
                  size="small"
                  v-model="scope.row.supermin"
                  :value="scope.row.supermin"
                   style="padding-right:0"
                >
                  <template slot="prepend">MIN</template>
                </el-input>
              </div>
              <span v-else>最大人数:{{ scope.row.supermax }},最小人数:{{scope.row.supermin}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
              v-if="scope.row.display==1"
            >cancel</el-button>
            <el-button
              v-if="scope.row.display==1"
              type="success"
              @click="confirmEdit(scope.row)"
              size="small"
              icon="el-icon-circle-check-outline"
            >Ok</el-button>
            <el-button
              v-else
              type="primary"
              @click="display(scope.row)"
              size="small"
              icon="el-icon-edit"
            >Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination layout="total, prev, pager, next, jumper" 
          @current-change="handlePageChange" 
          :page-size="params.pagesize" 
          :total="tableData.total"
          :current-page.sync="params.page" style="float:right;">
        </el-pagination>
      </el-col>
    </div>-->
    <!-- 编辑Form -->
    <el-dialog :title="temp.title" :visible.sync="dialogFormVisible">
      <el-form :model="temp" ref="editParams" :rules="rules">
        <el-form-item prop="small" label>
          <el-input v-model="temp.small" auto-complete="off">
            <template slot="prepend">小R</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="small" label>
          <el-input v-model="temp.middle" auto-complete="off">
            <template slot="prepend">中R</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="small" label>
          <el-input v-model="temp.big" auto-complete="off">
            <template slot="prepend">大R</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="szsmall" label>
          <el-input v-model="temp.szsmall" auto-complete="off">
            <template slot="prepend">三张小R</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="szmiddle" label>
          <el-input v-model="temp.szmiddle" auto-complete="off">
            <template slot="prepend">三张中R</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="szbig" label>
          <el-input v-model="temp.szbig" auto-complete="off">
            <template slot="prepend">三张大R</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="szbig" label>
          <el-input v-model="temp.szsuper" auto-complete="off">
            <template slot="prepend">三张顶级</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="coin" label="初始金币">
          <el-input v-model="temp.coin" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formSubmitClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  robotlist,
  addrobot,
  editrobot,
  robotstart,
  robotstop
} from "@/api/yunying";
export default {
  data() {
    return {
      params: {
        id: undefined,
        name: "",
        page: 1,
        limit: 20
      },
      temp: {
        small: 0,
        middle: 0,
        big: 0,
        szsmall: 0,
        szmiddle: 0,
        szbig: 0,
        coin: 5000,
        szsuper: 0
      },
      formSubmitClick: () => {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入类型名称",
            trigger: "blur"
          }
        ],
        tid: [
          {
            required: true,
            message: "请输入类型ID",
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
      downloadLoading: false,
      games: [],
      robots: [],
      edit: 0,
      robotInfo: {}
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
    searchData() {
      this.params.page = 1;
      this.initData();
    },
    cancelEdit(row) {
      // row.title = row.originalTitle;
      row.display = 0;
      this.$message({
        message: "The title has been restored to the original value",
        type: "warning"
      });
    },
    confirmEdit(row) {
      row.display = 0;
      // row.originalTitle = row.title;
      console.log(row);
      editrobot(row).then(res => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          // this.initData();
          this.dialogFormVisible = false;
        }
      });
    },
    display(row) {
      row.display = 1;
      console.log(row);
    },
    robotstart() {
      robotstart().then(res => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          // this.initData();
          this.dialogFormVisible = false;
        }
      });
    },
    robotstop() {
      robotstop().then(res => {
        if (res.code === 200) {
          this.$message.success("操作成功");
          // this.initData();
          this.dialogFormVisible = false;
        }
      });
    },
    initData() {
      this.listLoading = true;
      robotlist(this.params)
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.robots = res.data[0];
            this.tableData.data = res.data[2];
            this.robotInfo = res.data[1][0];
            console.log(this.robotInfo);
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    handleEdit(data) {
      this.$refs.editParams && this.$refs.editParams.resetFields();
      this.temp = Object.assign({}, data);
      // this.editparams.time = [data.bg_tm, data.end_tm];
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.editSubmit();
      };
    },
    handleAdd() {
      this.$refs.editParams && this.$refs.editParams.resetFields();
      this.temp.title = "新建功能";
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.addSubmit();
      };
    },
    editSubmit() {
      this.$refs.editParams.validate(valid => {
        if (valid) {
          editacttype(this.temp)
            .then(res => {
              if (res.code === 200) {
                for (const v of this.tableData.data) {
                  if (v.id === this.temp.id) {
                    this.temp.display = 0;
                    this.temp.utime = res.utime;
                    const index = this.tableData.data.indexOf(v);
                    this.tableData.data.splice(index, 1, this.temp);
                    break;
                  }
                }
                // this.$message.success("操作成功");
                // this.initData();
                this.dialogFormVisible = false;
              }
            })
            .catch(err => {
              this.dialogFormVisible = false;
              this.$message.error(err);
            });
        }
      });
    },
    addSubmit() {
      this.$refs.editParams.validate(valid => {
        if (valid) {
          addrobot(this.temp)
            .then(res => {
              if (res.code === 200) {
                this.robotInfo.count =
                  this.robotInfo.count +
                  parseInt(this.temp.small) +
                  parseInt(this.temp.middle) +
                  parseInt(this.temp.big) +
                  parseInt(this.temp.szsmall) +
                  parseInt(this.temp.szmiddle) +
                  parseInt(this.temp.szbig);
                this.robotInfo.small += parseInt(this.temp.small);
                this.robotInfo.middle += parseInt(this.temp.middle);
                this.robotInfo.big += parseInt(this.temp.big);
                this.robotInfo.szsmall += parseInt(this.temp.szsmall);
                this.robotInfo.szmiddle += parseInt(this.temp.szmiddle);
                this.robotInfo.szbig += parseInt(this.temp.szbig);
                this.$message.success("操作成功");
                // this.initData();
                this.dialogFormVisible = false;
              }
            })
            .catch(err => {
              this.dialogFormVisible = false;
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
          delacttype(row).then(res => {
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
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "用户ID",
          "机器人昵称",
          "TAG(>=4为三张机器人)",
          "设备id"
        ];
        const filterVal = ["uid", "robot_name", "robotTag", "op_uuid"];
        const data = this.formatJson(filterVal, this.robots);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "机器人列表"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

