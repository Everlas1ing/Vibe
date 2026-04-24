'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';

export default function TrendPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [trend, setTrend] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/trends/${slug}`)
            .then(res => setTrend(res.data))
            .catch(() => router.push('/trends'))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 pt-28">
                <div className="h-10 bg-zinc-900 rounded-xl animate-pulse mb-4 w-2/3" />
                <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse mt-8" />
            </div>
        </main>
    );

    if (!trend) return null;

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">

                <button
                    onClick={() => router.back()}
                    className="text-zinc-500 hover:text-white text-sm mb-10 transition flex items-center gap-2"
                >
                    ← Назад
                </button>

                <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
                    {trend.title}
                </h1>

                {trend.tags && trend.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {trend.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="text-xs text-zinc-400 border border-zinc-700 px-3 py-1 rounded-full"
                            >
                #{tag}
              </span>
                        ))}
                    </div>
                )}

                {trend.cover_image && (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-10">
                        <img
                            src={trend.cover_image}
                            alt={trend.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {trend.description && (
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {trend.description}
                    </p>
                )}

                <p className="text-zinc-600 text-sm mt-8">
                    {new Date(trend.created_at).toLocaleDateString('uk-UA')}
                </p>

            </div>
        </main>
    );
}