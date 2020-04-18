import { Widget } from "../Abstract/Widget";
import { JsonPackI } from "../Interface/JsonPack.I";
import { CanvasContextI } from "../Interface/CanvasContext.I";
export declare class Chart extends Widget {
    private m_caption;
    private m_value;
    private m_dot;
    private m_unit;
    private m_font;
    private m_fontSize;
    private m_color;
    private m_ele;
    private m_gauge;
    private m_timer;
    private m_pipeline;
    Parse(jpack: JsonPackI): void;
    Render(ctx: CanvasContextI): void;
}
