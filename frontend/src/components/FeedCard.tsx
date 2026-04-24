'use client';

import Link from 'next/link';

export interface FeedItem {
    id: number;
    type: 'article' | 'collection' | 'trend' | 'post';
    title: string;
    slug?: string | null;
    excerpt?: string | null;
    cover_image?: string | null;
    author_name?: string | null;
    category?: string | null;
    tags?: string[] | null;
    created_at: string;
}

const TYPE_LABEL: Record<string, string> = {
    article: 'СТАТТЯ',
    collection: 'КОЛЕКЦІЯ',
    trend: 'ТРЕНД',
    post: 'ПОСТ',
};

function getHref(item: FeedItem): string {
    if (item.type === 'article' && item.slug)    return `/articles/${item.slug}`;
    if (item.type === 'collection' && item.slug) return `/collections/${item.slug}`;
    if (item.type === 'trend' && item.slug)      return `/trends/${item.slug}`;
    if (item.type === 'post')                    return `/posts/${item.id}`;
    return `/`;
}

export function FeedCardHero({ item }: { item: FeedItem }) {
    return (
        <Link href={getHref(item)}>
            <div className="group cursor-pointer">
                <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: '3/2' }}>
                    {item.cover_image
                        ? <img src={item.cover_image} alt={item.title}
                               className="w-full h-full object-cover group-hover:scale-103 transition duration-700" />
                        : <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 text-6xl">✦</div>
                    }
                </div>
                <div className="pt-4">
                    <p className="text-zinc-500 text-[10px] font-semibold tracking-[0.2em] mb-2">
                        {item.category?.toUpperCase() || TYPE_LABEL[item.type]}
                    </p>
                    <h2 className="text-white text-2xl font-bold leading-snug mb-3 group-hover:text-zinc-300 transition">
                        {item.title}
                    </h2>
                    {item.excerpt && (
                        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-3">
                            {item.excerpt}
                        </p>
                    )}
                    {item.author_name && (
                        <p className="text-zinc-600 text-[11px] tracking-widest uppercase">
                            By {item.author_name}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

export function FeedCardVertical({ item }: { item: FeedItem }) {
    return (
        <Link href={getHref(item)}>
            <div className="group cursor-pointer">
                <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: '4/5' }}>
                    {item.cover_image
                        ? <img src={item.cover_image} alt={item.title}
                               className="w-full h-full object-cover group-hover:scale-103 transition duration-700" />
                        : <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 text-4xl">✦</div>
                    }
                </div>
                <div className="pt-3">
                    <p className="text-zinc-500 text-[10px] font-semibold tracking-[0.2em] mb-1.5">
                        {item.category?.toUpperCase() || TYPE_LABEL[item.type]}
                    </p>
                    <h3 className="text-white text-base font-bold leading-snug mb-2 group-hover:text-zinc-300 transition line-clamp-3">
                        {item.title}
                    </h3>
                    {item.author_name && (
                        <p className="text-zinc-600 text-[10px] tracking-widest uppercase">
                            By {item.author_name}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

export function FeedCardHorizontal({ item }: { item: FeedItem }) {
    return (
        <Link href={getHref(item)}>
            <div className="group flex gap-4 cursor-pointer py-4 border-b border-zinc-800 last:border-0">
                <div className="flex-1 min-w-0">
                    <p className="text-zinc-500 text-[10px] font-semibold tracking-[0.2em] mb-1.5">
                        {item.category?.toUpperCase() || TYPE_LABEL[item.type]}
                    </p>
                    <h4 className="text-white text-sm font-bold leading-snug mb-1.5 group-hover:text-zinc-300 transition line-clamp-2">
                        {item.title}
                    </h4>
                    {item.author_name && (
                        <p className="text-zinc-600 text-[10px] tracking-widest uppercase">
                            By {item.author_name}
                        </p>
                    )}
                </div>
                <div className="flex-shrink-0 overflow-hidden bg-zinc-900" style={{ width: 80, height: 80 }}>
                    {item.cover_image
                        ? <img src={item.cover_image} alt={item.title}
                               className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        : <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xl">✦</div>
                    }
                </div>
            </div>
        </Link>
    );
}

export function FeedCardSquare({ item }: { item: FeedItem }) {
    return (
        <Link href={getHref(item)}>
            <div className="group cursor-pointer">
                <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: '1/1' }}>
                    {item.cover_image
                        ? <img src={item.cover_image} alt={item.title}
                               className="w-full h-full object-cover group-hover:scale-103 transition duration-700" />
                        : <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 text-4xl">✦</div>
                    }
                </div>
                <div className="pt-3">
                    <p className="text-zinc-500 text-[10px] font-semibold tracking-[0.2em] mb-1.5">
                        {item.category?.toUpperCase() || TYPE_LABEL[item.type]}
                    </p>
                    <h3 className="text-white text-sm font-bold leading-snug group-hover:text-zinc-300 transition line-clamp-2">
                        {item.title}
                    </h3>
                    {item.author_name && (
                        <p className="text-zinc-600 text-[10px] tracking-widest uppercase mt-1.5">
                            By {item.author_name}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}