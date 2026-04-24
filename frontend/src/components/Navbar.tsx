'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                <Link href="/" className="text-white text-2xl font-bold tracking-widest uppercase">
                    Vibe
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/articles" className="text-zinc-400 hover:text-white text-sm tracking-wide transition uppercase">
                        Статті
                    </Link>
                    <Link href="/collections" className="text-zinc-400 hover:text-white text-sm tracking-wide transition uppercase">
                        Колекції
                    </Link>
                    <Link href="/trends" className="text-zinc-400 hover:text-white text-sm tracking-wide transition uppercase">
                        Тренди
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-2 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-semibold">
                                    {user.avatar ? (
                                        <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        user.username[0].toUpperCase()
                                    )}
                                </div>
                                <span className="text-zinc-400 group-hover:text-white text-sm transition hidden md:block">
                  {user.username}
                </span>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 top-12 bg-zinc-900 border border-zinc-800 rounded-xl w-48 py-2 shadow-xl">
                                    <Link
                                        href="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm transition"
                                    >
                                        Мій профіль
                                    </Link>
                                    <Link
                                        href="/saved"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm transition"
                                    >
                                        Збережені
                                    </Link>
                                    <Link
                                        href="/create-post"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm transition"
                                    >
                                        Створити пост
                                    </Link>
                                    <hr className="border-zinc-800 my-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-zinc-800 text-sm transition"
                                    >
                                        Вийти
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="text-zinc-400 hover:text-white text-sm transition"
                            >
                                Увійти
                            </Link>
                            <Link
                                href="/register"
                                className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition"
                            >
                                Реєстрація
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}