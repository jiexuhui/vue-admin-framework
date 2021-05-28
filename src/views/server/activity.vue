  <template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="活动ID">
          <el-input placeholder="功能ID" v-model="params.id"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input placeholder="功能名称" v-model="params.name"></el-input>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="params.type" placeholder="请选择" clearable>
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.id }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="params.status" placeholder="请选择" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="params.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
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
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="desc" label="描述" align="center"></el-table-column>
        <el-table-column prop="typename" label="活动类型" align="center"></el-table-column>
        <el-table-column prop="gamename" label="游戏类型" align="center"></el-table-column>
        <el-table-column prop="stime" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="etime" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="standard" label="标准值" align="center"></el-table-column>
        <!-- <el-table-column prop="giftid" label="礼包值" align="center">
          <template slot-scope="scope">
            <span class="link-type" @click="giftpath(scope.row)">{{scope.row.giftid}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="status" label="状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 0">正常</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 1">关闭</el-tag>
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
            <!-- <el-button
              size="mini"
              type="danger"
            @click="handleDelete(scope.row)" style="margin-left: 0">删除</el-button>-->
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
    <el-dialog :title="temp.dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="temp" ref="temp" :rules="rules" label-position="left" label-width="120px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="temp.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="title" label="标题">
          <el-input v-model="temp.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述">
          <el-input v-model="temp.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="acttype" label="活动类型">
          <el-select class="filter-item" v-model="temp.acttype" placeholder="请选择" clearable>
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="gametype" label="游戏类型">
          <el-select class="filter-item" v-model="temp.gametype" placeholder="请选择" clearable>
            <el-option
              v-for="item in gameOptions"
              :key="item.cid"
              :label="item.gametype"
              :value="item.cid"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="standard" label="标准值" width="200">
          <el-input v-model="temp.standard" auto-complete="off"></el-input>
          <label>排行榜按名次高低配置，以英文逗号隔开</label>
        </el-form-item>-->
        <el-form-item
          v-for="(item, index) in giftids"
          :label="'排名'+ (index+1)"
          :key="index"
          prop="giftids"
        >
          <el-select class="filter-item" v-model="item.giftid" placeholder="请选择" clearable>
            <el-option v-for="g in gifts" :key="g.id" :label="g.name" :value="g.id">
              <!-- <span style="float: left">{{ item.id }}</span>
              <span style=" color: #8492a6; font-size: 13px">{{ item.name }}</span>-->
            </el-option>
          </el-select>
          <el-button icon="el-icon-circle-plus" @click.prevent="addProp(index+1)"></el-button>
          <el-button icon="el-icon-remove" @click.prevent="removeProp(item)"></el-button>
        </el-form-item>
        <!-- <el-form-item prop="giftid" label="礼包">
          <el-select class="filter-item" v-model="temp.giftid" placeholder="请选择" clearable multiple>
            <el-option v-for="item in gifts" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <label>排行榜按名次高低配置</label>
        </el-form-item>-->
        <el-form-item prop="stime" label="开始时间">
          <el-date-picker
            v-model="temp.stime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="etime" label="结束时间">
          <el-date-picker
            v-model="temp.etime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="18:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formSubmitClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
import { activity, addactivity, editactivity } from "@/api/yunying";
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
        title: "",
        desc: "",
        acttype: undefined,
        gametype: undefined,
        stime: "",
        etime: "",
        standard: 0,
        giftid: undefined,
        status: undefined
      },
      formSubmitClick: () => {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "请输入活动标题",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入活动简介",
            trigger: "blur"
          }
        ],
        acttype: [
          {
            required: true,
            message: "请输入活动类型",
            trigger: "blur"
          }
        ],
        gametype: [
          {
            required: true,
            message: "请输入游戏类型",
            trigger: "blur"
          }
        ],
        stime: [
          {
            required: true,
            message: "请输入开始时间",
            trigger: "blur"
          }
        ],
        etime: [
          {
            required: true,
            message: "请输入结束时间",
            trigger: "blur"
          }
        ],
        standard: [
          {
            required: true,
            message: "请输入标准值",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入状态",
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
      types: [],
      gifts: [],
      statusOptions: [
        {
          label: "正常",
          value: 0
        },
        {
          label: "关闭",
          value: 1
        }
      ],
      gameOptions: [],
      giftids: [{ rank: 1, giftid: undefined }]
    };
  },
  methods: {
    addProp(rank) {
      this.giftids.push({
        rank: rank,
        giftid: ""
      });
    },
    removeProp(item) {
      var index = this.giftids.indexOf(item);
      if (index !== -1) {
        this.giftids.splice(index, 1);
      }
    },
    giftpath(row) {
      console.log(row.giftid);
      this.$router.push({ name: "礼包", params: { giftid: row.giftid } });
    },
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
      activity(this.params)
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.types = res.data[1];
            this.tableData.total = res.data[2][0].count;
            this.gifts = res.data[3];
            this.gameOptions = res.data[4];
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    handleEdit(data) {
      this.giftids = [];
      this.dialogTitle = "修改活动：" + data.id;
      this.temp = Object.assign({}, data);

      this.temp.giftid =
        this.temp.giftid == null ? [] : this.temp.giftid.split(",").map(Number);
      for (const index in this.temp.giftid) {
        var gift = {};
        gift.rank = index + 1;
        gift.giftid = this.temp.giftid[index];
        this.giftids.push(gift);
      }
      console.log("this.temp.gametype>>", this.temp);
      // this.editparams.time = [data.bg_tm, data.end_tm];
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.editSubmit();
      };
    },
    handleAdd() {
      this.$refs.temp && this.$refs.temp.resetFields();
      this.dialogTitle = "新建活动";
      this.dialogFormVisible = true;
      this.formSubmitClick = () => {
        this.addSubmit();
      };
    },
    editSubmit() {
      this.$refs.temp.validate(valid => {
        if (valid) {
          const giftarr = [];
          for (const item of this.giftids) {
            giftarr.push(item.giftid);
          }

          this.temp.giftid = giftarr.toString();
          editactivity(this.temp)
            .then(res => {
              if (res.code === 200) {
                this.$message.success("操作成功");
                this.initData();
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
      this.$refs.temp.validate(valid => {
        if (valid) {
          const giftarr = [];
          for (const item of this.giftids) {
            giftarr.push(item.giftid);
          }

          this.temp.giftid = giftarr.toString();
          console.log("this.temp>>>", this.temp);
          // return;
          addactivity(this.temp)
            .then(res => {
              if (res.code === 200) {
                this.$message.success("操作成功");
                this.initData();
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
    handleDelete(row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delcap(row).then(res => {
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
