import { VariantProps } from 'tailwind-variants';
declare const badge: import('tailwind-variants').TVReturnType<{
    tone: {
        neutral: string;
        brand: string;
        action: string;
        danger: string;
    };
}, undefined, "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-medium", {
    tone: {
        neutral: string;
        brand: string;
        action: string;
        danger: string;
    };
}, undefined, import('tailwind-variants').TVReturnType<{
    tone: {
        neutral: string;
        brand: string;
        action: string;
        danger: string;
    };
}, undefined, "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-medium", unknown, unknown, undefined>>;
type BadgeVariants = VariantProps<typeof badge>;
type __VLS_Props = {
    tone?: BadgeVariants["tone"];
    dot?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
