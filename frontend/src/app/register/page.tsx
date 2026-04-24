'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirm) {
            setError('Паролі не співпадають');
            return;
        }
        if (password.length < 6) {
            setError('Пароль мінімум 6 символів');
            return;
        }

        setLoading(true);
        try {
            await register(username, email, password);
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Щось пішло не так');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-white tracking-widest uppercase">Vibe</h1>
                    <p className="text-zinc-500 mt-2 text-sm tracking-widest uppercase">Fashion Media Portal</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                    <h2 className="text-white text-2xl font-semibold mb-6">Створити акаунт</h2>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Нікнейм</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                placeholder="fashionista"
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Пароль</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm mb-2 block">Підтвердити пароль</label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-semibold rounded-lg py-3 text-sm hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Завантаження...' : 'Зареєструватись'}
                        </button>
                    </form>

                    <p className="text-zinc-500 text-sm text-center mt-6">
                        Вже є акаунт?{' '}
                        <Link href="/login" className="text-white hover:underline">
                            Увійти
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}