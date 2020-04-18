import { ConvI } from "../../Interface/Conv.I";
export declare class Conv implements ConvI {
    vres: number;
    a1: number;
    b1: number;
    a2: number;
    b2: number;
    RLengthFromVirtual(vl: number): number;
    RxFromVirtual(vx: number): number;
    RyFromVirtual(vy: number): number;
    VLengthFromReal(rl: number): number;
    VxFromReal(rx: number): number;
    VyFromReal(ry: number): number;
    RealSceneFitCanvas(realW: number, realH: number, canvasW: number, canvasH: number): void;
}
