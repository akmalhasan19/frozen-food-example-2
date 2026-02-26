"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
    icon: string;
    color: string;
}

const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "Flash Sale Alert! ⚡",
        message: "Up to 50% off on selected Seafood items. Grab them before they're gone!",
        time: "5m ago",
        unread: true,
        icon: "bolt",
        color: "text-amber-500 bg-amber-100 dark:bg-amber-500/10",
    },
    {
        id: "2",
        title: "Order Delivered",
        message: "Your order #ORD-20231025-001 has been delivered. Enjoy your fresh frozen food!",
        time: "2 hours ago",
        unread: false,
        icon: "local_shipping",
        color: "text-green-500 bg-green-100 dark:bg-green-500/10",
    },
    {
        id: "3",
        title: "Welcome to FrozenHub!",
        message: "Thanks for joining us. Check out our latest premium frozen foods.",
        time: "1 day ago",
        unread: false,
        icon: "celebration",
        color: "text-primary bg-primary/10",
    }
];

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => n.unread).length;

    // Handle click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors hidden sm:block"
            >
                <span className="material-symbols-outlined text-sm md:text-base">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 overflow-hidden z-50 text-left"
                    >
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">notifications_off</span>
                                    <p className="text-sm">No new notifications.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${notification.unread ? 'bg-primary/5 dark:bg-primary/5' : ''}`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                                                <span className="material-symbols-outlined text-lg">{notification.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className={`text-sm font-semibold truncate ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                                        {notification.title}
                                                    </h4>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{notification.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            {notification.unread && (
                                                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
