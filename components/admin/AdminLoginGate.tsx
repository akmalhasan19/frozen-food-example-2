"use client";

import { useState, useEffect } from "react";
import { safeSessionStorage } from "@/lib/storage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Lock } from "lucide-react";

interface AdminLoginGateProps {
    children: React.ReactNode;
}

const loginSchema = z.object({
    password: z.string().min(1, "Password harus diisi"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginGate({ children }: AdminLoginGateProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        // Cek session saat mount
        const session = safeSessionStorage.get<string>("ff_admin_session_v1");
        if (session === "ok") {
            setIsAuthenticated(true);
        }
        setIsChecking(false);
    }, []);

    const onSubmit = async (data: LoginFormData) => {
        setError(null);
        try {
            const res = await fetch("/api/admin/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (res.ok && json.ok) {
                safeSessionStorage.set("ff_admin_session_v1", "ok");
                setIsAuthenticated(true);
            } else {
                setError(json.message || "Password salah");
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        }
    };

    if (isChecking) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 md:mt-20 px-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-center mb-6">
                    <div className="bg-emerald-100 p-3 rounded-full">
                        <Lock className="w-6 h-6 text-emerald-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
                    Admin Login
                </h1>
                <p className="text-slate-500 text-center mb-6">
                    Masukkan password untuk mengakses halaman admin.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            type="password"
                            placeholder="Masukkan password admin"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Memeriksa..." : "Masuk"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
