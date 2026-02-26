"use client";

import React from 'react';
import { formatRupiah } from '@/lib/money';
import { CartItem } from '@/types';

interface OrderSummaryProps {
    items: CartItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    couponCode: string | null;
}

export function OrderSummary({ items, subtotal, shippingFee, discount, total, couponCode }: OrderSummaryProps) {
    return (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-200 shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                            <span className="text-2xl text-gray-300 font-bold">{item.product.name.charAt(0)}</span>
                            <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                {item.quantity}
                            </div>
                        </div>
                        <div className="flex-1 text-sm">
                            <h4 className="font-semibold text-gray-800 line-clamp-2">{item.product.name}</h4>
                            <div className="text-gray-500 mt-1">{formatRupiah(item.product.price)} / pcs</div>
                        </div>
                        <div className="text-right text-sm font-semibold text-gray-900 shrink-0">
                            {formatRupiah(item.product.price * item.quantity)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-3 py-4 border-t border-dashed border-gray-300">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal produk</span>
                    <span className="font-medium text-gray-900">{formatRupiah(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Biaya Pengiriman</span>
                    <span className="font-medium text-gray-900">
                        {shippingFee === 0 ? <span className="text-green-600">Gratis</span> : formatRupiah(shippingFee)}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                        <span>Diskon ({couponCode})</span>
                        <span className="font-medium">-{formatRupiah(discount)}</span>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-300 mb-2">
                <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-gray-900">Total Tagihan</span>
                    <span className="text-2xl font-extrabold text-green-600">{formatRupiah(total)}</span>
                </div>
            </div>
        </div>
    );
}
