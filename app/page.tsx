import HeroSlider from "@/components/HeroSlider";
import FlashSaleSection from "@/components/FlashSaleSection";
import TodaysForYou from "@/components/TodaysForYou";
import Link from "next/link";

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
      <TodaysForYou />

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
          <Link href="/produk?category=Nugget" className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block">
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
          <Link href="/produk?category=Sosis" className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block">
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
          <Link href="/produk?category=Seafood" className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block">
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
          <Link href="/produk?category=Dimsum" className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all transform-gpu block">
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
