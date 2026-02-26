"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/store/cart-context';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { items, subtotal, discount, couponCode, isHydrated } = useCart();
    const [shippingFee, setShippingFee] = useState(15000); // Default set to 15k just for initial flash mount before effect kicks in
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // If cart is empty on mount or later, redirect out
        if (isHydrated && items.length === 0) {
            router.replace('/keranjang');
        }
    }, [items, isHydrated, router]);

    if (!isHydrated || items.length === 0) return null;

    const total = subtotal + shippingFee - discount;

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/keranjang" className="text-gray-400 hover:text-green-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1 w-full">
                        <CheckoutForm onShippingChange={setShippingFee} onSubmittingChange={setIsSubmitting} />
                    </div>

                    <div className="w-full lg:w-[400px] shrink-0">
                        <OrderSummary
                            items={items}
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            discount={discount}
                            total={total}
                            couponCode={couponCode}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
