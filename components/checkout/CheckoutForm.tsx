"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/store/cart-context';
import { orderStore } from '@/store/order-store';
import { generateOrderId } from '@/lib/order';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { formatRupiah } from '@/lib/money';
import { ShippingType, PaymentMethod, Order } from '@/types';

// Schema validasi form Checkout
const checkoutSchema = z.object({
    customerName: z.string().min(3, { message: 'Nama harus lebih dari 3 karakter' }),
    customerPhone: z.string()
        .min(10, { message: 'Nomor WhatsApp minimal 10 digit' })
        .max(14, { message: 'Nomor WhatsApp maksimal 14 digit' })
        .regex(/^[0-9]+$/, { message: 'Nomor WhatsApp hanya boleh angka' }),
    customerAddress: z.string().min(10, { message: 'Alamat lengkap wajib diisi' }),
    customerNotes: z.string().optional(),
    shippingType: z.enum(['REGULER', 'INSTAN'] as const),
    paymentMethod: z.enum(['TRANSFER', 'COD'] as const),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm({ onShippingChange }: { onShippingChange: (fee: number) => void }) {
    const { items, subtotal, discount, couponCode, clearCart, isHydrated } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            shippingType: 'REGULER',
            paymentMethod: 'TRANSFER',
            customerNotes: ''
        }
    });

    const selectedShipping = watch('shippingType');

    useEffect(() => {
        // Basic rules defined
        // `REGULER`: ongkir Rp15.000, gratis jika subtotal >= Rp200.000
        // `INSTAN`: ongkir Rp25.000, tidak ikut gratis ongkir
        let fee = 0;
        if (selectedShipping === 'REGULER') {
            fee = subtotal >= 200000 ? 0 : 15000;
        } else if (selectedShipping === 'INSTAN') {
            fee = 25000;
        }
        onShippingChange(fee);
    }, [selectedShipping, subtotal, onShippingChange]);

    const onSubmit = (data: CheckoutFormValues) => {
        if (items.length === 0) return;
        setIsSubmitting(true);

        // Hitung ulang ongkir saat submit untuk jaga-jaga
        let finalShippingFee = 0;
        if (data.shippingType === 'REGULER') {
            finalShippingFee = subtotal >= 200000 ? 0 : 15000;
        } else if (data.shippingType === 'INSTAN') {
            finalShippingFee = 25000;
        }

        const finalTotal = subtotal + finalShippingFee - discount;

        const newOrder: Order = {
            id: generateOrderId(),
            ...data,
            items: items.map(i => ({
                productId: i.product.id,
                name: i.product.name,
                price: i.product.price,
                quantity: i.quantity,
                subtotal: i.product.price * i.quantity
            })),
            subtotal,
            shippingFee: finalShippingFee,
            discount,
            total: finalTotal,
            status: 'DIPROSES',
            couponCode: couponCode || undefined,
            createdAt: new Date().toISOString()
        };

        // Save order
        orderStore.saveOrder(newOrder);

        // Clear cart (this ensures we persist empty cart as well)
        clearCart();

        // Redirect to success page
        router.push('/pesanan/sukses');
    };

    if (!isHydrated) return null;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">

            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Pengiriman</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Nama Lengkap"
                        placeholder="Contoh: Budi Santoso"
                        {...register('customerName')}
                        error={errors.customerName?.message}
                    />
                    <Input
                        label="Nomor WhatsApp"
                        placeholder="Contoh: 081234567890"
                        {...register('customerPhone')}
                        error={errors.customerPhone?.message}
                    />
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alamat Pengiriman
                        </label>
                        <textarea
                            className={`block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${errors.customerAddress ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                                }`}
                            rows={4}
                            placeholder="Contoh: Jl. Sudirman No 4, RT 01 RW 02, Kec. Setiabudi, Jakarta Selatan 12920"
                            {...register('customerAddress')}
                        />
                        {errors.customerAddress && <p className="mt-1 text-sm text-red-600">{errors.customerAddress.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catatan untuk Penjual (Opsional)
                        </label>
                        <Input
                            placeholder="Contoh: Titip ke satpam"
                            {...register('customerNotes')}
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Metode Pengiriman</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${selectedShipping === 'REGULER' ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <input type="radio" value="REGULER" {...register('shippingType')} className="sr-only" />
                        <div className="flex w-full items-center justify-between">
                            <div className="flex flex-col">
                                <span className="block text-sm font-semibold text-gray-900">Kurir Reguler</span>
                                <span className="block text-xs text-gray-500 mt-1">Estimasi 2-3 Hari Kerja</span>
                            </div>
                            <div className="text-right">
                                {subtotal >= 200000 ? (
                                    <span className="block text-sm font-bold text-green-600">Gratis</span>
                                ) : (
                                    <span className="block text-sm font-medium text-gray-900">{formatRupiah(15000)}</span>
                                )}
                            </div>
                        </div>
                    </label>

                    <label className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${selectedShipping === 'INSTAN' ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <input type="radio" value="INSTAN" {...register('shippingType')} className="sr-only" />
                        <div className="flex w-full items-center justify-between">
                            <div className="flex flex-col">
                                <span className="block text-sm font-semibold text-gray-900">Kurir Instan</span>
                                <span className="block text-xs text-gray-500 mt-1">Estimasi 2-4 Jam</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-sm font-medium text-gray-900">{formatRupiah(25000)}</span>
                            </div>
                        </div>
                    </label>
                </div>
                {errors.shippingType && <p className="mt-2 text-sm text-red-600">{errors.shippingType.message}</p>}
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Metode Pembayaran</h2>
                <div className="grid grid-cols-1 gap-4">
                    <label className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${watch('paymentMethod') === 'TRANSFER' ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <input type="radio" value="TRANSFER" {...register('paymentMethod')} className="sr-only" />
                        <div className="flex w-full items-center justify-between">
                            <div className="flex flex-col">
                                <span className="block text-sm font-semibold text-gray-900">Transfer Bank Lokal (BCA / Mandiri / BNI)</span>
                                <span className="block text-xs text-gray-500 mt-1">Dicek manual oleh Admin</span>
                            </div>
                        </div>
                    </label>

                    <label className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${watch('paymentMethod') === 'COD' ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
                        <input type="radio" value="COD" {...register('paymentMethod')} className="sr-only" />
                        <div className="flex w-full items-center justify-between">
                            <div className="flex flex-col">
                                <span className="block text-sm font-semibold text-gray-900">Bayar di Tempat (COD)</span>
                                <span className="block text-xs text-gray-500 mt-1">Hanya berlaku untuk kurir Reguler</span>
                            </div>
                        </div>
                    </label>
                </div>
                {errors.paymentMethod && <p className="mt-2 text-sm text-red-600">{errors.paymentMethod.message}</p>}
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8 flex justify-end">
                <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-64 text-lg shadow-md hover:shadow-lg transition-all"
                    isLoading={isSubmitting}
                    disabled={items.length === 0}
                >
                    Buat Pesanan
                </Button>
            </div>
        </form>
    );
}
