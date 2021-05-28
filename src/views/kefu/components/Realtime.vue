<template>
  <div id="myChart1" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { dodaylive } from "@/api/account";
const animationDuration = 6000;

export default {
  components: { dodaylive },
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {
      gid: 0,
      chart: null,
      aaa: []
    };
  },
  created() {
    this.gid = sessionStorage.getItem("uid");
    this.drawLine();
  },
  activated() {
    this.gid = sessionStorage.getItem("uid");
    this.drawLine();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      this.gid = sessionStorage.getItem("uid");
      dodaylive({ gid: this.gid }).then(res => {
        const date = res.data;
        let obj = {};
        for (const i of date) {
          for (const j of i) {
            Object.assign(obj, j);
          }
        }
        let arr = Object.values(obj);
        myChart.setOption({
          tooltip: {},
          xAxis: {
            type: "category",
            data: [
              "金币净盈利",
              "钻石净盈利",
              "奖券净盈利",
              "今日即开赛次数",
              "今日王座次数"
            ]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: arr, //数据
              type: "bar",
              barWidth: 40, //柱图宽度
              itemStyle: {
                normal: {
                  //这里是重点
                  color: function(params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = [
                      "#c23531",
                      "#2f4554",
                      "#61a0a8",
                      "#d48265",
                      "#91c7ae",
                      "#749f83",
                      "#ca8622"
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ],
          grid: {
            left: "0%",
            right: "0%",
            bottom: "0%",
            top: "5%",
            containLabel: true
          }
        });
        myChart.on("click", params => {
          switch (params.name) {
            case "金币净盈利":
              this.$router.push({
                name: "金币变化日志",
                params: { gid: this.gid }
              });
              break;
            case "钻石净盈利":
              this.$router.push({
                name: "钻石变化日志",
                params: { gid: this.gid }
              });
              break;
            case "奖券净盈利":
              this.$router.push({
                name: "奖券变化日志",
                params: { gid: this.gid }
              });
              break;
            case "今日即开赛次数":
              alert("4");
              break;
            case "今日王座次数":
              alert("5");
              break;
            default:
              break;
          }
        });
      });
    }
  }
};
</script>
