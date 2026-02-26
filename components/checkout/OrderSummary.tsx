"use client";

import React from 'react';
import { formatRupiah } from '@/lib/money';
import { CartItem } from '@/types';
import { Button } from '@/components/ui/Button';

interface OrderSummaryProps {
    items: CartItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    couponCode: string | null;
    isSubmitting?: boolean;
}

export function OrderSummary({ items, subtotal, shippingFee, discount, total, couponCode, isSubmitting }: OrderSummaryProps) {
    return (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-200 shadow-sm flex-shrink-0 overflow-hidden">
                            <img alt={item.product.name} className="w-full h-full object-cover" src={item.product.image} />
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

            <div className="pt-4 border-t border-gray-300 mb-6">
                <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-gray-900">Total Tagihan</span>
                    <span className="text-2xl font-extrabold text-green-600">{formatRupiah(total)}</span>
                </div>
            </div>

            {/* WhatsApp Info Banner */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-green-800">Pesanan via WhatsApp</h4>
                    <p className="text-xs text-green-700 mt-1 leading-relaxed">
                        Setelah klik tombol di bawah, Anda akan diarahkan ke WhatsApp untuk mengirim pesanan ke penjual. Konfirmasi via chat.
                    </p>
                </div>
            </div>

            <Button
                type="submit"
                form="checkout-form"
                size="lg"
                className="w-full text-lg shadow-md hover:shadow-lg transition-all bg-green-600 hover:bg-green-700 flex items-center justify-center gap-3"
                isLoading={isSubmitting}
                disabled={items.length === 0}
            >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pesan via WhatsApp
            </Button>
        </div>
    );
}
