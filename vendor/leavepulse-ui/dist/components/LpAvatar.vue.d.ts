import { VariantProps } from 'tailwind-variants';
declare const avatar: import('tailwind-variants').TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-pill bg-surface-soft font-medium text-muted-strong", {
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, import('tailwind-variants').TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-pill bg-surface-soft font-medium text-muted-strong", unknown, unknown, undefined>>;
type AvatarVariants = VariantProps<typeof avatar>;
type __VLS_Props = {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarVariants["size"];
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    size: "md" | "sm" | "lg";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
