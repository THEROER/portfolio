import { VariantProps } from 'tailwind-variants';
declare const card: import('tailwind-variants').TVReturnType<{
    variant: {
        raised: string;
        flat: string;
        ghost: string;
    };
    padded: {
        true: string;
        false: string;
    };
    interactive: {
        true: string;
    };
}, undefined, "rounded-card border bg-surface-raised", {
    variant: {
        raised: string;
        flat: string;
        ghost: string;
    };
    padded: {
        true: string;
        false: string;
    };
    interactive: {
        true: string;
    };
}, undefined, import('tailwind-variants').TVReturnType<{
    variant: {
        raised: string;
        flat: string;
        ghost: string;
    };
    padded: {
        true: string;
        false: string;
    };
    interactive: {
        true: string;
    };
}, undefined, "rounded-card border bg-surface-raised", unknown, unknown, undefined>>;
type CardVariants = VariantProps<typeof card>;
type __VLS_Props = {
    variant?: CardVariants["variant"];
    padded?: boolean;
    interactive?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    variant: "flat" | "ghost" | "raised";
    padded: boolean;
    interactive: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
