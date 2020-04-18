import { OutlineI } from "../Interface/Outline.I";
import { LocationI } from "../Interface/Location.I";
import { JsonPackI } from "../Interface/JsonPack.I";
import { CanvasContextI } from "../Interface/CanvasContext.I";
import { List } from "../Impl/Util/List.Impl";
import { NumberNode } from "../Impl/Util/NumberNode";
interface Coord {
    x: number;
    y: number;
}
export declare abstract class Component {
    protected m_parent: Component;
    protected m_tag: string;
    protected m_outline: OutlineI;
    protected m_anchor: Component;
    protected m_location: LocationI;
    protected m_z: number;
    m_children: List;
    protected m_widthNode: NumberNode;
    protected m_heightNode: NumberNode;
    protected m_xOffsetNode: NumberNode;
    protected m_yOffsetNode: NumberNode;
    constructor(parent: Component | null);
    abstract IsReality(): boolean;
    GetOutline(): OutlineI;
    abstract GetVirtualOutline(): OutlineI;
    GetRoot(): any;
    Find(target: string): Component | null;
    Parse(jpack: JsonPackI): void;
    abstract Fit(): void;
    abstract Render(ctx: CanvasContextI): void;
    _ParseChildren(jpackArray: Array<JsonPackI>): void;
    protected _FitChildren(): void;
    protected _RenderChildren(ctx: CanvasContextI): void;
    protected GetCoordValue(): Coord;
}
export {};
