import React from 'react';
import { TAR } from '../public/dist/index';
import axios from 'axios';
import { Subject, Observer } from '../public/js/base'
var tar = undefined;
var that = undefined
const diffP = 93;

const CONFIG_URL = 'https://api.langjie.com/member/virtualCtrl/1234567';
const img_url = 'http://192.168.50.80:7090/images/tar/'

export default class Digital extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            digitalDesc: {
                "0": { name: "0.bmp", width: 30 },
                "1": { name: "1.bmp", width: 30 },
                "2": { name: "2.bmp", width: 30 },
                "3": { name: "3.bmp", width: 30 },
                "4": { name: "4.bmp", width: 30 },
                "5": { name: "5.bmp", width: 30 },
                "6": { name: "6.bmp", width: 30 },
                "7": { name: "7.bmp", width: 30 },
                "8": { name: "8.bmp", width: 30 },
                "9": { name: "9.bmp", width: 30 },
                // ".": { name: "dot.bmp", width: 14 },
                // "-": { name: "symbol.bmp", width: 18 },
            },
        }
    }
    componentDidMount(){
        that = this
        const canvas = document.getElementById('digital');
        const ctx = canvas.getContext("2d");
        for(let img in this.state.digitalDesc) {
            try {
                this[img] = canvas.createImage()
            } catch (error) {
                this[img] = new Image()
            }
            this[img].src = img_url + this.state.digitalDesc[img].name
        }

        var obj = new Proxy({},{
            get: function (target, propKey, receiver) {
                that.CanvasRender(ctx, target[propKey])
                return Reflect.get(target, propKey, receiver);
              },
        })

        ctx.rect(70,100, 60,48)
        ctx.stroke()
        ctx.clip()

        obj.count = 1
        setInterval(() => {
            obj.count+=10
        }, 20)
    }

    /**
     * 两位数的滚动
     */
    compareDigital(currentValue, nextValue){
        this.nextValue = nextValue;
        this.currentValue = currentValue;

        const diffValue = nextValue - currentValue
        return diffValue
        
    }

    CanvasRender(ctx, disp){
        const startP = 0;
        let totalH1 = 0;
        for(let i = startP; i < diffP; i++) {
            totalH1 += 48
            ctx.drawImage(this[i%10], 100, 100 - totalH1 + disp)
            ctx.drawImage(this[i%10], 70, 100 - totalH1 + disp/10)
        }
    }



    render(){
        return(
            <div>
                <canvas id="digital"  width="600px" height="600px"></canvas>
                <div>
                    <button onClick={this.submit}>确定</button>
                </div>
            </div>
        )
    }
}