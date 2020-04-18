import { Widget } from "../Abstract/Widget";
import { JsonPackI } from "../Interface/JsonPack.I";
import { CanvasContextI } from "../Interface/CanvasContext.I";
export declare class DigitalMeter extends Widget {
    private m_caption;
    private m_value;
    private m_dot;
    private m_unit;
    private m_font;
    private m_fontSize;
    private m_color;
    private m_ele;
    private m_gauge;
    private m_valueNode;
    private m_timer;
    private m_image;
    private m_imageObj;
    private m_cacheVal;
    private m_diffVal;
    Parse(jpack: JsonPackI): void;
    Fit(): void;
    ParseDigital(value: any): {
        integer: string[];
        decimals: string[];
        Num: string[];
    };
    Compare(): void;
    Render(ctx: CanvasContextI): void;
}
