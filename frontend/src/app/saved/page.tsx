'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function SavedPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            api.get('/saved')
                .then(res => setArticles(res.data))
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [user, authLoading]);

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

                <div className="mb-12">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Особисте</p>
                    <h1 className="text-white text-5xl font-bold">Збережені</h1>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-zinc-900 rounded-2xl h-72 animate-pulse" />
                        ))}
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article: any) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 text-zinc-600">
                        <p className="text-5xl mb-4">✦</p>
                        <p className="mb-2">Збережених статей поки немає</p>
                        <button
                            onClick={() => router.push('/articles')}
                            className="text-white text-sm underline mt-2"
                        >
                            Перейти до статей
                        </button>
                    </div>
                )}

            </div>
        </main>
    );
}