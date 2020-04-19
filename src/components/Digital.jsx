import React from 'react';
import { TAR } from '../public/dist/index';
import axios from 'axios';
import { Subject, Observer, CircleQueue } from '../public/js/base'
var tar = undefined;
var that = undefined
const diffP = 93;

const CONFIG_URL = 'https://api.langjie.com/member/virtualCtrl/1234567';
const img_url = 'http://172.17.29.49:7090/images/tar/'

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
            nextValue: 0,
            currentValue: 0,
            perDiff: 0,
            diffDesc: {}
        }
    }
    componentDidMount(){
        that = this
        const canvas = document.getElementById('digital');
        const ctx = canvas.getContext("2d");
        const ins = new CircleQueue(10)
        for(let img in this.state.digitalDesc) {
            try {
                this[img] = canvas.createImage()
            } catch (error) {
                this[img] = new Image()
            }
            this[img].src = img_url + this.state.digitalDesc[img].name
           // ins.enQueue(this[img].src)
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
        obj.count = 0
        const timer = setInterval(() => {
            const diff = this.state.diffDesc.diff
            if(diff) {
                obj.count += diff/25
                if(obj.count > diff*48) {
                    clearInterval(timer)
                }
            }else{
                obj.count += 0
            }
        }, 20)
    }

    /**
     * 比较两个数的差值diffValue
     */
    compareDigital(currentValue, nextValue){
        const diffDesc = {
            diff: 0,
            cycle: 0,
            remainder: 0
        }
        currentValue = typeof currentValue === "number" ? currentValue : Number(currentValue)
        nextValue = typeof nextValue === "number" ? nextValue : Number(nextValue)
        const diff = nextValue - currentValue
        diffDesc.diff = diff;
        if(diff < 10) {
            diffDesc.cycle = 0;
            diffDesc.remainder = diff
        }else if(diff >= 10 && diff < 100) {
            diffDesc.cycle = Math.floor(diff/10)
            diffDesc.remainder = diff%10
        }
        return diffDesc
    }

    CanvasRender(ctx, disp){
        if(JSON.stringify(this.state.diffDesc) === "{}") {
            ctx.drawImage(that[0], 70, 100)
            ctx.drawImage(that[0], 100, 100)
        }
        //return;
        let totalH = 0
        const IMG_HEIGHT = 48
        for(let i = 0; i < this.state.diffDesc.diff + 1; i++) {
            totalH += IMG_HEIGHT
            ctx.drawImage(that[i%10], 70, 148 - totalH + disp/10)
            ctx.drawImage(that[i%10], 100, 148 - totalH + disp);
        }
    }

    inputChange = () => {
        let val = this.refs.value.value
        this.setState({
            nextValue: val
        })
    }

    getInputValue = () => {
        console.log(this.state.nextValue)
        const currentValue = 0;
        const nextValue = this.state.nextValue;
        //const nextValue = 
        const diffDesc = this.compareDigital(currentValue, nextValue);
        //console.log(diffDesc)
        this.setState({
            diffDesc: diffDesc,
            perDiff: 0.2
        })
        //console.log(this.state.diffDesc)
    }
    render(){
        return(
            <div>
                <canvas id="digital"  width="600px" height="600px"></canvas>
                <div>
                    下一个数字<input type="text" ref="value" onChange={() => this.inputChange()}/>
                    <button onClick={() => this.getInputValue()}>确定</button>
                </div>
            </div>
        )
    }
}