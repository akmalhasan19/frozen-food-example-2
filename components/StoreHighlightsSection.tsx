"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StoreHighlightsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useGSAP(() => {
        // Desktop only animation
        if (typeof window === "undefined" || window.innerWidth < 1024) return;
        const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];
        if (cards.length === 0) return;

        // Set initial state for cards
        gsap.set(cards, { opacity: 0, scale: 0.85 });

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 60%", // Triggers when the top of the section reaches 60% down the viewport
            once: true,
            onEnter: () => {
                gsap.to(cards, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.3, // Increased delay between each card's animation
                    ease: "back.out(1.5)",
                    overwrite: true,
                });
            },
        });
    }, { scope: sectionRef, dependencies: [] });

    return (
        <section ref={sectionRef} className="px-4 md:px-10 lg:px-20 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Store Highlights</h2>
                    <p className="text-slate-500 mt-2">Explore our signature collections and premium selections.</p>
                </div>
                <a className="hidden md:flex items-center gap-1 text-primary font-bold hover:text-emerald-600 transition-colors" href="#">
                    View All Categories <span className="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link
                    href="/produk?category=Nugget"
                    ref={(el) => { cardRefs.current[0] = el; }}
                    className="store-highlight-card group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block"
                >
                    <img alt="Premium Nuggets" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG3B6NbCBFcF8rfwq7HZ2hYbmgbpRUppqAA6z3tNeNhQoW0nvhLfamVXbPsctepHiWA1liirPx6q5VS-VOv4tcx_2vs-MNhVqHTuvHt0-3smxGGr7qnTvX5lozM10gNikKqK3H8xEfs95lpk7f8ZyOMajTCGD3WFSOkXfTQ5vIjx22DaLi5Ahq50xFs3z8LW1w21HFQhIuBilEEvn56NzAZWKDTRj3_mHK-z3wIjgBGmX-uKyzgmEhnZonO1Rx7Fwxc0xEMlUwyuE" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end text-white">
                        <div className="bg-primary w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-2 shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-2xl">lunch_dining</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">Premium Nuggets</h3>
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                            <div className="overflow-hidden">
                                <p className="text-gray-300 text-sm pt-2 pb-4 opacity-0 scale-[0.85] origin-bottom-left group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                    Crispy, golden, and packed with flavor. Our best-selling snack for any occasion.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <span>Shop Now</span>
                            <span className="material-symbols-outlined text-sm transition-transform duration-500 group-hover:translate-x-1">arrow_forward</span>
                        </div>
                    </div>
                </Link>
                <Link
                    href="/produk?category=Sosis"
                    ref={(el) => { cardRefs.current[1] = el; }}
                    className="store-highlight-card group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block"
                >
                    <img alt="Signature Sausages" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANVU5bYFJpFLPfPwOs4iSVREdEAHNvaPrpF-C0oe8KDAyR1oyptlKWAvmR7DpZbkNT9l4HZJ62wtat6mieMHw2geWxNY2WfNTz1qLSzilOO1IbAzt8qRH2xtmM91wIpJGZoq4q8OjXIgCF9jgEAC8r9AATCf3fUMy0VLHm-Vz2P-bXj_tjIaBvO77-jFIJqdsRkj7xV5wVT3D_XHq-cwSvBIbtfT6_Nk1gOsjvar5KF0w2SEFEeRIaqxD8Te1sOViGYRXupsJ_spc" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end text-white">
                        <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-2 shadow-lg shadow-red-500/30">
                            <span className="material-symbols-outlined text-2xl">kebab_dining</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">Signature Sausages</h3>
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                            <div className="overflow-hidden">
                                <p className="text-gray-300 text-sm pt-2 pb-4 opacity-0 scale-[0.85] origin-bottom-left group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                    Premium meaty sausages with authentic flavors. Perfect for grilling or your favorite recipes.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <span>Shop Now</span>
                            <span className="material-symbols-outlined text-sm transition-transform duration-500 group-hover:translate-x-1">arrow_forward</span>
                        </div>
                    </div>
                </Link>
                <Link
                    href="/produk?category=Seafood"
                    ref={(el) => { cardRefs.current[2] = el; }}
                    className="store-highlight-card group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block"
                >
                    <img alt="Fresh Seafood Mix" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQvRkgkohJcrgDi71rhWwQ7bt0SrGgUGszOz0czQzSFWf21LZcvU6cgVaj2tKZT8ThMhcUs1aef_5NIW_K_vg0QOK1nORGAgVzRHju9GOBhbGDBSfLHH8wP5zB2So7GSJakwqGDcZz4M0wpRIF1ZbVi9ZtI8wkH_BBp1iltpY7cYW8vK7hOPoi8bXKV21LZrr_zFrHotdo3CRBUpxIeJfUiSgtfarG5vx_wqXGgUIr-5X-BL4EbmrO7kBSeAkNAalb__UvqyRUERw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end text-white">
                        <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-2 shadow-lg shadow-blue-500/30">
                            <span className="material-symbols-outlined text-2xl">set_meal</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">Fresh Seafood Mix</h3>
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                            <div className="overflow-hidden">
                                <p className="text-gray-300 text-sm pt-2 pb-4 opacity-0 scale-[0.85] origin-bottom-left group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                    A premium selection of shrimp, calamari, and fish fillets ready for your gourmet recipes.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <span>Shop Now</span>
                            <span className="material-symbols-outlined text-sm transition-transform duration-500 group-hover:translate-x-1">arrow_forward</span>
                        </div>
                    </div>
                </Link>
                <Link
                    href="/produk?category=Dimsum"
                    ref={(el) => { cardRefs.current[3] = el; }}
                    className="store-highlight-card group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block"
                >
                    <img alt="Gourmet Dumplings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsay67p1W2Tc0XagHkuqMh09rJJeJjt41yQnn5hu1Y_SbgSfCKIqozTKrSW8MtSCE3zEy4kIxg74tRpb_PKkDZWxJHNudJ1QQoEwtQ-bacXC3QiRhGOTiGRH4fRBgHc4gCbLj7SEo1QYSwRm9x8Y5kF8-arJtaX2LL2PBot2WoXuUHUMDmEjRRAi4VNT4hvjqMRBx_fcU9KOUluumPHzwfGaKh3bHfOhhwGBDDd4Lb0ZtoOLChZBrNbcyA8syC3UrDgY1_QjOhCVI" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end text-white">
                        <div className="bg-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-2 shadow-lg shadow-amber-500/30">
                            <span className="material-symbols-outlined text-2xl">ramen_dining</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">Gourmet Dumplings</h3>
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                            <div className="overflow-hidden">
                                <p className="text-gray-300 text-sm pt-2 pb-4 opacity-0 scale-[0.85] origin-bottom-left group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                    Hand-crafted style dumplings with savory fillings. Steam, fry, or boil in minutes.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <span>Shop Now</span>
                            <span className="material-symbols-outlined text-sm transition-transform duration-500 group-hover:translate-x-1">arrow_forward</span>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="mt-8 flex justify-center md:hidden">
                <a className="flex items-center gap-1 text-primary font-bold hover:text-emerald-600 transition-colors" href="#">
                    View All Categories <span className="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>
        </section>
    );
}
