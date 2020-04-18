"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = require("../Abstract/Widget");
const NumberNode_1 = require("./Util/NumberNode");
class DigitalDial extends Widget_1.Widget {
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
        if (jpack.components) {
            this._ParseChildren(jpack.components);
        }
    }
    ;
    Fit() {
        this.m_value = this.m_valueNode.GetValue();
        super.Fit();
    }
    Render(ctx) {
        const canvasH = this.GetRoot().m_canvasH;
        const m_vOutline = this.GetVirtualOutline();
        this._RenderChildren(ctx);
    }
    ;
}
exports.DigitalDial = DigitalDial;
//# sourceMappingURL=DigitalDial.lmpl.js.map