<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="ID">
          <el-input placeholder="版本ID" v-model="params.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏">
          <el-select v-model="params.gameid" placeholder="请选择" clearable>
            <el-option
              v-for="item in games"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.id }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="是否已发布">
          <el-select v-model="params.isrelease" placeholder="请选择" clearable>
            <el-option
              v-for="item in releaseoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table highlight-current-row :data="tableData.data"  v-loading="listLoading" element-loading-text="给我一点时间" border fit>
      <el-table-column prop="gid" label="序号" width="80">
         <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="gamename" label="游戏名" width="120">
      </el-table-column>
      <el-table-column prop="asseturl" label="地址" >
      </el-table-column>
      <el-table-column prop="res_ver" label="版本"  width="120">
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_release === 0" size="mini" type="primary" @click="release(scope.row,1)">发布</el-button>
          <el-button v-if="scope.row.is_release === 0" size="mini" type="warning" @click="release(scope.row,2)">BETA</el-button>
          <el-button v-if="scope.row.is_release !== 0" size="mini" type="danger" @click="release(scope.row,0)">
            {{scope.row.is_release == 1?'撤回正式':'撤回beta'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :page-size="params.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          :current-page.sync="params.pageindex" style="float:right;">
        </el-pagination>
      </el-col>
    </div>
  </div>
</template>
<script>
import { gameversions, dorelease } from "@/api/yunying";
export default {
  data() {
    return {
      params: {
        id: undefined,
        gameid: undefined,
        isrelease: undefined,
        page: 1,
        limit: 30
      },
      channelType: [],
      listLoading: false,
      tableData: {
        total: 0,
        data: []
      },
      dialogFormVisible: false,
      releaseoptions: [
        {
          label: "所有",
          value: 0
        },
        {
          label: "发布",
          value: 1
        },
        {
          label: "beta",
          value: 2
        }
      ],
      games: []
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
      gameversions(this.params)
        .then(res => {
          console.log("res:", res);
          if (res && res.data.length > 0) {
            this.tableData.data = res.data[0];
            this.games = res.data[1];
            this.tableData.total = res.data[2][0].count;
          }
          this.listLoading = false;
        })
        .catch(err => {
          this.$message.error(`获取信息失败:${err}`);
          this.listLoading = false;
        });
    },
    release(row, status) {
      dorelease({ id: row.id, isrelease: status })
        .then(res => {
          if (res.code === 200) {
            row.is_release = status;
            this.$message.success(`修改成功`);
          }
        })
        .catch(err => {
          this.$message.error(`操作失败:${err}`);
          this.listLoading = false;
        });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style lang="scss" scoped>
</style>

