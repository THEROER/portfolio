import { Split } from '../layout/tree';
import { TokenSet } from './tokens';
export declare const UI_CONFIG_VERSION = 1;
export interface UiConfig {
    version: number;
    theme: TokenSet;
    /** Optional — apps without a composable layout omit it. */
    layout?: Split;
}
export interface SerializedUiConfig {
    version: number;
    theme: TokenSet;
    layout?: unknown;
}
export declare function serializeConfig(config: UiConfig): string;
export declare function parseConfig(json: string): UiConfig;
