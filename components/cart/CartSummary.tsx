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
                className="w-full text-lg shadow-md hover:shadow-lg transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                onClick={() => router.push('/checkout')}
            >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pesan via WhatsApp
            </Button>
        </div>
    );
}
