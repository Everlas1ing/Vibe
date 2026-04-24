'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';

export default function CollectionPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/collections/${slug}`)
            .then(res => setCollection(res.data))
            .catch(() => router.push('/collections'))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 pt-28">
                <div className="h-10 bg-zinc-900 rounded-xl animate-pulse mb-4 w-2/3" />
                <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse mt-8" />
            </div>
        </main>
    );

    if (!collection) return null;

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">

                <button
                    onClick={() => router.back()}
                    className="text-zinc-500 hover:text-white text-sm mb-10 transition flex items-center gap-2"
                >
                    ← Назад
                </button>

                <div className="flex items-center gap-4 mb-4">
                    {collection.brand && (
                        <span className="text-zinc-500 text-xs uppercase tracking-widest">
              {collection.brand}
            </span>
                    )}
                    {collection.season && (
                        <span className="text-zinc-600 text-xs border border-zinc-700 px-3 py-1 rounded-full">
              {collection.season}
            </span>
                    )}
                </div>

                <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
                    {collection.title}
                </h1>

                {collection.cover_image && (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-10">
                        <img
                            src={collection.cover_image}
                            alt={collection.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {collection.description && (
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {collection.description}
                    </p>
                )}

                <p className="text-zinc-600 text-sm mt-8">
                    Додано: {new Date(collection.created_at).toLocaleDateString('uk-UA')}
                </p>

            </div>
        </main>
    );
}