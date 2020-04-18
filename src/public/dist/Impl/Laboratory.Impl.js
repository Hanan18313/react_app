"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../Abstract/Component");
const Conv_Impl_1 = require("./Util/Conv.Impl");
class Laboratory extends Component_1.Component {
    constructor(canvasW, canvasH) {
        super(null);
        this.m_canvasW = canvasW;
        this.m_canvasH = canvasH;
    }
    GetConv() {
        return this.m_conv;
    }
    ;
    IsReality() {
        return true;
    }
    ;
    GetVirtualOutline() {
        return this.m_vOutline;
    }
    ;
    Parse(jpack) {
        this.m_conv = new Conv_Impl_1.Conv();
        this.m_conv.RealSceneFitCanvas(jpack.width, jpack.height, this.m_canvasW, this.m_canvasH);
        super.Parse(jpack);
    }
    ;
    Fit() {
        this.m_outline.x = 0;
        this.m_outline.y = 0;
        this.m_vOutline = {
            width: this.m_conv.VLengthFromReal(this.m_outline.width),
            height: this.m_conv.VLengthFromReal(this.m_outline.height),
            xBase: this.m_conv.VLengthFromReal(this.m_outline.xBase),
            yBase: this.m_conv.VLengthFromReal(this.m_outline.yBase),
            x: this.m_conv.VxFromReal(this.m_outline.x),
            y: this.m_conv.VyFromReal(this.m_outline.y),
        };
        this._FitChildren();
    }
    ;
    Render(ctx) {
        this._RenderChildren(ctx);
    }
    ;
}
exports.Laboratory = Laboratory;
//# sourceMappingURL=Laboratory.Impl.js.map