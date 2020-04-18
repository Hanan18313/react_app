"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = require("../Abstract/Widget");
class Chart extends Widget_1.Widget {
    Parse(jpack) {
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
        this.m_pipeline = this.Subscribe('Load');
        if (jpack.components) {
            this._ParseChildren(jpack.components);
        }
    }
    ;
    Render(ctx) {
        const canvasH = this.GetRoot().m_canvasH;
        const m_vOutline = this.GetVirtualOutline();
        this._RenderChildren(ctx);
    }
    ;
}
exports.Chart = Chart;
//# sourceMappingURL=Chart.Impl.js.map