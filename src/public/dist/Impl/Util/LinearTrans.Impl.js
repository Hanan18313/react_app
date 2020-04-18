"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
class LinearTrans {
    static GetDescRes(express) {
        if (typeof express === 'number')
            return express;
        express = express.slice(1, express.length);
        const splitArr = splitByRule(express);
        const resStruct = {
            class: 'Exp.MultiLinear',
            x: [],
            a: [],
            b: 0,
        };
        let hasNum = false;
        for (let i = 0; i < splitArr.length; i++) {
            if (!isNaN(splitArr[i])) {
                hasNum = true;
                break;
            }
        }
        if (!hasNum)
            splitArr.push('0');
        if (splitArr.length > 2) {
            resStruct.class = 'Exp.MultiLinear';
        }
        else {
            resStruct.class = 'Exp.UniLinear';
        }
        for (let i = 0; i < splitArr.length; i++) {
            const current = splitArr[i];
            if (!isNaN(current)) {
                resStruct.b = Number(current);
            }
            else {
                const r = splitMultAndDivi(current);
                if (resStruct.class === 'Exp.MultiLinear') {
                    resStruct.x.push(r.x);
                    resStruct.a.push(r.a);
                }
                else {
                    resStruct.x = r.x;
                    resStruct.a = r.a;
                }
            }
        }
        return resStruct;
        function splitByRule(str) {
            const rules = ['+', '-'];
            const resArr = [];
            let queueStr = '';
            for (let i = 0; i < str.length; i++) {
                if (rules.indexOf(str[i]) === -1) {
                    queueStr += str[i];
                }
                else {
                    resArr.push(queueStr);
                    if (str[i] === '-') {
                        queueStr = str[i];
                    }
                    else {
                        queueStr = '';
                    }
                }
            }
            if (queueStr)
                resArr.push(queueStr);
            return resArr;
        }
        function splitMultAndDivi(str) {
            let a, x;
            if (str.indexOf('*') !== -1) {
                const splitArr = str.split('*');
                for (let i = 0; i < splitArr.length; i++) {
                    const current = splitArr[i];
                    if (!isNaN(current)) {
                        a = Number(current);
                    }
                    else {
                        x = current;
                    }
                }
            }
            else if (str.indexOf('/') !== -1) {
                const splitArr = str.split('/');
                a = 1 / splitArr[1];
                x = splitArr[0];
            }
            else {
                a = 1;
                x = str;
            }
            if (x.slice(0, 1) === '-') {
                x = x.slice(1, x.length);
                a *= -1;
            }
            return {
                a,
                x,
            };
        }
    }
    static GetMotiValue(motiValue) {
        if (typeof motiValue === 'number')
            return motiValue;
        const { x, a, b } = motiValue;
        const vinChannelPack = index_1.TAR.shiftVinChannel();
        if (typeof x === 'string') {
            const vinChannelValue = vinChannelPack[x] ? vinChannelPack[x] : 0;
            return Number(a) * vinChannelValue + b;
        }
        else {
            let v = 0;
            for (let i = 0; i < x.length; i++) {
                const vinChannelValue = vinChannelPack[x[i]] ? vinChannelPack[x[i]] : 0;
                v += a[i] * vinChannelValue;
            }
            v += b;
            return v;
        }
    }
}
exports.LinearTrans = LinearTrans;
//# sourceMappingURL=LinearTrans.Impl.js.map