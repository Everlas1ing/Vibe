'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="relative bg-black overflow-hidden mt-20">

            <div className="h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mb-8" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span
                    className="text-zinc-900 font-bold leading-none tracking-tighter"
                    style={{ fontSize: 'clamp(120px, 25vw, 320px)', opacity: 0.1 }}
                >
                    VIBE
                </span>
            </div>

            <div className="relative">
                <div className="max-w-6xl mx-auto px-6 pt-8 pb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">

                        <div className="text-center md:text-left">
                            <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-3">
                                Будь в темі
                            </p>
                            <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                                Найкраще — <span className="text-zinc-500">прямо тобі</span> <br className="hidden md:block" />
                            </h3>
                            <p className="mb-6"></p>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                            {subscribed ? (
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-sm">✓</div>
                                    <p className="text-sm tracking-widest uppercase">Підписка оформлена</p>
                                </div>
                            ) : (
                                <div className="flex w-full md:w-auto relative z-10">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                                        placeholder="your@email.com"
                                        className="bg-black/50 backdrop-blur-sm border border-zinc-700 border-r-0 text-white text-sm px-6 py-4 focus:outline-none focus:border-zinc-400 transition w-full md:w-72 placeholder-zinc-700"
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        className="bg-white text-black text-[10px] font-bold px-7 py-4 tracking-[0.2em] uppercase hover:bg-zinc-200 transition flex-shrink-0"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            )}
                            <p className="text-zinc-700 text-[10px] tracking-widest">
                                Без спаму. Відписка в будь-який час.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="h-px bg-zinc-800 max-w-6xl mx-auto my-8 opacity-50" />

            <div className="relative max-w-6xl mx-auto px-6 py-4">
                <div className="grid grid-cols-12 gap-8">

                    <div className="col-span-12 md:col-span-4">
                        <Link href="/">
                            <span className="text-white text-4xl font-bold tracking-widest block mb-4 hover:text-zinc-300 transition">
                                VIBE
                            </span>
                        </Link>
                        <p className="text-zinc-600 text-sm leading-relaxed mb-6 max-w-xs">
                            Медійний портал про моду, стиль та культуру. Для тих, хто хоче бути в темі.
                        </p>

                        <div className="flex gap-3 relative z-10">
                            {[
                                { label: 'IG', href: '#' },
                                { label: 'TT', href: '#' },
                                { label: 'PIN', href: '#' },
                                { label: 'TG', href: '#' },
                            ].map(s => (
                                <a key={s.label} href={s.href}
                                   className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-600 text-[10px] font-bold tracking-wider hover:border-zinc-500 hover:text-white transition">
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block md:col-span-1" />

                    <div className="col-span-6 md:col-span-2 relative z-10">
                        <p className="text-zinc-500 text-[9px] tracking-[0.3em] uppercase mb-5">Контент</p>
                        <div className="space-y-4">
                            {[
                                { label: 'Статті', href: '/articles' },
                                { label: 'Колекції', href: '/collections' },
                                { label: 'Тренди', href: '/trends' },
                            ].map(l => (
                                <Link key={l.label} href={l.href}
                                      className="block text-zinc-400 hover:text-white text-sm transition group flex items-center gap-2">
                                    <span className="w-0 group-hover:w-3 h-px bg-white transition-all duration-300 overflow-hidden" />
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-6 md:col-span-2 relative z-10">
                        <p className="text-zinc-500 text-[9px] tracking-[0.3em] uppercase mb-5">Категорії</p>
                        <div className="space-y-4">
                            {[
                                { label: 'Style', href: '/articles?category=style' },
                                { label: 'Beauty', href: '/articles?category=beauty' },
                                { label: 'Trends', href: '/articles?category=trends' },
                                { label: 'Culture', href: '/articles?category=culture' },
                            ].map(l => (
                                <Link key={l.label} href={l.href}
                                      className="block text-zinc-400 hover:text-white text-sm transition group flex items-center gap-2">
                                    <span className="w-0 group-hover:w-3 h-px bg-white transition-all duration-300 overflow-hidden" />
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-6 md:col-span-2 relative z-10">
                        <p className="text-zinc-500 text-[9px] tracking-[0.3em] uppercase mb-5">Акаунт</p>
                        <div className="space-y-4">
                            {[
                                { label: 'Профіль', href: '/profile' },
                                { label: 'Збережені', href: '/saved' },
                                { label: 'Новий пост', href: '/create-post' },
                                { label: 'Увійти', href: '/login' },
                                { label: 'Реєстрація', href: '/register' },
                            ].map(l => (
                                <Link key={l.label} href={l.href}
                                      className="block text-zinc-400 hover:text-white text-sm transition group flex items-center gap-2">
                                    <span className="w-0 group-hover:w-3 h-px bg-white transition-all duration-300 overflow-hidden" />
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-6 my-10" />

            <div className="relative max-w-6xl mx-auto px-6 pb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-zinc-700 text-[10px] tracking-[0.2em] uppercase">
                        © 2026 Vibe Media. All rights reserved.
                    </p>

                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-zinc-700 text-[10px] tracking-widest uppercase ml-1">
                            All systems operational
                        </span>
                    </div>

                    <div className="flex items-center gap-6 relative z-10">
                        <a href="#" className="text-zinc-700 hover:text-zinc-400 text-[10px] tracking-[0.15em] uppercase transition">
                            Конфіденційність
                        </a>
                        <a href="#" className="text-zinc-700 hover:text-zinc-400 text-[10px] tracking-[0.15em] uppercase transition">
                            Умови
                        </a>
                        <a href="#" className="text-zinc-700 hover:text-zinc-400 text-[10px] tracking-[0.15em] uppercase transition">
                            Cookies
                        </a>
                    </div>
                    <p className="mb-1"></p>
                </div>
            </div>

        </footer>
    );
}