import { createContext, useContext, useState } from "react";
import Toast from "../components/ui/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    function showToast(message, variant = "info") {
        setToast({ message, variant });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Toast {...toast} />
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast deve ser usado dentro de ToastProvider");
    }

    return context;
}
