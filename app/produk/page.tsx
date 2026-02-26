"use client";

import React, { useState, useMemo } from 'react';
import { initialProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Search, SlidersHorizontal, PackageX, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export default function ProdukPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOption, setSortOption] = useState('terbaru');
    const [readyStockOnly, setReadyStockOnly] = useState(false);

    const [PriceMin, setPriceMin] = useState('');
    const [PriceMax, setPriceMax] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    // Derive categories from products
    const categories = useMemo(() => {
        const cats = new Set(initialProducts.map(p => p.category));
        return Array.from(cats);
    }, []);

    // Filter and sort logic
    const filteredProducts = useMemo(() => {
        let result = [...initialProducts];

        // Filter by active status (always)
        result = result.filter(p => p.isActive);

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
        }

        // Category
        if (categoryFilter) {
            result = result.filter(p => p.category === categoryFilter);
        }

        // Ready Stock
        if (readyStockOnly) {
            result = result.filter(p => p.stock > 0);
        }

        // Price Range
        if (PriceMin) {
            result = result.filter(p => p.price >= parseInt(PriceMin, 10));
        }
        if (PriceMax) {
            result = result.filter(p => p.price <= parseInt(PriceMax, 10));
        }

        // Sort
        if (sortOption === 'termurah') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'termahal') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'terbaru') {
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return result;
    }, [searchQuery, categoryFilter, sortOption, readyStockOnly, PriceMin, PriceMax]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, categoryFilter, sortOption, readyStockOnly, PriceMin, PriceMax]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Katalog Produk</h1>
                    <p className="text-gray-500 mt-2">Temukan berbagai pilihan frozen food terbaik untuk keluarga Anda.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Cari produk..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="md:hidden"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className={`md:w-64 md:shrink-0 flex flex-col gap-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            Filter Produk
                        </h3>

                        <div className="space-y-5">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="cat-semua"
                                            name="category"
                                            checked={categoryFilter === ''}
                                            onChange={() => setCategoryFilter('')}
                                            className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                                        />
                                        <label htmlFor="cat-semua" className="ml-2 text-sm text-gray-600">Semua Kategori</label>
                                    </div>
                                    {categories.map(cat => (
                                        <div className="flex items-center" key={cat}>
                                            <input
                                                type="radio"
                                                id={`cat-${cat}`}
                                                name="category"
                                                checked={categoryFilter === cat}
                                                onChange={() => setCategoryFilter(cat)}
                                                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                                            />
                                            <label htmlFor={`cat-${cat}`} className="ml-2 text-sm text-gray-600">{cat}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rentang Harga</label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={PriceMin}
                                        onChange={(e) => setPriceMin(e.target.value)}
                                        className="text-sm"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={PriceMax}
                                        onChange={(e) => setPriceMax(e.target.value)}
                                        className="text-sm"
                                    />
                                </div>
                            </div>

                            {/* Ready Stock */}
                            <div className="flex items-center pt-2 border-t border-gray-100">
                                <input
                                    type="checkbox"
                                    id="ready-stock"
                                    checked={readyStockOnly}
                                    onChange={(e) => setReadyStockOnly(e.target.checked)}
                                    className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="ready-stock" className="ml-2 text-sm font-medium text-gray-700">Hanya tampilkan stok tersedia</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid Area */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-sm text-gray-500">
                            Menampilkan {paginatedProducts.length} dari {filteredProducts.length} produk
                        </p>
                        <div className="w-48">
                            <Select
                                options={[
                                    { label: 'Terbaru', value: 'terbaru' },
                                    { label: 'Harga Termurah', value: 'termurah' },
                                    { label: 'Harga Termahal', value: 'termahal' },
                                ]}
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            />
                        </div>
                    </div>

                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-10 flex justify-center items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => p - 1)}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <span className="text-sm text-gray-600 px-4">
                                        Halaman {currentPage} dari {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 py-16 px-4 flex flex-col items-center justify-center text-center">
                            <div className="bg-gray-50 rounded-full p-4 mb-4">
                                <PackageX className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Tidak ada produk ditemukan</h3>
                            <p className="mt-1 text-gray-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => {
                                    setSearchQuery('');
                                    setCategoryFilter('');
                                    setPriceMin('');
                                    setPriceMax('');
                                    setReadyStockOnly(false);
                                }}
                            >
                                Reset Filter
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
