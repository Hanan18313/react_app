interface ExpLinear {
    class: string;
    x: string | Array<string>;
    a: number | Array<number>;
    b: number;
}
export declare class LinearTrans {
    static GetDescRes(express: number | string): number | ExpLinear;
    static GetMotiValue(motiValue: number | ExpLinear): number;
}
export {};
