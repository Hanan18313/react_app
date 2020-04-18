"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(value) {
        this.m_value = value;
        this.m_next = null;
        this.m_prev = null;
    }
}
class List {
    constructor() {
        this.m_head = null;
        this.m_tail = null;
        this.m_length = 0;
    }
    push(value) {
        const node = new Node(value);
        if (!this.m_head) {
            this.m_tail = this.m_head = node;
        }
        else {
            this.m_tail.m_next = node;
            node.m_prev = this.m_tail;
            this.m_tail = node;
        }
        this.m_length++;
    }
    find(tag) {
        let presentNode = this.m_head;
        while (presentNode) {
            if (presentNode.m_value.m_tag === tag) {
                return presentNode.m_value;
            }
            presentNode = presentNode.m_next;
        }
        return null;
    }
    findRecursive(tag) {
        let presentNode = this.m_head;
        while (presentNode) {
            if (presentNode.m_value.m_tag === tag) {
                return presentNode.m_value;
            }
            if (presentNode.m_value.m_children) {
                return presentNode.m_value.m_children.findRecursive(tag);
            }
            presentNode = presentNode.m_next;
        }
        return null;
    }
}
exports.List = List;
//# sourceMappingURL=List.Impl.js.map