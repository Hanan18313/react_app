"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../Util/NumberNode");
const __1 = require("../../");
class NumberNodeFactory {
    static Create(nodeValue) {
        if (typeof nodeValue === 'number') {
            return new NumberNode_1.SimpleNumber(nodeValue);
        }
        else if (typeof nodeValue === 'string') {
            if (checkMuilt(nodeValue)) {
                return new NumberNode_1.MuiltLinearExp(nodeValue, __1.TAR.M_VtcRouter);
            }
            else {
                return new NumberNode_1.LinearExp(nodeValue, __1.TAR.M_VtcRouter);
            }
        }
        else {
            return new NumberNode_1.SimpleNumber(0);
        }
        function checkMuilt(str) {
            let prevIsLetter = false;
            let count = 0;
            for (let i = 0; i < str.length; i++) {
                if (/[a-z]/ig.test(str[i]) && !prevIsLetter) {
                    count++;
                    prevIsLetter = true;
                }
                else if (!/[a-z]/ig.test(str[i]) && prevIsLetter) {
                    prevIsLetter = false;
                }
            }
            if (count > 1) {
                return true;
            }
            return false;
        }
    }
}
exports.NumberNodeFactory = NumberNodeFactory;
//# sourceMappingURL=NumberNodeFactory.js.map