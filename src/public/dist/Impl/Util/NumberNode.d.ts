import { WordProvider } from "../../Interface/WordProvider";
export declare abstract class NumberNode {
    static Create(nodeValue: any): SimpleNumber | MuiltLinearExp | LinearExp;
    abstract GetValue(): number;
    protected splitByRule(str: any): any[];
    protected splitMultAndDivi(str: any): {
        a: any;
        x: any;
    };
}
export declare class SimpleNumber extends NumberNode {
    protected m_value: number;
    constructor(value: number);
    GetValue(): number;
}
export declare class LinearExp extends NumberNode {
    protected m_varible: string;
    protected m_a: number;
    protected m_b: number;
    m_wordProvider: WordProvider;
    private Parse;
    constructor(exp: string, wordPro: WordProvider);
    GetValue(): number;
}
export declare class MuiltLinearExp extends NumberNode {
    protected m_varibles: string[];
    protected m_a: number[];
    protected m_b: number;
    m_wordProvider: WordProvider;
    private Parse;
    constructor(exp: string, wordPro: WordProvider);
    GetValue(): number;
}
