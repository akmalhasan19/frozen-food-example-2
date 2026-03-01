"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart-context";
import { Product } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Sample Data Array (expanded to 8 to show pagination)
const flashSaleItems = [
    {
        id: 1,
        name: "Premium Frozen Tiger Prawns",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQvRkgkohJcrgDi71rhWwQ7bt0SrGgUGszOz0czQzSFWf21LZcvU6cgVaj2tKZT8ThMhcUs1aef_5NIW_K_vg0QOK1nORGAgVzRHju9GOBhbGDBSfLHH8wP5zB2So7GSJakwqGDcZz4M0wpRIF1ZbVi9ZtI8wkH_BBp1iltpY7cYW8vK7hOPoi8bXKV21LZrr_zFrHotdo3CRBUpxIeJfUiSgtfarG5vx_wqXGgUIr-5X-BL4EbmrO7kBSeAkNAalb__UvqyRUERw",
        price: "Rp 125.000",
        originalPrice: "Rp 178.000",
        discount: "SAVE 30%",
        soldPercentage: "80%",
        itemsLeft: "12 Items left",
    },
    {
        id: 2,
        name: "Crispy Chicken Nuggets (1kg)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG3B6NbCBFcF8rfwq7HZ2hYbmgbpRUppqAA6z3tNeNhQoW0nvhLfamVXbPsctepHiWA1liirPx6q5VS-VOv4tcx_2vs-MNhVqHTuvHt0-3smxGGr7qnTvX5lozM10gNikKqK3H8xEfs95lpk7f8ZyOMajTCGD3WFSOkXfTQ5vIjx22DaLi5Ahq50xFs3z8LW1w21HFQhIuBilEEvn56NzAZWKDTRj3_mHK-z3wIjgBGmX-uKyzgmEhnZonO1Rx7Fwxc0xEMlUwyuE",
        price: "Rp 45.000",
        originalPrice: "Rp 52.000",
        discount: "SAVE 15%",
        soldPercentage: "45%",
        itemsLeft: "45 Items left",
    },
    {
        id: 3,
        name: "Frozen Organic Strawberries",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYL4RdzuJ1wRpyYoHJG_J70I5AJM7nV8hTz7Y13LN2daZO4Z5Uzxk5Oc7geYpHfhEF-uQnNwoLRRwZotRJ1-LsqYTvUYxCM4eKT7qDQd06XY4oFBS1bRGHLuBTXC_9Qv-l_4TcXfk06pxZh4uxvtzG5uhe1Yooef1w2f14JqdM-31OwnYmbKrJtVaw6YQxiaYPhe1LU-PILRIacneS6J3W4hVriNIcCcrX9kN5pgB3hFqOmHJugUkKYTjqrjnw2rPcPjCjJlyGtvU",
        price: "Rp 32.500",
        originalPrice: "Rp 65.000",
        discount: "SAVE 50%",
        soldPercentage: "15%",
        itemsLeft: "85 Items left",
    },
    {
        id: 4,
        name: "Gyoza Dumplings Family Pack",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsay67p1W2Tc0XagHkuqMh09rJJeJjt41yQnn5hu1Y_SbgSfCKIqozTKrSW8MtSCE3zEy4kIxg74tRpb_PKkDZWxJHNudJ1QQoEwtQ-bacXC3QiRhGOTiGRH4fRBgHc4gCbLj7SEo1QYSwRm9x8Y5kF8-arJtaX2LL2PBot2WoXuUHUMDmEjRRAi4VNT4hvjqMRBx_fcU9KOUluumPHzwfGaKh3bHfOhhwGBDDd4Lb0ZtoOLChZBrNbcyA8syC3UrDgY1_QjOhCVI",
        price: "Rp 88.000",
        originalPrice: "Rp 110.000",
        discount: "SAVE 20%",
        soldPercentage: "95%",
        itemsLeft: "3 Items left",
    },
    {
        id: 5,
        name: "Premium Wagyu Beef Slices (500g)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQvRkgkohJcrgDi71rhWwQ7bt0SrGgUGszOz0czQzSFWf21LZcvU6cgVaj2tKZT8ThMhcUs1aef_5NIW_K_vg0QOK1nORGAgVzRHju9GOBhbGDBSfLHH8wP5zB2So7GSJakwqGDcZz4M0wpRIF1ZbVi9ZtI8wkH_BBp1iltpY7cYW8vK7hOPoi8bXKV21LZrr_zFrHotdo3CRBUpxIeJfUiSgtfarG5vx_wqXGgUIr-5X-BL4EbmrO7kBSeAkNAalb__UvqyRUERw",
        price: "Rp 250.000",
        originalPrice: "Rp 350.000",
        discount: "SAVE 28%",
        soldPercentage: "60%",
        itemsLeft: "15 Items left",
    },
    {
        id: 6,
        name: "Frozen Mixed Veggies (1kg)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG3B6NbCBFcF8rfwq7HZ2hYbmgbpRUppqAA6z3tNeNhQoW0nvhLfamVXbPsctepHiWA1liirPx6q5VS-VOv4tcx_2vs-MNhVqHTuvHt0-3smxGGr7qnTvX5lozM10gNikKqK3H8xEfs95lpk7f8ZyOMajTCGD3WFSOkXfTQ5vIjx22DaLi5Ahq50xFs3z8LW1w21HFQhIuBilEEvn56NzAZWKDTRj3_mHK-z3wIjgBGmX-uKyzgmEhnZonO1Rx7Fwxc0xEMlUwyuE",
        price: "Rp 25.000",
        originalPrice: "Rp 35.000",
        discount: "SAVE 28%",
        soldPercentage: "30%",
        itemsLeft: "50 Items left",
    },
    {
        id: 7,
        name: "Spicy Chicken Wings (500g)",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYL4RdzuJ1wRpyYoHJG_J70I5AJM7nV8hTz7Y13LN2daZO4Z5Uzxk5Oc7geYpHfhEF-uQnNwoLRRwZotRJ1-LsqYTvUYxCM4eKT7qDQd06XY4oFBS1bRGHLuBTXC_9Qv-l_4TcXfk06pxZh4uxvtzG5uhe1Yooef1w2f14JqdM-31OwnYmbKrJtVaw6YQxiaYPhe1LU-PILRIacneS6J3W4hVriNIcCcrX9kN5pgB3hFqOmHJugUkKYTjqrjnw2rPcPjCjJlyGtvU",
        price: "Rp 55.000",
        originalPrice: "Rp 70.000",
        discount: "SAVE 21%",
        soldPercentage: "85%",
        itemsLeft: "8 Items left",
    },
    {
        id: 8,
        name: "Ice Cream Assorted Flavors",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsay67p1W2Tc0XagHkuqMh09rJJeJjt41yQnn5hu1Y_SbgSfCKIqozTKrSW8MtSCE3zEy4kIxg74tRpb_PKkDZWxJHNudJ1QQoEwtQ-bacXC3QiRhGOTiGRH4fRBgHc4gCbLj7SEo1QYSwRm9x8Y5kF8-arJtaX2LL2PBot2WoXuUHUMDmEjRRAi4VNT4hvjqMRBx_fcU9KOUluumPHzwfGaKh3bHfOhhwGBDDd4Lb0ZtoOLChZBrNbcyA8syC3UrDgY1_QjOhCVI",
        price: "Rp 40.000",
        originalPrice: "Rp 60.000",
        discount: "SAVE 33%",
        soldPercentage: "40%",
        itemsLeft: "30 Items left",
    },
];

