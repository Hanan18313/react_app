import { Laboratory } from "./Impl/Laboratory.Impl";
import { CanvasContextI } from "./Interface/CanvasContext.I";
import { Dashboard } from "./Impl/Dashboard.Impl";
import { VtcRouter } from "./Impl/Util/VtcRouter";
interface Option {
    canvasW: number;
    canvasH: number;
}
interface VinChannelPack {
    [prop: string]: Array<number>;
}
export declare class TAR {
    static laboratory: Laboratory;
    static dashboard: Dashboard;
    static canvas: CanvasContextI;
    static M_VtcRouter: VtcRouter;
    private m_ctx;
    private m_jpack;
    private OverrideParseChildren;
    constructor(pack: any);
    PushVinChannel(vinChannelPack: VinChannelPack): void;
    SetVinChannel(asmFormat: Array<string>): void;
    Create(option: Option): void;
    private CycleRefresh;
}
export {};
