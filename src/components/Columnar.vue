<template>
  <div class="mybar" ref="mybar"></div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "Columnar",
  props: ["titleText", "dataX", "dataList", "dataLegend"],
  data: function() {
    return {
      myChart: null
    };
  },
  watch: {
    dataX: function() {
      // window.console.log("colunmar watch dataList:" + this.dataList);
      this.myChart.setOption(this.myOption);
    }
  },
  methods: {
    initChart: function() {
      // window.console.log("colunmar initChart 调用");
      this.myChart.setOption(this.myOption);
    }
  },
  mounted: function() {
    this.myChart = echarts.init(this.$refs.mybar, "dark");
    this.myChart.setOption(this.myOption);
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  computed: {
    myOption() {
      // window.console.log("colunmar Option computed");
      return {
        grid: {
          left: "9%",
          right: "2%",
          bottom: "10%",
          top: "10%"
        },
        title: {
          show:false,
          text: this.titleText,
          left: "left"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // orient: "vertical",
          x: "right",
          data: this.dataLegend
        },
        xAxis: {
          // name:'中间件',
          // nameLocation:'end',
          type: "category",
          data: this.dataX
        },
        yAxis: {
                   type: "value",
          splitLine: {
            show: false
          },
        },
         backgroundColor:'#000',
        series: this.dataList
      };
    }
  }
};
</script>

<style scoped>
.mybar {
  width: 100%;
  height: 100%;
  /* display: inline-block; */
}
</style>