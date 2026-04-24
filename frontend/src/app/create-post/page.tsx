'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import ImageUpload from '@/components/ImageUpload';
import api from '@/lib/api';

export default function CreatePostPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!authLoading && !user) {
        router.push('/login');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) {
            setError('Заголовок обовязковий');
            return;
        }
        setLoading(true);
        try {
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
            await api.post('/posts', {
                title,
                description,
                image,
                tags: tagsArray,
            });
            router.push('/profile');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Щось пішло не так');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">

                <div className="mb-12">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Творчість</p>
                    <h1 className="text-white text-5xl font-bold">Новий пост</h1>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Заголовок *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Мій осінній лук 2026"
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Опис</label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Розкажи про свій образ..."
                                rows={4}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600 resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Фото</label>
                            <ImageUpload value={image} onChange={setImage} />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">
                                Теги{' '}
                                <span className="text-zinc-600">(через кому)</span>
                            </label>
                            <input
                                type="text"
                                value={tags}
                                onChange={e => setTags(e.target.value)}
                                placeholder="мінімалізм, осінь, streetwear"
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-white text-black font-semibold rounded-lg py-3 text-sm hover:bg-zinc-200 transition disabled:opacity-50"
                            >
                                {loading ? 'Публікація...' : 'Опублікувати'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 border border-zinc-700 text-zinc-400 rounded-lg text-sm hover:border-zinc-500 hover:text-white transition"
                            >
                                Скасувати
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}