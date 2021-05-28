<template>
  <div class="dashboard-container">
    <component :is="currentRole" :boxdata="boxdata" :recharge="recharge" :tableData="tableData"></component>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import adminDashboard from "./admin";
  import editorDashboard from "./channel";
  import {datatdsummary} from "@/api/dailydata";

  export default {
    name: "dashboard",
    components: {adminDashboard, editorDashboard},
    data() {
      return {
        timer: '',
        boxdata: {},
        tableData: [],
        recharge: {},
        currentRole: "adminDashboard"
      };
    },
    computed: {
      ...mapGetters(["roles"])
    },
    activated() {
      this.handleSetLineChartData();
    },
    created() {
      datatdsummary().then(response => {
        this.currentRole =
            response.crole === 1 ? "adminDashboard" : "editorDashboard";
      });
    },
    methods: {
      handleSetLineChartData() {
        datatdsummary().then(response => {
          this.boxdata = response.realTime[0];
          this.tableData = response.realTime;
          return response
        }).then(res => {
          if (res.code === 200) {
            this.timer = setInterval(() => {
              datatdsummary().then(response => {
                this.boxdata = response.realTime[0];
              })
            }, 10000);
          }
        });
      }
    },
    beforeRouteLeave(to, form, next) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      next()
    }
  };
</script>
