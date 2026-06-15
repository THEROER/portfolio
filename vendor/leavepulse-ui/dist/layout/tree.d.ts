export type Dir = "row" | "col";
export type Side = "left" | "right" | "top" | "bottom" | "center";
export interface Leaf {
    kind: "leaf";
    id: string;
    /** Block id — the consumer maps this to content via the canvas slot. */
    block: string;
    /** Flex fraction among siblings. */
    size: number;
}
export interface Split {
    kind: "split";
    id: string;
    dir: Dir;
    size: number;
    children: LayoutNode[];
}
export type LayoutNode = Leaf | Split;
/** Build a single-row layout from a flat list of block ids. */
export declare function makeLayout(blocks: string[]): Split;
export declare function findParent(node: Split, childId: string): Split | null;
export declare function findLeaf(node: LayoutNode, id: string): Leaf | null;
export declare function countLeaves(node: LayoutNode): number;
export declare function removeLeaf(root: Split, id: string): void;
export declare function addLeaf(root: Split, block: string, side?: Side): void;
/** Move an existing block beside a target on the given edge. */
export declare function moveLeaf(root: Split, movingId: string, targetId: string, side: Side): void;
/** Splitter drag: redistribute size between two adjacent siblings. */
export declare function resizeAt(parent: Split, index: number, deltaFraction: number): void;
interface SerializedLeaf {
    kind: "leaf";
    block: string;
    size: number;
}
interface SerializedSplit {
    kind: "split";
    dir: Dir;
    size: number;
    children: SerializedNode[];
}
type SerializedNode = SerializedLeaf | SerializedSplit;
export declare function serializeLayout(root: Split): SerializedNode;
export declare function deserializeLayout(data: SerializedNode): Split;
export {};
