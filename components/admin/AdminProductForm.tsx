import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, Category } from "@/types";
import { productStore } from "@/store/product-store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { slugify } from "@/lib/slug";
import { X } from "lucide-react";

interface AdminProductFormProps {
    product?: Product;
    onClose: () => void;
}

const productSchema = z.object({
    name: z.string().min(3, "Nama produk minimal 3 karakter"),
    description: z.string().min(10, "Deskripsi minimal 10 karakter"),
    price: z.number({ message: "Harga harus berupa angka" }).min(1000, "Harga minimal Rp1.000"),
    stock: z.number({ message: "Stok harus berupa angka" }).min(0, "Stok tidak boleh negatif"),
    category: z.enum(["Nugget", "Sosis", "Seafood", "Dimsum"], {
        message: "Kategori tidak valid"
    }),
    isActive: z.boolean(),
    image: z.string().min(1, "URL Gambar harus diisi"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminProductForm({ product, onClose }: AdminProductFormProps) {
    const isEditing = !!product;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: product
            ? {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                isActive: product.isActive,
                image: product.image,
            }
            : {
                isActive: true, // default checked
                image: "/images/nugget-1.jpg", // default placeholder
            },
    });

    const onSubmit = (data: ProductFormData) => {
        try {
            if (isEditing) {
                productStore.updateProduct(product.id, {
                    ...data,
                    slug: slugify(data.name),
                });
            } else {
                productStore.addProduct({
                    ...data,
                    slug: slugify(data.name),
                });
            }
            onClose();
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan saat menyimpan produk");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-semibold text-slate-900">
                        {isEditing ? "Edit Produk" : "Tambah Produk Baru"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-500 rounded-full p-1 hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Nama Produk</label>
                                <Input {...register("name")} placeholder="Contoh: Nugget Ayam" />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Kategori</label>
                                <Select
                                    {...register("category")}
                                    options={[
                                        { label: "Pilih Kategori", value: "" },
                                        { label: "Nugget", value: "Nugget" },
                                        { label: "Sosis", value: "Sosis" },
                                        { label: "Seafood", value: "Seafood" },
                                        { label: "Dimsum", value: "Dimsum" },
                                    ]}
                                />
                                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Harga (Rp)</label>
                                <Input
                                    type="number"
                                    {...register("price", { valueAsNumber: true })}
                                    placeholder="Contoh: 35000"
                                />
                                {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Stok Awal</label>
                                <Input
                                    type="number"
                                    {...register("stock", { valueAsNumber: true })}
                                    placeholder="Contoh: 50"
                                />
                                {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">URL Gambar</label>
                            <Input {...register("image")} placeholder="/images/placeholder.jpg" />
                            {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Deskripsi</label>
                            <textarea
                                {...register("description")}
                                rows={3}
                                className="w-full rounded-xl border-slate-200 border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                                placeholder="Deskripsi produk lengkap..."
                            />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                {...register("isActive")}
                                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                                Produk Aktif (Tampil di Katalog)
                            </label>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end space-x-3 bg-slate-50">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button type="submit" form="product-form" disabled={isSubmitting}>
                        {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
