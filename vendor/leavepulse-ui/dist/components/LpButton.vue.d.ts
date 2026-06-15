import { VariantProps } from 'tailwind-variants';
declare const button: import('tailwind-variants').TVReturnType<{
    variant: {
        solid: string;
        action: string;
        outline: string;
        soft: string;
        ghost: string;
        muted: string;
        danger: string;
    };
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
    block: {
        true: string;
    };
    square: {
        true: string;
    };
}, undefined, string[], {
    variant: {
        solid: string;
        action: string;
        outline: string;
        soft: string;
        ghost: string;
        muted: string;
        danger: string;
    };
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
    block: {
        true: string;
    };
    square: {
        true: string;
    };
}, undefined, import('tailwind-variants').TVReturnType<{
    variant: {
        solid: string;
        action: string;
        outline: string;
        soft: string;
        ghost: string;
        muted: string;
        danger: string;
    };
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
    block: {
        true: string;
    };
    square: {
        true: string;
    };
}, undefined, string[], unknown, unknown, undefined>>;
type ButtonVariants = VariantProps<typeof button>;
type __VLS_Props = {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    block?: boolean;
    square?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    type: "button" | "submit" | "reset";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
