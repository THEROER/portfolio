export interface TabItem {
    value: string;
    label: string;
    /** Optional iconify name (e.g. "lucide:palette"), shown left of the label. */
    icon?: string;
}
type __VLS_Props = {
    modelValue?: string;
    items: TabItem[];
    /**
     * "contained" (default) wraps the triggers in a bordered, filled bar.
     * "plain" drops the container chrome — a flat row of tabs with only the
     * sliding pill marking the active one (for nav bars over a custom surface).
     */
    variant?: "contained" | "plain";
    /** Tint the active pill + label with the brand colour (nav-bar style). */
    accent?: boolean;
    /** Stretch the bar to full width with equal-share triggers. */
    block?: boolean;
};
declare var __VLS_42: {
    value: string;
}, __VLS_44: {};
type __VLS_Slots = {} & {
    panel?: (props: typeof __VLS_42) => any;
} & {
    default?: (props: typeof __VLS_44) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    block: boolean;
    variant: "contained" | "plain";
    accent: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
