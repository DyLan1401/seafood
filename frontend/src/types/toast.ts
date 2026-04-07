export type ToastType = "success" | "error";

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export interface ToastState {
    toasts: Toast[];
    show: (message: string, type: ToastType) => void;
    remove: (id: number) => void;
}