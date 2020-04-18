export declare class Pipeline {
    m_tag: string;
    m_flow: number[];
    constructor(tag: string);
    Push(data: number[]): void;
    Pop(buf: number[]): void;
}
