import { LayoutNode, Side, Split } from '../layout/tree';
type __VLS_Props = {
    node: LayoutNode;
    dragId: string | null;
    edit: boolean;
};
type __VLS_Slots = {
    block(props: {
        block: string;
        edit: boolean;
        remove: () => void;
    }): unknown;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    dragstart: (id: string) => any;
    dragend: () => any;
    drop: (targetId: string, side: Side) => any;
    remove: (id: string) => any;
    resize: (parent: Split, index: number, deltaFraction: number) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDragstart?: ((id: string) => any) | undefined;
    onDragend?: (() => any) | undefined;
    onDrop?: ((targetId: string, side: Side) => any) | undefined;
    onRemove?: ((id: string) => any) | undefined;
    onResize?: ((parent: Split, index: number, deltaFraction: number) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
