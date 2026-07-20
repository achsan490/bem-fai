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
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors duration-200 mb-8 group cursor-pointer font-sans bg-transparent border-none outline-none"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Berita & Artikel</span>
        </button>

        {loading ? (
          <div className="py-32 flex flex-col items-center gap-4 text-center">
            <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-sans tracking-widest uppercase">Memuat Isi Artikel...</p>
          </div>
        ) : error || !article ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] max-w-md mx-auto flex flex-col items-center gap-4 mt-12">
            <AlertCircle size={40} className="text-red-400 animate-bounce" />
            <h3 className="font-display font-semibold text-lg text-slate-800">Terjadi Kesalahan</h3>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              {error || "Artikel yang Anda cari tidak tersedia."}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-[#6c4391] transition-colors cursor-pointer"
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
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/25 bg-primary/5">
                  <Tag size={10} />
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
                  <Calendar size={12} />
                  {formatDate(article.created_at)}
                </span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-5xl text-slate-800 leading-tight">
                {article.title}
              </h1>
            </div>

            {/* Large Cover Image */}
            {article.image_url && (
              <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-slate-100 shadow-xl bg-slate-50 group">
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
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
              <div className="prose max-w-none prose-sm sm:prose-base font-sans text-slate-600 leading-relaxed space-y-6">
                <ReactMarkdown
                  components={{
                    h2: ({ ...props }) => <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-850 border-l-4 border-primary pl-3 mt-8 mb-4" {...props} />,
                    h3: ({ ...props }) => <h3 className="font-display font-bold text-lg text-slate-800 mt-6 mb-3" {...props} />,
                    p: ({ ...props }) => <p className="mb-4 leading-relaxed font-sans text-slate-600" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-600 font-sans" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-slate-600 font-sans" {...props} />,
                    li: ({ ...props }) => <li className="pl-1" {...props} />,
                    blockquote: ({ ...props }) => (
                      <blockquote className="border-l-4 border-primary bg-primary/5 px-6 py-4 rounded-r-xl my-6 text-xs sm:text-sm text-slate-600 italic font-sans" {...props} />
                    ),
                    strong: ({ ...props }) => <strong className="text-slate-800 font-semibold" {...props} />,
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
