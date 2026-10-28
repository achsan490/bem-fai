"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Tag, Search, ArrowUpRight } from "lucide-react";
import { db } from "../../lib/supabase";
import { Article } from "../../types/database.types";
import SponsorsSection from "../../components/SponsorsSection";

export default function NewsContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await db.getArticles();
        setArticles(data);
        setFilteredArticles(data);
      } catch (e) {
        console.error("Gagal memuat artikel:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = ["Semua", ...Array.from(new Set(articles.map((a) => a.category)))];

  useEffect(() => {
    let result = articles;
    if (selectedCategory !== "Semua") {
      result = result.filter((a) => a.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
      );
    }
    setFilteredArticles(result);
  }, [search, selectedCategory, articles]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="py-20">
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-300 border border-amber-400/30 bg-amber-400/10 mb-4 font-mono">
          <BookOpen size={12} className="text-amber-400" />
          Kabar &amp; Publikasi
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
          Berita &amp; <span className="text-amber-400">Kajian Mahasiswa</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
          Kumpulan rilis resmi, opini ilmiah, artikel dakwah, dan informasi seputar kegiatan civitas akademika FAI UNWAHA.
        </p>

        <div className="mt-8 max-w-md mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul atau topik artikel..."
            className="w-full bg-[#26030A]/90 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#A81B30] focus:ring-1 focus:ring-[#A81B30] shadow-xl backdrop-blur-md"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] text-white border border-white/20 shadow"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[#26030A]/60 border border-white/10 rounded-3xl p-6 h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-[#26030A]/50 rounded-3xl border border-white/10 max-w-xl mx-auto text-white/60 text-sm">
            Tidak ada artikel yang cocok dengan pencarian Anda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#26030A]/85 rounded-3xl border border-white/15 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:border-amber-500/30 group backdrop-blur-sm"
              >
                <div className="relative w-full h-52 overflow-hidden bg-black/40">
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-amber-400/60">
                      <BookOpen size={36} />
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30 bg-amber-400/10 font-mono">
                        <Tag size={10} />
                        {article.category}
                      </span>
                      <span className="text-[11px] text-white/50 flex items-center gap-1 font-mono">
                        <Calendar size={11} />
                        {formatDate(article.created_at)}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-xs text-white/70 mt-2.5 line-clamp-3 leading-relaxed font-light">
                      {article.content}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/article/${article.id}`}
                      className="text-xs font-bold tracking-wider uppercase text-amber-300 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>Baca Lengkap</span>
                      <ArrowUpRight size={14} className="text-amber-400" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <SponsorsSection />
    </div>
  );
}
