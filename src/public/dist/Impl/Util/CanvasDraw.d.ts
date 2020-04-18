import { CanvasContextI } from "../../Interface/CanvasContext.I";
import { OutlineI } from "../../Interface/Outline.I";
export declare class CanvasDraw {
    static drawImage(ctx: CanvasContextI, vOutline: OutlineI, canvasH: number, image: CanvasContextI): void;
    static drawRect(ctx: CanvasContextI, vOutline: OutlineI, canvasH: number): void;
    static drawDigitalDisplay(ctx: CanvasContextI, vOutline: OutlineI, image: CanvasContextI): void;
}
