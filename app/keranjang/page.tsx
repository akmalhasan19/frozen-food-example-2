"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/store/cart-context';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function KeranjangPage() {
    const { items, isHydrated, clearCart } = useCart();

    // Handle SSR mismatch prevention
    if (!isHydrated) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/produk" className="text-gray-400 hover:text-green-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
                </div>
                {items.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                        Kosongkan
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 py-24 px-4 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="bg-gray-50 rounded-full p-6 mb-6">
                        <ShoppingBag className="w-12 h-12 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang belanja kosong</h2>
                    <p className="text-gray-500 max-w-md mb-8">
                        Sepertinya Anda belum menambahkan produk apapun. Yuk, temukan frozen food favorit keluarga Anda sekarang!
                    </p>
                    <Link href="/produk">
                        <Button size="lg" className="px-8 shadow-md">
                            Mulai Belanja
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Item List Area */}
                    <div className="flex-1 w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 md:p-8">
                            <div className="hidden md:flex items-center pb-4 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                <div className="flex-1">Produk</div>
                                <div className="w-32 text-center">Kuantitas</div>
                                <div className="w-28 text-right pr-4">Subtotal</div>
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                {items.map((item) => (
                                    <CartItemRow key={item.product.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <CartSummary />
                    </div>
                </div>
            )}
        </div>
    );
}