export default function FlashSaleSection() {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0); // 1 = right, -1 = left
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [qty, setQtyModal] = useState(1);
    const { items, addItem, setQty } = useCart();
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(flashSaleItems.length / itemsPerPage);

    // Reset qty when product changes
    useEffect(() => {
        setQtyModal(1);
    }, [selectedProduct]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProduct) {
            // Get original body overflow
            const originalStyle = window.getComputedStyle(document.body).overflow;
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
            // Also add touch-action none to body to prevent mobile Safari bounce scroll on background
            document.body.style.touchAction = 'none';

            return () => {
                document.body.style.overflow = originalStyle;
                document.body.style.touchAction = '';
            };
        }
    }, [selectedProduct]);

    // GSAP staggered entrance animation (desktop only)
    const animateCards = useCallback(() => {
        if (typeof window === "undefined" || window.innerWidth < 1024) return;
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        gsap.fromTo(
            cards,
            {
                x: -120,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                overwrite: true,
            }
        );
    }, []);

    // Initial entrance animation with ScrollTrigger
    useGSAP(() => {
        if (typeof window === "undefined" || window.innerWidth < 1024) return;
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        gsap.set(cards, { x: -120, opacity: 0 });

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => animateCards(),
        });
    }, { scope: sectionRef, dependencies: [] });

    // Re-trigger animation on carousel page change
    useEffect(() => {
        // Skip initial render (handled by ScrollTrigger above)
        if (currentPage === 0) return;
        // Small delay to let DOM update with new items
        const timer = setTimeout(() => animateCards(), 50);
        return () => clearTimeout(timer);
    }, [currentPage, animateCards]);

    const handleNext = () => {
        setDirection(1);
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    // Calculate which items to display on the current page
    const startIndex = currentPage * itemsPerPage;
    const currentItems = flashSaleItems.slice(startIndex, startIndex + itemsPerPage);

    const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/\D/g, ''));
    const parseStock = (stockStr: string) => parseInt(stockStr.replace(/\D/g, '')) || 0;

    const handleAddToCart = () => {
        if (!selectedProduct) return;

        const stock = parseStock(selectedProduct.itemsLeft);
        const price = parsePrice(selectedProduct.price);

        const productToAdd: Product = {
            id: `fs-${selectedProduct.id}`,
            name: selectedProduct.name,
            slug: selectedProduct.name.toLowerCase().replace(/\s+/g, '-'),
            description: selectedProduct.description || "Rasakan kelezatan produk premium kami. Dibuat dengan bahan-bahan pangan berkualitas tinggi untuk memberikan cita rasa terbaik dan bergizi bagi Anda dan keluarga.",
            price: price,
            stock: stock,
            category: 'Seafood', // default category
            image: selectedProduct.image,
            isActive: true,
            createdAt: new Date().toISOString()
        };

        const existingCartItem = items.find(i => i.product.id === productToAdd.id);

        if (existingCartItem) {
            setQty(productToAdd.id, existingCartItem.quantity + qty);
        } else {
            addItem(productToAdd);
            if (qty > 1) {
                // We timeout to ensure the item is added before we change its quantity
                setTimeout(() => {
                    setQty(productToAdd.id, qty);
                }, 0);
            }
        }

        setSelectedProduct(null);
    };

    return (
        <section ref={sectionRef} className="relative px-4 md:px-10 lg:px-20 pt-2 pb-10 overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-500 fill-orange-500">bolt</span>
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Flash Sale</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-500 text-white font-bold w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl">02</div>
                        <span className="font-bold">:</span>
                        <div className="bg-red-500 text-white font-bold w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl">45</div>
                        <span className="font-bold">:</span>
                        <div className="bg-red-500 text-white font-bold w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl">12</div>
                    </div>
                </div>
                {/* Navigation Arrows */}
                <div className="flex gap-2 relative z-20">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative min-h-[350px]">
                <AnimatePresence custom={direction} mode="popLayout" initial={false}>
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 w-full"
                    >
                        {currentItems.map((item, index) => (
                            <div
                                key={item.id}
                                ref={(el) => { cardRefs.current[index] = el; }}
                                onClick={() => setSelectedProduct(item)}
                                className="flash-sale-card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-3 md:p-4 group hover:shadow-2xl hover:shadow-primary/10 transition-all flex flex-col h-full cursor-pointer"
                            >
                                <div className="relative rounded-2xl overflow-hidden aspect-square mb-2 md:mb-4 bg-slate-50 dark:bg-slate-800">
                                    <img
                                        alt={item.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                        src={item.image}
                                    />
                                    <button className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm">
                                        <span className="material-symbols-outlined text-sm md:text-lg">favorite</span>
                                    </button>
                                    <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-red-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-md">
                                        {item.discount}
                                    </div>
                                </div>
                                <h3 className="text-xs md:text-base font-bold text-slate-800 dark:text-slate-200 mb-1 truncate">{item.name}</h3>
                                <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2 md:mb-3">
                                    <span className="text-primary font-extrabold text-xs md:text-base">{item.price}</span>
                                    <span className="text-slate-400 text-[9px] md:text-xs line-through">{item.originalPrice}</span>
                                </div>
                                <div className="mt-auto">
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 md:h-2 rounded-full overflow-hidden relative">
                                        <div
                                            className="bg-gradient-to-r from-red-500 to-orange-400 h-full rounded-full"
                                            style={{ width: item.soldPercentage }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-1.5 md:mt-2">
                                        <span className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold">{item.soldPercentage} Sold</span>
                                        <span className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold">{item.itemsLeft}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Fade Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-900/50 to-transparent pointer-events-none z-20"></div>

            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row max-h-[90vh] sm:max-h-[85vh] md:h-[600px] z-[105]"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProduct(null);
                                }}
                                className="absolute top-4 right-4 z-[110] w-8 h-8 md:w-10 md:h-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur rounded-full flex items-center justify-center text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>

                            <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
                                {/* Image Section - Top on mobile, Left on desktop */}
                                <div className="w-full md:w-1/2 md:h-full shrink-0 relative bg-slate-100 dark:bg-slate-800">
                                    <div className="w-full relative aspect-square sm:aspect-video md:aspect-auto md:h-full">
                                        <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1 z-10">
                                        <span className="material-symbols-outlined text-sm">local_fire_department</span>
                                        {selectedProduct.discount}
                                    </div>
                                </div>

                                {/* Content Section - Bottom on mobile, Right on desktop */}
                                <div className="p-5 md:p-8 flex flex-col gap-4 w-full md:w-1/2 overflow-y-auto" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedProduct.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-extrabold text-primary">{selectedProduct.price}</span>
                                            <span className="text-sm text-slate-400 line-through">{selectedProduct.originalPrice}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {selectedProduct.description || "Rasakan kelezatan produk premium kami. Dibuat dengan bahan-bahan pangan berkualitas tinggi untuk memberikan cita rasa terbaik dan bergizi bagi Anda dan keluarga."}
                                    </p>

                                    <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 mb-1">Sisa Stok</span>
                                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{selectedProduct.itemsLeft}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-slate-500 font-medium">Jumlah:</span>
                                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                                                <button
                                                    onClick={() => setQtyModal(Math.max(1, qty - 1))}
                                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">remove</span>
                                                </button>
                                                <span className="w-10 text-center font-bold text-slate-800 dark:text-white">{qty}</span>
                                                <button
                                                    onClick={() => setQtyModal(Math.min(parseStock(selectedProduct.itemsLeft), qty + 1))}
                                                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full py-4 mt-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                        Tambahkan ke Keranjang
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
