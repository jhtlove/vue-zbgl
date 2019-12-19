<template>
  <div id="app">
    <div class="main">
      <div class="left-part">
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.11" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>

          <!-- <Cell title="192.168.3.11" label="业务量：19"/> -->
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.12" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.13" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.14" label="业务量：35">
              <span class="error-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.15" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.16" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.17" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.18" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.19" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <div class="chart-box">
          <CellGroup>
            <Cell title="192.168.3.37" label="业务量：35">
              <span class="success-status" slot="extra"></span>
            </Cell>
          </CellGroup>
        </div>
        <!-- <div class="chart-box" v-for="item in midNormData" :key="item.ipdz">
          <LineChart
            ref="myline"
            titleText="业务量"
            :dx="getLastTimeArr(item.dx)"
            :dy1002="item.dy1002"
            :dy1003="item.dy1003"
          />
        </div>-->
      </div>
      <div class="center-part">
        <div class="top-chart">
          <FlowLineChart
            ref="myline"
            titleText="网络流量"
            :dataX="flowDataX"
            :dataList="flowDataList"
            :dataLegend="flowDataLegend"
            @click-chat="handleClick"
          />
        </div>
        <div class="bottom-chart">
          <Columnar
            titleText="网络流量"
            :dataX="flowBarDataX"
            :dataLegend="flowBarDataLegend"
            :dataList="flowBarDataList"
          />
        </div>
      </div>
      <div class="right-part">
        <List header footer size="small" border>
          <ListItem>
            <!-- <CellGroup> -->

            <!-- class-name="badge" -->
            <span class="text-desc">医保未上传：</span>
            <Badge :count="ybwsc" :type="ybtype" overflow-count="20000" />
          </ListItem>
          <ListItem>
            <!-- class-name="badge" -->
            <span class="text-desc">异常登录：</span>
            <Badge :count="ycdl" :type="ycdltype" slot="extra" overflow-count="20000" />
          </ListItem>
          <ListItem style="display:none">
            <audio ref="ding" controls="controls">
              <source src="./assets/ding.mp3" type="audio/mp3" />
            </audio>
          </ListItem>
          <!-- <ListItem>
            <Button size='small' type="info" @click="play">播放提示音</Button>
          </ListItem>-->
          <!-- <ListItem>123</ListItem> -->
        </List>
      </div>
    </div>
    <div class="bottom">
      <div class="my-carousel">
        <Carousel autoplay loop dots="none" arrow="never" v-model="carouselValue">
          <CarouselItem>
            <div class="carousel-item">1</div>
          </CarouselItem>
          <CarouselItem>
            <div class="carousel-item">2</div>
          </CarouselItem>
          <CarouselItem>
            <div class="carousel-item">3</div>
          </CarouselItem>
          <CarouselItem>
            <div class="carousel-item">4</div>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="time-text">{{timeText}}</div>
    </div>
  </div>
</template>

