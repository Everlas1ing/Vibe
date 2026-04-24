'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import api from '@/lib/api';
import Footer from '@/components/Footer';

const CATEGORIES = ['Всі', 'Style', 'Beauty', 'Trends', 'Culture'];

export default function ArticlesPage() {
    const searchParams = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Всі');

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setActiveCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        const params = activeCategory !== 'Всі' ? `?category=${activeCategory.toLowerCase()}` : '';
        api.get(`/articles${params}`)
            .then(res => setArticles(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [activeCategory]);

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

                <div className="mb-12">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Медіа</p>
                    <h1 className="text-white text-5xl font-bold">Статті</h1>
                </div>

                <div className="flex items-center gap-3 mb-10 flex-wrap">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                                activeCategory === cat
                                    ? 'bg-white text-black'
                                    : 'border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
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
                        <p>Статей в цій категорії поки немає</p>
                    </div>
                )}

            </div>
            <Footer />
        </main>
    );
}