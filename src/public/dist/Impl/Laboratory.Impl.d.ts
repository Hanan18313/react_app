import { Component } from "../Abstract/Component";
import { OutlineI } from "../Interface/Outline.I";
import { JsonPackI } from "../Interface/JsonPack.I";
import { CanvasContextI } from "../Interface/CanvasContext.I";
import { Conv } from "./Util/Conv.Impl";
export declare class Laboratory extends Component {
    m_canvasW: number;
    m_canvasH: number;
    private m_conv;
    private m_vOutline;
    constructor(canvasW: number, canvasH: number);
    GetConv(): Conv;
    IsReality(): boolean;
    GetVirtualOutline(): OutlineI;
    Parse(jpack: JsonPackI): void;
    Fit(): void;
    Render(ctx: CanvasContextI): void;
}