<script>
import Columnar from "./components/Columnar";
import LineChart from "./components/LineChart";
import FlowLineChart from "./components/FlowLineChart";
import store from "@/util/store.js";
import tube from "@/util/tube.js";
import { Message } from "view-design"; // 引入Message，必须加大括号
export default {
  name: "app",
  data() {
    return {
      carouselValue: 0,
      ybwsc: 0,
      ybtype: "success",
      ycdl: 0,
      ycdltype: "success",
      timeText: "",
      midNormData: [],
      flowDataX: [],
      flowDataLegend: [],
      flowDataList: [],
      flowBarDataX: [],
      flowBarDataLegend: [],
      flowBarDataList: []
    };
  },
  components: {
    [LineChart.name]: LineChart,
    FlowLineChart,
    Columnar,
    [Message.name]: Message
  },
  methods: {
    handleClick(xIndex) {
      //处理折线图点击事件
      var kzrq = this.getKZRQ(this.flowDataX[xIndex]);
      this.queryByKZRQ("10100406", kzrq, this.genFlowColumnarData);
      // window.alert(kzrq);
    },
    getIndexName(zbbm) {
      var indexName = "";
      switch (zbbm) {
        case "1001":
          indexName = "登录异常";
          break;
        case "1002":
          indexName = "查询次数";
          break;
        case "1003":
          indexName = "增删改次数";
          break;
        case "1004":
          indexName = "内网流量";
          break;
        case "1005":
          indexName = "外网流量";
          break;
        case "1010":
          indexName = "内存使用率";
          break;
      }
      return indexName;
    },
    queryByKZRQ: function(busiid, kzrq, callback) {
      var cxtj01 = "";
      if (kzrq) {
        cxtj01 = "KZRQ^" + kzrq;
      } else {
        cxtj01 = "1^1";
      }
      tube
        .http({
          method: "post",
          url: "/EzaYun/HisWs/hisSelect.form",
          data: {
            busiid: busiid,
            ipages: 0,
            irows: 0,
            cxtj01: cxtj01
          },
          headers: {
            token: store.fetch("token")
          }
        })
        .then(res => {
          {
            if (res.state == true) {
              // this.dataList 需要清空？
              var row01 = res.row01;
              callback(row01);
            } else {
              this.play();
              Message.error({
                duration: 3,
                top: 50,
                content: "查询数据失败!"
              });
            }
          }
          // window.console.log(res);
        })
        .catch(function(err) {
          this.play();
          Message.error({
            duration: 3,
            top: 50,
            content: err
          });
          window.console.log(err);
        });
    },
    queryData: function(busiid, zbbm, callback) {
      var cxtj01 = "";
      if (zbbm) {
        cxtj01 = "ZBBM^" + zbbm;
      } else {
        cxtj01 = "1^1";
      }
      tube
        .http({
          method: "post",
          url: "/EzaYun/HisWs/hisSelect.form",
          data: {
            busiid: busiid,
            ipages: 0,
            irows: 0,
            cxtj01: cxtj01
          },
          headers: {
            token: store.fetch("token")
          }
        })
        .then(res => {
          {
            if (res.state == true) {
              // this.dataList 需要清空？
              var row01 = res.row01;
              var indexName = this.getIndexName(zbbm);
              callback(row01, indexName);
            } else {
              this.play();
              Message.error({
                duration: 3,
                top: 50,
                content: "查询数据失败!"
              });
            }
          }
          window.console.log("2.5 true");
          return true;
        })
        .catch(function(err) {
          this.play();
          Message.error({
            duration: 3,
            top: 50,
            content: err
          });
          window.console.log("2.5 false");
          window.console.log(err);
        });
    },
    genYBWSC: function(row01) {
      // this.dataList 需要清空？
      this.ybwsc = parseInt(row01[0].ZBZ);
      if (this.ybwsc <= 1000) {
        this.ybtype = "success";
      } else if (this.ybwsc > 1000 && this.ybwsc <= 2000) {
        this.ybtype = "warning";
      } else {
        this.ybtype = "error";
      }
    },
    genYCDL: function(row01) {
      // this.dataList 需要清空？
      this.ycdl = parseInt(row01[0].ZBZ);
      if (this.ycdl <= 500) {
        this.ycdltype = "success";
      } else if (this.ycdl > 500 && this.ycdl <= 10000) {
        this.ycdltype = "warning";
      } else {
        this.ycdltype = "error";
      }
    },
    genFlowData(row1) {
      this.flowDataX = [];
      this.flowDataLegend = [];
      this.flowDataList = [];
      // window.console.log("genFlowData row1:" + row1.length);
      var dataObject = {};
      var zbbm = "";
      var indexName = "";
      for (let i = 0; i < row1.length; i++) {
        //最新一次，当总流量为0时，特殊处理？？？ 如果真实流量数据就是0？
        // if(i == row1.length -1 && row1[i].CNT == 0){
        //     window.console.log("new is zero");
        //     continue;
        // }
        zbbm = row1[i].ZBBM;
        if (dataObject.hasOwnProperty(zbbm)) {
          dataObject[zbbm].dataX.push(this.getLastTime(row1[i].KZRQ));
          dataObject[zbbm].dataY.push(row1[i].CNT);
        } else {
          dataObject[zbbm] = {};
          dataObject[zbbm].dataX = [];
          dataObject[zbbm].dataY = [];
          dataObject[zbbm].dataX.push(this.getLastTime(row1[i].KZRQ));
          dataObject[zbbm].dataY.push(row1[i].CNT);
        }
        // window.console.log("genFlowData  dataObject:" + JSON.stringify(dataObject));
      }
      var zbbmArr = Object.keys(dataObject);

      for (let i = 0; i < zbbmArr.length; i++) {
        // window.console.log("zbbmArr length :" + zbbmArr.length);
        zbbm = zbbmArr[i];
        indexName = this.getIndexName(zbbm);
        if (this.flowDataX.length == 0) {
          this.flowDataX = dataObject[zbbm].dataX;
        }
        this.flowDataLegend.push(indexName);
        this.flowDataList.push({
          name: indexName,
          type: "line",
          data: dataObject[zbbm].dataY
          //  markPoint: {
          //       data: [
          //           {type: 'max', name: '最大值'}
          //       ]
          //   }
        });
      }
      var kzrq = this.getKZRQ(this.flowDataX[this.flowDataX.length - 1]);
      window.console.log("更新趋势图后，查询柱状图 kzrq:" + kzrq);
      this.queryByKZRQ("10100406", kzrq, this.genFlowColumnarData);
      // window.console.log("genFlowData  flowDataList:" + JSON.stringify(this.flowDataList));
    },
    genFlowColumnarData(row1) {
      this.flowBarDataX = [];
      this.flowBarDataLegend = [];
      this.flowBarDataList = [];
      var dataObject = {};
      var zbbm = "";
      var indexName = "";
      for (let i = 0; i < row1.length; i++) {
        zbbm = row1[i].ZBBM;
        if (dataObject.hasOwnProperty(zbbm)) {
          dataObject[zbbm].dataX.push(this.getLastIP(row1[i].IPDZ));
          dataObject[zbbm].dataY.push(row1[i].CNT);
        } else {
          dataObject[zbbm] = {};
          dataObject[zbbm].dataX = [];
          dataObject[zbbm].dataY = [];
          dataObject[zbbm].dataX.push(this.getLastIP(row1[i].IPDZ));
          dataObject[zbbm].dataY.push(row1[i].CNT);
        }
      }
      var zbbmArr = Object.keys(dataObject);
      for (let i = 0; i < zbbmArr.length; i++) {
        zbbm = zbbmArr[i];
        indexName = this.getIndexName(zbbm);
        if (this.flowBarDataX.length == 0) {
          this.flowBarDataX = dataObject[zbbm].dataX;
        }
        this.flowBarDataLegend.push(indexName);
        this.flowBarDataList.push({
          name: indexName,
          type: "bar",
          data: dataObject[zbbm].dataY
        });
      }
    },
    getLastIP(ipdz) {
      let ipArr = ipdz.split(".");
      let lastIP = ipArr[ipArr.length - 1];
      return lastIP;
    },
    getLastTime(kzrq) {
      var time = "";
      if (!kzrq) return time;
      var len = kzrq.length;
      if (len >= 4) {
        time = kzrq.substring(len - 4, len - 2) + ":" + kzrq.substring(len - 2);
      }
      return time;
    },
    getLastTimeArr(arr) {
      var res = [];
      for (let i = 0; i < arr.length; i++) {
        res.push(this.getLastTime(arr[i]));
      }
      return res;
    },
    getKZRQ(time) {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      month = month < 10 ? "0" + month : "" + month;
      var day = today.getDate();
      day = day < 10 ? "0" + day : "" + day;
      var hm = time.split(":").join("");
      var res = year + month + day + hm;
      // Message.info(res);
      return res;
    },
    getMidNormData() {
      this.midNormData = [];
      tube
        .http({
          method: "get",
          url: "/EzaYun/Norm/midNorm.form", // 10100402
          data: {},
          headers: {}
        })
        .then(res => {
          {
            // window.console.log(res);
            if (res.state == true) {
              // this.dataList 需要清空？
              this.midNormData = res.rows;
              // window.console.log(res.rows);
            } else {
              this.play();
              Message.error({
                duration: 3,
                top: 50,
                content: "midNorm.form 查询数据失败！"
              });
            }
          }
        })
        .catch(function(err) {
          this.play();
          Message.error({
            duration: 3,
            top: 50,
            content: err
          });
          window.console.log(err);
        });
    },
    async getDATA() {
      this.getMidNormData();
      window.console.log("1");
      await tube.getToken();
      window.console.log("2");
      this.queryData("10100403", "2001", this.genYBWSC); //医保未上传
      this.queryData("10100410", "1001", this.genYCDL); //异常登录次数
      this.queryData("10100404", "", this.genFlowData); //网络流量
      window.console.log("3");
    },
    getCurrentTime() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      month = month < 10 ? "0" + month : "" + month;
      var day = today.getDate();
      day = day < 10 ? "0" + day : "" + day;
      var hour = today.getHours();
      hour = hour < 10 ? "0" + hour : "" + hour;
      var minute = today.getMinutes();
      minute = minute < 10 ? "0" + minute : "" + minute;
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    play() {
      window.console.log("你的播放开启了");
      this.$refs.ding.play();
    }
  },
  created: function() {},
  updated: function() {},
  mounted: function() {
    this.timeText = this.getCurrentTime();
    this.getDATA();

    //查询的时候，正在往里面写数据，流量和为0，柱状图
    this.timer = setInterval(() => {
      this.timeText = this.getCurrentTime();
      this.getDATA();
    }, 61 * 1000); //61s 刷新一次显示
  },
  distroyed: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style>
/* box-sizing:border-box 出现连着一起，看不到gutter间隙效果  */
#app {
  width: 960px;
  height: 540px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  color: #fff !important ;
}
.main {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: 510px;
}
.bottom {
  box-sizing: border-box;
  height: 30px;
  padding: 1px;
  display: flex;
  flex-direction: row;
}
.my-carousel {
  height: 30px;
  width: 810px;
  line-height: 30px;
}
.left-part {
  box-sizing: border-box;
  width: 150px;
  display: flex;
  flex-direction: column;
}
.right-part {
  width: 150px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e8eaec;
}
.center-part {
  width: 660px;
  display: flex;
  flex-direction: column;
}
.chart-box {
  height: 51px;
  /* line-height: 25px; */
  /* background-color: aqua; */
  box-sizing: border-box;
  /* margin: 1px; */
  /* padding: 1px; */
  /* background-color: #000; */
  border-bottom: 1px solid #e8eaec;
  color: #fff !important;
}
.error-status {
  display: inline-block;
  height: 16px;
  width: 16px;
  background-color: #ed4014;
  border-radius: 8px;
}
.success-status {
  display: inline-block;
  height: 16px;
  width: 16px;
  background-color: #19be6b;
  border-radius: 8px;
}

.top-chart {
  height: 50%;
  box-sizing: border-box;
  /* padding: 0.5px; */
  padding: 0 1px 1px 1px;
  background: #e8eaec;
}
.bottom-chart {
  height: 50%;
  box-sizing: border-box;
  padding: 0 1px 1px 1px;
  background: #e8eaec;
}
.text-desc {
  font-size: 12px;
  color: #fff;
}
.time-text {
  text-align: center;
  width: 150px;
  height: 30px;
  line-height: 30px;
  color: #fff;
}
.carousel-item {
  height: 30px;
  line-height: 30px;

  /* text-align 控制了文本停靠位置？ */
  text-align: center;
  color: #fff;
  font-size: 20px;
  /* background: #506b9e; */
}
</style>
