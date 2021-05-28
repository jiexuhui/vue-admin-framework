<template>
  <!-- <div :class="className" :style="{height:height,width:width}"></div> -->
  <div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";

const animationDuration = 6000;

export default {
  props: ["data"],
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
      default: "300px"
    },
    data: { data: "data" }
  },
  data() {
    return {
      datalist: [],
      mycharts: "",
      option: {
        backgroundColor: "#FFFFFF",
        title: {
          //text: '检查企业信息分析'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            //magicType: {show: true, type: ['stack', 'tiled']},
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: ["检查企业数", "完成整改企业数", "违法违规企业数"]
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            //name: '投诉举报数',
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "销量",
            type: "bar",
            data: []
          },
          {
            name: "销量aa",
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  created() {
    this.change();
    this.aa();
  },
  mounted: function() {
    // this.aa();
    this.myChart = echarts.init(document.getElementById("main"));
    this.myChart.setOption(this.option);
  },
  updated() {
    this.aa();
  },
  methods: {
    change: function() {
      var temp = this.option;
      temp.xAxis[0].data = [
        this.data[0].cdate,
        this.data[1].cdate,
        this.data[2].cdate,
        this.data[3].cdate,
        this.data[4].cdate
      ];
      temp.series[0].data = [10, 5, 3, 6, 10, 20];
      temp.series[1].data = [10, 5, 3, 6, 10, 20];
      this.myChart.setOption(temp);
    },
    aa: function() {
      alert("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(this.datalist, "aaaaaaaaaaaaaaa");
    }
  },
  watch: {
    data(val, oldVal) {
      if (val !== oldVal) {
        this.change();
        console.log(this.data, "cccccc");
        var td = this.data;
        this.datalist = td;
      }
    }
  }
};
</script>
