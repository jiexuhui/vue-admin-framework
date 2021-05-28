<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabvalue" @tab-click="handleClick">
      <el-tab-pane label="时时乐记录" name="index">
        <div class="filter">
          <el-form :inline="true">
            <el-form-item label="时时乐ID">
              <el-input placeholder="时时乐ID" v-model="params.sslid"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="params.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00','23:59:59']"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
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
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sslid" label="时时乐ID" align="center">
              <template slot-scope="scope">
                <span class="link-type" @click="viewtable(scope.row)">时时乐ID: {{scope.row.sslid}}查看此局</span>
                <br />
                <span class="link-type" @click="viewYz(scope.row)">此局押注</span>
                <br />
                <span class="link-type" @click="viewFj(scope.row)">此局返奖</span>
                <br />
                <span class="link-type" @click="viewHz(scope.row)">此局汇总</span>
              </template>
            </el-table-column>
            <el-table-column prop="types" label="牌型" align="center" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.types === 1">235</span>
                <span v-else-if="scope.row.types === 2">散牌</span>
                <span v-else-if="scope.row.types === 3">对子</span>
                <span v-else-if="scope.row.types === 4">金花</span>
                <span v-else-if="scope.row.types === 5">顺子</span>
                <span v-else-if="scope.row.types === 6">顺金</span>
                <span v-else-if="scope.row.types === 7">豹子</span>
                <span v-else-if="scope.row.types === 8">3a</span>
                <span v-else>{{scope.row.types}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="coins" label="押注金币" align="center"></el-table-column>
            <el-table-column prop="nums" label="押注人数" align="center"></el-table-column>
            <el-table-column prop="winCoins" label="中奖奖金" align="center"></el-table-column>
            <el-table-column prop="winNums" label="中奖人数" align="center"></el-table-column>
            <el-table-column prop="pool" label="奖池" align="center"></el-table-column>
            <el-table-column prop="cards" label="cards" align="center">
              <template slot-scope="scope">
                <span v-for="(v, i) in scope.row.cards" :key="i">
                  <img :src="'../../../static/poker/Card_'+v+'.png'" alt width="40px" />
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="ctime" label="时间" align="center">
              <template slot-scope="scope">{{scope.row.ctime?(scope.row.ctime): ""}}</template>
              <!--              <template slot-scope="scope">{{scope.row.ctime?formatTime(scope.row.ctime): ""}}</template>-->
            </el-table-column>
          </el-table>
        </div>
        <div class="box-footer clearfix">
          <el-col class="toolbar">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :page-size="params.limit"
              :page-sizes="[20,30,50,100, 200, 300, 400,1000,5000,10000]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.total"
              :current-page.sync="params.page"
              style="float:right;"
            ></el-pagination>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时时乐押注" name="yz">
        <div class="filter">
          <el-form :inline="true">
            <el-form-item label="用户ID">
              <el-input placeholder="用户ID" v-model="params.gid"></el-input>
            </el-form-item>
            <el-form-item label="时时乐ID">
              <el-input placeholder="时时乐ID" v-model="params.sslid"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="params.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
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
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="uid" label="用户ID" width="300" align="center">
              <template slot-scope="scope">
                <span
                  class="link-type"
                  @click="viewuser(scope.row)"
                >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
                <br />
                <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
              </template>
            </el-table-column>
            <el-table-column prop="sslid" label="时时乐ID" align="center">
              <template slot-scope="scope">
                <span class="link-type" @click="viewtable(scope.row)">时时乐ID: {{scope.row.sslid}}查看此局</span>
              </template>
            </el-table-column>
             <el-table-column prop="sanyzje" label="单牌押注数" align="center"></el-table-column>
            <el-table-column prop="dzyzs" label="对子押注" align="center"></el-table-column>
            <el-table-column prop="szyzs" label="顺子押注" align="center"></el-table-column>
            <el-table-column prop="jhyzs" label="金花押注" align="center"></el-table-column>
            <el-table-column prop="sjyzs" label="顺金押注" align="center"></el-table-column>
            <el-table-column prop="bzyzs" label="豹子押注" align="center"></el-table-column>
            <el-table-column prop="3Ayzs" label="3A押注" align="center"></el-table-column>
            <el-table-column prop="ctime" label="时间" align="center">
              <template slot-scope="scope">{{scope.row.ctime?formatTime(scope.row.ctime): ""}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="box-footer clearfix">
          <el-col class="toolbar">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :page-size="params.limit"
              :page-sizes="[20,30,50,100, 200, 300, 400,1000,5000,10000]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.total"
              :current-page.sync="params.page"
              style="float:right;"
            ></el-pagination>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时时乐返奖" name="fj">
        <div class="filter">
          <el-form :inline="true">
            <el-form-item label="用户ID">
              <el-input placeholder="用户ID" v-model="params.gid"></el-input>
            </el-form-item>
            <el-form-item label="时时乐ID">
              <el-input placeholder="时时乐ID" v-model="params.sslid"></el-input>
            </el-form-item>
            <el-form-item label="中奖类型">
              <el-select v-model="params.types" placeholder="请选择" clearable>
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
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
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
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
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="uid" label="用户ID" width="300" align="center">
              <template slot-scope="scope">
                <span
                  class="link-type"
                  @click="viewuser(scope.row)"
                >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
                <br />
                <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
              </template>
            </el-table-column>
            <el-table-column prop="sslid" label="时时乐ID" align="center">
              <template slot-scope="scope">
                <span class="link-type" @click="viewtable(scope.row)">时时乐ID: {{scope.row.sslid}}查看此局</span>
              </template>
            </el-table-column>
            <el-table-column prop="types" label="中奖类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.types === 1">235</span>
                <span v-else-if="scope.row.types === 2">散牌</span>
                <span v-else-if="scope.row.types === 3">对子</span>
                <span v-else-if="scope.row.types === 4">金花</span>
                <span v-else-if="scope.row.types === 5">顺子</span>
                <span v-else-if="scope.row.types === 6">顺金</span>
                <span v-else-if="scope.row.types === 7">豹子</span>
                <span v-else-if="scope.row.types === 8">3a</span>
                <span v-else>{{scope.row.types}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="coins" label="金额" align="center"></el-table-column>
            <el-table-column prop="ctime" label="时间" align="center">
              <template slot-scope="scope">{{scope.row.ctime?formatTime(scope.row.ctime): ""}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="box-footer clearfix">
          <el-col class="toolbar">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :page-size="params.limit"
              :page-sizes="[20,30,50,100, 200, 300, 400,1000,5000,10000]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.total"
              :current-page.sync="params.page"
              style="float:right;"
            ></el-pagination>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="押注/返奖" name="hz">
        <div class="filter">
          <el-form :inline="true">
            <el-form-item label="用户ID">
              <el-input placeholder="用户ID" v-model="params.gid"></el-input>
            </el-form-item>
            <el-form-item label="时时乐ID">
              <el-input placeholder="时时乐ID" v-model="params.sslid"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="params.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
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
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="uid" label="用户ID" width="300" align="center">
              <template slot-scope="scope">
                <span
                  class="link-type"
                  @click="viewuser(scope.row)"
                >gid:{{scope.row.uid}},name:{{scope.row.name}}</span>
                <br />
                <span class="link-type" @click="viewuserlogs(scope.row)">查看此人日志</span>
              </template>
            </el-table-column>
            <el-table-column prop="sslid" label="时时乐ID" align="center">
              <template slot-scope="scope">
                <span class="link-type" @click="viewtable(scope.row)">时时乐ID: {{scope.row.sslid}}查看此局</span>
              </template>
            </el-table-column>
            <el-table-column prop="sanyzs" label="单牌押注数" align="center"></el-table-column>
            <el-table-column prop="dzyzje" label="对子押注数" align="center"></el-table-column>
            <el-table-column prop="szyzje" label="顺子押注数" align="center"></el-table-column>
            <el-table-column prop="jhyzje" label="金花押注数" align="center"></el-table-column>
            <el-table-column prop="sjyzje" label="顺金押注数" align="center"></el-table-column>
            <el-table-column prop="bzyzje" label="豹子押注数" align="center"></el-table-column>
            <el-table-column prop="3Ayzje" label="3A押注数" align="center"></el-table-column>
            <el-table-column prop="fjjj" label="返奖奖金" align="center"></el-table-column>
            <el-table-column prop="ctime" label="时间" align="center">
              <template slot-scope="scope">{{scope.row.ctime?formatTime(scope.row.ctime): ""}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="box-footer clearfix">
          <el-col class="toolbar">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :page-size="params.limit"
              :page-sizes="[20,30,50,100, 200, 300, 400,1000,5000,10000]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.total"
              :current-page.sync="params.page"
              style="float:right;"
            ></el-pagination>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { sslrecord, sslyz, sslfj, sslhz } from "@/api/kefu";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      params: {
        sslid: undefined,
        time: [],
        page: 1,
        limit: 30,
        types: undefined
      },
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      changeTypes: undefined,
      tabvalue: "index",
      tabindex: 0,
      tabOptions: [
        { label: "时时乐记录" },
        { label: "时时乐押注" },
        { label: "时时乐返奖" },
        { label: "押注/返奖" }
      ],
      statusOptions: [
        {
          label: "235",
          value: 1
        },
        {
          label: "散牌",
          value: 2
        },
        {
          label: "对子",
          value: 3
        },
        {
          label: "金花",
          value: 4
        },
        {
          label: "顺子",
          value: 5
        },
        {
          label: "顺金",
          value: 6
        },
        {
          label: "豹子",
          value: 7
        },
        {
          label: "3a",
          value: 8
        }
      ],
      tabClick: () => {}
    };
  },
  created() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      console.log(key);
      if (key == 13) {
        lett.searchData();
      }
    };
  },
  methods: {
    viewuser(row) {
      sessionStorage.setItem("gid", row.uid);
      this.$router.push({ name: "profit", params: { gid: row.uid } });
    },
    viewYz(row) {
      this.params.sslid = row.ssl_id;
      this.tabindex = 1;
      this.initData();
    },
    viewFj(row) {
      this.params.sslid = row.ssl_id;
      this.tabindex = 2;
      this.initData();
    },
    viewHz(row) {
      this.params.sslid = row.ssl_id;
      this.tabindex = 3;
      this.initData();
    },
    viewuserlogs(row) {
      this.$router.push({ name: "金币变化日志", params: { gid: row.uid } });
      this.initData();
    },
    viewtable(row) {
      this.$router.push({ name: "金币变化日志", params: { ext1: row.sslid } });
    },
    formatTime(time) {
      return parseTime(time);
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
    handleClick(tab, event) {
      this.tabindex = tab.index;
      console.log(this.tabindex);
      this.initData();
      this.listLoading = true;
    },
    initData() {
      this.listLoading = true;
      if (this.params.time === null) {
        this.params.time = [];
      }
      console.log("params", this.params);
      if (this.tabindex == 0) {
        this.tabvalue = "index";
        sslrecord(this.params).then(res => {
          if (res && res.data.length > 0) {
            res.data[0].forEach((item, index) => {
              item.cards = item.cards.split("|");
            });
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.listLoading = false;
          }
        });
      } else if (this.tabindex == 1) {
        this.tabvalue = "yz";
        sslyz(this.params).then(res => {
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.listLoading = false;
          }
        });
      } else if (this.tabindex == 2) {
        this.tabvalue = "fj";
        sslfj(this.params).then(res => {
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.listLoading = false;
          }
        });
      } else if (this.tabindex == 3) {
        this.tabvalue = "hz";
        sslhz(this.params).then(res => {
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.tableData.total = res.data[1][0].count;
            this.listLoading = false;
          }
        });
      }
    }
  },
  mounted() {
    // this.params = this.$route.params;
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

