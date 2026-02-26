"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFavorite } from "@/store/favorite-context";
import { useCart } from "@/store/cart-context";
import Link from "next/link";
import Image from "next/image";

export default function FavoriteDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { items, removeFavorite } = useFavorite();
    const { addItem } = useCart();

    // Handle click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors hidden sm:block"
            >
                <span className="material-symbols-outlined text-sm md:text-base">favorite</span>
                {items.length > 0 && (
                    <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                        {items.length}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 overflow-hidden z-50 text-left"
                    >
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 dark:text-white">Favorites ({items.length})</h3>
                        </div>

                        <div className="max-h-80 overflow-y-auto">
                            {items.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">heart_broken</span>
                                    <p className="text-sm">No favorites yet.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {items.map((item) => (
                                        <div key={item.id} className="p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden relative">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{item.name}</h4>
                                                <p className="text-xs text-primary font-bold mt-1">Rp {item.price.toLocaleString("id-ID")}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => {
                                                            addItem(item);
                                                            setIsOpen(false);
                                                        }}
                                                        className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <button
                                                        onClick={() => removeFavorite(item.id)}
                                                        className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 py-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {items.length > 0 && (
                            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 text-center">
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xs font-medium text-primary hover:underline"
                                >
                                    Browse more products
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
