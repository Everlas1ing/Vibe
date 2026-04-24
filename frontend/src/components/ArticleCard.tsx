import Link from 'next/link';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string;
    category_name?: string;
    author: string;
    published_at: string;
}

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <Link href={`/articles/${article.slug}`}>
            <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition cursor-pointer">

                <div className="aspect-video bg-zinc-800 overflow-hidden">
                    {article.cover_image ? (
                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-4xl">
                            ✦
                        </div>
                    )}
                </div>

                <div className="p-5">
                    {article.category_name && (
                        <span className="text-xs text-zinc-500 uppercase tracking-widest">
              {article.category_name}
            </span>
                    )}
                    <h3 className="text-white font-semibold text-lg mt-1 mb-2 group-hover:text-zinc-300 transition line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-zinc-600">
                        <span>{article.author}</span>
                        <span>{new Date(article.published_at).toLocaleDateString('uk-UA')}</span>
                    </div>
                </div>

            </div>
        </Link>
    );
}