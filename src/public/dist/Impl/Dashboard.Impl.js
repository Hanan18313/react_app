"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Widget_1 = require("../Abstract/Widget");
class Dashboard extends Widget_1.Widget {
    constructor(canvasW, canvasH) {
        super(null);
        this.m_canvasW = canvasW;
        this.m_canvasH = canvasH;
    }
    Parse(jpack) {
        this.m_outline = {
            width: this.m_canvasW,
            height: this.m_canvasH,
            xBase: 0,
            yBase: 0,
            x: 0,
            y: 0,
        };
        this._ParseChildren(jpack.components);
    }
    Render(ctx) {
        this._RenderChildren(ctx);
    }
    ;
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=Dashboard.Impl.js.map