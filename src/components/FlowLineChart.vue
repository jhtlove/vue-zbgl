<template>
  <div class="myline" ref="myline"></div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "LineChart",
  props: ["titleText", "dataX", "dataList", "dataLegend"],
  data: function() {
    return {
      myChart: null
    };
  },
  watch: {
    dataList: function() {
      // this.myChart = echarts.init(this.$refs.myline);
      // window.console.log("watch flow line chart dataList ");
      this.myChart.setOption(this.myOption);
    }
  },
  methods: {
    initChart: function() {
      // this.myChart = echarts.init(this.$refs.myline);
      this.myChart.setOption(this.myOption);
    }
  },
  mounted: function() {
    this.myChart = echarts.init(this.$refs.myline, "dark");
    this.myChart.setOption(this.myOption);
    const that = this;
    this.myChart.getZr().on("click", function(params) {
      // window.alert("点击:" + params.name);
      const pointInPixel = [params.offsetX, params.offsetY];
      if (that.myChart.containPixel("grid", pointInPixel)) {
        var xIndex = that.myChart.convertFromPixel({ seriesIndex: 0 }, [
          params.offsetX,
          params.offsetY
        ])[0];
        // window.alert(xIndex); // 转换的结果，为逻辑坐标值
        that.$emit("click-chat", xIndex);
      }
    });
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
      return {
        smooth: true,
        grid: {
          left: "9%",
          right: "2%",
          bottom: "10%",
          top: "10%"
        },
        title: {
          show: false,
          text: this.titleText,
          left: "left"
        },
        tooltip: {
          trigger: "axis"
          // ,
          // params[0]:
          // axisDim: "x"
          // axisId: "series00"
          // axisIndex: 0
          // axisType: "xAxis.category"
          // axisValue: "06:10"
          // axisValueLabel: "06:10"
          // borderColor: undefined
          // color: "#dd6b66"
          // componentIndex: 0
          // componentSubType: "line"
          // componentType: "series"
          // data: "19.66"
          // dataIndex: 74
          // dataType: undefined
          // name: "06:10"
          // seriesId: "内网流量0"
          // seriesIndex: 0
          // seriesName: "内网流量"
          // seriesType: "line"
          // value: "19.66"
          // formatter:function(params){
          //   window.console.log(params);
          //   return params[0].data;
          // }
        },
        legend: {
          show: true,
          orient: "horizontal",
          x: "right",
          data: this.dataLegend
        },
        xAxis: {
          // axisLabel: {
            // formatter: function(value) {
            //   // 不能定义成method再去 this. 调用！
            //   // tooltip 提示框还是会显示 x 原本的数据
            //   var time = "";
            //   if (!value) return time;
            //   var len = value.length;
            //   if (len >= 4) {
            //     time =
            //       value.substring(len - 4, len - 2) +
            //       ":" +
            //       value.substring(len - 2);
            //   }
            //   return time;
            // }
          // },
          type: "category",
          boundaryGap: false,
          data: this.dataX
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: "{value} MB"
          }
        },
         backgroundColor:'#000',
        series: this.dataList
      };
    }
  }
};
</script>

<style scoped>
.myline {
  width: 100%;
  height: 100%;
  /* display: inline-block; */
}
</style>