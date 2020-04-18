import { Widget } from "../Abstract/Widget";
import { JsonPackI } from "../Interface/JsonPack.I";
import { CanvasContextI } from "../Interface/CanvasContext.I";
export declare class Dashboard extends Widget {
    m_canvasW: number;
    m_canvasH: number;
    constructor(canvasW: number, canvasH: number);
    Parse(jpack: JsonPackI): void;
    Render(ctx: CanvasContextI): void;
}
