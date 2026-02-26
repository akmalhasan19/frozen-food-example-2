"use client";

import { useState, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useCart } from "@/store/cart-context";
import { Product } from "@/types";

type TabCategory = "Best Seller" | "High Protein" | "Weekly Deals" | "Official Store" | "New Arrivals";

interface MockProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    sold: string;
}

// Mock data strictly for the UI filtering
const todaysItems: Record<TabCategory, MockProduct[]> = {
    "Best Seller": [
        {
            id: "bs-1",
            name: "Garden Fresh Sweet Green Peas (500g)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANVU5bYFJpFLPfPwOs4iSVREdEAHNvaPrpF-C0oe8KDAyR1oyptlKWAvmR7DpZbkNT9l4HZJ62wtat6mieMHw2geWxNY2WfNTz1qLSzilOO1IbAzt8qRH2xtmM91wIpJGZoq4q8OjXIgCF9jgEAC8r9AATCf3fUMy0VLHm-Vz2P-bXj_tjIaBvO77-jFIJqdsRkj7xV5wVT3D_XHq-cwSvBIbtfT6_Nk1gOsjvar5KF0w2SEFEeRIaqxD8Te1sOViGYRXupsJ_spc",
            price: 22000,
            rating: 4.8,
            sold: "2k+",
        },
        {
            id: "bs-2",
            name: "Angus Beef Burger Patties (4pcs)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCwuaE9LGQnDfJ838nqbOznSDmuOF_V9MIawxr-R2QXuN2p1QmBRiWDitpMLXy9r-jObbsEvskouBRU-ySe7qTyp3hT_FzLxWW0U-eGFhNA7_gh7WMiuIuUDRveVCW8LYHFjf16LQnhmJ4wK6mvUrKZKHHY-gmaNy-cYcSHS9R6uXnpTNBhk1NNUDW4OKEoUZNBcAhyTXVSR1aI0IZ5YVoViEvud61l367IE8E2xCywH18IjCAD-DuDrNdixImASugYETm1_XJ61Q",
            price: 95000,
            rating: 4.9,
            sold: "1k+",
        },
        {
            id: "bs-3",
            name: "Frozen Sushi-Grade Salmon Fillet",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf2GznqzyyDrBY6tykAyfnxO5P0_p_ce42XLBtcKjesNnA-BBL7lFwaTFb_UO8OPzmkp0JUK1QiPJV9Hy--uXCAvW6tOQrFSupT18fIXEfg0nC3spiNdjZPdjWuEDtPHpd8uKDiE8s3fZTqMpM_T3lYND80fADurjVX5pzKutUEgxQ5xDy1_qB1O8H0TDkuRXagxbTQh_oqfN3wlBXauxmjLQYbawnHypD4-dk2ZTbqFiLUsCWUldV716jbYwWiEauI4RzwChDUvU",
            price: 155000,
            rating: 5.0,
            sold: "500+",
        },
        {
            id: "bs-4",
            name: "Oriental Mixed Vegetables (1kg)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAedUq8FMHOyPjxnFF_MkKsgGSl7JPhk4kuxYsMdZlrgfApFk5lukm21izfN-UaDKHM8mgrcJFiZhn4RiL9kJ2gxJxgvY5Cb60QmNC8N2jenY941ZmnFmoKKNlYt4hx3bGEmEaYm31kScaKPzpzsDcQ8wNYBoDXUaIpakEM0bm6LPxRFz5Yq_ClR1Br4O0n7s6Vn2rr9KRh2iH1--ewiU0CNuGS1dls1qSIhim731-lM6czbJ0ghjMY8LNiK_NDKh19fSkIuL6484",
            price: 38000,
            rating: 4.7,
            sold: "3k+",
        },
    ],
    "High Protein": [
        {
            id: "hp-1",
            name: "Organic Chicken Breast Fillet (500g)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG3B6NbCBFcF8rfwq7HZ2hYbmgbpRUppqAA6z3tNeNhQoW0nvhLfamVXbPsctepHiWA1liirPx6q5VS-VOv4tcx_2vs-MNhVqHTuvHt0-3smxGGr7qnTvX5lozM10gNikKqK3H8xEfs95lpk7f8ZyOMajTCGD3WFSOkXfTQ5vIjx22DaLi5Ahq50xFs3z8LW1w21HFQhIuBilEEvn56NzAZWKDTRj3_mHK-z3wIjgBGmX-uKyzgmEhnZonO1Rx7Fwxc0xEMlUwyuE",
            price: 45000,
            rating: 4.9,
            sold: "800+",
        },
        {
            id: "hp-2",
            name: "Tuna Steaks Export Quality (300g)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQvRkgkohJcrgDi71rhWwQ7bt0SrGgUGszOz0czQzSFWf21LZcvU6cgVaj2tKZT8ThMhcUs1aef_5NIW_K_vg0QOK1nORGAgVzRHju9GOBhbGDBSfLHH8wP5zB2So7GSJakwqGDcZz4M0wpRIF1ZbVi9ZtI8wkH_BBp1iltpY7cYW8vK7hOPoi8bXKV21LZrr_zFrHotdo3CRBUpxIeJfUiSgtfarG5vx_wqXGgUIr-5X-BL4EbmrO7kBSeAkNAalb__UvqyRUERw",
            price: 65000,
            rating: 4.7,
            sold: "450+",
        },
        {
            id: "hp-3",
            name: "Angus Beef Burger Patties (4pcs)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCwuaE9LGQnDfJ838nqbOznSDmuOF_V9MIawxr-R2QXuN2p1QmBRiWDitpMLXy9r-jObbsEvskouBRU-ySe7qTyp3hT_FzLxWW0U-eGFhNA7_gh7WMiuIuUDRveVCW8LYHFjf16LQnhmJ4wK6mvUrKZKHHY-gmaNy-cYcSHS9R6uXnpTNBhk1NNUDW4OKEoUZNBcAhyTXVSR1aI0IZ5YVoViEvud61l367IE8E2xCywH18IjCAD-DuDrNdixImASugYETm1_XJ61Q",
            price: 95000,
            rating: 4.9,
            sold: "1k+",
        },
    ],
    "Weekly Deals": [
        {
            id: "wd-1",
            name: "Spicy Chicken Wings Package (1kg)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYL4RdzuJ1wRpyYoHJG_J70I5AJM7nV8hTz7Y13LN2daZO4Z5Uzxk5Oc7geYpHfhEF-uQnNwoLRRwZotRJ1-LsqYTvUYxCM4eKT7qDQd06XY4oFBS1bRGHLuBTXC_9Qv-l_4TcXfk06pxZh4uxvtzG5uhe1Yooef1w2f14JqdM-31OwnYmbKrJtVaw6YQxiaYPhe1LU-PILRIacneS6J3W4hVriNIcCcrX9kN5pgB3hFqOmHJugUkKYTjqrjnw2rPcPjCjJlyGtvU",
            price: 55000,
            rating: 4.6,
            sold: "5k+",
        },
        {
            id: "wd-2",
            name: "Premium Wagyu Beef Slices (500g)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQvRkgkohJcrgDi71rhWwQ7bt0SrGgUGszOz0czQzSFWf21LZcvU6cgVaj2tKZT8ThMhcUs1aef_5NIW_K_vg0QOK1nORGAgVzRHju9GOBhbGDBSfLHH8wP5zB2So7GSJakwqGDcZz4M0wpRIF1ZbVi9ZtI8wkH_BBp1iltpY7cYW8vK7hOPoi8bXKV21LZrr_zFrHotdo3CRBUpxIeJfUiSgtfarG5vx_wqXGgUIr-5X-BL4EbmrO7kBSeAkNAalb__UvqyRUERw",
            price: 250000,
            rating: 4.9,
            sold: "640+",
        }
    ],
    "Official Store": [
        {
            id: "os-1",
            name: "Gyoza Dumplings Family Pack",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsay67p1W2Tc0XagHkuqMh09rJJeJjt41yQnn5hu1Y_SbgSfCKIqozTKrSW8MtSCE3zEy4kIxg74tRpb_PKkDZWxJHNudJ1QQoEwtQ-bacXC3QiRhGOTiGRH4fRBgHc4gCbLj7SEo1QYSwRm9x8Y5kF8-arJtaX2LL2PBot2WoXuUHUMDmEjRRAi4VNT4hvjqMRBx_fcU9KOUluumPHzwfGaKh3bHfOhhwGBDDd4Lb0ZtoOLChZBrNbcyA8syC3UrDgY1_QjOhCVI",
            price: 88000,
            rating: 4.8,
            sold: "2.1k+",
        },
        {
            id: "os-2",
            name: "Frozen Sushi-Grade Salmon Fillet",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf2GznqzyyDrBY6tykAyfnxO5P0_p_ce42XLBtcKjesNnA-BBL7lFwaTFb_UO8OPzmkp0JUK1QiPJV9Hy--uXCAvW6tOQrFSupT18fIXEfg0nC3spiNdjZPdjWuEDtPHpd8uKDiE8s3fZTqMpM_T3lYND80fADurjVX5pzKutUEgxQ5xDy1_qB1O8H0TDkuRXagxbTQh_oqfN3wlBXauxmjLQYbawnHypD4-dk2ZTbqFiLUsCWUldV716jbYwWiEauI4RzwChDUvU",
            price: 155000,
            rating: 5.0,
            sold: "500+",
        }
    ],
    "New Arrivals": [
        {
            id: "na-1",
            name: "Ice Cream Assorted Flavors Set",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsay67p1W2Tc0XagHkuqMh09rJJeJjt41yQnn5hu1Y_SbgSfCKIqozTKrSW8MtSCE3zEy4kIxg74tRpb_PKkDZWxJHNudJ1QQoEwtQ-bacXC3QiRhGOTiGRH4fRBgHc4gCbLj7SEo1QYSwRm9x8Y5kF8-arJtaX2LL2PBot2WoXuUHUMDmEjRRAi4VNT4hvjqMRBx_fcU9KOUluumPHzwfGaKh3bHfOhhwGBDDd4Lb0ZtoOLChZBrNbcyA8syC3UrDgY1_QjOhCVI",
            price: 40000,
            rating: 5.0,
            sold: "120+",
        },
        {
            id: "na-2",
            name: "Oriental Mixed Vegetables (1kg)",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAedUq8FMHOyPjxnFF_MkKsgGSl7JPhk4kuxYsMdZlrgfApFk5lukm21izfN-UaDKHM8mgrcJFiZhn4RiL9kJ2gxJxgvY5Cb60QmNC8N2jenY941ZmnFmoKKNlYt4hx3bGEmEaYm31kScaKPzpzsDcQ8wNYBoDXUaIpakEM0bm6LPxRFz5Yq_ClR1Br4O0n7s6Vn2rr9KRh2iH1--ewiU0CNuGS1dls1qSIhim731-lM6czbJ0ghjMY8LNiK_NDKh19fSkIuL6484",
            price: 38000,
            rating: 4.7,
            sold: "3k+",
        },
    ]
};

