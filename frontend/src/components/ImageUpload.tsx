'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface Props {
    value: string;
    onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
    const [uploading, setUploading] = useState(false);
    const [tab, setTab] = useState<'url' | 'file'>('url');

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            const res = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onChange(res.data.url);
        } catch {
            alert('Помилка завантаження');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="flex gap-2 mb-3">
                <button
                    type="button"
                    onClick={() => setTab('url')}
                    className={`px-4 py-1.5 rounded-full text-xs transition ${
                        tab === 'url'
                            ? 'bg-white text-black'
                            : 'border border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                >
                    З інтернету
                </button>
                <button
                    type="button"
                    onClick={() => setTab('file')}
                    className={`px-4 py-1.5 rounded-full text-xs transition ${
                        tab === 'file'
                            ? 'bg-white text-black'
                            : 'border border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                >
                    З комп'ютера
                </button>
            </div>

            {tab === 'url' ? (
                <input
                    type="url"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white transition placeholder-zinc-600"
                />
            ) : (
                <label className="block w-full border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center cursor-pointer hover:border-zinc-500 transition">
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFile}
                        className="hidden"
                    />
                    {uploading ? (
                        <p className="text-zinc-400 text-sm">Завантаження...</p>
                    ) : (
                        <>
                            <p className="text-3xl mb-2">📷</p>
                            <p className="text-zinc-400 text-sm">Клікни або перетягни фото</p>
                            <p className="text-zinc-600 text-xs mt-1">JPG, PNG, WEBP до 5MB</p>
                        </>
                    )}
                </label>
            )}

            {value && (
                <div className="mt-3 aspect-video rounded-xl overflow-hidden bg-zinc-800 relative">
                    <img src={value} alt="preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-black transition"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}