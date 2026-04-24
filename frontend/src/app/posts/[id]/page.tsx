'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function PostPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        api.get(`/posts/${id}`)
            .then(res => setPost(res.data))
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Видалити пост?')) return;
        try {
            await api.delete(`/posts/${id}`);
            router.push('/profile');
        } catch {
            alert('Помилка видалення');
        }
    };

    if (loading) return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 pt-28 space-y-4">
                <div className="h-8 bg-zinc-900 rounded animate-pulse w-1/2" />
                <div className="h-6 bg-zinc-900 rounded animate-pulse w-1/3" />
                <div className="h-72 bg-zinc-900 rounded-2xl animate-pulse mt-6" />
            </div>
        </main>
    );

    if (notFound) return (
        <main className="min-h-screen bg-black flex items-center justify-center">
            <Navbar />
            <div className="text-center">
                <p className="text-zinc-600 text-sm mb-4">Пост не знайдено</p>
                <button onClick={() => router.push('/')}
                        className="text-white text-sm border border-zinc-700 px-6 py-2 rounded-full hover:border-zinc-500 transition">
                    На головну
                </button>
            </div>
        </main>
    );

    const isOwner = user && user.id === post.user_id;

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">

                <button
                    onClick={() => router.back()}
                    className="text-zinc-500 hover:text-white text-sm mb-10 transition flex items-center gap-2"
                >
                    ← Назад
                </button>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
                            {post.avatar
                                ? <img src={post.avatar} className="w-full h-full object-cover" />
                                : post.username[0].toUpperCase()
                            }
                        </div>
                        <div>
                            <p className="text-white text-sm font-semibold">{post.username}</p>
                            <p className="text-zinc-600 text-xs">
                                {new Date(post.created_at).toLocaleDateString('uk-UA')}
                            </p>
                        </div>
                    </div>

                    {isOwner && (
                        <div className="flex items-center gap-2">
                            <Link href={`/edit-post/${post.id}`}
                                  className="border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 px-4 py-1.5 text-xs rounded-full transition">
                                Редагувати
                            </Link>
                            <button onClick={handleDelete}
                                    className="border border-red-900 text-red-500 hover:bg-red-500/10 px-4 py-1.5 text-xs rounded-full transition">
                                Видалити
                            </button>
                        </div>
                    )}
                </div>

                <h1 className="text-white text-3xl font-bold leading-tight mb-4">
                    {post.title}
                </h1>

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag: string) => (
                            <span key={tag}
                                  className="text-xs text-zinc-400 border border-zinc-700 px-3 py-1 rounded-full">
                #{tag}
              </span>
                        ))}
                    </div>
                )}

                {post.image && (
                    <div className="flex justify-center mb-6">
                        <div className="rounded-2xl overflow-hidden max-w-md w-full">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                )}

                {post.description && (
                    <p className="text-zinc-400 text-base leading-relaxed whitespace-pre-line">
                        {post.description}
                    </p>
                )}

                {!user && (
                    <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
                        <p className="text-zinc-600 text-sm mb-4">Хочеш публікувати свої пости?</p>
                        <div className="flex items-center justify-center gap-3">
                            <Link href="/register"
                                  className="bg-white text-black text-sm font-semibold px-6 py-2 rounded-full hover:bg-zinc-200 transition">
                                Зареєструватись
                            </Link>
                            <Link href="/login"
                                  className="border border-zinc-700 text-zinc-400 text-sm px-6 py-2 rounded-full hover:border-zinc-500 hover:text-white transition">
                                Увійти
                            </Link>
                        </div>
                    </div>
                )}

                {isOwner && (
                    <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
                        <Link href="/profile"
                              className="text-zinc-500 hover:text-white text-sm transition">
                            Всі мої пости →
                        </Link>
                    </div>
                )}

            </div>
        </main>
    );
}