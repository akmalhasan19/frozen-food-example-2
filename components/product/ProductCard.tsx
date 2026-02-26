"use client";

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatRupiah } from '@/lib/money';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart-context';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <Link href={`/produk/${product.slug}`} className="relative h-32 sm:h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    src={product.image}
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 scale-75 sm:scale-100 origin-top-left">
                    <Badge variant="warning">{product.category}</Badge>
                    {isOutOfStock && <Badge variant="danger">Habis</Badge>}
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-3 sm:p-4">
                <Link href={`/produk/${product.slug}`}>
                    <h3 className="line-clamp-2 text-xs sm:text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-1 text-[10px] sm:text-xs text-gray-500">Sisa Stok: {product.stock}</p>

                <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between">
                    <span className="font-bold text-green-700 text-xs sm:text-base">{formatRupiah(product.price)}</span>
                    <Button
                        size="sm"
                        variant="primary"
                        disabled={isOutOfStock}
                        onClick={() => addItem(product)}
                        className="rounded-full w-10 h-10 sm:w-10 sm:h-10 p-0 flex items-center justify-center"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="!w-7 !h-7 sm:!w-6 sm:!h-6" strokeWidth={2.5} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
