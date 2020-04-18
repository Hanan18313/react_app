import React from 'react'
import { TAR } from '../public/dist/index';
import axios from 'axios';
import io from 'socket.io-client';
const vinChannelPack = {Disp: [], Load: [] };
const cacheVinChannelPack = {Disp: [], Load: []}

var that = undefined;
var tar = undefined;


const newConfig = {
  "class" : "Tar",
  "realScene" : {
      "class" : "Laboratory",
      "width" : 5000.0,
      "height" : 3000.0,
      "xBase" : 2500.0,
      "yBase" : 500.0,
      "z" : 0.0,
      "components" : [ 
          {
              "class" : "Part",
              "tag" : "wdw_machine",
              "width" : 1666.0,
              "height" : 2820.0,
              "xBase" : 600.0,
              "yBase" : 400.0,
              "z" : 0.0,
              "location" : {
                  "anchor" : ".",
                  "xAlignment" : "MIDDLE|XBASE",
                  "xOffset" : -1500.0,
                  "yAlignment" : "BOTTOM-YBASE",
                  "yOffset" : -200.0
              },
              "image" : "https://www.langjie.com/img/virtualSource/wdw_mts_frame.png",
              "components" : [ 
                  {
                      "class" : "Part",
                      "tag" : "beam",
                      "width" : 750.0,
                      "height" : 700.0,
                      "xBase" : 0.0,
                      "yBase" : 0.0,
                      "z" : 0.0,
                      "location" : {
                          "anchor" : ".",
                          "xAlignment" : "MIDDLE|MIDDLE",
                          "xOffset" : 15.0,
                          "yAlignment" : "BOTTOM-YBASE",
                          "yOffset" : "=1000+Disp"
                      },
                      "image" : "https://www.langjie.com/img/virtualSource/wdw_mts_beam.png"
                  }
              ]
          }
      ]
  },
  "virtualScene" : {
      "class" : "Widget.Dashboard",
      "components" : [ 
          {
              "class" : "Widget.Chart",
              "tag" : "chart",
              "width" : 150.0,
              "height" : 150.0,
              "z" : 1.0,
              "location" : {
                  "anchor" : "@beam",
                  "xAlignment" : "RIGHT|LEFT",
                  "xOffset" : -50.0,
                  "yAlignment" : "TOP-TOP",
                  "yOffset" : 0.0
              },
              "caption" : "Load",
              "value" : "=Load",
              "dot" : 2.0,
              "unit" : "kN",
              "font" : "Helv",
              "fontSize" : 20.0,
              "color" : "Cyan"
          }, 
          {
              "class" : "Widget.DigitalMeter",
              "tag" : "load_meter",
              "width" : 200,
              "height" : 100,
              "z" : 1,
              "location" : {
                  "anchor" : "@beam",
                  "xAlignment" : "LEFT|LEFT",
                  "xOffset" : 300,
                  "yAlignment" : "TOP-TOP",
                  "yOffset" : -200.0
              },
              "caption" : "Disp",
              "value" : "=Disp",
              "dot" : 2,
              "unit" : "mm",
              "font" : "Helv",
              "fontSize" : 16,
              "color" : "Cyan"
          }
      ]
  }
  }
  //var host = 'http://192.168.50.80:7002';
  const CONFIG_URL = 'https://api.langjie.com/member/virtualCtrl/1234567';
	var host = 'https://vtc.langjie.com';
	var unionid = 'oathZ1BPzdeHw2a54gl59NVq5b6c';
	var vinSocketPath;
	var socket;
	var vinSocket;
	var isLogin = false;
  var vinZeroId;	// 该变量测试置零用
  
