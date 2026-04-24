'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import Footer from '@/components/Footer';

interface Trend {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image?: string;
    tags?: string[];
    created_at: string;
}

export default function TrendsPage() {
    const [trends, setTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/trends')
            .then(res => setTrends(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

                <div className="mb-16">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Актуальне</p>
                    <h1 className="text-white text-5xl font-bold">Тренди</h1>
                </div>

                {loading ? (
                    <div className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-zinc-900 rounded-2xl h-40 animate-pulse" />
                        ))}
                    </div>
                ) : trends.length > 0 ? (
                    <div className="space-y-6">
                        {trends.map((trend, index) => (
                            <Link key={trend.id} href={`/trends/${trend.slug}`}>
                                <div className="group flex gap-6 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition cursor-pointer p-6">

                                    <div className="text-zinc-700 text-5xl font-bold w-16 flex-shrink-0 flex items-center justify-center group-hover:text-zinc-500 transition">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center">
                                        <h2 className="text-white text-xl font-bold mb-2 group-hover:text-zinc-300 transition">
                                            {trend.title}
                                        </h2>
                                        {trend.description && (
                                            <p className="text-zinc-500 text-sm line-clamp-2 mb-3">
                                                {trend.description}
                                            </p>
                                        )}
                                        {trend.tags && trend.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {trend.tags.map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full"
                                                    >
                            #{tag}
                          </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {trend.cover_image && (
                                        <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={trend.cover_image}
                                                alt={trend.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                    )}

                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 text-zinc-600">
                        <p className="text-5xl mb-4">✦</p>
                        <p>Трендів поки немає</p>
                    </div>
                )}

            </div>
            <Footer />
        </main>
    );
}