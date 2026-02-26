"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Snowflake {
    id: number;
    x: number;
    size: number;
    duration: number;
}

interface SnowEffectProps {
    isActive: boolean;
}

export default function SnowEffect({ isActive }: SnowEffectProps) {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        if (!isActive) return;

        let idCounter = 0;
        const interval = setInterval(() => {
            // Spawn fewer flakes per interval to drastically improve mobile FPS
            const newFlakes = Array.from({ length: 2 }).map(() => {
                idCounter += 1;
                return {
                    id: Date.now() + idCounter, // Unique enough ID
                    x: Math.random() * 100, // Random percentage string width (vw)
                    size: Math.random() * 1.2 + 0.3, // Random scale between 0.3x and 1.5x
                    duration: Math.random() * 3 + 4, // Drop speed between 4s and 7s
                };
            });

            setSnowflakes((prev) => [...prev, ...newFlakes]);
        }, 250); // 250ms intervals

        return () => clearInterval(interval);
    }, [isActive]);

    const removeSnowflake = (id: number) => {
        setSnowflakes((prev) => prev.filter((flake) => flake.id !== id));
    };

    return (
        <div className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none z-[100]" style={{ height: '150vh' }}>
            <AnimatePresence>
                {snowflakes.map((flake) => (
                    <motion.div
                        key={flake.id}
                        initial={{
                            y: "-5vh",
                            x: `${flake.x}vw`,
                            opacity: 0,
                            scale: flake.size,
                        }}
                        animate={{
                            y: "110vh",
                            x: `${flake.x + (Math.random() > 0.5 ? 5 : -5)}vw`, // Drift slightly left or right
                            opacity: [0, 0.8, 0.8, 0],
                        }}
                        transition={{
                            duration: flake.duration,
                            ease: "linear",
                        }}
                        onAnimationComplete={() => removeSnowflake(flake.id)}
                        className="absolute top-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white opacity-80"
                        style={{ willChange: "transform, opacity" }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
