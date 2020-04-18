import { OutlineI } from "../../Interface/Outline.I";
import { LocationI } from "../../Interface/Location.I";
interface Coord {
    x: number;
    y: number;
}
export declare class GetOffset {
    static GetValue(anchorOutline: OutlineI, selfOutline: OutlineI, selfLocation: LocationI): Coord;
}
export {};
