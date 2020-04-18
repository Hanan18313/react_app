"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pipeline {
    constructor(tag) {
        this.m_flow = [];
        this.m_tag = tag;
    }
    Push(data) {
        this.m_flow = [...this.m_flow, ...data];
    }
    Pop(buf) {
    }
}
exports.Pipeline = Pipeline;
//# sourceMappingURL=Pipeline.js.map