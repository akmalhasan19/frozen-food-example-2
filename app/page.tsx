import HeroSlider from "@/components/HeroSlider";
import FlashSaleSection from "@/components/FlashSaleSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSlider />

      {/* Categories Section */}
      <section className="px-4 md:px-10 lg:px-20 pt-4 md:pt-6 pb-2">
        <div className="flex justify-start sm:justify-between items-center overflow-x-auto no-scrollbar gap-4 sm:gap-6 md:gap-8 py-4 snap-x snap-mandatory">
          {[
            { icon: "set_meal", label: "Seafood" },
            { icon: "restaurant", label: "Chicken" },
            { icon: "eco", label: "Vegetables" },
            { icon: "nutrition", label: "Fruits" },
            { icon: "cake", label: "Desserts" },
            { icon: "kebab_dining", label: "Meat" },
            { icon: "fastfood", label: "Ready-to-eat" },
            { icon: "grid_view", label: "All" },
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer group min-w-[72px] md:min-w-[80px] shrink-0 snap-start">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-2xl md:text-3xl">{cat.icon}</span>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      <FlashSaleSection />

      {/* Todays For You Section */}
      <section className="px-4 md:px-10 lg:px-20 py-10 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Todays For You!</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            <button className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold whitespace-nowrap">Best Seller</button>
            <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">High Protein</button>
            <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Weekly Deals</button>
            <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Official Store</button>
            <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">New Arrivals</button>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory hide-scroll-bar">
          {/* For You Item 1 */}
          <div className="w-[75vw] sm:w-[300px] shrink-0 snap-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 group transition-all hover:shadow-xl">
            <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-slate-50 dark:bg-slate-800">
              <img
                alt="Frozen Peas"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANVU5bYFJpFLPfPwOs4iSVREdEAHNvaPrpF-C0oe8KDAyR1oyptlKWAvmR7DpZbkNT9l4HZJ62wtat6mieMHw2geWxNY2WfNTz1qLSzilOO1IbAzt8qRH2xtmM91wIpJGZoq4q8OjXIgCF9jgEAC8r9AATCf3fUMy0VLHm-Vz2P-bXj_tjIaBvO77-jFIJqdsRkj7xV5wVT3D_XHq-cwSvBIbtfT6_Nk1gOsjvar5KF0w2SEFEeRIaqxD8Te1sOViGYRXupsJ_spc"
              />
              <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">favorite</span>
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 min-h-[2.5rem] mb-2">Garden Fresh Sweet Green Peas (500g)</h4>
            <div className="flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-sm text-yellow-400 fill-yellow-400">star</span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">4.8</span>
              <span className="text-[10px] text-slate-400">| 2k+ Sold</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary font-extrabold">Rp 22.000</span>
              <button className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          {/* For You Item 2 */}
          <div className="w-[75vw] sm:w-[300px] shrink-0 snap-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 group transition-all hover:shadow-xl">
            <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-slate-50 dark:bg-slate-800">
              <img
                alt="Beef Patty"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCwuaE9LGQnDfJ838nqbOznSDmuOF_V9MIawxr-R2QXuN2p1QmBRiWDitpMLXy9r-jObbsEvskouBRU-ySe7qTyp3hT_FzLxWW0U-eGFhNA7_gh7WMiuIuUDRveVCW8LYHFjf16LQnhmJ4wK6mvUrKZKHHY-gmaNy-cYcSHS9R6uXnpTNBhk1NNUDW4OKEoUZNBcAhyTXVSR1aI0IZ5YVoViEvud61l367IE8E2xCywH18IjCAD-DuDrNdixImASugYETm1_XJ61Q"
              />
              <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">favorite</span>
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 min-h-[2.5rem] mb-2">Angus Beef Burger Patties (4pcs)</h4>
            <div className="flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-sm text-yellow-400 fill-yellow-400">star</span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">4.9</span>
              <span className="text-[10px] text-slate-400">| 1k+ Sold</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary font-extrabold">Rp 95.000</span>
              <button className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          {/* For You Item 3 */}
          <div className="w-[75vw] sm:w-[300px] shrink-0 snap-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 group transition-all hover:shadow-xl">
            <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-slate-50 dark:bg-slate-800">
              <img
                alt="Sushi Grade Salmon"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf2GznqzyyDrBY6tykAyfnxO5P0_p_ce42XLBtcKjesNnA-BBL7lFwaTFb_UO8OPzmkp0JUK1QiPJV9Hy--uXCAvW6tOQrFSupT18fIXEfg0nC3spiNdjZPdjWuEDtPHpd8uKDiE8s3fZTqMpM_T3lYND80fADurjVX5pzKutUEgxQ5xDy1_qB1O8H0TDkuRXagxbTQh_oqfN3wlBXauxmjLQYbawnHypD4-dk2ZTbqFiLUsCWUldV716jbYwWiEauI4RzwChDUvU"
              />
              <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">favorite</span>
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 min-h-[2.5rem] mb-2">Frozen Sushi-Grade Salmon Fillet</h4>
            <div className="flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-sm text-yellow-400 fill-yellow-400">star</span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">5.0</span>
              <span className="text-[10px] text-slate-400">| 500+ Sold</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary font-extrabold">Rp 155.000</span>
              <button className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          {/* For You Item 4 */}
          <div className="w-[75vw] sm:w-[300px] shrink-0 snap-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 group transition-all hover:shadow-xl">
            <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-slate-50 dark:bg-slate-800">
              <img
                alt="Mixed Vegetables"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAedUq8FMHOyPjxnFF_MkKsgGSl7JPhk4kuxYsMdZlrgfApFk5lukm21izfN-UaDKHM8mgrcJFiZhn4RiL9kJ2gxJxgvY5Cb60QmNC8N2jenY941ZmnFmoKKNlYt4hx3bGEmEaYm31kScaKPzpzsDcQ8wNYBoDXUaIpakEM0bm6LPxRFz5Yq_ClR1Br4O0n7s6Vn2rr9KRh2iH1--ewiU0CNuGS1dls1qSIhim731-lM6czbJ0ghjMY8LNiK_NDKh19fSkIuL6484"
              />
              <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">favorite</span>
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 min-h-[2.5rem] mb-2">Oriental Mixed Vegetables (1kg)</h4>
            <div className="flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-sm text-yellow-400 fill-yellow-400">star</span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">4.7</span>
              <span className="text-[10px] text-slate-400">| 3k+ Sold</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary font-extrabold">Rp 38.000</span>
              <button className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Highlights Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16">
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
          <div className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all">
            <img alt="Premium Nuggets" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG3B6NbCBFcF8rfwq7HZ2hYbmgbpRUppqAA6z3tNeNhQoW0nvhLfamVXbPsctepHiWA1liirPx6q5VS-VOv4tcx_2vs-MNhVqHTuvHt0-3smxGGr7qnTvX5lozM10gNikKqK3H8xEfs95lpk7f8ZyOMajTCGD3WFSOkXfTQ5vIjx22DaLi5Ahq50xFs3z8LW1w21HFQhIuBilEEvn56NzAZWKDTRj3_mHK-z3wIjgBGmX-uKyzgmEhnZonO1Rx7Fwxc0xEMlUwyuE" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="bg-primary w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-2xl">lunch_dining</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Nuggets</h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                Crispy, golden, and packed with flavor. Our best-selling snack for any occasion.
              </p>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </div>
          </div>
          <div className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all">
            <img alt="Organic Berries" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYL4RdzuJ1wRpyYoHJG_J70I5AJM7nV8hTz7Y13LN2daZO4Z5Uzxk5Oc7geYpHfhEF-uQnNwoLRRwZotRJ1-LsqYTvUYxCM4eKT7qDQd06XY4oFBS1bRGHLuBTXC_9Qv-l_4TcXfk06pxZh4uxvtzG5uhe1Yooef1w2f14JqdM-31OwnYmbKrJtVaw6YQxiaYPhe1LU-PILRIacneS6J3W4hVriNIcCcrX9kN5pgB3hFqOmHJugUkKYTjqrjnw2rPcPjCjJlyGtvU" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-red-500/30">
                <span className="material-symbols-outlined text-2xl">nutrition</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Organic Berries</h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                Flash-frozen at peak ripeness to lock in nutrients and sweetness. Perfect for smoothies.
              </p>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </div>
          </div>
          <div className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all">
            <img alt="Fresh Seafood Mix" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQvRkgkohJcrgDi71rhWwQ7bt0SrGgUGszOz0czQzSFWf21LZcvU6cgVaj2tKZT8ThMhcUs1aef_5NIW_K_vg0QOK1nORGAgVzRHju9GOBhbGDBSfLHH8wP5zB2So7GSJakwqGDcZz4M0wpRIF1ZbVi9ZtI8wkH_BBp1iltpY7cYW8vK7hOPoi8bXKV21LZrr_zFrHotdo3CRBUpxIeJfUiSgtfarG5vx_wqXGgUIr-5X-BL4EbmrO7kBSeAkNAalb__UvqyRUERw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-2xl">set_meal</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Fresh Seafood Mix</h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                A premium selection of shrimp, calamari, and fish fillets ready for your gourmet recipes.
              </p>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </div>
          </div>
          <div className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all">
            <img alt="Gourmet Dumplings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsay67p1W2Tc0XagHkuqMh09rJJeJjt41yQnn5hu1Y_SbgSfCKIqozTKrSW8MtSCE3zEy4kIxg74tRpb_PKkDZWxJHNudJ1QQoEwtQ-bacXC3QiRhGOTiGRH4fRBgHc4gCbLj7SEo1QYSwRm9x8Y5kF8-arJtaX2LL2PBot2WoXuUHUMDmEjRRAi4VNT4hvjqMRBx_fcU9KOUluumPHzwfGaKh3bHfOhhwGBDDd4Lb0ZtoOLChZBrNbcyA8syC3UrDgY1_QjOhCVI" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="bg-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-amber-500/30">
                <span className="material-symbols-outlined text-2xl">ramen_dining</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Gourmet Dumplings</h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                Hand-crafted style dumplings with savory fillings. Steam, fry, or boil in minutes.
              </p>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <a className="flex items-center gap-1 text-primary font-bold hover:text-emerald-600 transition-colors" href="#">
            View All Categories <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* Quote Banner Section */}
      <section className="px-4 md:px-10 lg:px-20 py-10">
        <div className="relative h-64 rounded-[2.5rem] overflow-hidden group">
          <img
            alt="Frozen Storage"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD54lzGYoQzcQ4O_YhvqFGV0gMgAFkU8ixp0QFzZ9ROvix0QkW-XYLwvBBYDOESW32Q6GxINTGeByQAds-Z2wuCyPzyK5ev8PuGkf7WRy6NG4XKh2hVi9ADvAbeMIwe-RgahilKdTcdolb41gpMGVgj4CK4kYrhxcSx3HJwxllQf1T-LS60DFTVUMlS8bF-3DjOICFk4WwNqbY30b6zVJ1LAFo7wF94bRChg92RFadKB2I_-yvmGdv9yiFEArWwzZ3PrkzHJf_tGvg"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center italic tracking-tight">
              &quot;Freshness Beyond Boundaries&quot;
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
