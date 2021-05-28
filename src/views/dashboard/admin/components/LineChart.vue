<!--<template>-->
<!--  <div :class="className" :style="{height:height,width:width}"></div>-->
<!--</template>-->

<!--<script>-->
<!--import echarts from "echarts";-->
<!--require("echarts/theme/macarons"); // echarts theme-->
<!--import { debounce } from "@/utils";-->

<!--export default {-->
<!--  props: {-->
<!--    className: {-->
<!--      type: String,-->
<!--      default: "chart"-->
<!--    },-->
<!--    width: {-->
<!--      type: String,-->
<!--      default: "100%"-->
<!--    },-->
<!--    height: {-->
<!--      type: String,-->
<!--      default: "350px"-->
<!--    },-->
<!--    autoResize: {-->
<!--      type: Boolean,-->
<!--      default: true-->
<!--    },-->
<!--    chartData: {-->
<!--      type: Object-->
<!--    },-->
<!--    date: {-->
<!--      type: Array-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      chart: null-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.initChart();-->
<!--    if (this.autoResize) {-->
<!--      this.__resizeHanlder = debounce(() => {-->
<!--        if (this.chart) {-->
<!--          this.chart.resize();-->
<!--        }-->
<!--      }, 100);-->
<!--      window.addEventListener("resize", this.__resizeHanlder);-->
<!--    }-->

<!--    // 监听侧边栏的变化-->
<!--    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];-->
<!--    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    if (!this.chart) {-->
<!--      return;-->
<!--    }-->
<!--    if (this.autoResize) {-->
<!--      window.removeEventListener("resize", this.__resizeHanlder);-->
<!--    }-->

<!--    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];-->
<!--    sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);-->

<!--    this.chart.dispose();-->
<!--    this.chart = null;-->
<!--  },-->
<!--  watch: {-->
<!--    chartData: {-->
<!--      deep: true,-->
<!--      handler(val) {-->
<!--        this.setOptions(val);-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    setOptions({ totalreg, regactive, activenum, totalfee, pnum, up } = {}) {-->
<!--      this.chart.setOption({-->
<!--        xAxis: {-->
<!--          data: this.date,-->
<!--          boundaryGap: false,-->
<!--          axisTick: {-->
<!--            show: false-->
<!--          }-->
<!--        },-->
<!--        grid: {-->
<!--          left: 10,-->
<!--          right: 10,-->
<!--          bottom: 20,-->
<!--          top: 30,-->
<!--          containLabel: true-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: "axis",-->
<!--          axisPointer: {-->
<!--            type: "cross"-->
<!--          },-->
<!--          padding: [5, 10]-->
<!--        },-->
<!--        yAxis: {-->
<!--          axisTick: {-->
<!--            show: false-->
<!--          }-->
<!--        },-->
<!--        legend: {-->
<!--          data: [-->
<!--            "新增用户",-->
<!--            "注册活跃",-->
<!--            "活跃人数",-->
<!--            "充值总数",-->
<!--            "充值人数",-->
<!--            "充值UP"-->
<!--          ]-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: "新增用户",-->
<!--            itemStyle: {-->
<!--              normal: {-->
<!--                color: "#FF005A",-->
<!--                lineStyle: {-->
<!--                  color: "#FF005A",-->
<!--                  width: 2-->
<!--                }-->
<!--              }-->
<!--            },-->
<!--            smooth: true,-->
<!--            type: "line",-->
<!--            data: totalreg,-->
<!--            animationDuration: 2800,-->
<!--            animationEasing: "cubicInOut"-->
<!--          },-->
<!--          {-->
<!--            name: "注册活跃",-->
<!--            smooth: true,-->
<!--            type: "line",-->
<!--            itemStyle: {-->
<!--              normal: {-->
<!--                color: "#3888fa",-->
<!--                lineStyle: {-->
<!--                  color: "#3888fa",-->
<!--                  width: 2-->
<!--                },-->
<!--                areaStyle: {-->
<!--                  color: "#f3f8ff"-->
<!--                }-->
<!--              }-->
<!--            },-->
<!--            data: regactive,-->
<!--            animationDuration: 2800,-->
<!--            animationEasing: "quadraticOut"-->
<!--          },-->
<!--          {-->
<!--            name: "活跃人数",-->
<!--            smooth: true,-->
<!--            type: "line",-->
<!--            itemStyle: {-->
<!--              normal: {-->
<!--                color: "#11ca58",-->
<!--                lineStyle: {-->
<!--                  color: "#11ca58",-->
<!--                  width: 2-->
<!--                },-->
<!--                areaStyle: {-->
<!--                  color: "#f3f8ff"-->
<!--                }-->
<!--              }-->
<!--            },-->
<!--            data: activenum,-->
<!--            animationDuration: 2800,-->
<!--            animationEasing: "quadraticOut"-->
<!--          },-->
<!--          {-->
<!--            name: "充值总数",-->
<!--            smooth: true,-->
<!--            type: "line",-->
<!--            itemStyle: {-->
<!--              normal: {-->
<!--                color: "#3a0fd8",-->
<!--                lineStyle: {-->
<!--                  color: "#3a0fd8",-->
<!--                  width: 2-->
<!--                },-->
<!--                areaStyle: {-->
<!--                  color: "#f3f8ff"-->
<!--                }-->
<!--              }-->
<!--            },-->
<!--            data: totalfee,-->
<!--            animationDuration: 2800,-->
<!--            animationEasing: "quadraticOut"-->
<!--          },-->
<!--          {-->
<!--            name: "充值人数",-->
<!--            smooth: true,-->
<!--            type: "line",-->
<!--            itemStyle: {-->
<!--              normal: {-->
<!--                color: "#9286bd",-->
<!--                lineStyle: {-->
<!--                  color: "#9286bd",-->
<!--                  width: 2-->
<!--                },-->
<!--                areaStyle: {-->
<!--                  color: "#f3f8ff"-->
<!--                }-->
<!--              }-->
<!--            },-->
<!--            data: pnum,-->
<!--            animationDuration: 2800,-->
<!--            animationEasing: "quadraticOut"-->
<!--          },-->
<!--          {-->
<!--            name: "充值UP",-->
<!--            smooth: true,-->
<!--            type: "line",-->
<!--            itemStyle: {-->
<!--              normal: {-->
<!--                color: "#f1f51e",-->
<!--                lineStyle: {-->
<!--                  color: "#f1f51e",-->
<!--                  width: 2-->
<!--                },-->
<!--                areaStyle: {-->
<!--                  color: "#f3f8ff"-->
<!--                }-->
<!--              }-->
<!--            },-->
<!--            data: up,-->
<!--            animationDuration: 2800,-->
<!--            animationEasing: "quadraticOut"-->
<!--          }-->
<!--        ]-->
<!--      });-->
<!--    },-->
<!--    initChart() {-->
<!--      this.chart = echarts.init(this.$el, "macarons");-->
<!--      this.setOptions(this.chartData);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
