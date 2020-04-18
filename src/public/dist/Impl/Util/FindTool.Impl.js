"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
class FindTool {
    static GlobalFind(target) {
        const result = index_1.TAR.laboratory.m_children.findRecursive(target);
        if (result)
            return result;
        return index_1.TAR.dashboard.m_children.findRecursive(target);
    }
}
exports.FindTool = FindTool;
//# sourceMappingURL=FindTool.Impl.js.map