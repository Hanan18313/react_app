import { WordProvider } from "../../Interface/WordProvider";
import { Pipeline } from "./Pipeline";
import { NumPack } from "../../Interface/NumPack";
interface Dictionary {
    [prop: string]: number;
}
interface AsmData {
    [prop: string]: number[];
}
export declare class VtcRouter implements WordProvider {
    protected m_asmDict: Dictionary;
    protected m_pipelines: Pipeline[];
    constructor(asmFormat: Array<string>);
    Push(asmData: AsmData): void;
    Subscribe(vinTag: string): Pipeline;
    GetWordValue(word: string, numPack: NumPack): boolean;
}
export {};
