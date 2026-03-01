import HeroSlider from "@/components/HeroSlider";
import FlashSaleSection from "@/components/FlashSaleSection";
import TodaysForYou from "@/components/TodaysForYou";
import StoreHighlightsSection from "@/components/StoreHighlightsSection";
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
      <StoreHighlightsSection />

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
