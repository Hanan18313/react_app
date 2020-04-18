import { Component } from "./Component";
import { OutlineI } from "../Interface/Outline.I";
import { Pipeline } from "../Impl/Util/Pipeline";
export declare abstract class Widget extends Component {
    IsReality(): boolean;
    GetVirtualOutline(): OutlineI;
    Fit(): void;
    Subscribe(tagVin: string): Pipeline;
}
