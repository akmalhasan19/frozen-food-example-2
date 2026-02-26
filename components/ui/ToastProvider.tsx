"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
    success: (message: string) => void;
    error: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback((message: string) => addToast(message, "success"), [addToast]);
    const error = useCallback((message: string) => addToast(message, "error"), [addToast]);

    return (
        <ToastContext.Provider value={{ toast: addToast, success, error }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`pointer-events-auto flex items-center justify-between min-w-[300px] max-w-sm p-4 rounded-xl shadow-lg border transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in ${t.type === "success"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                : t.type === "error"
                                    ? "bg-red-50 border-red-200 text-red-800"
                                    : "bg-white border-slate-200 text-slate-800"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {t.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                            {t.type === "error" && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                            {t.type === "info" && <Info className="w-5 h-5 text-slate-500 flex-shrink-0" />}
                            <p className="font-medium text-sm">{t.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(t.id)}
                            className="p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
