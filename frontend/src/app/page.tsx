'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import NewsFeed from '@/components/NewsFeed';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
      <main className="min-h-screen bg-black">
        <Navbar />

        <section className="pt-16 min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-zinc-500 text-sm tracking-widest uppercase mb-6">
              Fashion Media Portal
            </p>
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight mb-6">
              VIBE
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Твій простір для моди, стилю та культури. Будь в темі.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                  href="/articles"
                  className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-zinc-200 transition"
              >
                Читати статті
              </Link>
              <Link
                  href="/trends"
                  className="border border-zinc-700 text-white px-8 py-3 rounded-full hover:border-zinc-500 transition"
              >
                Тренди
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 animate-bounce text-xl">
            ↓
          </div>

        </section>

        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
                Все в одному місці
              </p>
              <h2 className="text-white text-4xl font-bold">Стрічка</h2>
            </div>
          </div>
          <NewsFeed />
        </section>

        <Footer />
      </main>
  );
}