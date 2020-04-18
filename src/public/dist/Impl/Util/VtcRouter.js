"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pipeline_1 = require("./Pipeline");
class VtcRouter {
    constructor(asmFormat) {
        this.m_asmDict = {};
        this.m_pipelines = [];
        for (let i = 0; i < asmFormat.length; i++) {
            this.m_asmDict[asmFormat[i]] = 0;
        }
    }
    Push(asmData) {
        for (const channel in asmData) {
            this.m_asmDict[channel] = asmData[channel][asmData[channel].length - 1];
            for (let i = 0; i < this.m_pipelines.length; i++) {
                if (this.m_pipelines[i].m_tag === channel) {
                    this.m_pipelines[i].Push(asmData[channel]);
                }
            }
        }
    }
    Subscribe(vinTag) {
        const pipeline = new Pipeline_1.Pipeline(vinTag);
        this.m_pipelines.push(pipeline);
        return pipeline;
    }
    GetWordValue(word, numPack) {
        if (word in this.m_asmDict) {
            numPack.num = this.m_asmDict[word];
            return true;
        }
        return false;
    }
}
exports.VtcRouter = VtcRouter;
//# sourceMappingURL=VtcRouter.js.map