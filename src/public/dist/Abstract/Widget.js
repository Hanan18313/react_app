"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const __1 = require("../");
class Widget extends Component_1.Component {
    IsReality() {
        return false;
    }
    GetVirtualOutline() {
        return this.m_outline;
    }
    Fit() {
        if (this.m_anchor) {
            const offsetResult = this.GetCoordValue();
            this.m_outline.x = offsetResult.x;
            this.m_outline.y = offsetResult.y;
        }
        this._FitChildren();
    }
    Subscribe(tagVin) {
        return __1.TAR.M_VtcRouter.Subscribe(tagVin);
    }
}
exports.Widget = Widget;
//# sourceMappingURL=Widget.js.map