export type SelectValue = string | number;
export interface SelectOption<V extends SelectValue = SelectValue> {
    value: V;
    label: string;
    description?: string;
}
declare const __VLS_export: <V extends SelectValue = string>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import('vue').PublicProps & __VLS_PrettifyLocal<{
        modelValue?: V | V[] | undefined;
        options: SelectOption<V>[];
        placeholder?: string;
        searchPlaceholder?: string;
        searchable?: boolean;
        multiple?: boolean;
        clearable?: boolean;
        disabled?: boolean;
        emptyText?: string;
    } & {
        onChange?: ((value: V) => any) | undefined;
        "onUpdate:modelValue"?: ((value: V | V[] | undefined) => any) | undefined;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {};
    emit: {
        (e: "update:modelValue", value: V | V[] | undefined): void;
        (e: "change", value: V): void;
    };
}>) => import('vue').VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
