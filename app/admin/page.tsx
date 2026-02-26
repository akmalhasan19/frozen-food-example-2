"use client";

import AdminLoginGate from "@/components/admin/AdminLoginGate";
import AdminProductTable from "@/components/admin/AdminProductTable";
import AdminOrderTable from "@/components/admin/AdminOrderTable";
import { Package, ShoppingBag, LayoutDashboard } from "lucide-react";

export default function AdminPage() {
    return (
        <AdminLoginGate>
            <div className="min-h-screen bg-slate-50 pb-20">
                {/* Admin Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                                <LayoutDashboard className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-slate-500 hidden sm:block">
                                Mode Editor Lokal
                            </span>
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem("ff_admin_session_v1");
                                    window.location.reload();
                                }}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Orders Section */}
                        <section>
                            <div className="flex items-center space-x-2 mb-4">
                                <ShoppingBag className="w-5 h-5 text-slate-400" />
                                <h2 className="text-lg font-semibold text-slate-800">Manajemen Pesanan</h2>
                            </div>
                            <AdminOrderTable />
                        </section>

                        {/* Products Section */}
                        <section>
                            <div className="flex items-center space-x-2 mb-4">
                                <Package className="w-5 h-5 text-slate-400" />
                                <h2 className="text-lg font-semibold text-slate-800">Manajemen Produk</h2>
                            </div>
                            <AdminProductTable />
                        </section>
                    </div>
                </main>
            </div>
        </AdminLoginGate>
    );
}
