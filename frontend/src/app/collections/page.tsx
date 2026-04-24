'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import Footer from '@/components/Footer';

interface Collection {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image?: string;
    season?: string;
    brand?: string;
    created_at: string;
}

export default function CollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/collections')
            .then(res => setCollections(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

                <div className="mb-16">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Мода</p>
                    <h1 className="text-white text-5xl font-bold">Колекції</h1>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-zinc-900 rounded-2xl h-80 animate-pulse" />
                        ))}
                    </div>
                ) : collections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {collections.map(col => (
                            <Link key={col.id} href={`/collections/${col.slug}`}>
                                <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition cursor-pointer">

                                    <div className="aspect-video bg-zinc-800 overflow-hidden">
                                        {col.cover_image ? (
                                            <img
                                                src={col.cover_image}
                                                alt={col.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-5xl">
                                                ✦
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            {col.brand && (
                                                <span className="text-zinc-500 text-xs uppercase tracking-widest">
                          {col.brand}
                        </span>
                                            )}
                                            {col.season && (
                                                <span className="text-zinc-600 text-xs border border-zinc-700 px-3 py-1 rounded-full">
                          {col.season}
                        </span>
                                            )}
                                        </div>
                                        <h2 className="text-white text-xl font-bold mb-2 group-hover:text-zinc-300 transition">
                                            {col.title}
                                        </h2>
                                        {col.description && (
                                            <p className="text-zinc-500 text-sm line-clamp-2">
                                                {col.description}
                                            </p>
                                        )}
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 text-zinc-600">
                        <p className="text-5xl mb-4">✦</p>
                        <p>Колекцій поки немає</p>
                    </div>
                )}

            </div>
            <Footer />
        </main>
    );
}