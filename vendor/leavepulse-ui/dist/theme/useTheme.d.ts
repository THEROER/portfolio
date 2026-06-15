import { TokenSet } from './tokens';
export declare function applyTheme(theme: TokenSet, root?: HTMLElement): void;
export declare function serializeTheme(theme: TokenSet): string;
/** Parse + shallow-validate a theme JSON; throws on a malformed shape. */
export declare function parseTheme(json: string): TokenSet;
export declare function bootstrapTheme(fallback: TokenSet): TokenSet;
export declare function cacheTheme(theme: TokenSet): void;
export declare function useTheme(): {
    apply: (theme: TokenSet) => void;
    serialize: typeof serializeTheme;
    parse: typeof parseTheme;
    bootstrap: typeof bootstrapTheme;
};
