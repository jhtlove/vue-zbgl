<template>
  <div class="mypie" ref="mypie"></div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "PieChart2",
  props: ["indexName", "dataList", "dataLegend"],
  data: function() {
    return {
      myChart: null
    };
  },
  methods: {
    initChart: function() {
      window.console.log("init pie2 Chart 调用");
      this.myChart = echarts.init(this.$refs.mypie, "dark");
      this.myChart.setOption(this.myOption);
    }
  },
  watch: {
    dataList:function(){
      window.console.log("watch pie dataList ");
       this.myChart = echarts.init(this.$refs.mypie);
      this.myChart.setOption(this.myOption);
    }
  },
  mounted: function() {
    this.myChart = echarts.init(this.$refs.mypie, "dark");
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
      window.console.log("pie2 Option computed");
      return {
        // grid: {
        //   left: "1%",
        //   right: "1%",
        //   bottom: "1%",
        //   containLabel: true
        // },
        title: {
          text: this.indexName,
          left: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{c}({d}%)"
        },
        legend: {
          show: false,
          orient: "vertical",
          x: "right",
          data: this.dataLegend
        },
        series: [
          {
            name: this.indexName,
            type: "pie",
            center: ["50%", "55%"],
            radius: [0, "80%"],
            label: {
              normal: {
                position: "inside",
                formatter: "{b}  "
              }
            },
            data: this.dataList
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.mypie {
  width: 100%;
  height: 100%;
  /* display: inline-block; */
}
</style>