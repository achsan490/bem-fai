"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowUpRight, BookOpen, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "../lib/supabase";
import { Article } from "../types/database.types";

export default function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const data = await db.getArticles();
        setArticles(data);
      } catch (err: any) {
        console.error("Error fetching articles:", err);
        setError("Gagal memuat artikel.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Determine Bento grid sizing patterns for 3 columns on desktop
  const getBentoClasses = (index: number) => {
    switch (index % 4) {
      case 0:
        return "md:col-span-2 md:row-span-1 min-h-[280px] flex flex-col justify-between";
      case 1:
        return "md:col-span-1 md:row-span-2 min-h-[420px] md:min-h-full flex flex-col justify-between";
      case 2:
        return "md:col-span-1 md:row-span-1 min-h-[240px] flex flex-col justify-between";
      case 3:
        return "md:col-span-1 md:row-span-1 min-h-[240px] flex flex-col justify-between";
      default:
        return "md:col-span-1 md:row-span-1 flex flex-col justify-between";
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Safe snippet extractor
  const getSnippet = (content: string, length = 120) => {
    const plainText = content.replace(/[#*`_\[\]]/g, ""); // Strip markdown tags
    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length) + "...";
  };

  return (
    <section id="artikel" className="py-24 bg-[#180208] border-t border-white/5 relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-gold flex items-center gap-1.5 mb-2">
              <BookOpen size={12} className="text-gold" />
              Kabar & Jurnal Kampus
            </span>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white">
              Artikel & <span className="text-primary neon-text-maroon">Kajian Akademik</span>
            </h3>
            <p className="text-gray-400 font-sans text-sm md:text-base mt-3 leading-relaxed">
              Ikuti tulisan terkini dari dosen, pengurus BEM, dan kolega mahasiswa mengenai integrasi sains keislaman, wawasan kemahasiswaan, dan publikasi kajian ilmiah UNWAHA.
            </p>
          </div>
        </div>

        {/* Dynamic State Rendering */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="glass p-6 rounded-2xl animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded-md w-1/4" />
                  <div className="h-6 bg-white/5 rounded-md w-3/4" />
                  <div className="h-20 bg-white/5 rounded-md" />
                </div>
                <div className="h-3 bg-white/5 rounded-md w-1/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="glass p-12 rounded-2xl text-center border-red-500/20 max-w-lg mx-auto flex flex-col items-center gap-4">
            <AlertCircle size={40} className="text-red-400" />
            <h4 className="font-display font-semibold text-lg text-white">Gagal Memuat Data</h4>
            <p className="text-sm text-gray-400 font-sans">{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="glass p-16 rounded-2xl text-center max-w-xl mx-auto flex flex-col items-center gap-4">
            <BookOpen size={48} className="text-primary/40 animate-pulse" />
            <h4 className="font-display font-semibold text-lg text-white">Belum Ada Artikel</h4>
            <p className="text-sm text-gray-400 font-sans text-center">
              Belum ada artikel yang diterbitkan saat ini. Hubungi pengurus BEM FAI UNWAHA atau masuk ke Portal Administrasi di kaki halaman untuk mengelola artikel.
            </p>
          </div>
        ) : (
          /* Bento Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[280px]">
            {articles.map((article, index) => {
              const bentoClass = getBentoClasses(index);
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  whileHover={{
                    boxShadow: "0 0 30px rgba(185, 28, 28, 0.08)",
                    borderColor: "rgba(185, 28, 28, 0.3)",
                  }}
                  className={`glass p-6 rounded-2xl border border-white/5 bg-[#180208]/40 backdrop-blur-xl transition-all duration-300 relative group overflow-hidden ${bentoClass}`}
                >
                  {/* Futuristic cover photo background with gradient overlay */}
                  {article.image_url && (
                    <div className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-35 transition-all duration-700 pointer-events-none scale-100 group-hover:scale-105">
                      <Image
                        src={article.image_url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#180208] via-[#180208]/90 to-[#180208]/40" />
                    </div>
                  )}

                  {/* Subtle hover background highlight gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top metadata row */}
                  <div className="flex items-center justify-between z-10">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5">
                      <Tag size={10} />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                      <Calendar size={12} />
                      {formatDate(article.created_at)}
                    </span>
                  </div>

                  {/* Center Content Section */}
                  <div className="mt-4 flex-1 flex flex-col justify-center z-10">
                    <h4 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-400 font-sans leading-relaxed mt-3 line-clamp-3 md:line-clamp-4">
                      {getSnippet(article.content, index % 4 === 1 ? 250 : 120)}
                    </p>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 z-10">
                    <Link
                      href={`/article/${article.id}`}
                      className="text-xs font-semibold tracking-wider uppercase text-gray-300 hover:text-white flex items-center gap-1 transition-colors group-hover:gap-2 duration-300"
                    >
                      Selengkapnya
                      <ArrowUpRight size={14} className="text-primary" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
