"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnowEffect from "@/components/ui/SnowEffect";

const slides = [
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA-ElgmNgUIkdrjTLe74e8CoqF5_cesq9kELGdU_rb5XL9fzCmjDW_sNaucKgvIEwRg3xj8VlW3sytYHHLaKsj-x5wfJGJ_844D7VcQCqLYfAVTCyK91FvPegODF4Pt9hOrkUuVuxQWhjeqlGn88GQrn2RCVQnIuQVwB2yQSnrdNUc2LwaDkPFOoAoXZpHddXE-QqGMTYGMl_hwT_gs_eNygBIsh4NNu1IObscH02c58kLq4Kp6BAOpI2pqwcUuoQel61UIOOYqbk",
        alt: "Frozen Blueberries and Dumplings",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSZ_eJge835Erc6orOunoCY3fgRiU4l0PnicKj-uZE_Ve2GiIHe9waNBVjnprsQ8fZmlvXMwx4Fm8yroAMT0HLq3kO7aD3v49b5N9cW4nO4awdI8DuJV8L2sILF4UmpwPeob7JvWODbV2Xv1ZoQzA70MJlB1U-oh9gCJUobf-uQOIDzWsVZ9bvgnO-YeUUIDqfFdf4dsqgzn_i20_XLE_tLmuBaNUA0dzaMFlxdlxpWohBLqeUg_-lNVj4tHpGH74MiG3tztH7RXw",
        alt: "Premium Shrimp",
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQvRkgkohJcrgDi71rhWwQ7bt0SrGgUGszOz0czQzSFWf21LZcvU6cgVaj2tKZT8ThMhcUs1aef_5NIW_K_vg0QOK1nORGAgVzRHju9GOBhbGDBSfLHH8wP5zB2So7GSJakwqGDcZz4M0wpRIF1ZbVi9ZtI8wkH_BBp1iltpY7cYW8vK7hOPoi8bXKV21LZrr_zFrHotdo3CRBUpxIeJfUiSgtfarG5vx_wqXGgUIr-5X-BL4EbmrO7kBSeAkNAalb__UvqyRUERw",
        alt: "Tiger Prawns",
    }
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isSnowing, setIsSnowing] = useState(false);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleSnowTrigger = () => {
        if (isSnowing) return; // Prevent multiple clicks resetting the timer
        setIsSnowing(true);
        setTimeout(() => {
            setIsSnowing(false);
        }, 5000);
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        const swipe = offset.x;

        if (swipe < -50) {
            paginate(1);
        } else if (swipe > 50) {
            paginate(-1);
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        // Prevent default scrolling only if swiping horizontally heavily
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            // e.preventDefault() cannot be called here easily without a ref to the dom node and passive:false
            // but we can at least handle the state
            if (!isScrolling.current) {
                if (e.deltaX > 20) {
                    paginate(1);
                    isScrolling.current = true;
                } else if (e.deltaX < -20) {
                    paginate(-1);
                    isScrolling.current = true;
                }

                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                scrollTimeout.current = setTimeout(() => {
                    isScrolling.current = false;
                }, 800); // 800ms debounce for trackpad swipe
            }
        }
    };

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 100 : -100,
                opacity: 0,
                rotate: 0,
                scale: 0.9,
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            rotate: 3,
            scale: 1,
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 100 : -100,
                opacity: 0,
                rotate: 0,
                scale: 0.9,
            };
        }
    };

    return (
        <section className="w-full relative">
            <SnowEffect isActive={isSnowing} />
            <div className="relative w-full overflow-hidden min-h-[600px] md:min-h-[500px] lg:aspect-[21/9] bg-[#E3F2FD] dark:bg-slate-800 flex flex-col md:flex-row items-center transition-colors pt-8 md:pt-0">

                {/* Background Gradients */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-t md:bg-gradient-to-l from-primary/20 to-transparent"></div>
                </div>

                {/* Left Side Static Content */}
                <div className="relative z-20 px-6 md:pl-20 lg:pl-32 md:pr-0 w-full md:w-1/2 pointer-events-none text-center md:text-left">
                    <span className="bg-white/90 dark:bg-slate-900/90 text-primary px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 inline-block mx-auto md:mx-0">
                        Flash Frozen Sale
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.2] md:leading-[1.1] mb-2 md:mb-4">
                        Limited Time Offer!<br className="hidden sm:block" />
                        Up to <span
                            onClick={handleSnowTrigger}
                            className="text-primary italic cursor-pointer relative inline-block hover:scale-105 transition-transform origin-center pointer-events-auto"
                            title="Click for a snowy surprise!"
                        >
                            50% OFF!
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-lg mb-6 md:mb-8 max-w-sm md:max-w-md mx-auto md:mx-0">
                        Premium dumplings, organic berries, and gourmet seafood delivered to your door fresh and frozen.
                    </p>
                    <button className="bg-primary hover:bg-emerald-600 text-white px-6 md:px-10 py-2.5 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-xl shadow-primary/30 transition-all hover:scale-105 pointer-events-auto cursor-pointer">
                        Shop Collection
                    </button>
                </div>

                {/* Drag target overlay mapped purely to the image boundaries */}
                <motion.div
                    className="absolute bottom-16 md:bottom-0 right-0 w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-full z-10 cursor-grab active:cursor-grabbing flex items-center justify-center p-4 md:p-12"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    onWheel={handleWheel}
                >
                    <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-none md:w-full h-[100%] md:h-[85%] flex items-center justify-center mx-auto md:mx-0 pointer-events-none">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.img
                                key={currentIndex}
                                src={slides[currentIndex].image}
                                alt={slides[currentIndex].alt}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                    rotate: { type: "spring", stiffness: 200, damping: 20 },
                                    scale: { duration: 0.3 }
                                }}
                                className="absolute w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl origin-center"
                            />
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${index === currentIndex
                                ? "w-8 bg-primary"
                                : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Bottom Fade Transition */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-background-dark to-transparent z-20 pointer-events-none"></div>
            </div>
        </section>
    );
}
