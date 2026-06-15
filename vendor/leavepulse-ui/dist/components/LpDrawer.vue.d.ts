type __VLS_Props = {
    open?: boolean;
    side?: "left" | "right";
    title?: string;
    description?: string;
    /** Width preset. sm≈22rem, md≈28rem, lg≈36rem, xl≈48rem. */
    size?: "sm" | "md" | "lg" | "xl";
    /** Explicit width override (any CSS length), wins over `size`. */
    width?: string;
};
declare var __VLS_33: {}, __VLS_47: {}, __VLS_49: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_33) => any;
} & {
    default?: (props: typeof __VLS_47) => any;
} & {
    footer?: (props: typeof __VLS_49) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:open": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
}>, {
    size: "sm" | "md" | "lg" | "xl";
    side: "left" | "right";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
