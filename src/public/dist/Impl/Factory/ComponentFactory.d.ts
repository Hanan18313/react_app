import { Part } from "../Part.Impl";
import { DigitalMeter } from "../DigitalMeter.Impl";
import { Chart } from "../Chart.Impl";
import { DigitalDial } from "../DigitalDial.lmpl";
export declare class ComponentFactory {
    static Create(cls: string, content: any): DigitalMeter | Part | Chart | DigitalDial;
}
