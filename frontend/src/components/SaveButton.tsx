'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function SaveButton({ articleId }: { articleId: number }) {
    const { user } = useAuth();
    const router = useRouter();
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        api.get('/saved')
            .then(res => {
                const isSaved = res.data.some((a: any) => a.id === articleId);
                setSaved(isSaved);
            })
            .catch(console.error);
    }, [user, articleId]);

    const handleToggle = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        setLoading(true);
        try {
            const res = await api.post(`/saved/${articleId}`);
            setSaved(res.data.saved);
        }  catch (error) {
        console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition ${
                saved
                    ? 'bg-white text-black border-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
            }`}
        >
            {saved ? '✦ Збережено' : '✧ Зберегти'}
        </button>
    );
}