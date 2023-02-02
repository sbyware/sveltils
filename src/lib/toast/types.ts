export type ToastType = "info" | "success" | "warning" | "error";
export type ToastFunction = (title: string, options?: ToastOptions) => void;

export interface ToastOptions {
    message?: string,
    type?: ToastType
    duration?: number,
}

export interface ToastData extends ToastOptions {
    title: string;
}