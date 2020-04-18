import { Component } from "src/Abstract/Component";
declare class Node {
    m_value: any;
    m_next: any;
    m_prev: any;
    constructor(value: Component);
}
export declare class List {
    m_head: Node;
    m_tail: Node;
    m_length: number;
    constructor();
    push(value: Component): void;
    find(tag: string): Component | null;
    findRecursive(tag: string): Component | null;
}
export {};
