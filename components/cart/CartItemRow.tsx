"use client";

import React from 'react';
import Link from 'next/link';
import { CartItem } from '@/types';
import { formatRupiah } from '@/lib/money';
import { useCart } from '@/store/cart-context';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemRowProps {
    item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
    const { incrementQty, decrementQty, removeItem, setQty } = useCart();
    const { product, quantity } = item;

    const isAtMaxStock = quantity >= product.stock;

    return (
        <div className="flex gap-4 py-5 border-b border-gray-100 last:border-0 items-start md:items-center">
            {/* Product Image Placeholder */}
            <Link href={`/produk/${product.slug}`} className="shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-orange-50 opacity-50 group-hover:opacity-75 transition-opacity" />
                <span className="text-3xl text-gray-300 font-bold z-10 uppercase">{product.name.charAt(0)}</span>
            </Link>

            {/* Product Info & Controls */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:items-center justify-between">

                <div className="flex-1">
                    <Link href={`/produk/${product.slug}`} className="font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-2 md:line-clamp-1 text-base md:text-lg">
                        {product.name}
                    </Link>
                    <div className="text-green-600 font-bold mt-1 text-base">
                        {formatRupiah(product.price)}
                    </div>
                    {isAtMaxStock && (
                        <p className="text-xs text-orange-500 font-medium mt-1">Maksimal stok tercapai</p>
                    )}
                </div>

                <div className="flex items-center gap-6 mt-2 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                    {/* Qty Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-0.5 bg-white shadow-sm w-fit">
                        <button
                            onClick={() => decrementQty(product.id)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
                        >
                            <Minus className="w-4 h-4" />
                        </button>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val)) setQty(product.id, val);
                            }}
                            className="w-10 text-center font-semibold text-gray-800 text-sm focus:outline-none appearance-none"
                            min="1"
                            max={product.stock}
                        />

                        <button
                            onClick={() => incrementQty(product.id)}
                            disabled={isAtMaxStock}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block w-28 text-right font-bold text-gray-900">
                            {formatRupiah(product.price * quantity)}
                        </div>
                        <button
                            onClick={() => removeItem(product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Hapus item"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
