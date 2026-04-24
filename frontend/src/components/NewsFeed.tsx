'use client';

import { useEffect, useState } from 'react';
import { FeedCardHero, FeedCardVertical, FeedCardHorizontal, FeedCardSquare, FeedItem } from './FeedCard';
import Link from 'next/link';
import api from '@/lib/api';

const FILTERS = [
    { key: 'all',        label: 'Все' },
    { key: 'article',    label: 'Статті' },
    { key: 'collection', label: 'Колекції' },
    { key: 'trend',      label: 'Тренди' },
    { key: 'post',       label: 'Пости' },
] as const;

function Divider() {
    return <div className="border-t border-zinc-800 my-10" />;
}

function ArticlesLayout({ items }: { items: FeedItem[] }) {
    if (!items.length) return <Empty />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map(item => (
                <Link key={`${item.type}-${item.id}`} href={`/articles/${item.slug}`}>
                    <div className="group cursor-pointer">

                        <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: '16/10' }}>
                            {item.cover_image ? (
                                <img src={item.cover_image} alt={item.title}
                                     className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-5xl">✦</div>
                            )}
                        </div>

                        <div className="pt-4">
                            <p className="text-zinc-500 text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
                                {item.category || 'Стаття'}
                            </p>
                            <h2 className="text-white text-xl font-bold leading-snug mb-2 group-hover:text-zinc-300 transition">
                                {item.title}
                            </h2>
                            {item.excerpt && (
                                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-3">
                                    {item.excerpt}
                                </p>
                            )}
                            <div className="flex items-center justify-between">
                                {item.author_name && (
                                    <p className="text-zinc-600 text-[10px] tracking-widest uppercase">
                                        By {item.author_name}
                                    </p>
                                )}
                                <p className="text-zinc-700 text-[10px]">
                                    {new Date(item.created_at).toLocaleDateString('uk-UA')}
                                </p>
                            </div>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    );
}

function CollectionsLayout({ items }: { items: FeedItem[] }) {
    if (!items.length) return <Empty />;

    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <Link key={`${item.type}-${item.id}`} href={`/collections/${item.slug}`}>
                    <div className="group flex gap-0 overflow-hidden cursor-pointer border border-zinc-800 hover:border-zinc-600 transition">
                        <div className="flex-shrink-0 overflow-hidden" style={{ width: 260, height: 160 }}>
                            {item.cover_image
                                ? <img src={item.cover_image} alt={item.title}
                                       className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                : <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 text-4xl">◈</div>
                            }
                        </div>

                        <div className="w-px bg-zinc-800" />

                        <div className="flex-1 flex flex-col justify-between p-6">
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    {item.category && (
                                        <span className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase">
                      {item.category}
                    </span>
                                    )}
                                    {item.author_name && (
                                        <span className="text-zinc-700 text-[10px] tracking-widest uppercase">
                      {item.author_name}
                    </span>
                                    )}
                                </div>
                                <h3 className="text-white text-xl font-bold leading-snug mb-2 group-hover:text-zinc-300 transition">
                                    {item.title}
                                </h3>
                                {item.excerpt && (
                                    <p className="text-zinc-600 text-sm line-clamp-2">{item.excerpt}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-zinc-700 text-[10px] tracking-widest uppercase">
                                    {new Date(item.created_at).toLocaleDateString('uk-UA')}
                                </p>
                                <span className="text-zinc-600 text-sm group-hover:text-white transition">→</span>
                            </div>
                        </div>

                        <div className="flex-shrink-0 w-14 border-l border-zinc-800 flex items-center justify-center">
              <span className="text-zinc-700 text-xs font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

function TrendsLayout({ items }: { items: FeedItem[] }) {
    if (!items.length) return <Empty />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map(item => (
                <Link key={`${item.type}-${item.id}`} href={`/trends/${item.slug}`}>
                    <div className="group cursor-pointer">

                        <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: '16/10' }}>
                            {item.cover_image ? (
                                <img src={item.cover_image} alt={item.title}
                                     className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-5xl">↑</div>
                            )}
                        </div>

                        <div className="pt-4">
                            <p className="text-zinc-500 text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
                                Тренд
                            </p>
                            <h2 className="text-white text-xl font-bold leading-snug mb-2 group-hover:text-zinc-300 transition">
                                {item.title}
                            </h2>
                            {item.excerpt && (
                                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-3">
                                    {item.excerpt}
                                </p>
                            )}
                            <div className="flex items-center justify-between">
                                {item.tags && item.tags.length > 0 && (
                                    <div className="flex gap-2">
                                        {item.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-zinc-600 text-[10px] tracking-widest">
                        #{tag}
                      </span>
                                        ))}
                                    </div>
                                )}
                                <p className="text-zinc-700 text-[10px]">
                                    {new Date(item.created_at).toLocaleDateString('uk-UA')}
                                </p>
                            </div>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    );
}

