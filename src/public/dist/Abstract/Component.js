"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FindTool_Impl_1 = require("../Impl/Util/FindTool.Impl");
const NumberNode_1 = require("../Impl/Util/NumberNode");
const XType_enum_1 = require("../Enum/XType.enum");
const YType_enum_1 = require("../Enum/YType.enum");
class Component {
    constructor(parent) {
        this.m_parent = parent;
    }
    GetOutline() {
        return this.m_outline;
    }
    ;
    GetRoot() {
        let presentComponent = this;
        while (presentComponent.m_parent) {
            presentComponent = presentComponent.m_parent;
        }
        return presentComponent;
    }
    ;
    Find(target) {
        if (target === '.') {
            return this.m_parent;
        }
        else if (/^@/.test(target)) {
            target = target.slice(1, target.length);
            const rootComp = this.GetRoot();
            if (rootComp.m_tag === target)
                return rootComp;
            return FindTool_Impl_1.FindTool.GlobalFind(target);
        }
        else {
            if (!this.m_parent)
                return null;
            return this.m_parent.m_children.find(target);
        }
    }
    ;
    Parse(jpack) {
        this.m_widthNode = NumberNode_1.NumberNode.Create(jpack.width);
        this.m_heightNode = NumberNode_1.NumberNode.Create(jpack.height);
        this.m_tag = jpack.tag;
        this.m_z = jpack.z;
        this.m_outline = {
            width: jpack.width,
            height: jpack.height,
            xBase: jpack.xBase,
            yBase: jpack.yBase,
            x: 0,
            y: 0,
        };
        if (jpack.location) {
            this.m_location = jpack.location;
            this.m_xOffsetNode = NumberNode_1.NumberNode.Create(jpack.location.xOffset);
            this.m_yOffsetNode = NumberNode_1.NumberNode.Create(jpack.location.yOffset);
            this.m_anchor = this.Find(jpack.location.anchor);
        }
        if (jpack.components) {
            this._ParseChildren(jpack.components);
        }
    }
    ;
    _ParseChildren(jpackArray) {
    }
    ;
    _FitChildren() {
        const list = this.m_children;
        if (list) {
            let currentNode = list.m_head;
            while (currentNode) {
                currentNode.m_value.Fit();
                currentNode = currentNode.m_next;
            }
        }
    }
    ;
    _RenderChildren(ctx) {
        const list = this.m_children;
        if (list) {
            let currentNode = list.m_head;
            while (currentNode) {
                currentNode.m_value.Render(ctx);
                currentNode = currentNode.m_next;
            }
        }
    }
    ;
    GetCoordValue() {
        let x, y;
        const { xAlignment, yAlignment } = this.m_location;
        const selfOutline = this.IsReality() ? this.m_outline : this.GetVirtualOutline();
        const anchorOutline = this.IsReality() ? this.m_anchor.GetOutline() : this.m_anchor.GetVirtualOutline();
        const { xOffset, yOffset } = this.m_location;
        if (xAlignment === XType_enum_1.XType['LEFT|LEFT']) {
            x = anchorOutline.x + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['LEFT|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['LEFT|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['LEFT|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|LEFT']) {
            x = anchorOutline.x - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['RIGHT|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase - selfOutline.width + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|LEFT']) {
            x = anchorOutline.x - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['MIDDLE|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase - selfOutline.width / 2 + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|LEFT']) {
            x = anchorOutline.x - selfOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|RIGHT']) {
            x = anchorOutline.x + anchorOutline.width - selfOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|MIDDLE']) {
            x = anchorOutline.x + anchorOutline.width / 2 - selfOutline.xBase + xOffset;
        }
        else if (xAlignment === XType_enum_1.XType['XBASE|XBASE']) {
            x = anchorOutline.x + anchorOutline.xBase - selfOutline.xBase + xOffset;
        }
        if (yAlignment === YType_enum_1.YType['BOTTOM-BOTTOM']) {
            y = anchorOutline.y + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['BOTTOM-TOP']) {
            y = anchorOutline.y + anchorOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['BOTTOM-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['BOTTOM-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-BOTTOM']) {
            y = anchorOutline.y - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-TOP']) {
            y = anchorOutline.y + anchorOutline.height - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['TOP-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase - selfOutline.height + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-BOTTOM']) {
            y = anchorOutline.y - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-TOP']) {
            y = anchorOutline.y + anchorOutline.height - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['MIDDLE-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase - selfOutline.height / 2 + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-BOTTOM']) {
            y = anchorOutline.y - selfOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-TOP']) {
            y = anchorOutline.y + anchorOutline.height - selfOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-MIDDLE']) {
            y = anchorOutline.y + anchorOutline.height / 2 - selfOutline.yBase + yOffset;
        }
        else if (yAlignment === YType_enum_1.YType['YBASE-YBASE']) {
            y = anchorOutline.y + anchorOutline.yBase - selfOutline.yBase + yOffset;
        }
        return {
            x,
            y,
        };
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map