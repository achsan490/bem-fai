"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SponsorsSection from "../../../components/SponsorsSection";
import { db } from "../../../lib/supabase";
import { Article } from "../../../types/database.types";

export default function ArticleDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const allArticles = await db.getArticles();
        const found = allArticles.find((a) => a.id === id) || null;
        setArticle(found);
      } catch (e) {
        console.error("Gagal memuat artikel:", e);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/news"
              className="text-xs font-semibold text-white/70 hover:text-white transition flex items-center gap-1.5"
            >
              <ArrowLeft size={14} className="text-amber-400" />
              <span>Kembali ke Kabar &amp; Berita</span>
            </Link>
          </div>

          {loading ? (
            <div className="bg-[#26030A]/60 border border-white/10 rounded-3xl p-10 h-96 animate-pulse" />
          ) : !article ? (
            <div className="bg-[#26030A]/80 border border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-2xl">
              <BookOpen size={48} className="text-amber-400/50 mx-auto mb-4" />
              <h1 className="font-display font-bold text-xl text-white">Artikel Tidak Ditemukan</h1>
              <p className="text-xs text-white/60 mt-2 mb-6">
                Artikel yang Anda cari mungkin telah dihapus atau ID artikel tidak valid.
              </p>
              <Link
                href="/news"
                className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] text-white"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          ) : (
            <article className="bg-[#26030A]/85 border border-white/15 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
              {article.image_url && (
                <div className="relative w-full h-72 sm:h-96 bg-black/40">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30 bg-amber-400/10 font-mono">
                    <Tag size={12} />
                    {article.category}
                  </span>
                  <span className="text-xs text-white/60 flex items-center gap-1 font-mono">
                    <Calendar size={12} />
                    {formatDate(article.created_at)}
                  </span>
                </div>

                <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-6">
                  {article.title}
                </h1>

                <div className="prose prose-invert max-w-none text-white/80 font-light text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-white/10 whitespace-pre-line">
                  {article.content}
                </div>
              </div>
            </article>
          )}
        </div>

        <div className="mt-16">
          <SponsorsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
