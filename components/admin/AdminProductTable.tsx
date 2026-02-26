"use client";

import { useState, useEffect } from "react";
import { formatRupiah } from "@/lib/money";
import { productStore } from "@/store/product-store";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2 } from "lucide-react";
import AdminProductForm from "./AdminProductForm";

export default function AdminProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setProducts(productStore.getProducts());
    };

    const handleDelete = (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            productStore.deleteProduct(id);
            loadProducts();
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
        loadProducts();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900">Data Produk</h2>
                <Button onClick={handleAddNew} size="sm">Tambah Produk</Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-6 py-3 font-medium">Nama Produk</th>
                            <th className="px-6 py-3 font-medium">Kategori</th>
                            <th className="px-6 py-3 font-medium">Harga</th>
                            <th className="px-6 py-3 font-medium">Stok</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{product.name}</div>
                                    <div className="text-slate-500 text-xs">{product.slug}</div>
                                </td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{formatRupiah(product.price)}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.isActive
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-slate-100 text-slate-700"
                                            }`}
                                    >
                                        {product.isActive ? "Aktif" : "Nonaktif"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors inline-block"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors inline-block"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    Belum ada produk.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <AdminProductForm
                    product={editingProduct || undefined}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
}
