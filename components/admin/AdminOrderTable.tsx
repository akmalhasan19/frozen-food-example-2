"use client";

import { useState, useEffect } from "react";
import { formatRupiah } from "@/lib/money";
import { orderStore } from "@/store/order-store";
import { Order, OrderStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";

const statusColors: Record<OrderStatus, "warning" | "info" | "success" | "danger" | "default"> = {
    DIPROSES: "warning",
    DIKIRIM: "info",
    SELESAI: "success",
    BATAL: "danger",
};

export default function AdminOrderTable() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadOrders();
        // Refresh every 10 secs assuming this might be used in multiple tabs
        const interval = setInterval(loadOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const loadOrders = () => {
        // Tampilkan order terbaru di atas
        const allOrders = orderStore.getOrders().sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(allOrders);
    };

    const handleStatusChange = (orderId: string, newStatus: string) => {
        orderStore.updateOrderStatus(orderId, newStatus as OrderStatus);
        loadOrders();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">Antrean Pesanan</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-6 py-3 font-medium">ID Pesanan</th>
                            <th className="px-6 py-3 font-medium">Pelanggan</th>
                            <th className="px-6 py-3 font-medium">Total</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Waktu</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    {order.id}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-slate-900">{order.customerName}</div>
                                    <div className="text-slate-500 text-xs">{order.customerPhone}</div>
                                </td>
                                <td className="px-6 py-4">{formatRupiah(order.total)}</td>
                                <td className="px-6 py-4">
                                    <Select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="min-w-[130px] text-xs h-8 py-1"
                                        options={[
                                            { label: "Diproses", value: "DIPROSES" },
                                            { label: "Dikirim", value: "DIKIRIM" },
                                            { label: "Selesai", value: "SELESAI" },
                                            { label: "Batal", value: "BATAL" },
                                        ]}
                                    />
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {new Date(order.createdAt).toLocaleDateString('id-ID', {
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                    Belum ada pesanan masuk.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
