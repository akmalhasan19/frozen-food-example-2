import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/store/cart-context";
import { ToastProvider } from "@/components/ui/ToastProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans", // Tailwind v4 doesn't need variable strictly if we use normal font-family in globals, but good for custom font variables
});

export const metadata: Metadata = {
  title: {
    template: "%s | FrozenHub",
    default: "FrozenHub - Freshness Beyond Boundaries",
  },
  description: "Premium frozen food e-commerce platform delivering the freshest ingredients straight to your kitchen. Quality guaranteed, freshness preserved.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body
        className={`${plusJakartaSans.className} bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 min-h-screen flex flex-col overflow-x-hidden`}
      >
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow w-full">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
