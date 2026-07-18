"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Edit,
  LogOut,
  FileText,
  Calendar,
  Tag,
  Search,
  BookOpen,
  ArrowLeft,
  Settings,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db, isSupabaseConfigured, supabase } from "../../../lib/supabase";
import { Article } from "../../../types/database.types";
import ConfirmDeleteModal from "../../../components/ArticleModal";

export default function AdminDashboard() {
  const router = useRouter();
  
  // Auth state
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Articles state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Teknologi & Syariah");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("/assets/gedung1.png");
  
  // Action Feedback states
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Deletion Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check auth and fetch articles
  useEffect(() => {
    async function initDashboard() {
      try {
        setCheckingAuth(true);
        const auth = await db.checkSession();
        if (!auth) {
          router.push("/admin/login");
          return;
        }
        setAuthenticated(true);
        setCheckingAuth(false);
        
        // Fetch articles
        fetchArticlesData();
      } catch (err) {
        console.error("Dashboard init error:", err);
        router.push("/admin/login");
      }
    }
    initDashboard();
  }, [router]);

  async function fetchArticlesData() {
    try {
      setLoadingArticles(true);
      const data = await db.getArticles();
      setArticles(data);
    } catch (err) {
      console.error("Error loading articles:", err);
    } finally {
      setLoadingArticles(false);
    }
  }

  // Auto-dismiss notifications
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleSignOut = async () => {
    await db.logout();
    router.push("/admin/login");
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Teknologi & Syariah");
    setContent("");
    setImageUrl("/assets/gedung1.png");
    setIsEditMode(false);
    setEditingId(null);
    setFormError(null);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setFormError(null);

      // Verify file is an image
      if (!file.type.startsWith("image/")) {
        throw new Error("File yang dipilih harus berupa gambar.");
      }

      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("Ukuran gambar maksimal adalah 2MB.");
      }

      if (isSupabaseConfigured && supabase) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("article-covers")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Gagal mengunggah ke Supabase: ${uploadError.message}. Pastikan bucket 'article-covers' publik telah dibuat.`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("article-covers")
          .getPublicUrl(filePath);

        setImageUrl(publicUrl);
        setSuccessMsg("Foto cover berhasil diunggah ke Supabase Storage.");
      } else {
        // Fallback Base64 for sandbox mode
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
          setSuccessMsg("Foto cover berhasil dimuat ke sandbox lokal.");
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error("Image upload error:", err);
      setFormError(err.message || "Gagal memproses file foto.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEditClick = (article: Article) => {
    setIsEditMode(true);
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setContent(article.content);
    setImageUrl(article.image_url || "/assets/gedung1.png");
    setFormError(null);
    // Scroll form into view for mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (article: Article) => {
    setDeletingArticle(article);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingArticle) return;
    try {
      setIsDeleting(true);
      await db.deleteArticle(deletingArticle.id);
      setSuccessMsg(`Artikel "${deletingArticle.title}" berhasil dihapus.`);
      setIsDeleteModalOpen(false);
      setDeletingArticle(null);
      
      // If we are currently editing the deleted article, reset the form
      if (editingId === deletingArticle.id) {
        resetForm();
      }
      
      // Refresh articles list
      fetchArticlesData();
    } catch (err: any) {
      console.error("Error deleting article:", err);
      setFormError("Gagal menghapus artikel dari database.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content) {
      setFormError("Judul, Kategori, dan Konten artikel wajib diisi.");
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);

      const articlePayload = {
        title,
        category,
        content,
        image_url: imageUrl || null,
      };

      if (isEditMode && editingId) {
        await db.updateArticle(editingId, articlePayload);
        setSuccessMsg("Artikel berhasil diperbarui.");
      } else {
        await db.createArticle(articlePayload);
        setSuccessMsg("Artikel baru berhasil diterbitkan.");
      }

      resetForm();
      fetchArticlesData();
    } catch (err: any) {
      console.error("Submit error:", err);
      setFormError(err?.message || "Terjadi kesalahan saat menyimpan artikel.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter articles by query
  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#100105]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-400 font-sans tracking-widest uppercase">Memverifikasi Sesi Admin...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#100105]">
      {/* Top Banner Navigation */}
      <header className="py-4 px-6 bg-[#180208]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold mr-4">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali</span>
            </Link>
            <div className="h-6 w-px bg-white/10 hidden sm:block mr-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-primary/20 bg-background/50 flex items-center justify-center p-1">
                <Image src="/assets/logo.jpg" alt="Logo BEM FAI" width={30} height={30} className="object-contain" />
              </div>
              <div>
                <h1 className="font-display font-bold text-sm text-white">Dashboard Portal</h1>
                <p className="text-[9px] text-primary tracking-widest uppercase">BEM FAI 2026</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-primary border border-primary/20 bg-primary/5 uppercase tracking-wider">
              {isSupabaseConfigured ? "Live Supabase Mode" : "Sandbox Database"}
            </span>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-white border border-red-500/20 bg-red-500/5 hover:bg-red-600/90 hover:border-red-600 transition-all duration-300 cursor-pointer"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (2/3 width) - Articles Table */}
        <section className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-xl text-white">Publikasi Artikel</h2>
              <p className="text-xs text-gray-400 mt-1">Daftar artikel ilmiah dan kegiatan yang terbit di Landing Page</p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari judul atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/5 bg-[#180208]/80 focus:bg-[#180208] focus:border-primary/50 focus:outline-none transition-all text-xs font-sans text-white focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Success Banner */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs text-primary font-sans flex items-center gap-2.5"
              >
                <CheckCircle2 size={16} className="shrink-0 text-primary" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table Container */}
          <div className="glass rounded-2xl border border-white/5 overflow-hidden bg-[#180208]/35">
            {loadingArticles ? (
              <div className="py-20 flex flex-col items-center gap-4 text-center">
                <span className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-gray-500 font-sans uppercase">Memuat Artikel...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center gap-4">
                <BookOpen size={40} className="text-gray-600" />
                <h4 className="font-display font-semibold text-sm text-gray-400">Tidak Ada Artikel Ditemukan</h4>
                <p className="text-xs text-gray-500 font-sans">
                  {searchQuery ? "Sesuaikan kata kunci pencarian Anda." : "Platform kosong. Buat artikel baru menggunakan form di sebelah kanan."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-[#0b0f19]/60 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      <th className="py-4 px-6">Informasi Artikel</th>
                      <th className="py-4 px-6">Kategori</th>
                      <th className="py-4 px-6">Tanggal Terbit</th>
                      <th className="py-4 px-6 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-sans text-gray-300">
                    {filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-white/[0.02] transition-colors duration-200">
                        {/* Title Info */}
                        <td className="py-4 px-6 max-w-xs md:max-w-sm">
                          <div className="flex flex-col gap-1.5">
                            <span className="font-semibold text-white line-clamp-1 leading-tight group-hover:text-primary transition-colors">
                              {article.title}
                            </span>
                            <span className="text-[10px] text-gray-500 line-clamp-1 font-mono">
                              ID: {article.id}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-primary border border-primary/20 bg-primary/5 uppercase">
                            <Tag size={8} />
                            {article.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-gray-400">
                          <span className="flex items-center gap-1.5 font-mono text-[10px]">
                            <Calendar size={10} />
                            {new Date(article.created_at).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            {/* Edit Action Button */}
                            <button
                              onClick={() => handleEditClick(article)}
                              title="Edit artikel"
                              className="p-2 rounded-lg text-primary hover:text-white hover:bg-primary/25 border border-primary/20 bg-primary/5 transition-all cursor-pointer"
                            >
                              <Edit size={12} />
                            </button>

                            {/* Delete Action Button */}
                            <button
                              onClick={() => handleDeleteClick(article)}
                              title="Hapus artikel"
                              className="p-2 rounded-lg text-red-400 hover:text-white hover:bg-red-500/25 border border-red-500/20 bg-red-500/5 transition-all cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Right Column (1/3 width) - Edit/Create Form */}
        <section className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl border border-white/5 bg-[#180208]/35 sticky top-24">
            
            {/* Form Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Sparkles size={14} className="text-primary animate-pulse" />
                <span>{isEditMode ? "Ubah Artikel" : "Terbitkan Artikel"}</span>
              </h3>
              
              {isEditMode && (
                <button
                  onClick={resetForm}
                  className="text-[10px] font-semibold text-gray-400 hover:text-white hover:underline transition-all cursor-pointer"
                >
                  Batal Edit
                </button>
              )}
            </div>

            {/* Form Error Banner */}
            {formError && (
              <div className="mb-5 p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-[11px] text-red-400 font-sans flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form Input fields */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul artikel ilmiah..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20"
                >
                  <option value="Teknologi & Syariah">Teknologi & Syariah</option>
                  <option value="Kajian Digital">Kajian Digital</option>
                  <option value="Kegiatan BEM">Kegiatan BEM</option>
                  <option value="Opini Mahasiswa">Opini Mahasiswa</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Gambar Cover (Pilih Foto)
                </label>
                <div className="space-y-3">
                  {/* Preset Selection & Upload triggers */}
                  <div className="flex gap-2">
                    <select
                      value={["/assets/gedung1.png", "/assets/gedung2.png", "/assets/logo.jpg"].includes(imageUrl) ? imageUrl : "custom"}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val !== "custom") {
                          setImageUrl(val);
                        }
                      }}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20 text-xs cursor-pointer"
                    >
                      <option value="/assets/gedung1.png">Preset: Gedung FAI Utama</option>
                      <option value="/assets/gedung2.png">Preset: Auditorium & Plaza</option>
                      <option value="/assets/logo.jpg">Preset: Logo BEM FAI</option>
                      <option value="custom" disabled>-- Menggunakan Foto Kustom --</option>
                    </select>

                    <label className="px-4 py-2.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center cursor-pointer">
                      <span>{uploadingImage ? "Memuat..." : "Pilih Foto"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Thumbnail Preview Area */}
                  {imageUrl && (
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
                      <Image
                        src={imageUrl}
                        alt="Preview cover"
                        fill
                        className="object-cover"
                        sizes="(max-width: 320px) 100vw, 320px"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 border border-white/10 text-[9px] text-gray-300 font-mono">
                        {imageUrl.startsWith("data:") ? "Sandbox Base64 Image" : "Asset / URL Image"}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Isi Konten Artikel (Mendukung Markdown)
                </label>
                <textarea
                  placeholder="Tulis draf artikel di sini... Mendukung penulisan markdown sederhana."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20 resize-y"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 mt-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white bg-primary hover:bg-[#059669] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Plus size={12} />
                    <span>{isEditMode ? "Simpan Perubahan" : "Terbitkan Sekarang"}</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingArticle(null);
        }}
        onConfirm={confirmDelete}
        title="Konfirmasi Penghapusan Artikel"
        articleTitle={deletingArticle?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
