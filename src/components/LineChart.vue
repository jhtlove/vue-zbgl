<template>
  <div class="myline" ref="myline"></div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "LineChart",
  props: ["titleText", "dx", "dy1002", "dy1003"],
  data: function() {
    return {
      myChart: null
    };
  },
  watch: {
    dx: function() {
      // window.console.log("watch line chart dx ");
      // this.myChart = echarts.init(this.$refs.myline);
      this.myChart.setOption(this.myOption);
    }
  },
  methods: {
    initChart: function() {
      // window.console.log("LineChart initChart 调用");
      // this.myChart = echarts.init(this.$refs.myline);
      this.myChart.setOption(this.myOption);
    }
  },
  mounted: function() {
    this.myChart = echarts.init(this.$refs.myline, "dark");
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
      // window.console.log("LineChart Option computed");
      return {
        smooth: true,
        grid: {
          left: "5%",
          right: "3%",
          bottom: "5%",
          top: "3%"
        },
        title: {
          show: false,
          text: this.titleText,
          left: "left"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: false,
          orient: "horizontal",
          x: "right",
          data: ['查询次数','增删改次数']
        },
        xAxis: {
          // name:'中间件',
          // nameLocation:'end',
          //    type: 'time',
          // show:false,

          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
            // ,
            // formatter: function(value) {
            //   // 不能定义成method再去 this. 调用！
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
          },
          type: "category",
          boundaryGap: false,
          data: this.dx
        },
        yAxis: {
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          type: "value"
        },
        color:['#00ff00', '#0000ff'],
        backgroundColor:'#000',
        series: [
          
          {
            name:'查询次数',
            type:'line',
            data:this.dy1002
          }, 
          {
            name:'增删改次数',
            type:'line',
            data:this.dy1003
          }
        ]
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