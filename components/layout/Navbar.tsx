"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/store/cart-context";
import FavoriteDropdown from "./FavoriteDropdown";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
    const pathname = usePathname();
    const { items } = useCart();
    const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

    const isProdukPage = pathname === '/produk';

    return (
        <>
            {/* Top Bar */}
            <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[11px] font-medium py-1.5 px-4 md:px-10 lg:px-20 flex justify-between items-center transition-colors">
                <div className="flex items-center gap-4">
                    <Link href="#" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">smartphone</span>
                        Download App
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="#" className="hover:text-primary transition-colors hidden sm:block">Help Center</Link>
                    <Link href="#" className="hover:text-primary transition-colors hidden sm:block">Partner With Us</Link>
                    <Link href="#" className="hover:text-primary transition-colors hidden sm:block">Order Tracking</Link>
                    <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
                    <Link href="#" className="hover:text-primary font-bold">Sign Up</Link>
                    <Link href="#" className="hover:text-primary font-bold">Login</Link>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-4 md:px-10 lg:px-20 py-3 md:py-4 transition-colors">
                <div className="flex items-center justify-between md:gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="bg-primary w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-xl md:text-2xl">ac_unit</span>
                        </div>
                        <span className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white hidden sm:block">FrozenHub</span>
                    </Link>

                    {/* Search (Desktop) */}
                    <div className="hidden md:block flex-1 max-w-2xl relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400">search</span>
                        </div>
                        <input
                            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 text-sm transition-all duration-300"
                            placeholder="Search premium frozen foods..."
                            type="text"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 md:gap-6">
                        <FavoriteDropdown />

                        <Link href="/keranjang" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            {cartItemCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        <NotificationDropdown />

                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm cursor-pointer ml-1 md:ml-2">
                            <img
                                alt="User Profile"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8xvswHQgT2HOh29YGWlVfGm1DU8F5iBs9pTDLs3V-y73AhKHSwiw6oyhEJhMZVPvsnvxxlY01_jZGOrl1s8rJEJUK4KOEYHJ_pq-WtNL0wl975BNxHbJcGFPUhGJ9HWR4eKtvYuIISaIG46lOIQ7G0B35V_WJRnjDZ22xQtGSlEikHDzbXsRwXhh8PU8eQqX3zGZdUWMDADZ7EiN60PAG0v6ZOTimNGlCxe5au-P1f48oxqkOLvqS1LMiBynOjrCO9_cLxi5HG8A"
                            />
                        </div>
                    </div>
                </div>

                {/* Search (Mobile) - Hidden on /produk page since it has its own search */}
                {!isProdukPage && (
                    <div className="md:hidden mt-3 relative w-full">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                        </div>
                        <input
                            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl py-2 pl-9 pr-3 focus:ring-2 focus:ring-primary/50 text-xs transition-all duration-300"
                            placeholder="Search premium frozen foods..."
                            type="text"
                        />
                    </div>
                )}
            </nav>
        </>
    );
}
