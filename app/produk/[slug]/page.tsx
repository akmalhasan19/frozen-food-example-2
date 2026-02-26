"use client";

import React, { useState, useEffect } from 'react';
import { initialProducts } from '@/data/products';
import { notFound } from 'next/navigation';
import { formatRupiah } from '@/lib/money';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/store/cart-context';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const [isClient, setIsClient] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addItem, items } = useCart();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const product = initialProducts.find((p) => p.slug === params.slug);

    if (!product) {
        notFound();
    }

    // Calculate remaining available stock considering what's already in the cart
    const cartItem = items.find((i) => i.product.id === product.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;
    const availableStock = Math.max(0, product.stock - quantityInCart);
    const isOutOfStock = availableStock <= 0;

    const handleDecrement = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrement = () => {
        setQuantity((prev) => Math.min(availableStock, prev + 1));
    };

    // Real implementation of handleAddToCart for this context:
    const doAddToCart = () => {
        // In a real app we'd dispatch an ADD_MULTIPLE or handle it in the provider.
        // Since we only have addItem(product) which adds 1, and setQty which sets total.
        if (quantityInCart === 0) {
            addItem(product);
            // if they wanted more than 1, we need to update it
            // We can't easily access the context's setQty right after addItem in the same render cycle
            // without issues. Let's just add it 1 by 1 for now if needed, or better, 
            // rely on the user to just add 1, OR we can implement an ADD_MULTIPLE in the context later.
            // For MVP, we'll just loop the addItem call if quantity > 1. It's synchronous anyway.
            for (let i = 1; i < quantity; i++) {
                addItem(product);
            }
        } else {
            // Just calculate new total and loop addItem
            for (let i = 0; i < quantity; i++) {
                addItem(product);
            }
        }
        setQuantity(1); // reset after adding
    }

    // Related products
    const relatedProducts = initialProducts
        .filter((p) => p.category === product.category && p.id !== product.id && p.isActive)
        .slice(0, 4);

    if (!isClient) return null; // Avoid hydration mismatch for full page if needed, or just render.

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Link href="/produk" className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali ke Katalog
            </Link>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">

                    {/* Product Image Area */}
                    <div className="relative aspect-square md:aspect-auto bg-gray-100 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-orange-50 opacity-50" />
                        <div className="relative z-10 w-full max-w-xs xl:max-w-sm aspect-square rounded-full bg-white/40 shadow-xl backdrop-blur-sm flex items-center justify-center border border-white/60 text-8xl text-gray-300 font-bold uppercase overflow-hidden">
                            {product.name.charAt(0)}
                            {/* Decorative background circle */}
                            <div className="absolute inset-2 rounded-full border border-dashed border-gray-200" />
                        </div>

                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                            <Badge variant="warning" className="text-md px-4 py-1.5 shadow-sm">{product.category}</Badge>
                        </div>
                    </div>

                    {/* Product Details Area */}
                    <div className="p-6 md:p-10 flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
                        <div className="text-4xl font-extrabold text-green-600 mb-8 tracking-tight">
                            {formatRupiah(product.price)}
                        </div>

                        <div className="prose prose-base text-gray-600 mb-8 border-l-4 border-orange-200 pl-4 bg-orange-50/50 py-2">
                            <p>{product.description}</p>
                        </div>

                        <div className="mt-auto space-y-8">
                            {/* Stock info */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                                <span className="text-sm font-semibold text-gray-700">Persediaan Tersisa:</span>
                                <span className={`text-lg font-bold ${availableStock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                                    {availableStock} pcs
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                                <div className="flex flex-1 items-center justify-between border border-gray-300 rounded-lg p-1 bg-white shadow-sm ring-1 ring-black/5">
                                    <button
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1 || isOutOfStock}
                                        className="p-3 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-all active:scale-95 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:active:scale-100"
                                    >
                                        <Minus className="w-6 h-6" />
                                    </button>
                                    <span className="font-bold text-xl text-gray-800 w-16 text-center select-none">
                                        {isOutOfStock ? 0 : quantity}
                                    </span>
                                    <button
                                        onClick={handleIncrement}
                                        disabled={quantity >= availableStock || isOutOfStock}
                                        className="p-3 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-all active:scale-95 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:active:scale-100"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>

                                <Button
                                    size="lg"
                                    className="flex-[2] text-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                                    disabled={isOutOfStock || quantity === 0}
                                    onClick={doAddToCart}
                                >
                                    <ShoppingCart className="w-6 h-6 mr-3" />
                                    {isOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}
                                </Button>
                            </div>

                            {quantityInCart > 0 && (
                                <div className="bg-orange-50 text-orange-700 text-sm font-medium px-4 py-3 rounded-lg border border-orange-100 text-center animate-in fade-in slide-in-from-bottom-2">
                                    Berhasil! Ada <b>{quantityInCart} item</b> ini di keranjang Anda.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Terkait</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
