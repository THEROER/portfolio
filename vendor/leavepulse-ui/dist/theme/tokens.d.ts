export interface ColorTokens {
    surface: string;
    surfaceRaised: string;
    surfaceSoft: string;
    ink: string;
    inkInverse: string;
    muted: string;
    mutedStrong: string;
    brand: string;
    brandHover: string;
    brandSoft: string;
    action: string;
    actionHover: string;
    accent: string;
    danger: string;
    dangerHover: string;
    dangerSoft: string;
    line: string;
    lineStrong: string;
    ring: string;
}
export interface ShapeTokens {
    radiusControl: number;
    radiusCard: number;
    radiusPill: number;
}
export interface DensityTokens {
    /** base spacing unit in px */
    spacingUnit: number;
    controlSm: number;
    controlMd: number;
    controlLg: number;
}
export interface FontTokens {
    /** CSS font-family stack for UI text */
    sans: string;
    /** CSS font-family stack for numerals / code */
    mono: string;
}
export interface TokenSet {
    /** human label, e.g. "Lime" */
    name: string;
    /** "dark" | "light" — drives `color-scheme` and the data-theme-mode hint */
    mode: "dark" | "light";
    colors: ColorTokens;
    shape: ShapeTokens;
    density: DensityTokens;
    font: FontTokens;
}
/** camelCase token key → CSS custom property name. */
export declare const COLOR_VARS: Record<keyof ColorTokens, string>;
export declare const SHAPE_VARS: Record<keyof ShapeTokens, string>;
export declare const DENSITY_VARS: Record<keyof DensityTokens, string>;
export declare const FONT_VARS: Record<keyof FontTokens, string>;
