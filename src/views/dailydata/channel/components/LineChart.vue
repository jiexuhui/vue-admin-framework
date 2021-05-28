<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import CountTo from "vue-count-to";

export default {
    components: {
        CountTo
    },
  props: {
    className: {
      type: String,
      default: "chart"
    },
      boxdata: {
          type: Object,
          required: true
      },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    },
    date: {
      type: Array
    },
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }

    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);

    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions({ totalreg, regactive, activenum, totalfee, pnum, up } = {}) {
      this.chart.setOption({
          color: ['#3398DB'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  data : ['新增用户', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',],
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
        legend: {
          data: [
            "新增用户",
            "注册活跃",
            "活跃人数",
            "充值总数",
            "充值人数",
            "充值UP"
          ]
        },
        series: [
          {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
          },
          {
            name: "注册活跃",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: regactive,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          },
          {
            name: "活跃人数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#11ca58",
                lineStyle: {
                  color: "#11ca58",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: activenum,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          },
          {
            name: "充值总数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3a0fd8",
                lineStyle: {
                  color: "#3a0fd8",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: totalfee,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          },
          {
            name: "充值人数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#9286bd",
                lineStyle: {
                  color: "#9286bd",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: pnum,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          },
          {
            name: "充值UP",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#f1f51e",
                lineStyle: {
                  color: "#f1f51e",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: up,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  }
};
</script>
