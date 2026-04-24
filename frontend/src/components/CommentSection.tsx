'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Comment {
    id: number;
    content: string;
    username: string;
    avatar?: string;
    created_at: string;
    user_id: number;
}

export default function CommentSection({ articleId }: { articleId: number }) {
    const { user } = useAuth();
    const router = useRouter();
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get(`/comments/${articleId}`)
            .then(res => setComments(res.data))
            .catch(console.error);
    }, [articleId]);

    const handleSubmit = async () => {
        if (!user) { router.push('/login'); return; }
        if (!text.trim()) return;
        setLoading(true);
        try {
            const res = await api.post(`/comments/${articleId}`, { content: text });
            setComments(prev => [{ ...res.data, username: user.username, avatar: user.avatar }, ...prev]);
            setText('');
        } catch (error) {
        console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (commentId: number) => {
        try {
            await api.delete(`/comments/${commentId}`);
            setComments(prev => prev.filter(c => c.id !== commentId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-16">
            <h3 className="text-white text-2xl font-bold mb-8">
                Коментарі{' '}
                <span className="text-zinc-600 text-lg font-normal">({comments.length})</span>
            </h3>

            <div className="mb-10">
        <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={user ? 'Напиши коментар...' : 'Увійди щоб коментувати...'}
            disabled={!user}
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-600 transition placeholder-zinc-600 resize-none disabled:opacity-50"
        />
                <div className="flex justify-end mt-3">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !text.trim() || !user}
                        className="bg-white text-black text-sm font-semibold px-6 py-2 rounded-full hover:bg-zinc-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Надсилання...' : 'Надіслати'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {comments.length === 0 ? (
                    <div className="text-center py-10 text-zinc-600 text-sm">
                        Коментарів поки немає. Будь першим!
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {comment.avatar
                                    ? <img src={comment.avatar} className="w-9 h-9 rounded-full object-cover" />
                                    : comment.username[0].toUpperCase()
                                }
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-white text-sm font-semibold">{comment.username}</span>
                                        <span className="text-zinc-600 text-xs">
                      {new Date(comment.created_at).toLocaleDateString('uk-UA')}
                    </span>
                                    </div>
                                    {user?.id === comment.user_id && (
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="text-zinc-600 hover:text-red-400 text-xs transition"
                                        >
                                            Видалити
                                        </button>
                                    )}
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">{comment.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}