declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import('vue').DefineComponent<{
    modelValue?: string;
    size?: "md" | "sm" | "lg" | undefined;
    invalid?: boolean;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string) => any;
}, string, import('vue').PublicProps, Readonly<{
    modelValue?: string;
    size?: "md" | "sm" | "lg" | undefined;
    invalid?: boolean;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    size: "md" | "sm" | "lg";
    type: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>, {
    leading?: (props: {}) => any;
} & {
    trailing?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