export default function TodaysForYou() {
    const [activeCategory, setActiveCategory] = useState<TabCategory>("Best Seller");
    const { addItem } = useCart();

    const handleAddToCart = (item: MockProduct) => {
        const productToAdd: Product = {
            id: item.id,
            name: item.name,
            slug: item.name.toLowerCase().replace(/\s+/g, '-'),
            description: "Rasakan kelezatan produk premium kami. Dibuat dengan bahan-bahan pangan berkualitas tinggi untuk memberikan cita rasa terbaik dan bergizi bagi Anda dan keluarga.",
            price: item.price,
            stock: 99,
            category: 'Seafood', // Using placeholder category since TabCategory is a display tag mismatch
            image: item.image,
            isActive: true,
            createdAt: new Date().toISOString()
        };

        addItem(productToAdd);
    };

    const categories: TabCategory[] = ["Best Seller", "High Protein", "Weekly Deals", "Official Store", "New Arrivals"];

    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Variants for the container to orchestrate staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    // Variants for individual items (sliding up)
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    return (
        <section ref={sectionRef} className="px-4 md:px-10 lg:px-20 py-10 bg-slate-50 dark:bg-slate-900/50 transition-colors">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Todays For You!</h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === cat
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory hide-scroll-bar"
            >
                {todaysItems[activeCategory].map((item: MockProduct) => (
                    <motion.div
                        variants={itemVariants}
                        key={`${activeCategory}-${item.id}`}
                        className="w-[75vw] sm:w-[300px] shrink-0 snap-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 group transition-all hover:shadow-xl"
                    >
                        <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-slate-50 dark:bg-slate-800">
                            <img
                                alt={item.name}
                                className="object-cover w-full h-full"
                                src={item.image}
                            />
                            <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined text-sm">favorite</span>
                            </button>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 min-h-[2.5rem] mb-2">{item.name}</h4>
                        <div className="flex items-center gap-1 mb-2">
                            <span className="material-symbols-outlined text-sm text-yellow-400 fill-yellow-400">star</span>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.rating}</span>
                            <span className="text-[10px] text-slate-400">| {item.sold} Sold</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-primary font-extrabold">
                                Rp {item.price.toLocaleString('id-ID')}
                            </span>
                            <button onClick={() => handleAddToCart(item)} className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary hover:text-white transition-colors cursor-pointer relative z-10">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
