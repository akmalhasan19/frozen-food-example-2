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
            <Link href={`/produk/${product.slug}`} className="relative h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {/* Placeholder for image since we don't have real images yet */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-orange-50 opacity-50" />
                <span className="text-gray-400 font-medium z-10">{product.name.charAt(0)}</span>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    <Badge variant="warning">{product.category}</Badge>
                    {isOutOfStock && <Badge variant="danger">Habis</Badge>}
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <Link href={`/produk/${product.slug}`}>
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="mt-1 text-xs text-gray-500">Sisa Stok: {product.stock}</p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-bold text-green-700">{formatRupiah(product.price)}</span>
                    <Button
                        size="sm"
                        variant="primary"
                        disabled={isOutOfStock}
                        onClick={() => addItem(product)}
                        className="rounded-full w-8 h-8 p-0 flex items-center justify-center"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
