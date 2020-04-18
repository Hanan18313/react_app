"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = require("../Abstract/Widget");
const NumberNode_1 = require("./Util/NumberNode");
const index_1 = require("../index");
const URL = 'https://testsummer.langjie.com/images/tar/';
class DigitalMeter extends Widget_1.Widget {
    Parse(jpack) {
        this.m_valueNode = NumberNode_1.NumberNode.Create(jpack.value);
        this.m_caption = jpack.caption;
        this.m_value = jpack.value;
        this.m_dot = jpack.dot;
        this.m_unit = jpack.unit;
        this.m_font = jpack.font;
        this.m_fontSize = jpack.fontSize;
        this.m_color = jpack.color;
        this.m_tag = jpack.tag;
        this.m_z = jpack.z;
        this.m_outline = {
            width: jpack.width,
            height: jpack.height,
            xBase: 0,
            yBase: 0,
            x: 0,
            y: 0,
        };
        this.m_location = jpack.location;
        this.m_anchor = this.Find(jpack.location.anchor);
        this.m_cacheVal = ["0.000"];
        this.m_diffVal = 0;
        if (jpack.components) {
            this._ParseChildren(jpack.components);
        }
        setInterval(() => {
            let preVal = 0;
            let currentVal = this.m_valueNode.GetValue();
            this.m_cacheVal.push(currentVal);
            if (this.m_cacheVal.length >= 2) {
                preVal = this.m_cacheVal.shift();
            }
            const parsePreVal = this.ParseDigital(preVal).Num.join('');
            const parseCurrentVal = this.ParseDigital(currentVal).Num.join('');
            this.m_diffVal = Number(parseCurrentVal) - Number(parsePreVal);
            console.log("parseCurrentVal：" + parseCurrentVal);
            console.log("parsePreVal：" + parsePreVal);
            console.log('差值：' + (Number(parseCurrentVal) - Number(parsePreVal)));
        }, 1000);
        this.m_imageObj = {
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
        };
        for (const key in this.m_imageObj) {
            if (this.m_imageObj.hasOwnProperty(key)) {
                const element = this.m_imageObj[key];
                try {
                    this[key] = index_1.TAR.canvas.createImage();
                }
                catch (error) {
                    this[key] = new Image();
                }
                this[key].src = URL + element.name;
            }
        }
    }
    ;
    Fit() {
        this.m_value = this.m_valueNode.GetValue();
        super.Fit();
    }
    ParseDigital(value) {
        let transVal = "";
        try {
            transVal = value.parseFloat();
        }
        catch (error) {
            transVal = value.toString();
        }
        const dotIndex = transVal.indexOf('.');
        let reverseInteger = transVal.slice(0, dotIndex).split('').reverse();
        let decimals = transVal.slice(dotIndex + 1).split('');
        for (let i = 0; i < 3; i++) {
            if (!reverseInteger[i]) {
                reverseInteger[i] = "0";
            }
            if (!decimals[i]) {
                decimals[i] = "0";
            }
        }
        let integer = reverseInteger.reverse();
        return {
            integer: integer,
            decimals: decimals,
            Num: integer.concat(decimals)
        };
    }
    Compare() {
    }
    Render(ctx) {
        const canvasH = this.GetRoot().m_canvasH;
        const m_vOutline = this.GetVirtualOutline();
        this.ParseDigital(this.m_value);
        this._RenderChildren(ctx);
        let totalWidth = 0;
        let totalHeight = 0;
        for (let img in this.m_imageObj) {
            const ele = this.m_imageObj[img];
            totalHeight += 48;
            ctx.drawImage(this[img], m_vOutline.x, canvasH - m_vOutline.y - m_vOutline.height - totalHeight);
        }
        ctx.stroke();
    }
    ;
}
exports.DigitalMeter = DigitalMeter;
//# sourceMappingURL=DigitalMeter.Impl.js.map