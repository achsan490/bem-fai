"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowUpRight, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "../lib/supabase";
import { Article } from "../types/database.types";

interface Props {
  previewMode?: boolean;
}

const cardVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      delay: (index % 3) * 0.08,
      delayChildren: 0.15,
      staggerChildren: 0.07
    }
  })
};

const childVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const
    }
  }
};

export default function LatestArticles({ previewMode = false }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const data = await db.getArticles();
        setArticles(previewMode ? data.slice(0, 3) : data);
      } catch (err: any) {
        console.error("Error fetching articles:", err);
        setError("Gagal memuat artikel.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Safe snippet extractor
  const getSnippet = (content: string, length = 100) => {
    const plainText = content.replace(/[#*`_\[\]]/g, ""); // Strip markdown tags
    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length) + "...";
  };

  return (
    <section id="artikel" className="py-24 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Background Smooth Ambient Glow */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-b from-[#2B050D]/90 via-[#2B050D]/40 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 mb-2 font-mono">
              <BookOpen size={12} className="text-amber-400" />
              Kabar & Jurnal Kampus
            </span>
            <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Artikel & <span className="text-amber-400 font-black">Kajian Akademik</span>
            </h3>
            <p className="text-slate-200 font-sans text-sm md:text-base mt-3 leading-relaxed">
              Ikuti tulisan terkini dari dosen, pengurus BEM, dan kolega mahasiswa mengenai integrasi sains keislaman, wawasan kemahasiswaan, dan publikasi kajian ilmiah UNWAHA.
            </p>
          </div>
        </div>

        {/* Dynamic State Rendering */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[400px]">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-[#26040A]/85 border border-white/10 rounded-2xl animate-pulse flex flex-col justify-between overflow-hidden"
              >
                <div className="w-full h-48 bg-white/10 animate-pulse" />
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-white/10 rounded-md w-1/4" />
                    <div className="h-6 bg-white/10 rounded-md w-3/4" />
                    <div className="h-16 bg-white/10 rounded-md" />
                  </div>
                  <div className="h-3 bg-white/10 rounded-md w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-[#26040A]/90 p-12 rounded-2xl text-center border border-white/10 shadow-xl max-w-lg mx-auto flex flex-col items-center gap-4">
            <AlertCircle size={40} className="text-red-400" />
            <h4 className="font-display font-semibold text-lg text-white">Gagal Memuat Data</h4>
            <p className="text-sm text-slate-300 font-sans">{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-[#26040A]/90 p-16 rounded-2xl text-center max-w-xl mx-auto flex flex-col items-center gap-4 border border-white/10 shadow-xl">
            <BookOpen size={48} className="text-amber-400/60 animate-pulse" />
            <h4 className="font-display font-semibold text-lg text-white">Belum Ada Artikel</h4>
            <p className="text-sm text-slate-300 font-sans text-center">
              Belum ada artikel yang diterbitkan saat ini. Hubungi pengurus BEM FAI UNWAHA atau masuk ke Portal Administrasi di kaki halaman untuk mengelola artikel.
            </p>
          </div>
        ) : (
          /* Card Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => {
              return (
                <motion.article
                  key={article.id}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  whileHover={{
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    y: -4
                  }}
                  className="bg-[#26040A]/85 rounded-2xl border border-white/15 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl group"
                >
                  {/* Article Image Container */}
                  <motion.div variants={childVariants} className="relative w-full h-48 overflow-hidden bg-black/40">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5 text-amber-400/60">
                        <BookOpen size={32} />
                      </div>
                    )}
                  </motion.div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Metadata Row */}
                      <motion.div variants={childVariants} className="flex items-center justify-between mb-4">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30 bg-amber-400/10">
                          <Tag size={10} />
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-sans">
                          <Calendar size={11} />
                          {formatDate(article.created_at)}
                        </span>
                      </motion.div>

                      {/* Title & Excerpt */}
                      <motion.h4 variants={childVariants} className="font-display font-bold text-base md:text-lg text-white group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 leading-snug">
                        {article.title}
                      </motion.h4>
                      <motion.p variants={childVariants} className="text-xs text-slate-300 font-sans leading-relaxed mt-2.5 line-clamp-3">
                        {getSnippet(article.content, 120)}
                      </motion.p>
                    </div>

                    {/* Action Row */}
                    <motion.div variants={childVariants} className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <Link
                        href={`/article/${article.id}`}
                        className="text-[11px] font-bold tracking-wider uppercase text-slate-300 hover:text-amber-400 flex items-center gap-1 transition-colors group-hover:gap-2 duration-300"
                      >
                        Selengkapnya
                        <ArrowUpRight size={14} className="text-amber-400" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Preview mode — link to /news */}
        {previewMode && !loading && !error && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-amber-400/40 text-amber-300 bg-black/50 hover:bg-black/70 hover:text-amber-200 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xl backdrop-blur-md"
            >
              Lihat Semua Berita & Artikel
              <ArrowRight size={14} className="text-amber-400" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

