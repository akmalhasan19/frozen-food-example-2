"use client";

import React, { useEffect, useState } from 'react';
import { orderStore } from '@/store/order-store';
import { Order } from '@/types';
import { formatRupiah } from '@/lib/money';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ChevronRight, Package, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrderSuccessPage() {
    const [order, setOrder] = useState<Order | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true);
        const lastOrder = orderStore.getLastOrder();
        if (lastOrder) {
            setOrder(lastOrder);
        } else {
            // If no last order found, perhaps user accessed this directly. Redirect.
            router.replace('/produk');
        }
    }, [router]);

    if (!isHydrated) return null;
    if (!order) return null;

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-3xl">

                <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-gray-200">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-8 shadow-inner">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Hore! Pesanan Berhasil
                    </h1>
                    <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
                        Terima kasih telah berbelanja Frozen Food. Pesanan Anda sedang kami siapkan ya!
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-left border border-gray-100 mb-8 max-w-xl mx-auto ring-1 ring-inset ring-gray-900/5">
                        <div className="flex flex-col md:flex-row justify-between pb-6 border-b border-gray-200 mb-6 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">ID Pesanan</p>
                                <p className="text-lg font-bold text-gray-900">{order.id}</p>
                            </div>
                            <div className="md:text-right">
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Belanja</p>
                                <p className="text-2xl font-extrabold text-green-600">{formatRupiah(order.total)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Metode Pengiriman</p>
                                <p className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-gray-400" />
                                    Kurir {order.shippingType}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Metode Pembayaran</p>
                                <p className="text-base font-semibold text-gray-900">
                                    {order.paymentMethod === 'TRANSFER' ? 'Transfer Bank' : 'Bayar di Tempat (COD)'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/produk" className="flex-1 max-w-[200px]">
                            <Button variant="outline" size="lg" className="w-full font-semibold">
                                <Home className="w-5 h-5 mr-2" />
                                Belanja Lagi
                            </Button>
                        </Link>
                        <Link href="/akun/pesanan" className="flex-1 max-w-[240px]">
                            <Button size="lg" className="w-full font-semibold px-8">
                                Cek Status Pesanan
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
