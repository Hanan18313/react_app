import { SimpleNumber, LinearExp, MuiltLinearExp } from "../Util/NumberNode";
export declare class NumberNodeFactory {
    static Create(nodeValue: any): SimpleNumber | MuiltLinearExp | LinearExp;
}
