<template>
  <div class="mypie" ref="mypie"></div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "PieChart",
  props: ["dataList", "dataLegend"],
  data: function() {
    return {
      myChart: null
    };
  },
  methods: {
    initChart: function() {
      window.console.log("init pie Chart 调用");
      this.myChart = echarts.init(this.$refs.mypie,'dark');
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
    this.myChart = echarts.init(this.$refs.mypie,'dark');
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
      window.console.log("pie Option computed");
      return {
        title: {
          text: "医保未上传",
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
            name: "医保未上传",
            type: "pie",
            center: ["50%", "55%"],
            radius: [0, "80%"],
            label: {
              normal: {
                position: "inside",
                // '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  '
                formatter: "{b|{b}：}{c}",
                // backgroundColor: '#eee',
                // borderColor: '#aaa',
                // borderWidth: 1,
                // borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  // a: {
                  //     color: '#999',
                  //     lineHeight: 22,
                  //     align: 'center'
                  // },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  // hr: {
                  //     borderColor: '#aaa',
                  //     width: '100%',
                  //     borderWidth: 0.5,
                  //     height: 0
                  // },
                  // b: {
                  //     fontSize: 16,
                  //     lineHeight: 33
                  // },
                  // per: {
                  //     color: '#eee',
                  //     backgroundColor: '#334455',
                  //     padding: [2, 4],
                  //     borderRadius: 2
                  // }
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            // labelLine: {
            //   normal: {
            //     show: true
            //   }
            // },
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