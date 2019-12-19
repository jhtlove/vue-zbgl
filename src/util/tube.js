import axios from 'axios'
import store from '@/util/store.js' 
//对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
const http = options => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {};
    const newOptions = {
      ...defaultOptions,
      ...options
    };
    //headers默认传递json格式数据，这里也可以设置token，每次调用都会携带
    newOptions.headers = {
      'content-Type': 'application/json;charset=UTF-8',
      ...newOptions.headers
    };
    //这里可以在调用的时候看到你的method、url、data、headers等参数
    //console.log(newOptions);
    axios({
      method: newOptions.method,
      url: newOptions.url,
      data: newOptions.data,
      headers: newOptions.headers
    }).then(res => {
      //根据返回的状态码判断，注意res返回的并不一定都是status，比如小程序就是statusCode
      if (res.status == 200) {
       //这里我们只需要获取返回的data中的数据即可
        resolve(res.data);
      } else {
        reject(res);
      }
    }).catch(err => {
      // 输出状态码
      reject(err.response.status);
    })
  })
};

export default {
  http,

  async getToken() {
    let isSccusess=false
    await http({
      method: 'post',
      url: '/EzaYun/HisWs/hisLogin.form',
      data: {
        "usrid": "20100528",
        "pwd": "12345678"
      },
      headers: {}
    }).then(function (res) {
      window.console.log('1.5 true')
      store.set('token',res.token);
      isSccusess = true

    }).catch(function (err) {
      window.console.log('1.5 false')
      window.console.log(err);
      
    });
    return isSccusess
  },
  /**
     * @description 查询业务类  还没写好！！！！！！！
     * @param url string 地址，如'/HisWs/hisSelect.form'
     * @param busiid string 端口号，如'10100357'
     * @param ipages int '0'
     * @param irows int '0'
     * @param cxtj01 string 查询条件，对应第一个步骤的，如 "KHID^123|XMLX^1"
     * @param cxtj02 string 查询条件，对应第二个步骤的
     * @param cxtj03 string 查询条件
     * @param cxtj04 string 查询条件
     * @param isneedtoken boleen 是否需要token  true 或者 false
     */
  bselect(url,busiid,ipages,irows,cxtj01,cxtj02,cxtj03,cxtj04,isneedtoken){
    if (isneedtoken){
      this.http({
        method: 'POST',
        url: url,
        data: {
          "busiid" :busiid, 
          "ipages" :ipages,
          "irows"  :irows,
          "cxtj01" :cxtj01,
          "cxtj02" :cxtj02,
          "cxtj03" :cxtj03,
          "cxtj04" :cxtj04,
        },
        headers: {
          "token": store.fetch("token")
        }
      }).then((res) => {
        return res
      }).catch(function (err) {
        return err
      });
    }else{
      this.http({
        method: 'POST',
        url: url,
        data: {
          "busiid" :busiid, 
          "ipages" :ipages,
          "irows"  :irows,
          "cxtj01" :cxtj01,
          "cxtj02" :cxtj02,
          "cxtj03" :cxtj03,
          "cxtj04" :cxtj04,
        }
      }).then((res) => {
        return res
      }).catch(function (err) {
        return err
      });
    }
  }
}

