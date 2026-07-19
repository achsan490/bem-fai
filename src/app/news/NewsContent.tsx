"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, ArrowUpRight, BookOpen, Search, ChevronRight, AlertCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db } from "../../lib/supabase";
import { Article } from "../../types/database.types";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });

const getSnippet = (text: string, maxLen = 160) => {
  const plain = text.replace(/[#*`_[\]]/g, "");
  return plain.length <= maxLen ? plain : plain.substring(0, maxLen) + "…";
};

export default function NewsContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    db.getArticles()
      .then(setArticles)
      .catch(() => setError("Gagal memuat artikel."))
      .finally(() => setLoading(false));
  }, []);

  // Derive unique categories
  const categories = ["Semua", ...Array.from(new Set(articles.map((a) => a.category)))];

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "Semua" || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#180208]">
      <Navbar />

      <main className="flex-grow">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5 mb-3 font-mono"
            >
              <ChevronRight size={10} />
              Publikasi & Kajian
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-6xl text-white leading-tight max-w-3xl"
            >
              Berita &amp;{" "}
              <span className="text-primary neon-text-maroon">Artikel</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-sans text-base md:text-lg mt-4 max-w-2xl leading-relaxed"
            >
              Kumpulan tulisan, kajian akademik, dan berita terkini seputar kegiatan BEM FAI UNWAHA dan wawasan keislaman.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 max-w-lg relative"
            >
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/40 focus:bg-white/8 transition-all duration-200 font-sans"
              />
            </motion.div>
          </div>
        </section>

        {/* ── Articles Content ──────────────────────────────────── */}
        <section className="py-10 pb-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            {/* Category Filter Pills */}
            {!loading && articles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-primary/20 text-white border border-primary/40"
                        : "text-gray-400 border border-white/10 hover:border-primary/20 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* States */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass rounded-2xl border border-white/5 overflow-hidden animate-pulse">
                    <div className="h-48 bg-white/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-3 bg-white/5 rounded w-1/3" />
                      <div className="h-5 bg-white/5 rounded w-3/4" />
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/5 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                <p className="text-gray-400 font-sans">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <BookOpen size={56} className="text-primary/30 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {searchQuery || activeCategory !== "Semua" ? "Tidak ada artikel yang cocok" : "Belum Ada Artikel"}
                </h3>
                <p className="text-sm text-gray-500">
                  {searchQuery ? `Coba kata kunci lain.` : "Artikel akan ditampilkan di sini setelah diterbitkan."}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filtered.map((article, i) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="glass rounded-2xl border border-white/5 hover:border-primary/25 bg-[#180208]/40 backdrop-blur-xl transition-all duration-300 group overflow-hidden flex flex-col"
                    >
                      {/* Cover image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-[#070103] overflow-hidden">
                        {article.image_url ? (
                          <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <BookOpen size={40} className="text-primary/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#180208]/80 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Meta row */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5">
                            <Tag size={9} />
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-gray-500 font-sans">
                            <Calendar size={10} />
                            {formatDate(article.created_at)}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display font-bold text-white text-base leading-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h2>

                        {/* Snippet */}
                        <p className="text-xs text-gray-400 font-sans leading-relaxed flex-grow line-clamp-3">
                          {getSnippet(article.content)}
                        </p>

                        {/* CTA */}
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <Link
                            href={`/article/${article.id}`}
                            className="text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-primary flex items-center gap-1 transition-all duration-200 group/link"
                          >
                            Baca Selengkapnya
                            <ArrowUpRight size={12} className="text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
