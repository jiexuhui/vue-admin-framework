<template>
  <div id="myChart" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { statistics } from "@/api/account";
const animationDuration = 6000;

export default {
  components: { statistics },
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
      ipData: "",
      goods: {}
    };
  },
  created() {
    this.drawLine();
    this.gid = sessionStorage.getItem("uid");
  },
  activated() {
    this.drawLine();
    this.gid = sessionStorage.getItem("uid");
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.gid = sessionStorage.getItem("uid");
      statistics({ gid: this.gid }).then(res => {
        const data = res.data;
        myChart.setOption({
          // title: {
          //   text: "暂无数据",
          //   x: "center",
          //   y: "center",
          //   textStyle: {
          //     color: "red",
          //     fontWeight: "normal",
          //     fontSize: 16
          //   }
          // },
          tooltip: {},
          dataset: {
            dimensions: ["product", "累计参与次数", "获奖次数"],
            source: [
              {
                product: "王座",
                累计参与次数: data[0][0].war_Cumulative,
                获奖次数: data[0][0].war_Number
              },
              {
                product: "即开赛",
                累计参与次数: data[0][0].time_Cumulative,
                获奖次数: data[0][0].time_Number
              }
            ]
          },
          xAxis: { type: "category" },
          yAxis: {},
          series: [
            {
              type: "bar",
              barWidth: 40,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      "rgb(164,205,238)",
                      "rgb(164,205,238)",
                      "rgb(164,205,238)"
                    ];
                    return colorList[params.dataIndex];
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              type: "bar",
              barWidth: 40,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      "rgb(42,170,227)",
                      "rgb(42,170,227)",
                      "rgb(42,170,227)"
                    ];
                    return colorList[params.dataIndex];
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
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
      });
    }
  }
};
</script>
