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
            // Spawn 2-3 flakes at a time for a denser effect
            const newFlakes = Array.from({ length: 3 }).map(() => {
                idCounter += 1;
                return {
                    id: Date.now() + idCounter, // Unique enough ID
                    x: Math.random() * 100, // Random percentage string width (vw)
                    size: Math.random() * 1.5 + 0.5, // Random scale between 0.5x and 2x
                    duration: Math.random() * 3 + 4, // Drop speed between 4s and 7s
                };
            });

            setSnowflakes((prev) => [...prev, ...newFlakes]);
        }, 300); // 300ms intervals

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
                            y: -50,
                            x: `${flake.x}vw`,
                            opacity: 0,
                            scale: flake.size,
                            rotate: 0,
                        }}
                        animate={{
                            y: "150vh",
                            x: `${flake.x + (Math.random() > 0.5 ? 10 : -10)}vw`, // Drift slightly left or right
                            opacity: [0, 1, 1, 0],
                            rotate: 360,
                        }}
                        transition={{
                            duration: flake.duration,
                            ease: "linear",
                        }}
                        onAnimationComplete={() => removeSnowflake(flake.id)}
                        className="absolute top-0 text-white drop-shadow-md"
                    >
                        <span className="material-symbols-outlined !text-xl opacity-90">
                            ac_unit
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
