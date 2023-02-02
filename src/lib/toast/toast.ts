import { writable } from "svelte/store";
import type { ToastData, ToastFunction, ToastOptions, ToastType } from "./types";

const DEFAULT_TOAST_DURATION = 5000;

let _current_timeout: NodeJS.Timeout | null = null;

const _create_toast_function = (type: ToastType): ToastFunction => {
    return (title: string, options?: ToastOptions) => {
        const duration = options?.duration ?? DEFAULT_TOAST_DURATION;
        dismissToast();
        _current_timeout = setTimeout(dismissToast, duration);
        toastData.set({
            title,
            message: options?.message,
            type,
            duration
        });
    };
};

export const toastData = writable<ToastData | null>(null);

export const toast: Record<ToastType, ToastFunction> = {
    info: _create_toast_function("info"),
    success: _create_toast_function("success"),
    warning: _create_toast_function("warning"),
    error: _create_toast_function("error"),
};

export const dismissToast = (): void => {
    toastData.set(null);
    if (_current_timeout) {
        clearTimeout(_current_timeout);
        _current_timeout = null;
    }
}
