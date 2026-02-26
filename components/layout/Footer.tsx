import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 dark:bg-black text-white pt-20 pb-10 px-4 md:px-10 lg:px-20 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">ac_unit</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">FrozenHub</span>
                    </div>
                    <p className="text-slate-400 text-sm max-w-sm mb-8">
                        Premium frozen food e-commerce platform delivering the freshest ingredients straight to your kitchen. Quality guaranteed, freshness preserved.
                    </p>
                    <div className="flex gap-4">
                        <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                            <span className="material-symbols-outlined text-lg">facebook</span>
                        </Link>
                        <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                            <span className="material-symbols-outlined text-lg">camera</span>
                        </Link>
                        <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                            <span className="material-symbols-outlined text-lg">alternate_email</span>
                        </Link>
                        <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                            <span className="material-symbols-outlined text-lg">play_arrow</span>
                        </Link>
                    </div>
                </div>
                <div>
                    <h5 className="font-bold mb-6 text-sm uppercase tracking-widest">About Hub</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><Link className="hover:text-primary transition-colors" href="#">About FrozenHub</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Write a Blog</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Food Sourcing</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-6 text-sm uppercase tracking-widest">Buy</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><Link className="hover:text-primary transition-colors" href="#">How to Buy</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">FrozenHub COD</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Gift Cards</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Promo</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-6 text-sm uppercase tracking-widest">Guide &amp; Help</h5>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><Link className="hover:text-primary transition-colors" href="#">FrozenHub Care</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Terms &amp; Conditions</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link></li>
                        <li><Link className="hover:text-primary transition-colors" href="#">FAQ</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs">© 2024 FrozenHub Marketplace. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <img alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjTaKkCuUnvmVwMSNGDjBIqdf4mxccBNumWBrPNvlFlQyfbKMJF4q1juJ7POxqRJZAkS5zz_5ctYTfrxMycibRRCxpC6VvtOQtDeVIRGP9tKLfAx8gO7IlZHL65a1zHJ8ZywsgXDUEdU8cJ2lA1IA0CrDV1LAdg02ii_hIlmPp1uv7uJ-lRTeCw4_XqeaPRqYSbsNdbmww-zqQBGaSJ5APlI6IsngsTA92UN6EGa0D4N1LWjDYUeyyUgdheeel2E6YZhreiorU8tQ" />
                    <img alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgWAPP_JfHHnQFU7vRz3jvt-AKSuvJDsojj2tXTDfoVCqFgm-PEnK17W_iovueWnFUGytY1IpxFt3MxApuvzDMEbK-J34YrWrQYgpRbzDBaG3Xapd0CjTxzyw0KQVhAQJmzTMp06AMQ7E3FiFkx7BeIm8h0aMh5eZZUyQ6GsgaiYZj3rVIeGiraHg5oSnPe6mhtTCW-R7o0V6AWqW4o2ivZ-DwbGK0EyO8dFbhX0DuBx022IDhACM_OKZZ81IKTq3QTntX2j1H-U4" />
                    <img alt="Visa" className="h-3 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHdN9FSOvL7iNG-Lq5-qQcVMAQcQBe3iX4l7Uku2uiEdvyIb-Xcdrkd2IPFlOlaBMe9mqLYjcLsi4bUHEJ20RJFtxk7OrtAlXMOABu98LQqc46Qq-7GUzw7LLQoz-ejbXyG9_E10Ox_a2zGMk6xYYgx5d8F3yn4blGvnI3kTzv2ShA_GBehxagqzc7tQAQNwHxeDiIZh4rZfD_9cWqlTLMY0iMEUOW5r8LFBKY0m0ENMMHLzOndw89OWdhsdq0wOaECyeSylEdMQY" />
                </div>
            </div>
        </footer>
    );
}
