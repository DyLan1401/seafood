import { useToast } from "../hooks/useToast";

export function ToastContainer({ toasts }: { toasts: ReturnType<typeof useToast>["toasts"] }) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`px-4 py-3 rounded-lg text-white text-sm shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}