"use client";

import React, { useEffect, useState } from 'react';
import { orderStore } from '@/store/order-store';
import { Order, OrderItem } from '@/types';
import { formatRupiah } from '@/lib/money';
import { Badge } from '@/components/ui/Badge';
import { PackageOpen, Clock, X } from 'lucide-react';
import Link from 'next/link';

export default function PesananPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        setIsHydrated(true);
        setOrders(orderStore.getOrders().reverse()); // Show newest first
    }, []);

    if (!isHydrated) return null;

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'DIPROSES': return 'warning';
            case 'DIKIRIM': return 'success'; // if we had a blue badge we'd use it, using success/default
            case 'SELESAI': return 'success';
            case 'BATAL': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Riwayat Pesanan</h1>

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 py-24 px-4 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="bg-gray-50 rounded-full p-6 mb-6">
                        <PackageOpen className="w-12 h-12 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Belum ada pesanan</h2>
                    <p className="text-gray-500 max-w-sm mb-6">
                        Anda belum pernah berbelanja. Yuk cari stok frozen food Anda!
                    </p>
                    <Link href="/produk" className="text-green-600 font-semibold hover:underline">
                        Mulai Belanja &rarr;
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white border text-left w-full border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-semibold text-gray-800"><PackageOpen className="w-4 h-4 inline mr-1 text-gray-400 -mt-0.5" /> {order.id}</span>
                                        <span className="text-xs text-gray-400 flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {new Date(order.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                                <Badge variant={getStatusColor(order.status) as any}>{order.status}</Badge>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex-1 w-full space-y-3">
                                    {order.items.slice(0, 2).map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                                                <span className="font-bold text-gray-400 text-lg uppercase">{item.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.quantity} barang x {formatRupiah(item.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {order.items.length > 2 && (
                                        <p className="text-xs text-green-600 font-medium">+ {order.items.length - 2} produk lainnya</p>
                                    )}
                                </div>

                                <div className="md:border-l md:border-gray-200 md:pl-6 w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end shrink-0 pt-4 md:pt-0 border-t border-gray-100 md:border-t-0">
                                    <p className="text-sm text-gray-500 mb-1">Total Belanja</p>
                                    <p className="font-bold text-lg text-gray-900">{formatRupiah(order.total)}</p>
                                    <span className="text-green-600 text-xs font-semibold mt-auto hidden md:inline-block cursor-pointer hover:underline mt-4">
                                        Lihat Detail Order &rarr;
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Detail Order */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Detail Pesanan</h3>
                                <p className="text-sm text-gray-500">{selectedOrder.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <div className="mb-6 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Status</span>
                                <Badge variant={getStatusColor(selectedOrder.status) as any}>{selectedOrder.status}</Badge>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Produk Dibeli</h4>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-start gap-4 text-sm">
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.name}</p>
                                                <p className="text-gray-500 text-xs mt-0.5">{item.quantity} x {formatRupiah(item.price)}</p>
                                            </div>
                                            <div className="font-semibold text-gray-900 whitespace-nowrap">
                                                {formatRupiah(item.subtotal)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Info Pengiriman</h4>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm">
                                    <div className="grid grid-cols-1 gap-3 text-gray-600">
                                        <div className="flex gap-2">
                                            <span className="w-24 shrink-0 font-medium">Kurir</span>
                                            <span className="text-gray-900">{selectedOrder.shippingType}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="w-24 shrink-0 font-medium">Penerima</span>
                                            <span className="text-gray-900">{selectedOrder.customerName} - {selectedOrder.customerPhone}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="w-24 shrink-0 font-medium">Alamat</span>
                                            <span className="text-gray-900 leading-relaxed">{selectedOrder.customerAddress}</span>
                                        </div>
                                        {selectedOrder.customerNotes && (
                                            <div className="flex gap-2">
                                                <span className="w-24 shrink-0 font-medium">Catatan</span>
                                                <span className="text-gray-900 italic">{selectedOrder.customerNotes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Rincian Pembayaran</h4>
                                <div className="space-y-2 text-sm text-gray-600 border-b border-gray-100 pb-3 mb-3">
                                    <div className="flex justify-between">
                                        <span>Metode Pembayaran</span>
                                        <span className="text-gray-900 font-medium">{selectedOrder.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Subtotal Produk</span>
                                        <span className="text-gray-900 font-medium">{formatRupiah(selectedOrder.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Ongkos Kirim</span>
                                        <span className="text-gray-900 font-medium">{formatRupiah(selectedOrder.shippingFee)}</span>
                                    </div>
                                    {selectedOrder.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Diskon kupon</span>
                                            <span className="font-medium">-{formatRupiah(selectedOrder.discount)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Total Belanja</span>
                                    <span className="text-xl font-extrabold text-green-600">{formatRupiah(selectedOrder.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
