"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { db } from "../../../lib/supabase";
import { Article } from "../../../types/database.types";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      if (!id) return;
      try {
        setLoading(true);
        const articlesList = await db.getArticles();
        const found = articlesList.find((a) => a.id === id);
        
        if (found) {
          setArticle(found);
        } else {
          setError("Artikel tidak ditemukan.");
        }
      } catch (err: any) {
        console.error("Error loading article:", err);
        setError("Gagal memuat detail artikel.");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8FD]">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-24 max-w-4xl w-full mx-auto px-6 relative z-10">
        {/* Background ambient glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Back Link */}
        <button
          onClick={() => router.push("/news")}
          className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-amber-400 transition-colors duration-200 mb-8 group cursor-pointer font-sans bg-transparent border-none outline-none"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Berita & Artikel</span>
        </button>

        {loading ? (
          <div className="py-32 flex flex-col items-center gap-4 text-center">
            <span className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-sans tracking-widest uppercase">Memuat Isi Artikel...</p>
          </div>
        ) : error || !article ? (
          <div className="bg-[#26040A]/90 p-12 rounded-3xl text-center border border-white/15 shadow-2xl max-w-md mx-auto flex flex-col items-center gap-4 mt-12">
            <AlertCircle size={40} className="text-red-400 animate-bounce" />
            <h3 className="font-display font-semibold text-lg text-white">Terjadi Kesalahan</h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {error || "Artikel yang Anda cari tidak tersedia."}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30 bg-amber-400/10">
                  <Tag size={10} />
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                  <Calendar size={12} />
                  {formatDate(article.created_at)}
                </span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight">
                {article.title}
              </h1>
            </div>

            {/* Large Cover Image */}
            {article.image_url && (
              <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-black/40 group">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}

            {/* Content Body */}
            <div className="bg-[#26040A]/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl">
              <div className="prose max-w-none prose-sm sm:prose-base font-sans text-slate-200 leading-relaxed space-y-6">
                <ReactMarkdown
                  components={{
                    h2: ({ ...props }) => <h2 className="font-display font-bold text-xl sm:text-2xl text-white border-l-4 border-amber-400 pl-3 mt-8 mb-4" {...props} />,
                    h3: ({ ...props }) => <h3 className="font-display font-bold text-lg text-white mt-6 mb-3" {...props} />,
                    p: ({ ...props }) => <p className="mb-4 leading-relaxed font-sans text-slate-200" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-200 font-sans" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-slate-200 font-sans" {...props} />,
                    li: ({ ...props }) => <li className="leading-relaxed text-slate-200 font-sans" {...props} />,
                    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-amber-400/50 italic pl-4 py-1 text-slate-300 bg-white/5 rounded-r-xl my-4" {...props} />,
                    strong: ({ ...props }) => <strong className="font-bold text-white" {...props} />,
                    a: ({ ...props }) => <a className="text-amber-400 underline hover:text-amber-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </motion.article>
        )}
      </main>

      <Footer />
    </div>
  );
}
