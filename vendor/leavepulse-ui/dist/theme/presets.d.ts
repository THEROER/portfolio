import { TokenSet } from './tokens';
export declare const dark: TokenSet;
export declare const light: TokenSet;
export declare const lime: TokenSet;
export declare const presets: {
    readonly dark: TokenSet;
    readonly light: TokenSet;
    readonly lime: TokenSet;
};
export type PresetName = keyof typeof presets;
