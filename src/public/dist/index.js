"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Laboratory_Impl_1 = require("./Impl/Laboratory.Impl");
const Component_1 = require("./Abstract/Component");
const List_Impl_1 = require("./Impl/Util/List.Impl");
const Dashboard_Impl_1 = require("./Impl/Dashboard.Impl");
const VtcRouter_1 = require("./Impl/Util/VtcRouter");
const ComponentFactory_1 = require("./Impl/Factory/ComponentFactory");
class TAR {
    constructor(pack) {
        this.OverrideParseChildren = function () {
            Component_1.Component.prototype._ParseChildren = function (jpackArray) {
                const list = new List_Impl_1.List();
                this.m_children = list;
                for (let i = 0; i < jpackArray.length; i++) {
                    const componentInstance = ComponentFactory_1.ComponentFactory.Create(jpackArray[i].class, this);
                    list.push(componentInstance);
                    componentInstance.Parse(jpackArray[i]);
                }
            };
        };
        this.CycleRefresh = function (laboratory, dashboard, canvasW, canvasH) {
            setInterval(() => {
                this.m_ctx.clearRect(0, 0, canvasW, canvasH);
                laboratory.Fit();
                dashboard.Fit();
                laboratory.Render(this.m_ctx);
                dashboard.Render(this.m_ctx);
            }, 20);
        };
        const { ctx, config, canvas } = pack;
        this.m_ctx = ctx;
        this.m_jpack = config;
        TAR.canvas = canvas;
        this.OverrideParseChildren();
    }
    PushVinChannel(vinChannelPack) {
        TAR.M_VtcRouter.Push(vinChannelPack);
    }
    SetVinChannel(asmFormat) {
        TAR.M_VtcRouter = new VtcRouter_1.VtcRouter(asmFormat);
    }
    Create(option) {
        const { realScene, virtualScene } = this.m_jpack;
        const { canvasW, canvasH } = option;
        const laboratory = TAR.laboratory = new Laboratory_Impl_1.Laboratory(canvasW, canvasH);
        const dashboard = TAR.dashboard = new Dashboard_Impl_1.Dashboard(canvasW, canvasH);
        laboratory.Parse(realScene);
        laboratory.Fit();
        dashboard.Parse(virtualScene);
        dashboard.Fit();
        this.CycleRefresh(laboratory, dashboard, canvasW, canvasH);
    }
}
exports.TAR = TAR;
//# sourceMappingURL=index.js.map