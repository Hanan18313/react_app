"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../Abstract/Component");
const CanvasDraw_1 = require("./Util/CanvasDraw");
const index_1 = require("../index");
class Part extends Component_1.Component {
    constructor(parent) {
        super(parent);
    }
    IsReality() {
        return true;
    }
    ;
    GetVirtualOutline() {
        return this.m_vOutline;
    }
    ;
    Parse(jpack) {
        try {
            this.m_image = index_1.TAR.canvas.createImage();
        }
        catch (e) {
            this.m_image = new Image();
        }
        this.m_image.src = jpack.image;
        super.Parse(jpack);
    }
    ;
    Fit() {
        this.m_outline.width = this.m_widthNode.GetValue();
        this.m_outline.height = this.m_heightNode.GetValue();
        this.m_location.xOffset = this.m_xOffsetNode.GetValue();
        this.m_location.yOffset = this.m_yOffsetNode.GetValue();
        const { x, y } = this.GetCoordValue();
        this.m_outline.x = x;
        this.m_outline.y = y;
        const convFun = this.GetRoot().GetConv();
        this.m_vOutline = {
            width: convFun.VLengthFromReal(this.m_outline.width),
            height: convFun.VLengthFromReal(this.m_outline.height),
            xBase: convFun.VLengthFromReal(this.m_outline.xBase),
            yBase: convFun.VLengthFromReal(this.m_outline.yBase),
            x: convFun.VxFromReal(this.m_outline.x),
            y: convFun.VyFromReal(this.m_outline.y),
        };
        this._FitChildren();
    }
    ;
    Render(ctx) {
        const canvasH = this.GetRoot().m_canvasH;
        const m_vOutline = this.GetVirtualOutline();
        try {
            CanvasDraw_1.CanvasDraw.drawImage(ctx, m_vOutline, canvasH, this.m_image);
        }
        catch (e) {
            CanvasDraw_1.CanvasDraw.drawRect(ctx, m_vOutline, canvasH);
        }
        this._RenderChildren(ctx);
    }
    ;
}
exports.Part = Part;
//# sourceMappingURL=Part.Impl.js.map