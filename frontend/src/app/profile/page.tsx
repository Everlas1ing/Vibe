'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

interface Post {
    id: number;
    title: string;
    description: string;
    image?: string;
    tags: string[];
    created_at: string;
}

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            api.get(`/posts/user/${user.id}`)
                .then(res => setPosts(res.data))
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [user, authLoading]);

    const handleDeletePost = async (postId: number) => {
        try {
            await api.delete(`/posts/${postId}`);
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (error) {
            console.error(error);
        }
    };

    if (authLoading) return null;

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">

                <div className="flex items-center gap-6 mb-16">
                    <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                        {user?.avatar
                            ? <img src={user.avatar} className="w-20 h-20 rounded-full object-cover" />
                            : user?.username[0].toUpperCase()
                        }
                    </div>
                    <div className="flex-1">
                        <h1 className="text-white text-3xl font-bold">{user?.username}</h1>
                        <p className="text-zinc-500 text-sm mt-1">{user?.email}</p>
                        {user?.bio && (
                            <p className="text-zinc-400 text-sm mt-2">{user.bio}</p>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/saved"
                            className="border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 px-4 py-2 rounded-lg text-sm transition"
                        >
                            Збережені
                        </Link>
                        <Link
                            href="/create-post"
                            className="bg-white text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-zinc-200 transition"
                        >
                            + Новий пост
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-white text-2xl font-bold">Мої пости</h2>
                        <span className="text-zinc-600 text-sm">{posts.length} постів</span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-zinc-900 rounded-2xl h-56 animate-pulse" />
                            ))}
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map(post => (
                                <div
                                    key={post.id}
                                    className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition"
                                >
                                    {post.image && (
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h3 className="text-white font-semibold mb-2">{post.title}</h3>
                                        {post.description && (
                                            <p className="text-zinc-500 text-sm line-clamp-2 mb-3">
                                                {post.description}
                                            </p>
                                        )}
                                        {post.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full"
                                                    >
                            #{tag}
                          </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
  <span className="text-zinc-600 text-xs">
    {new Date(post.created_at).toLocaleDateString('uk-UA')}
  </span>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/edit-post/${post.id}`}
                                                    className="text-zinc-500 hover:text-white text-xs border border-zinc-800 hover:border-zinc-600 px-3 py-1 rounded-full transition"
                                                >
                                                    Змінити
                                                </Link>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="text-zinc-600 hover:text-red-400 text-xs border border-zinc-800 hover:border-red-900 px-3 py-1 rounded-full transition"
                                                >
                                                    Видалити
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-zinc-600">
                            <p className="text-5xl mb-4">✦</p>
                            <p className="mb-4">Постів поки немає</p>
                            <Link
                                href="/create-post"
                                className="text-white text-sm underline"
                            >
                                Створити перший пост
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}