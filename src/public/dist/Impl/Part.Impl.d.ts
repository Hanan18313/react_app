import { Component } from "../Abstract/Component";
import { OutlineI } from "../Interface/Outline.I";
import { CanvasContextI } from "../Interface/CanvasContext.I";
import { JsonPackI } from "../Interface/JsonPack.I";
export declare class Part extends Component {
    m_vOutline: OutlineI;
    m_image: CanvasContextI;
    constructor(parent: Component);
    IsReality(): boolean;
    GetVirtualOutline(): OutlineI;
    Parse(jpack: JsonPackI): void;
    Fit(): void;
    Render(ctx: CanvasContextI): void;
}
