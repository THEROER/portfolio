export type ToastVariant = "info" | "success" | "warning" | "error";
export interface ToastAction {
    label: string;
    onClick: () => void | Promise<void>;
}
export interface ToastItem {
    id: number;
    title?: string;
    message: string;
    variant: ToastVariant;
    duration: number;
    /** Epoch ms when this toast auto-dismisses, or null if it never does. */
    dismissAt: number | null;
    actions?: ToastAction[];
    /** Whole-toast click handler (UAProject-style clickable toast). */
    onClick?: () => void | Promise<void>;
}
export interface ToastOptions {
    title?: string;
    duration?: number;
    actions?: ToastAction[];
    onClick?: () => void | Promise<void>;
}
declare function push(variant: ToastVariant, message: string, options?: ToastOptions): number;
declare function dismiss(id: number): void;
declare function clear(): void;
export declare function useToast(): {
    queue: ToastItem[];
    toast: (message: string, o?: ToastOptions) => number;
    info: (message: string, o?: ToastOptions) => number;
    success: (message: string, o?: ToastOptions) => number;
    warning: (message: string, o?: ToastOptions) => number;
    error: (message: string, o?: ToastOptions) => number;
    /** Low-level push for bridges (e.g. @leavepulse/ui-sdk apiError). */
    push: typeof push;
    dismiss: typeof dismiss;
    clear: typeof clear;
};
export {};
