'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function EditPostPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) { router.push('/login'); return; }
        api.get(`/posts/${id}`)
            .then(res => {
                const post = res.data;
                if (post.user_id !== user?.id) { router.push('/'); return; }
                setTitle(post.title || '');
                setDescription(post.description || '');
                setImage(post.image || '');
                setTags(post.tags?.join(', ') || '');
            })
            .catch(() => router.push('/profile'))
            .finally(() => setLoading(false));
    }, [user, authLoading, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) { setError("Заголовок обов'язковий"); return; }
        setSaving(true);
        setError('');
        try {
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
            await api.put(`/posts/${id}`, { title, description, image, tags: tagsArray });
            router.push(`/posts/${id}`);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Помилка');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 pt-28">
                <div className="h-8 bg-zinc-900 rounded animate-pulse w-1/3 mb-8" />
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 bg-zinc-900 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        </main>
    );

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
                <div className="mb-10">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Редагування</p>
                    <h1 className="text-white text-4xl font-bold">Змінити пост</h1>
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
                                type="text" value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Опис</label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={4}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600 resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">
                                Теги <span className="text-zinc-600">(через кому)</span>
                            </label>
                            <input
                                type="text" value={tags}
                                onChange={e => setTags(e.target.value)}
                                placeholder="мінімалізм, осінь, streetwear"
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Фото</label>
                            <ImageUpload value={image} onChange={setImage} />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={saving}
                                    className="flex-1 bg-white text-black font-semibold rounded-lg py-3 text-sm hover:bg-zinc-200 transition disabled:opacity-50">
                                {saving ? 'Збереження...' : 'Зберегти зміни'}
                            </button>
                            <button type="button" onClick={() => router.back()}
                                    className="px-6 border border-zinc-700 text-zinc-400 rounded-lg text-sm hover:border-zinc-500 hover:text-white transition">
                                Скасувати
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}