"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNodeFactory_1 = require("../Factory/NumberNodeFactory");
class NumberNode {
    static Create(nodeValue) {
        return NumberNodeFactory_1.NumberNodeFactory.Create(nodeValue);
    }
    splitByRule(str) {
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
    splitMultAndDivi(str) {
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
exports.NumberNode = NumberNode;
class SimpleNumber extends NumberNode {
    constructor(value) {
        super();
        this.m_value = value;
    }
    GetValue() {
        return this.m_value;
    }
}
exports.SimpleNumber = SimpleNumber;
class LinearExp extends NumberNode {
    constructor(exp, wordPro) {
        super();
        this.m_b = 0;
        this.m_wordProvider = wordPro;
        this.Parse(exp);
    }
    Parse(exp) {
        exp = exp.slice(1, exp.length);
        const splitArr = this.splitByRule(exp);
        for (let i = 0; i < splitArr.length; i++) {
            const current = splitArr[i];
            if (!isNaN(current)) {
                this.m_b = Number(current);
            }
            else {
                const r = this.splitMultAndDivi(current);
                this.m_varible = r.x;
                this.m_a = r.a;
            }
        }
    }
    GetValue() {
        const objNum = { num: 0 };
        const result = this.m_wordProvider.GetWordValue(this.m_varible, objNum);
        return objNum.num * this.m_a + this.m_b;
    }
}
exports.LinearExp = LinearExp;
class MuiltLinearExp extends NumberNode {
    constructor(exp, wordPro) {
        super();
        this.m_b = 0;
        this.m_wordProvider = wordPro;
        this.Parse(exp);
    }
    Parse(exp) {
        exp = exp.slice(1, exp.length);
        const splitArr = this.splitByRule(exp);
        for (let i = 0; i < splitArr.length; i++) {
            const current = splitArr[i];
            if (!isNaN(current)) {
                this.m_b = Number(current);
            }
            else {
                const r = this.splitMultAndDivi(current);
                this.m_varibles.push(r.x);
                this.m_a.push(r.a);
            }
        }
    }
    GetValue() {
        let sum = this.m_b;
        for (let i = 0; i < this.m_varibles.length; i++) {
            const objNum = { num: 0 };
            this.m_wordProvider.GetWordValue(this.m_varibles[i], objNum);
            sum += objNum.num * this.m_a[i];
        }
        return sum;
    }
}
exports.MuiltLinearExp = MuiltLinearExp;
//# sourceMappingURL=NumberNode.js.map