'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';
import SaveButton from '@/components/SaveButton';
import CommentSection from '@/components/CommentSection';
import api from '@/lib/api';

export default function ArticlePage() {
    const { slug } = useParams();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        api.get(`/articles/${slug}`)
            .then(res => setArticle(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 pt-28">
                <div className="h-10 bg-zinc-900 rounded-xl animate-pulse mb-4 w-3/4" />
                <div className="h-6 bg-zinc-900 rounded-xl animate-pulse mb-2 w-1/2" />
                <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse mt-8" />
            </div>
        </main>
    );

    if (!article) return (
        <main className="min-h-screen bg-black flex items-center justify-center">
            <Navbar />
            <p className="text-zinc-500">Статтю не знайдено</p>
        </main>
    );

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">

                <button
                    onClick={() => router.back()}
                    className="text-zinc-500 hover:text-white text-sm mb-10 transition flex items-center gap-2"
                >
                    ← Назад
                </button>

                {article.category_name && (
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">
                        {article.category_name}
                    </p>
                )}

                <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
                    {article.title}
                </h1>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4 text-zinc-500 text-sm">
                        <span>{article.author}</span>
                        <span>·</span>
                        <span>{new Date(article.published_at).toLocaleDateString('uk-UA')}</span>
                    </div>
                    <SaveButton articleId={article.id} />
                </div>

                {article.cover_image && (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-10">
                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {article.excerpt && (
                    <p className="text-zinc-300 text-xl leading-relaxed border-l-2 border-zinc-700 pl-5 mb-8 italic">
                        {article.excerpt}
                    </p>
                )}

                <div className="text-zinc-400 text-base leading-loose whitespace-pre-line">
                    {article.content}
                </div>

                <div className="border-t border-zinc-800 mt-16" />

                <CommentSection articleId={article.id} />

            </article>
        </main>
    );
}