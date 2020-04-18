import echarts from 'echarts'
import React from 'react'

export default class Curve extends React.Component {

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('curve'))
        console.log(myChart)
        myChart.setOption({
            background: '#f5f4f3',
    color: ["#37A2DA", "#f2960d", "#67E0E3", "#9FE6B8"],
    title: {
      text: '实时运行曲线',
      textStyle: {
        fontWeight: '500',
        fontSize: 15,
        color: '#000'
      },
      x: 'center',
      y: '0'
    },
    grid: {
      top: '15%',
      left: '1%',
      right: '3%',
      bottom: '60rpx',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      name: '时间',
      nameLocation: 'center',
      nameGap: 35, // 标题距轴距离
      fontSize: 15,
      boundaryGap: false,
      scale: true,
      //maxInterval: 20,
      // min: 0,
      // max: 100,
      //interval:10,
      axisLabel: {
        textStyle: {
          fontsize: '10px'
        },
        // formatter: function(value){
        //   console.log(value)
        // }
      },
      axisTick: {
        show: true
      }
    },
    yAxis: {
      x: 'center',
      name: 'kN',
      type: 'value',
      boundaryGap: ['20%','20%']
    },
    series: [{
     // zIndex: 1,
      type: 'line',
      smooth: true,
      symbolSize: 0,
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    }, {
       // zIndex: 2,
        type: 'line',
        smooth: true,
        symbolSize: 0,
        data: []
      }]
        })
    }
    render() {
        return(
            <div id='curve' style={{width:400, height:400}}></div>
        )
    }
}