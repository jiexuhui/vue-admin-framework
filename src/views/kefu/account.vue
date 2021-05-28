<template>
  <div class="app-container">
    <div class="filter">
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input v-model="params.uid" placeholder="用户ID"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="params.name" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="账号类型">
          <el-select v-model="params.playertype" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select v-model="params.channel" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelType"
              :key="item.cid"
              :label="item.cname"
              :value="item.cid"
            >
              <span style="float: left">{{ item.cid }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cname }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="params.reg_time"
            :picker-options="pickerOptions"
            :default-time="['00:00:00','23:59:59']"
            type="datetimerange"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button>
          <el-button type="success" style="margin-left: 0" @click="handleExp()">赠送经验</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tableData.data"
      highlight-current-row
      element-loading-text="给我一点时间"
      border
      fit
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
            <el-form-item label="最近登录时间">
              <span>{{ scope.row.last_login }}</span>
            </el-form-item>
            <el-form-item label="token">
              <span>{{ scope.row.token }}</span>
            </el-form-item>
            <el-form-item label="UUID">
              <span>{{ scope.row.op_uuid }}</span>
            </el-form-item>
            <el-form-item label="注册时间">
              <span>{{ scope.row.reg_time }}</span>
            </el-form-item>
            <el-form-item label="最近登录时间">
              <span>{{ scope.row.last_login }}</span>
            </el-form-item>
            <el-form-item label="最近登录IP">
              <span>
                <a :href="'http://ip138.com/ips138.asp?ip='+scope.row.ip_last+'&action=2'">
                  {{ scope.row.ip_last }}
                  <svg-icon icon-class="eye"/>
                </a>
              </span>
            </el-form-item>
            <el-form-item label="注册IP">
              <span>{{ scope.row.ip_reg }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="用户ID" align="center">
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="profit(scope.row)">
            UID:{{ scope.row.uid }},
            <br>
            NAME:{{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="coin" label="金币" align="center"/>
      <el-table-column prop="point" label="钻石" align="center"/>
      <el-table-column prop="vip" label="VIP" align="center"/>
      <el-table-column prop="vipexp" label="VIP经验" align="center"/>
      <el-table-column prop="box" label="保险箱" align="center"/>
      <el-table-column prop="phone" label="手机" align="center"/>
      <!-- <el-table-column prop="device_id" label="设备号"></el-table-column> -->
      <el-table-column prop="regtype" label="注册类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">正常账号</span>
          <span v-else-if="scope.row.type == 1">快速注册</span>
          <span v-else-if="scope.row.type == 2">手机号注册</span>
          <span v-else-if="scope.row.type == 3">SDK 登录</span>
          <span v-else-if="scope.row.type == 4">SDK 登录</span>
          <span v-else-if="scope.row.type == 5">密码登录</span>
          <span v-else-if="scope.row.type == 6">机器人</span>
          <span v-else/>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="token" label="token"></el-table-column> -->
      <!-- <el-table-column prop="op_uuid" label="uuid"></el-table-column> -->
      <el-table-column prop="type" label="账号类型" align="center">
        <template slot-scope="scope">
          <span
            v-for="item in typeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span v-if="scope.row.type === item.value">{{ item.label }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="cname" label="注册渠道号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cid }}:{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="reg_time" label="注册时间"></el-table-column>
      <el-table-column prop="last_login" label="最近登录时间"></el-table-column>-->
      <!-- <el-table-column prop="ip_last" label="最近登录ip">
        <template slot-scope="scope">
          {{scope.row.ip_last}}
          <a
            :href="'http://ip138.com/ips138.asp?ip='+scope.row.ip_last+'&action=2'"
          >
            <svg-icon icon-class="eye"/>
          </a>
        </template>
      </el-table-column>-->
      <el-table-column prop="status" label="状态" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status == 1" type="danger">封号中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="role=='admin'"
            size="mini"
            type="info"
            style="margin-left: 0"
            @click="handleEdit(scope.row)"
          >编辑
          </el-button>
          <el-button size="mini" type="primary" style="margin-left: 0" @click="profit(scope.row)">查看</el-button>
          <el-button
            v-if="scope.row.status === 0"
            size="mini"
            type="danger"
            style="margin-left: 0"
            @click="handleKickout(scope.row)"
          >封号
          </el-button>
          <el-button
            v-else-if="scope.row.status === 1"
            size="mini"
            type="warning"
            style="margin-left: 0"
            @click="handleKickout(scope.row)"
          >解封
          </el-button>
          <el-button
            size="mini"
            type="success"
            style="margin-left: 0"
            @click="handleSendgift(scope.row)"
          >礼包
          </el-button>
          <el-button
            size="mini"
            type="info"
            style="margin-left: 0"
            @click="viewuserlogs(scope.row)"
          >金币
          </el-button>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 0"
            @click="viewuserLoginlogs(scope.row)"
          >登录
          </el-button>
          <el-button
            size="mini"
            type="warning"
            style="margin-left: 0"
            @click="viewuserRecharge(scope.row)"
          >订单
          </el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="success"-->
<!--            style="margin-left: 0"-->
<!--            @click="viewuserBanklogs(scope.row)"-->
<!--          >转账-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="box-footer clearfix">
      <el-col class="toolbar">
        <el-pagination
          :page-size="params.pagesize"
          :total="tableData.total"
          :current-page.sync="params.pageindex"
          layout="total, sizes, prev, pager, next, jumper"
          style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </el-col>
    </div>
    <!-- 编辑个人信息Form -->
    <el-dialog :title="editParams.title" :visible.sync="dialogFormVisible">
      <el-form ref="editParams" :model="editParams" :rules="editrules">
        <el-form-item prop="name" label="用户昵称">
          <el-input v-model="editParams.name" auto-complete="off"/>
        </el-form-item>
        <el-form-item prop="name" label="VIP">
          <el-input v-model="editParams.vip" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="金币" prop="coin">
          <el-input v-model="editParams.coin" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="钻石" prop="point">
          <el-input v-model="editParams.point" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="保险箱" prop="box">
          <el-input v-model="editParams.box" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="账号类型">
          <el-select v-model="editParams.type" placeholder="请选择">
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <label v-if="editParams.robotTag == 0">玩家</label>
          <label v-if="editParams.robotTag == 1">小R</label>
          <label v-if="editParams.robotTag == 2">中R</label>
          <label v-if="editParams.robotTag == 3">大R</label>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="editParams.status">
            <el-option
              v-for="item in statusoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="重置银行密码">
          <el-button type="primary" @click="doResetBoxpassword()">重置银行密码</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEdit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 赠送经验Form -->
    <el-dialog :title="expParams.title" :visible.sync="expFormVisible">
      <el-form ref="expParams" :model="expParams" :rules="exprules">
        <el-form-item label="useId">
          <el-input v-model="expParams.uid" auto-complete="off" type="number"/>
        </el-form-item>
        <el-form-item label="赠送经验" prop="sendexp">
          <el-input
            v-model="expParams.sendexp"
            :disabled="!showExp"
            type="number"
            auto-complete="off"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="expFormVisible = false">取 消</el-button>
        <el-button :disabled="expBtn" type="primary" @click="doSendExp()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 赠送礼包Form -->
    <el-dialog :title="giftParams.title" :visible.sync="giftdialogFormVisible">
      <el-form ref="giftParams" :model="giftParams">
        <el-form-item prop="name" label="用户昵称">
          <el-input v-model="giftParams.name" :disabled="true" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="金币" prop="coin">
          <el-input v-model="giftParams.coin" :disabled="true" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="钻石" prop="point">
          <el-input v-model="giftParams.point" :disabled="true" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="礼包">
          <el-select v-model="giftParams.giftid" placeholder="请选择" @change="handlGifttips()">
            <el-option
              v-for="item in giftlist"
              :key="item.id"
              :label="item.pkg_name"
              :value="item.id"
            />
          </el-select>
          {{ tips }}
        </el-form-item>
        <el-form-item label="邮件标题" prop="mailtitle">
          <el-input v-model="giftParams.mailtitle"/>
        </el-form-item>
        <el-form-item label="邮件内容" prop="mailcontent">
          <el-input v-model="giftParams.mailcontent" type="textarea"/>
        </el-form-item>
        <label class="el-form-item__label" style="color:red">* 示例：系统管理员给您发送了游戏豆*xxxxx</label>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giftdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSendgift()">赠 送</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
  import {
    accounts,
    editaccount,
    kickout,
    giftlist,
    sendgift,
    gifttips,
    sendExp,
    resetBoxpassword,
    accountstatal
  } from "@/api/account";
  import {browser, quickDate, currentUser} from "@/utils/tools";

  export default {
    data() {
      return {
        params: {
          uid: undefined,
          username: "",
          time: [],
          channel: undefined,
          pageindex: 1,
          pagesize: 20,
          playertype: undefined
        },
        channelType: [],
        listLoading: false,
        tableData: {
          total: 0,
          data: []
        },
        editParams: {
          title: "",
          uid: undefined,
          name: "",
          vip: 0,
          coin: 0,
          status: 0,
          type: 0,
          playertype: 0
        },
        giftParams: {
          title: "赠送礼包",
          uid: undefined,
          name: "",
          coin: 0,
          giftid: undefined,
          pkg_props: "",
          gcoin: 0,
          mailtitle: "",
          mailcontent: "",
          point: 0,
          addpoint: 0
        },
        tips: "",
        pickerOptions: quickDate,
        dialogFormVisible: false,
        expFormVisible: false,
        giftdialogFormVisible: false,
        expParams: {
          sendexp: 400
        },
        editrules: {
          name: [
            {
              required: true,
              message: "请输入昵称",
              trigger: "blur"
            }
          ]
        },
        exprules: {},
        statusoptions: [
          {
            label: "正常",
            value: 0
          },
          {
            label: "封号中",
            value: 1
          }
        ],
        typeoptions: [
          {
            label: "正常账号",
            value: 0
          },
          {
            label: "陪玩账号",
            value: 1
          },
          {
            label: "机器人",
            value: 2
          }
        ],
        // pleyertypeOptions: [
        //   {
        //     label: "正常账号",
        //     value: 0
        //   },
        //   {
        //     label: "正常账号2",
        //     value: 1
        //   }
        // ],
        giftlist: [],
        showExp: true,
        expBtn: false
      };
    },
    created() {
      var lett = this;
      document.onkeydown = function (e) {
        var key = window.event.keyCode;
        // console.log(key);
        if (key == 13) {
          lett.searchData();
        }
      };
      this.role = this.$store.getters.roles;
      this.showExp = this.role == "admin";
      console.log("showExp:", this.showExp);
    },
    mounted() {
      console.log("route,", this.$route.params);
      if (this.$route.params.uid) this.params = this.$route.params;
      this.initData();
    },
    methods: {
      profit(row) {
        sessionStorage.setItem("uid", row.uid);
        sessionStorage.setItem("status", row.status);
        this.$router.push({name: "profit"});
        // this.$router.push({ name: "profit", params: {uid: row.uid} });
      },
      viewuserlogs(row) {
        this.$router.push({name: "金币变化日志", params: {gid: row.uid}});
      },
      viewuserLoginlogs(row) {
        this.$router.push({name: "登录日志", params: {gid: row.uid}});
      },
      viewuserRecharge(row) {

        this.$router.push({name: "订单", params: {gid: row.uid}});
      },
      viewuserBanklogs(row) {
        this.$router.push({name: "logBoxTransfer", params: {uid: row.uid}});
      },

      handlePageChange(val) {
        this.params.pageindex = val;
        this.initData();
      },
      handleSizeChange(val) {
        this.params.pagesize = val;
        this.initData();
      },
      searchData() {
        this.params.pageindex = 1;
        this.initData();
      },
      handleEdit(row) {
        this.$refs.editParams && this.$refs.editParams.resetFields();
        // 记录数据
        this.editParams = Object.assign({}, row);
        this.editParams.title = "修改：" + row.uid;
        this.editParams.coinBefore = row.coin;
        this.editParams.pointBefore = row.point;
        this.editParams.boxBefore = row.box;
        // 显示弹窗
        this.dialogFormVisible = true;
      },
      handleSendgift(row) {
        this.$refs.giftParams && this.$refs.giftParams.resetFields();
        // 记录数据
        this.giftParams = row;
        this.giftParams.title = "赠送礼包：" + row.uid;
        this.giftdialogFormVisible = true;
      },
      handleExp(row) {
        this.$refs.expParams && this.$refs.expParams.resetFields();
        // 记录数据
        this.expParams.title = "赠送经验";
        this.expFormVisible = true;
      },
      doSendExp() {
        console.log(this.expParams);
        sendExp(this.expParams)
          .then(res => {
            if (res.code === 200) {
              if (res.data.code == 10003) {
                this.$message.error(`用户不存在`);
                return;
              }
              this.expBtn = true;
              setTimeout(() => {
                this.expBtn = false;
              }, 2000);
              for (const v of this.tableData.data) {
                if (v.uid === this.expParams.uid) {
                  this.expParams.vip = res.data.vip;
                  this.expParams.vipexp = res.data.vipexp;
                  console.log("this.editParams", this.expParams);
                  const index = this.tableData.data.indexOf(v);
                  this.tableData.data.splice(index, 1, this.expParams);
                  break;
                }
              }
              // this.expFormVisible = false;
              this.$message.success(`修改成功`);
            } else {
              this.$message.error(`修改失败`);
            }
            this.dialogFormVisible = false;
          })
          .catch(err => {
            this.$message.error(`修改失败:${err}`);
          });
      },
      handlGifttips() {
        console.log(this.giftParams.giftid);
        for (const item of this.giftlist) {
          if (item.id === this.giftParams.giftid) {
            this.giftParams.gcoin = item.coin;
            this.giftParams.addpoint = item.points;
            this.giftParams.pkg_props = item.pkg_props;
            let kprop = "";
            item.pkg_props = item.pkg_props == "" ? "{}" : item.pkg_props;
            if (item.pkg_props) {
              this.giftParams.pkg_props = item.pkg_props;
              const kdesc = JSON.parse(item.pkg_props);
              console.log("kdescaa::", kdesc);
              this.tips = kprop + "金币：" + item.coin + ";钻石：" + item.points + ";兑换券：" + item.prizeTicket;
              if (kdesc !== "{}") {
                for (const key in kdesc) {
                  gifttips(kdesc[key].item_id).then(res => {
                    console.log("data>>", res.data.prop_name);
                    kprop =
                      kprop +
                      res.data.prop_name +
                      ":" +
                      kdesc[key].item_num +
                      ";";
                    this.tips =
                      kprop + "金币：" + item.coin + ";钻石：" + item.points + ";兑换券：" + item.prizeTicket;
                  });
                }
              }
            }
            console.log("this.tips::", this.tips);
            break;
          }
        }
      },
      doResetBoxpassword() {
        resetBoxpassword(this.editParams).then(res => {
          if (res.code === 200) {
            this.$message.success(`重置成功`);
          }
        });
      },
      doEdit() {
        editaccount(this.editParams)
          .then(res => {
            if (res.data[0].resCode === 1) {
              for (const v of this.tableData.data) {
                if (v.uid === this.editParams.uid) {
                  console.log("this.editParams", this.editParams);
                  const index = this.tableData.data.indexOf(v);
                  this.tableData.data.splice(index, 1, this.editParams);
                  break;
                }
              }
              this.dialogFormVisible = false;
              this.$message.success(`修改成功`);
            } else {
              this.$message.error(`修改失败`);
            }
            this.dialogFormVisible = false;
          })
          .catch(err => {
            this.$message.error(`修改失败:${err}`);
          });
      },
      doSendgift() {
        sendgift(this.giftParams)
          .then(res => {
            this.giftdialogFormVisible = false;
            this.giftParams.coin = res.data[0].coin;
            this.giftParams.point = res.data[0].point;
            this.$message.success(`赠送成功`);
          })
          .catch(err => {
            this.$message.error(`修改失败:${err}`);
          });
      },
      handleKickout(row) {
        row.status = row.status === 1 ? 0 : 1;
        kickout(row).then(res => {
          this.$message.success(`操作成功`);
        });
      },
      initData() {
        this.listLoading = true;
        if (this.params.reg_time === null) {
          this.params.reg_time = [];
        }
        this.params.role = this.role;
        accounts(this.params)
          .then(res => {
            console.log("res:", res);
            if (res && res.data.length > 0) {
              this.tableData.data = res.data[0];
              this.channelType = res.data[1];
              this.giftlist = res.data[2];
            }
            this.listLoading = false;
          })
          .catch(err => {
            this.$message.error(`获取信息失败:${err}`);
            this.listLoading = false;
          });

        accountstatal(this.params)
          .then(res => {
            console.log("res:", res);
            if (res && res.data.length > 0) {
              this.tableData.total = res.data[0].count;
            }
          })
          .catch(err => {
            this.$message.error(`获取账号总数失败:${err}`);
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>