export default class Canvas extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        isLogin: false,
        move_ats_id: "",
        oper_ats_id: "",
        vtc_id: ""
      }
      this.VtcCreate = this.VtcCreate.bind(this);
      this.VtcClose = this.VtcClose.bind(this);
      this.AtLoad = this.VtcCreate.bind(this);
    }

    componentDidMount(){
        that = this

        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext("2d");
        ctx.dpr = 1.5

        // tar = new TAR({
        //     ctx,
        //     config: newConfig,
        //     canvas: canvas
        // });
        // tar.SetVinChannel(['Disp','Load']);
        // tar.Create({
        //     canvasW: canvas.width,
        //     canvasH: canvas.height
        // })

        // setInterval(() => {
        //     vinChannelPack.Disp = [];
        //     vinChannelPack.Load = [];

        //     tar.PushVinChannel(vinChannelPack);
        // },20)
        that.login(ctx, canvas)
    }


    async login(ctx, canvas){
      axios.post(host + '/cloudVtc/' + unionid).then(res => {
        console.log(res)
        if(res.data.code === 200) {
          new Promise((resolve, reject) => {
            this.setState({
              isLogin: true,
            })
            that.connLog(res.data.data.connLogPath);
            vinSocketPath = res.data.data.connVinPath;
            // 判断掉线重连
            if (res.data.data.isReconnect) {
              // 先渲染通道
              // 再渲染ats动作按钮等
              // 最后监听通道渲染数字板和曲线
              that.connVin(res.data.data.connVinPath);
              
            }

            resolve()
          }).then(val => {
            // if (!this.state.isLogin) return;
            // socket.emit('VtcCreate', {
            //   configId: '5da6c13a1d85fb19d00a8422'
            // }, result => console.log(result));
          }).catch(e =>{throw e})
          
        }
      })

      await axios.get(CONFIG_URL).then(_res => {
        console.log(_res)
        if(_res.data.code === 200) {
          console.log(_res.data.data)
          tar = new TAR({
            ctx,
            config: newConfig,
            canvas: canvas
          });
          tar.SetVinChannel(['Disp','Load']);
          tar.Create({
              canvasW: canvas.width,
              canvasH: canvas.height
          })
          this.setState({
            vtc_id: _res.data.data.vtc_id,
            move_ats_id: _res.data.data.move_ats_id,
            oper_ats_id: _res.data.data.oper_ats_id
          })
        }
      })
    }

    connLog(path) {
      socket = io(path);
      socket.on('disconnect', function (msg) {
        console.log(msg);
      });
      socket.on('message', function (msg) {
        console.log(msg);
      });
      socket.on('runningState', function (msg) {
        console.log(msg);
      });
      // 监听通道列表
      socket.on('VtcVinList', function (msg) {
        console.log(msg);
        that.VtcSubscribe();
      });
      // 监听订阅通道
      socket.on('VtcSubscribe', function (msg) {
        console.log(msg);
        vinZeroId = msg.dataProtocol[0].id;	// 测试置零用
        that.connVin(vinSocketPath);
      });
      // 监听“参数表”，动作列表，按钮及位置
      socket.on('AtLoad', function (msg) {
        console.log(msg);
      });
      // 监听参数列表（主动触发）
      socket.on('PackGetParam', function (msg) {
        console.log(msg);
      });
      socket.on('VtcLog', function (result) {
        console.log(result)
        if(result.msgId === "0x2000") {
          socket.emit('AtLoad', {
            atsId: that.state.move_ats_id,
          }, result => console.log(result));
        }
      });
    }
  
    connVin(path) {
      vinSocket = io(path);
      vinSocket.on('disconnect', function (msg) {
        console.log(msg);
      });
      vinSocket.on('message', function (msg) {
        console.log(msg);
      });
      vinSocket.on('VtcVin', function (result) {
        //console.log(result)
      // cacheVinChannelPack.Disp.push(...result['位移'])
      // cacheVinChannelPack.Load.push(...result['拉力'])
       const vinChannelPack = {Disp: [], Load: [] };
       vinChannelPack.Disp = result['自反馈位移']
       vinChannelPack.Load = result['力']
       tar.PushVinChannel(vinChannelPack)
      });
    }
  
    VtcCreate() {
      if (!this.state.isLogin) return;
      console.log(this.state)
      socket.emit('VtcCreate', {
        configId: this.state.vtc_id
      }, result => console.log(result));
    }
  
    VtcSubscribe() {
      socket.emit('VtcSubscribe', {
        //subscribeList: [ '位移', '拉力' ],
        subscribeList: [ '自反馈位移', '力' ],
      });
    }
  
    VtcClose(){
      console.log(111)
      socket.emit('VtcClose', {}, result => console.log(result));
    }
  
    AtLoad() {
      // 1 调整位置的ats
      // 2 金属拉伸试验的ats
      socket.emit('AtLoad', {
        atsId: this.state.move_ats_id,
      }, result => console.log(result));
    }
  
    AtStart() {
      console.log("start")
      socket.emit('AtStart', {}, result => console.log(result));
    }
  
    AtTerminate() {
      console.log('AtTerminate')
      socket.emit('AtTerminate');
    }
  
    VtcClearToZero() {
      socket.emit('VtcClearToZero', {
        id: vinZeroId,
        led: 2,
      });
    }
  
    AtPushButton(obj) {
      socket.emit('AtPushButton', {
        obj,
      });
    }
  
    changeTopV() {
      socket.emit('PackSetParam', {
        topV: 5,
      });
    }
  
    getParamList() {
      socket.emit('PackGetParam');
    }

    Up(){
      const tag = '上升'
      socket.emit('AtPushButton', {
        tag,
      });
    }
    Down(){
      const tag = '下降'
      socket.emit('AtPushButton', {
        tag
      });
    }

    darwDigitalDisplay(){}
    
    render(){
        return(<div>
            <div>
              <canvas id="canvas" width="600px" height="600px"></canvas>
            </div>
            
            <div>
              <button onClick={this.VtcCreate}>联机</button>
              <button onClick={this.VtcClose}>关闭</button>
            </div>
            <div style={{height: 50}}></div>
            <div>
              <button onClick={this.AtLoad}>加载ATS</button>
              <button onClick={this.AtStart}>运行ATS</button>
              <button onClick={this.AtTerminate}>中止ATS</button>
            </div>
            <div>
              <button onClick={this.Up}>上升</button>
              <button onClick={this.Down}>下降</button>
            </div>
            
        </div>)
    }
}