function PostsLayout({ items }: { items: FeedItem[] }) {
    if (!items.length) return <Empty />;

    return (
        <div className="max-w-md mx-auto flex flex-col gap-8">

            {items.map(item => (
                <Link key={`${item.type}-${item.id}`} href={`/posts/${item.id}`}>

                    <div className="flex flex-col items-center text-center cursor-pointer group">

                        <div className="w-40 h-40 rounded-xl overflow-hidden bg-zinc-900">
                            {item.cover_image ? (
                                <img
                                    src={item.cover_image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-zinc-700 text-2xl">◉</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-3 px-4">
                            <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                                {item.title}
                            </p>

                            {item.author_name && (
                                <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wide">
                                    {item.author_name}
                                </p>
                            )}

                            {item.tags && item.tags.length > 0 && (
                                <div className="flex gap-1 justify-center mt-2 flex-wrap">
                                    {item.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-zinc-600 text-[10px]">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                </Link>
            ))}

        </div>
    );
}

function Empty() {
    return (
        <div className="text-center py-24 text-zinc-700">
            <p className="text-4xl mb-3">✦</p>
            <p className="text-sm tracking-widest uppercase">Нічого поки немає</p>
        </div>
    );
}

export default function NewsFeed() {
    const [feed, setFeed] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<typeof FILTERS[number]['key']>('all');

    useEffect(() => {
        api.get('/feed')
            .then(res => setFeed(res.data))
            .catch(() => setError('Не вдалось завантажити стрічку'))
            .finally(() => setLoading(false));
    }, []);

    const items = filter === 'all' ? feed : feed.filter(i => i.type === filter);

    const hero      = items[0];
    const leftCol   = items.slice(1, 3);
    const rightList = items.slice(3, 7);
    const secondRow = items.slice(7, 11);
    const thirdHero = items[11];
    const thirdList = items.slice(12, 16);
    const rest      = items.slice(16);

    if (loading) return (
        <div className="space-y-10">
            <div className="flex gap-6 border-b border-zinc-800 pb-5">
                {FILTERS.map((_, i) => (
                    <div key={i} className="bg-zinc-900 animate-pulse h-4 rounded w-16" />
                ))}
            </div>
            <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                <div className="space-y-4">
                    <div className="bg-zinc-900 animate-pulse h-64" />
                    <div className="bg-zinc-900 animate-pulse h-64" />
                </div>
                <div className="bg-zinc-900 animate-pulse h-[540px]" />
                <div className="space-y-6">
                    {[...Array(4)].map((_, i) => <div key={i} className="bg-zinc-900 animate-pulse h-20" />)}
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="text-center py-20 text-zinc-600">
            <p className="text-red-400 text-sm">{error}</p>
        </div>
    );

    return (
        <div>
            <div className="flex items-center gap-0 mb-10 border-b border-zinc-800 flex-wrap">
                {FILTERS.map(f => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className="relative px-6 py-4 text-xs font-semibold tracking-[0.15em] uppercase group"
                    >
                        <span className={`
        transition-colors duration-300
        ${filter === f.key
                            ? 'text-white'
                            : 'text-zinc-600 group-hover:text-zinc-300'}
    `}>
        {f.label}
    </span>

                        <span
                            className={`
            absolute left-0 bottom-0 h-[2px] bg-white
            transition-all duration-300 ease-out
            ${filter === f.key
                                ? 'w-full'
                                : 'w-0 group-hover:w-full'}
        `}
                        />
                    </button>
                ))}
            </div>

            {filter === 'article' && (
                <ArticlesLayout items={items} />
            )}

            {filter === 'collection' && (
                <CollectionsLayout items={items} />
            )}

            {filter === 'trend' && (
                <TrendsLayout items={items} />
            )}

            {filter === 'post' && (
                <PostsLayout items={items} />
            )}

            {filter === 'all' && items.length > 0 && (
                <div className="grid gap-6" style={{ gridTemplateColumns: '280px 1fr 280px' }}>

                    <div>
                        {feed.filter(i => i.type === 'trend').length > 0 && (
                            <>
                                <p className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase mb-5 pb-3 border-b border-zinc-800">
                                    Тренди
                                </p>
                                {(() => {
                                    const trends = feed.filter(i => i.type === 'trend');
                                    const [first, ...rest] = trends;
                                    return (
                                        <div className="mb-8">
                                            <Link href={`/trends/${first.slug}`}>
                                                <div className="group cursor-pointer mb-4 pb-4 border-b border-zinc-800">
                                                    <div className="overflow-hidden bg-zinc-900 mb-3" style={{ aspectRatio: '4/5' }}>
                                                        {first.cover_image ? (
                                                            <img src={first.cover_image} alt={first.title}
                                                                 className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-3xl">↑</div>
                                                        )}
                                                    </div>
                                                    <p className="text-zinc-600 text-[9px] tracking-[0.2em] uppercase mb-1">Тренд</p>
                                                    <h4 className="text-white text-sm font-bold leading-snug group-hover:text-zinc-300 transition line-clamp-2">
                                                        {first.title}
                                                    </h4>
                                                    {first.tags && first.tags.length > 0 && (
                                                        <p className="text-zinc-700 text-[9px] mt-1">#{first.tags[0]}</p>
                                                    )}
                                                </div>
                                            </Link>

                                            {rest.map(item => (
                                                <Link key={item.id} href={`/trends/${item.slug}`}>
                                                    <div className="group flex gap-3 py-3 border-b border-zinc-800 cursor-pointer hover:bg-zinc-900/30 transition px-1 -mx-1">
                                                        <div className="flex-shrink-0 overflow-hidden bg-zinc-900" style={{ width: 60, height: 60 }}>
                                                            {item.cover_image ? (
                                                                <img src={item.cover_image} alt={item.title}
                                                                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-lg">↑</div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                            <p className="text-zinc-600 text-[9px] tracking-widest uppercase mb-0.5">Тренд</p>
                                                            <h5 className="text-white text-xs font-bold leading-snug group-hover:text-zinc-300 transition line-clamp-2">
                                                                {item.title}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </>
                        )}

                        {feed.filter(i => i.type === 'collection').length > 0 && (
                            <>
                                <p className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase mb-5 pb-3 border-b border-zinc-800">
                                    Колекції
                                </p>
                                {(() => {
                                    const cols = feed.filter(i => i.type === 'collection');
                                    const [first, ...rest] = cols;
                                    return (
                                        <div>
                                            <Link href={`/collections/${first.slug}`}>
                                                <div className="group cursor-pointer mb-4 pb-4 border-b border-zinc-800">
                                                    <div className="overflow-hidden bg-zinc-900 mb-3" style={{ aspectRatio: '4/5' }}>
                                                        {first.cover_image ? (
                                                            <img src={first.cover_image} alt={first.title}
                                                                 className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-3xl">◈</div>
                                                        )}
                                                    </div>
                                                    <p className="text-zinc-600 text-[9px] tracking-[0.2em] uppercase mb-1">
                                                        {first.category || 'Колекція'}
                                                    </p>
                                                    <h4 className="text-white text-sm font-bold leading-snug group-hover:text-zinc-300 transition line-clamp-2">
                                                        {first.title}
                                                    </h4>
                                                    {first.author_name && (
                                                        <p className="text-zinc-700 text-[9px] mt-1 uppercase tracking-widest">
                                                            By {first.author_name}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>

                                            {rest.map(item => (
                                                <Link key={item.id} href={`/collections/${item.slug}`}>
                                                    <div className="group flex gap-3 py-3 border-b border-zinc-800 cursor-pointer hover:bg-zinc-900/30 transition px-1 -mx-1">
                                                        <div className="flex-shrink-0 overflow-hidden bg-zinc-900" style={{ width: 60, height: 60 }}>
                                                            {item.cover_image ? (
                                                                <img src={item.cover_image} alt={item.title}
                                                                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-lg">◈</div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                            <p className="text-zinc-600 text-[9px] tracking-widest uppercase mb-0.5">
                                                                {item.category || 'Колекція'}
                                                            </p>
                                                            <h5 className="text-white text-xs font-bold leading-snug group-hover:text-zinc-300 transition line-clamp-2">
                                                                {item.title}
                                                            </h5>
                                                            {item.author_name && (
                                                                <p className="text-zinc-700 text-[9px] uppercase tracking-widest mt-0.5">
                                                                    By {item.author_name}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </>
                        )}
                    </div>

                    <div className="border-x border-zinc-800 px-8">
                        <p className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase mb-5 pb-3 border-b border-zinc-800">
                            Статті
                        </p>
                        {(() => {
                            const articles = feed.filter(i => i.type === 'article');
                            if (!articles.length) return (
                                <p className="text-zinc-700 text-xs text-center py-10">Немає статей</p>
                            );
                            return (
                                <div className="space-y-0">
                                    {articles.map(item => (
                                        <Link key={item.id} href={`/articles/${item.slug}`}>
                                            <div className="group cursor-pointer pb-8 mb-8 border-b border-zinc-800 last:border-0 last:mb-0">
                                                <div className="overflow-hidden bg-zinc-900 mb-4" style={{ aspectRatio: '3/2' }}>
                                                    {item.cover_image ? (
                                                        <img src={item.cover_image} alt={item.title}
                                                             className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-700 text-5xl">✦</div>
                                                    )}
                                                </div>
                                                <p className="text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-2">
                                                    {item.category || 'Стаття'}
                                                </p>
                                                <h2 className="text-white text-xl font-bold leading-tight mb-2 group-hover:text-zinc-300 transition">
                                                    {item.title}
                                                </h2>
                                                {item.excerpt && (
                                                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-3">
                                                        {item.excerpt}
                                                    </p>
                                                )}
                                                {item.author_name && (
                                                    <p className="text-zinc-600 text-[9px] tracking-widest uppercase">
                                                        By {item.author_name}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>

                    <div>
                        <p className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase mb-5 pb-3 border-b border-zinc-800">
                            Пости
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                            {feed.filter(i => i.type === 'post').slice(0, 9).map(item => (
                                <Link key={item.id} href={`/posts/${item.id}`}>
                                <div className="group relative cursor-pointer" style={{ aspectRatio: '1/1' }}>
                                        {item.cover_image ? (
                                            <img src={item.cover_image} alt={item.title}
                                                 className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                                <span className="text-zinc-700 text-sm">◉</span>
                                            </div>
                                        )}

                                    <p className="text-zinc-500 text-[9px] tracking-[0.2em] uppercase mt-3">
                                        {item.title}
                                    </p>


                                    </div>
                                </Link>
                            ))}
                            {feed.filter(i => i.type === 'post').length === 0 && (
                                <p className="text-zinc-700 text-[10px] text-center py-10 col-span-3">Немає постів</p>
                            )}
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}