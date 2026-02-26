"use client";

import React, { useState } from 'react';
import { formatRupiah } from '@/lib/money';
import { useCart } from '@/store/cart-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CartSummary() {
    const { items, subtotal, discount, couponCode, total, applyCoupon } = useCart();
    const [couponInput, setCouponInput] = useState(couponCode || '');
    const router = useRouter();

    // Basic rules defined
    const isFreeTotalShippingEligible = subtotal >= 200000;

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        applyCoupon(couponInput);
    };

    if (items.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Belanja</h2>

            {/* Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Makin Hemat dengan Kupon</label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            placeholder="FROZEN10"
                            className="pl-9 uppercase"
                        />
                    </div>
                    <Button type="submit" variant="secondary" className="shrink-0">Terapkan</Button>
                </div>
                {couponCode && discount > 0 && (
                    <p className="mt-2 text-sm text-green-600 font-medium">
                        Kupon {couponCode} berhasil dipakai! (-{formatRupiah(discount)})
                    </p>
                )}
            </form>

            <div className="space-y-4 py-4 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                    <span>Total Harga ({items.length} Barang)</span>
                    <span className="font-medium text-gray-900">{formatRupiah(subtotal)}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Diskon Kupon</span>
                        <span>-{formatRupiah(discount)}</span>
                    </div>
                )}

                {/* Helper info on free shipping for regular */}
                {!isFreeTotalShippingEligible ? (
                    <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                        Tambah {formatRupiah(200000 - subtotal)} lagi untuk dapat **Gratis Ongkir Reguler**!
                    </p>
                ) : (
                    <p className="text-xs text-green-700 bg-green-50 p-2 rounded-lg font-medium tracking-tight">
                        Kualifikasi **Gratis Ongkir Reguler** tercapai!
                    </p>
                )}
            </div>

            <div className="pt-4 border-t border-gray-200 mt-4 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Belanja</span>
                    <span className="text-2xl font-extrabold text-green-600">{formatRupiah(total)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">*Belum termasuk biaya pengiriman</p>
            </div>

            <Button
                size="lg"
                className="w-full text-lg shadow-md hover:shadow-lg transition-all"
                onClick={() => router.push('/checkout')}
            >
                Lanjut ke Pembayaran
            </Button>
        </div>
    );
}
