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
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db, isSupabaseConfigured, supabase } from "../../../lib/supabase";
import { Article, Program, Sponsor, KemenbirsanMember } from "../../../types/database.types";
import ConfirmDeleteModal from "../../../components/ArticleModal";

export default function AdminDashboard() {
  const router = useRouter();
  
  // Auth state
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"articles" | "programs" | "about" | "kemenbirsan" | "sponsors">("articles");

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

  // BEM Programs (Proker) state
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [programSearchQuery, setProgramSearchQuery] = useState("");

  // Program Form states
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [programDivision, setProgramDivision] = useState("Kaderisasi & PSDM");
  const [programTimeline, setProgramTimeline] = useState("");
  const [programStatus, setProgramStatus] = useState<Program["status"]>("Terencana");
  const [isEditProgramMode, setIsEditProgramMode] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);

  // Program deletion state
  const [isDeleteProgramModalOpen, setIsDeleteProgramModalOpen] = useState(false);
  const [deletingProgram, setDeletingProgram] = useState<Program | null>(null);
  const [isDeletingProgram, setIsDeletingProgram] = useState(false);

  // Dynamic Categories state
  const [categories, setCategories] = useState<string[]>([
    "Teknologi & Syariah",
    "Kajian Digital",
    "Kegiatan BEM",
    "Opini Mahasiswa",
  ]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // ── Site Content (About Page) ─────────────────────────────────
  const [aboutContent, setAboutContent] = useState({ visi: "", misi: "", deskripsi: "", filosofi_logo: "" });
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [savingAbout, setSavingAbout] = useState(false);

  // ── Sponsors ──────────────────────────────────────────────────
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loadingSponsors, setLoadingSponsors] = useState(true);
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorLogo, setSponsorLogo] = useState("");
  const [sponsorWebsite, setSponsorWebsite] = useState("");
  const [sponsorSortOrder, setSponsorSortOrder] = useState(0);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  // ── Kemenbirsan Members ───────────────────────────────────────
  const [members, setMembers] = useState<KemenbirsanMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("Presiden BEM");
  const [memberPhoto, setMemberPhoto] = useState("");
  const [memberDesc, setMemberDesc] = useState("");
  const [memberSortOrder, setMemberSortOrder] = useState(0);
  const [editingMember, setEditingMember] = useState<KemenbirsanMember | null>(null);

  // Scan database articles for any custom categories and add them to selector
  useEffect(() => {
    if (articles.length > 0) {
      const uniqueCats = Array.from(new Set(articles.map((a) => a.category)));
      setCategories((prev) => {
        const combined = [...prev];
        uniqueCats.forEach((cat) => {
          if (cat && !combined.includes(cat)) {
            combined.push(cat);
          }
        });
        return combined;
      });
    }
  }, [articles]);

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    if (!categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
    setCategory(trimmed);
    setIsAddingCategory(false);
    setNewCategoryName("");
  };
  
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
        
        // Fetch all data
        fetchArticlesData();
        fetchProgramsData();
        fetchAboutData();
        fetchSponsorsData();
        fetchMembersData();
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

  async function fetchProgramsData() {
    try {
      setLoadingPrograms(true);
      const data = await db.getPrograms();
      setPrograms(data);
    } catch (err) {
      console.error("Error loading programs:", err);
    } finally {
      setLoadingPrograms(false);
    }
  }

  async function fetchAboutData() {
    try {
      setLoadingAbout(true);
      const items = await db.getSiteContent();
      const map: Record<string, string> = {};
      items.forEach((item) => { map[item.key] = item.value; });
      setAboutContent({ visi: map.visi || "", misi: map.misi || "", deskripsi: map.deskripsi || "", filosofi_logo: map.filosofi_logo || "" });
    } catch (err) {
      console.error("Error loading about content:", err);
    } finally {
      setLoadingAbout(false);
    }
  }

  async function fetchSponsorsData() {
    try {
      setLoadingSponsors(true);
      const data = await db.getSponsors();
      setSponsors(data);
    } catch (err) {
      console.error("Error loading sponsors:", err);
    } finally {
      setLoadingSponsors(false);
    }
  }

  async function fetchMembersData() {
    try {
      setLoadingMembers(true);
      const data = await db.getMembers();
      setMembers(data);
    } catch (err) {
      console.error("Error loading members:", err);
    } finally {
      setLoadingMembers(false);
    }
  }

  // ── About Content Handlers ────────────────────────────────────
  const handleSaveAbout = async () => {
    try {
      setSavingAbout(true);
      setFormError(null);
      await Promise.all([
        db.updateSiteContent("visi", aboutContent.visi),
        db.updateSiteContent("misi", aboutContent.misi),
        db.updateSiteContent("deskripsi", aboutContent.deskripsi),
        db.updateSiteContent("filosofi_logo", aboutContent.filosofi_logo),
      ]);
      setSuccessMsg("Konten halaman About berhasil disimpan.");
    } catch (err: any) {
      setFormError(err?.message || "Gagal menyimpan konten.");
    } finally {
      setSavingAbout(false);
    }
  };

  // ── Sponsor Handlers ──────────────────────────────────────────
  const resetSponsorForm = () => { setSponsorName(""); setSponsorLogo(""); setSponsorWebsite(""); setSponsorSortOrder(0); setEditingSponsor(null); };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName.trim()) { setFormError("Nama sponsor wajib diisi."); return; }
    try {
      setSubmitting(true);
      setFormError(null);
      const payload = { name: sponsorName, logo_url: sponsorLogo || null, website_url: sponsorWebsite || null, sort_order: sponsorSortOrder };
      if (editingSponsor) {
        await db.updateSponsor(editingSponsor.id, payload);
        setSuccessMsg("Sponsor berhasil diperbarui.");
      } else {
        await db.createSponsor(payload);
        setSuccessMsg("Sponsor baru berhasil ditambahkan.");
      }
      resetSponsorForm();
      fetchSponsorsData();
    } catch (err: any) {
      setFormError(err?.message || "Gagal menyimpan sponsor.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSponsor = (s: Sponsor) => { setEditingSponsor(s); setSponsorName(s.name); setSponsorLogo(s.logo_url || ""); setSponsorWebsite(s.website_url || ""); setSponsorSortOrder(s.sort_order); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleDeleteSponsor = async (id: string) => {
    if (!confirm("Hapus sponsor ini?")) return;
    try { await db.deleteSponsor(id); setSuccessMsg("Sponsor dihapus."); fetchSponsorsData(); }
    catch (err: any) { setFormError(err?.message || "Gagal menghapus sponsor."); }
  };

  // ── Kemenbirsan Member Handlers ───────────────────────────────
  const resetMemberForm = () => { setMemberName(""); setMemberRole("Presiden BEM"); setMemberPhoto(""); setMemberDesc(""); setMemberSortOrder(0); setEditingMember(null); };

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberRole.trim()) { setFormError("Nama dan jabatan wajib diisi."); return; }
    try {
      setSubmitting(true);
      setFormError(null);
      const payload = { name: memberName, role: memberRole, photo_url: memberPhoto || null, description: memberDesc || null, sort_order: memberSortOrder };
      if (editingMember) {
        await db.updateMember(editingMember.id, payload);
        setSuccessMsg("Data anggota berhasil diperbarui.");
      } else {
        await db.createMember(payload);
        setSuccessMsg("Anggota baru berhasil ditambahkan.");
      }
      resetMemberForm();
      fetchMembersData();
    } catch (err: any) {
      setFormError(err?.message || "Gagal menyimpan data anggota.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditMember = (m: KemenbirsanMember) => { setEditingMember(m); setMemberName(m.name); setMemberRole(m.role); setMemberPhoto(m.photo_url || ""); setMemberDesc(m.description || ""); setMemberSortOrder(m.sort_order); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Hapus data anggota ini?")) return;
    try { await db.deleteMember(id); setSuccessMsg("Anggota dihapus."); fetchMembersData(); }
    catch (err: any) { setFormError(err?.message || "Gagal menghapus anggota."); }
  };

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

  const handleMemberPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setFormError(null);

      if (!file.type.startsWith("image/")) {
        throw new Error("File yang dipilih harus berupa gambar.");
      }
      if (isSupabaseConfigured && supabase) {
        const fileExt = file.name.split(".").pop();
        const fileName = `member-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("article-covers")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Gagal mengunggah ke Supabase: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("article-covers")
          .getPublicUrl(filePath);

        setMemberPhoto(publicUrl);
        setSuccessMsg("Foto pimpinan berhasil diunggah.");
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMemberPhoto(reader.result as string);
          setSuccessMsg("Foto pimpinan berhasil dimuat.");
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error("Member photo upload error:", err);
      setFormError(err.message || "Gagal memproses foto pimpinan.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSponsorLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setFormError(null);

      if (!file.type.startsWith("image/")) {
        throw new Error("File yang dipilih harus berupa gambar.");
      }
      if (isSupabaseConfigured && supabase) {
        const fileExt = file.name.split(".").pop();
        const fileName = `sponsor-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("article-covers")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Gagal mengunggah ke Supabase: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("article-covers")
          .getPublicUrl(filePath);

        setSponsorLogo(publicUrl);
        setSuccessMsg("Logo sponsor berhasil diunggah.");
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSponsorLogo(reader.result as string);
          setSuccessMsg("Logo sponsor berhasil dimuat.");
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error("Sponsor logo upload error:", err);
      setFormError(err.message || "Gagal memproses logo sponsor.");
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

  const resetProgramForm = () => {
    setProgramName("");
    setProgramDescription("");
    setProgramDivision("Kaderisasi & PSDM");
    setProgramTimeline("");
    setProgramStatus("Terencana");
    setIsEditProgramMode(false);
    setEditingProgramId(null);
    setFormError(null);
  };

  const handleEditProgramClick = (program: Program) => {
    setIsEditProgramMode(true);
    setEditingProgramId(program.id);
    setProgramName(program.name);
    setProgramDescription(program.description);
    setProgramDivision(program.division);
    setProgramTimeline(program.target_timeline);
    setProgramStatus(program.status);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProgramClick = (program: Program) => {
    setDeletingProgram(program);
    setIsDeleteProgramModalOpen(true);
  };

  const confirmDeleteProgram = async () => {
    if (!deletingProgram) return;
    try {
      setIsDeletingProgram(true);
      await db.deleteProgram(deletingProgram.id);
      setSuccessMsg(`Program Kerja "${deletingProgram.name}" berhasil dihapus.`);
      setIsDeleteProgramModalOpen(false);
      setDeletingProgram(null);
      
      if (editingProgramId === deletingProgram.id) {
        resetProgramForm();
      }
      
      fetchProgramsData();
    } catch (err: any) {
      console.error("Error deleting program:", err);
      setFormError("Gagal menghapus program kerja.");
    } finally {
      setIsDeletingProgram(false);
    }
  };

  const handleProgramFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!programName || !programDivision || !programDescription || !programTimeline) {
      setFormError("Semua field program kerja wajib diisi.");
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);

      const programPayload = {
        name: programName,
        description: programDescription,
        division: programDivision,
        target_timeline: programTimeline,
        status: programStatus,
      };

      if (isEditProgramMode && editingProgramId) {
        await db.updateProgram(editingProgramId, programPayload);
        setSuccessMsg("Program Kerja berhasil diperbarui.");
      } else {
        await db.createProgram(programPayload);
        setSuccessMsg("Program Kerja baru berhasil diterbitkan.");
      }

      resetProgramForm();
      fetchProgramsData();
    } catch (err: any) {
      console.error("Program submit error:", err);
      setFormError(err?.message || "Terjadi kesalahan saat menyimpan program kerja.");
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

  // Filter programs by query
  const filteredPrograms = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
      p.division.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(programSearchQuery.toLowerCase())
  );

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F8FD]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  const PRESET_COVERS = [
    { url: "/assets/gedung1.png", label: "Gedung A" },
    { url: "/assets/gedung2.png", label: "Gedung B" },
    { url: "/assets/logo.jpg", label: "Logo BEM" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8FD] admin-dashboard">
      {/* Top Banner Navigation */}
      <header className="py-4 px-6 bg-[#100105]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold mr-4">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali</span>
            </Link>
            <div className="h-6 w-px bg-white/10 hidden sm:block mr-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-primary/20 bg-[#180208] flex items-center justify-center p-1">
                <Image src="/assets/logo.jpg" alt="Logo BEM FAI" width={30} height={30} className="object-contain" />
              </div>
              <div>
                <h1 className="font-display font-bold text-sm text-white">Dashboard Portal</h1>
                <p className="text-[9px] text-primary tracking-widest uppercase font-bold">BEM FAI 2026</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
              isSupabaseConfigured 
                ? "text-primary border-primary/20 bg-primary/5" 
                : "text-gold border-gold/20 bg-gold/5"
            }`}>
              {isSupabaseConfigured ? "Live Supabase Mode" : "Sandbox Mode"}
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-8">
        
        {/* Page title and description */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">Kelola Publikasi</h2>
            <p className="text-xs text-gray-400 mt-1">Kelola artikel ilmiah, kegiatan, dan opini mahasiswa Fakultas Agama Islam</p>
          </div>
        </div>

        {/* Dashboard Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Stat 1: Total Articles */}
          <div className="glass p-5 rounded-2xl border border-white/5 bg-[#180208]/20 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Total Artikel</p>
              <h3 className="text-3xl font-display font-bold text-white">{articles.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(185,28,28,0.15)]">
              <FileText size={20} />
            </div>
          </div>

          {/* Stat 2: Categories */}
          <div className="glass p-5 rounded-2xl border border-white/5 bg-[#180208]/20 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Kategori Terbit</p>
              <h3 className="text-3xl font-display font-bold text-white">
                {new Set(articles.map(a => a.category)).size}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(217,119,6,0.15)]">
              <Tag size={20} />
            </div>
          </div>

          {/* Stat 3: Sandbox/Live State */}
          <div className="glass p-5 rounded-2xl border border-white/5 bg-[#180208]/20 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Basis Data</p>
              <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5 mt-2">
                <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? "bg-emerald-500 animate-pulse" : "bg-gold"}`} />
                {isSupabaseConfigured ? "Supabase Cloud" : "Offline Sandbox"}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${
              isSupabaseConfigured 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                : "bg-gold/10 border-gold/20 text-gold shadow-[0_0_15px_rgba(217,119,6,0.1)]"
            }`}>
              <Database size={20} />
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-white/5 gap-2">
          <button
            onClick={() => {
              setActiveTab("articles");
              setFormError(null);
            }}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "articles"
                ? "border-primary text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Artikel & Berita
          </button>
          <button
            onClick={() => {
              setActiveTab("programs");
              setFormError(null);
            }}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "programs"
                ? "border-primary text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Program Kerja
          </button>
          <button
            onClick={() => { setActiveTab("about"); setFormError(null); }}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "about"
                ? "border-primary text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Tentang Kami
          </button>
          <button
            onClick={() => { setActiveTab("kemenbirsan"); setFormError(null); }}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "kemenbirsan"
                ? "border-primary text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Kemenbirsan
          </button>
          <button
            onClick={() => { setActiveTab("sponsors"); setFormError(null); }}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === "sponsors"
                ? "border-primary text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Sponsor
          </button>
        </div>

        {/* Dashboard Tab Panels */}
        {activeTab === "articles" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column (2/3 width) - Articles Table */}
            <section className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-lg text-white">Daftar Publikasi</h3>
                  <p className="text-xs text-gray-500">Gunakan kolom pencarian untuk memfilter artikel secara real-time</p>
                </div>
                
                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Cari judul atau kategori..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/5 bg-[#180208]/60 focus:bg-[#180208] focus:border-primary/50 focus:outline-none transition-all text-xs font-sans text-white focus:ring-1 focus:ring-primary/20 placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Action Feedback Banner */}
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

              {/* Table Card Wrapper */}
              <div className="glass rounded-2xl border border-white/5 overflow-hidden bg-[#100105]/40 backdrop-blur-md">
                {loadingArticles ? (
                  <div className="py-24 flex flex-col items-center gap-4 text-center">
                    <span className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500 font-sans uppercase tracking-widest">Memuat Artikel...</p>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="py-24 text-center flex flex-col items-center gap-4">
                    <BookOpen size={44} className="text-gray-700" />
                    <h4 className="font-display font-semibold text-sm text-gray-400">Tidak Ada Artikel Ditemukan</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-sm leading-relaxed">
                      {searchQuery ? "Sesuaikan kata kunci pencarian Anda." : "Platform kosong. Silakan buat artikel pertama melalui form editor."}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-[#180208]/40 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          <th className="py-4 px-6">Informasi Artikel</th>
                          <th className="py-4 px-6">Kategori</th>
                          <th className="py-4 px-6">Tanggal Terbit</th>
                          <th className="py-4 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs font-sans text-gray-300">
                        {filteredArticles.map((article) => (
                          <tr key={article.id} className="hover:bg-white/[0.02] transition-colors duration-200 group">
                            {/* Title & ID */}
                            <td className="py-4 px-6 max-w-xs md:max-w-sm">
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold text-white line-clamp-1 leading-tight group-hover:text-primary transition-colors">
                                  {article.title}
                                </span>
                                <span className="text-[10px] text-gray-500 line-clamp-1 font-mono">
                                  ID: {article.id}
                                </span>
                              </div>
                            </td>

                            {/* Category Badge */}
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-primary border border-primary/20 bg-primary/5 uppercase">
                                <Tag size={8} />
                                {article.category}
                              </span>
                            </td>

                            {/* Date Published */}
                            <td className="py-4 px-6 text-gray-400">
                              <span className="flex items-center gap-1.5 font-mono text-[10px]">
                                <Calendar size={10} className="text-gray-500" />
                                {new Date(article.created_at).toLocaleDateString("id-ID", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-2">
                                {/* Edit */}
                                <button
                                  onClick={() => handleEditClick(article)}
                                  title="Edit artikel"
                                  className="p-2 rounded-lg text-gold hover:text-white hover:bg-gold/25 border border-gold/20 bg-gold/5 transition-all cursor-pointer"
                                >
                                  <Edit size={12} />
                                </button>

                                {/* Delete */}
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

            {/* Right Column (1/3 width) - Editor Form */}
            <section className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl border border-white/5 bg-[#100105]/40 backdrop-blur-md sticky top-24">
                
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

                {/* Editor Form */}
                <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
                  {/* Title */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
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

                  {/* Category */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-bold text-gray-400 uppercase tracking-wider">
                        Kategori
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCategory(!isAddingCategory);
                          setNewCategoryName("");
                        }}
                        className="text-[10px] font-semibold text-primary hover:text-white hover:underline transition-all cursor-pointer flex items-center gap-1"
                      >
                        {isAddingCategory ? "Pilih Kategori" : "+ Tambah Kategori Baru"}
                      </button>
                    </div>

                    {isAddingCategory ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Masukkan nama kategori baru..."
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCategory();
                            }
                          }}
                          className="flex-1 px-3 py-2.5 rounded-xl border border-primary/30 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20 text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-glow text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Simpan
                        </button>
                      </div>
                    ) : (
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20 cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#070b13] text-white">
                            {cat}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Cover Select Grid & Upload */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Gambar Cover Artikel
                    </label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-2.5">
                        {PRESET_COVERS.map((preset) => {
                          const isSelected = imageUrl === preset.url;
                          return (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setImageUrl(preset.url)}
                              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 group cursor-pointer ${
                                isSelected
                                  ? "border-primary shadow-[0_0_12px_rgba(185,28,28,0.3)] scale-[1.03]"
                                  : "border-white/5 bg-[#070b13]/60 opacity-60 hover:opacity-100 hover:border-white/20"
                              }`}
                            >
                              <Image src={preset.url} alt={preset.label} fill className="object-cover group-hover:scale-105 transition-transform" />
                              <div className="absolute inset-0 bg-black/45 flex items-end p-1">
                                <span className="text-[8px] font-semibold text-white tracking-wide truncate w-full text-center">
                                  {preset.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}

                        {/* Custom Upload block */}
                        <label
                          className={`relative aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                            !PRESET_COVERS.some((p) => p.url === imageUrl) && imageUrl
                              ? "border-primary bg-primary/5 text-primary shadow-[0_0_12px_rgba(185,28,28,0.2)] scale-[1.03]"
                              : "border-white/10 bg-[#070b13]/60 text-gray-500 hover:border-white/30 hover:text-gray-300"
                          }`}
                        >
                          <Plus size={16} />
                          <span className="text-[8px] mt-1 font-semibold uppercase tracking-wider text-center">Kustom</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            disabled={uploadingImage}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Cover Preview */}
                      {imageUrl && (
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/5 bg-[#070b13]/80">
                          <Image
                            src={imageUrl}
                            alt="Preview cover"
                            fill
                            className="object-cover"
                            sizes="(max-width: 400px) 100vw, 400px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                          <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/70 border border-white/5 text-[9px] text-gray-400 font-mono">
                            {imageUrl.startsWith("data:") ? "Foto Kustom (Sandbox)" : "Gambar Preset"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
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

                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(185, 28, 28, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 mt-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-primary hover:bg-primary-glow transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(185, 28, 28, 0.2)]"
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
          </div>
        )}

        {activeTab === "programs" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column (2/3 width) - Programs Table */}
            <section className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-lg text-white">Daftar Program Kerja</h3>
                  <p className="text-xs text-gray-500">Kelola 5 program kerja utama BEM FAI untuk ditampilkan di halaman depan</p>
                </div>
                
                {/* Program Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Cari proker atau divisi..."
                    value={programSearchQuery}
                    onChange={(e) => setProgramSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/5 bg-[#180208]/60 focus:bg-[#180208] focus:border-primary/50 focus:outline-none transition-all text-xs font-sans text-white focus:ring-1 focus:ring-primary/20 placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Action Feedback Banner */}
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

              {/* Table Card Wrapper */}
              <div className="glass rounded-2xl border border-white/5 overflow-hidden bg-[#100105]/40 backdrop-blur-md">
                {loadingPrograms ? (
                  <div className="py-24 flex flex-col items-center gap-4 text-center">
                    <span className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500 font-sans uppercase tracking-widest">Memuat Proker...</p>
                  </div>
                ) : filteredPrograms.length === 0 ? (
                  <div className="py-24 text-center flex flex-col items-center gap-4">
                    <FileText size={44} className="text-gray-700" />
                    <h4 className="font-display font-semibold text-sm text-gray-400">Tidak Ada Program Kerja Ditemukan</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-sm leading-relaxed">
                      {programSearchQuery ? "Sesuaikan kata kunci pencarian Anda." : "Daftar kosong. Silakan buat program kerja baru lewat form editor."}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-[#180208]/40 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          <th className="py-4 px-6">Nama Program</th>
                          <th className="py-4 px-6">Divisi</th>
                          <th className="py-4 px-6">Target Timeline</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs font-sans text-gray-300">
                        {filteredPrograms.map((program) => (
                          <tr key={program.id} className="hover:bg-white/[0.02] transition-colors duration-200 group">
                            {/* Name & Desc Preview */}
                            <td className="py-4 px-6 max-w-xs">
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold text-white line-clamp-1 leading-tight group-hover:text-primary transition-colors">
                                  {program.name}
                                </span>
                                <span className="text-[10px] text-gray-500 line-clamp-1">
                                  {program.description}
                                </span>
                              </div>
                            </td>

                            {/* Division */}
                            <td className="py-4 px-6">
                              <span className="text-gray-300 font-medium">{program.division}</span>
                            </td>

                            {/* Timeline */}
                            <td className="py-4 px-6 text-gray-400">
                              <span className="font-mono text-[10px]">{program.target_timeline}</span>
                            </td>

                            {/* Status */}
                            <td className="py-4 px-6">
                              {program.status === "Selesai" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-emerald-400 border border-emerald-500/20 bg-emerald-500/5">
                                  Selesai
                                </span>
                              ) : program.status === "Berjalan" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-400 border border-amber-500/20 bg-amber-500/5">
                                  Berjalan
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-gray-400 border border-white/5 bg-white/5">
                                  Terencana
                                </span>
                              )}
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-2">
                                {/* Edit */}
                                <button
                                  onClick={() => handleEditProgramClick(program)}
                                  title="Edit program"
                                  className="p-2 rounded-lg text-gold hover:text-white hover:bg-gold/25 border border-gold/20 bg-gold/5 transition-all cursor-pointer"
                                >
                                  <Edit size={12} />
                                </button>

                                {/* Delete */}
                                <button
                                  onClick={() => handleDeleteProgramClick(program)}
                                  title="Hapus program"
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

            {/* Right Column (1/3 width) - Program Editor Form */}
            <section className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl border border-white/5 bg-[#100105]/40 backdrop-blur-md sticky top-24">
                
                {/* Form Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles size={14} className="text-primary animate-pulse" />
                    <span>{isEditProgramMode ? "Ubah Program Kerja" : "Terbitkan Proker Baru"}</span>
                  </h3>
                  
                  {isEditProgramMode && (
                    <button
                      onClick={resetProgramForm}
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

                {/* Editor Form */}
                <form onSubmit={handleProgramFormSubmit} className="space-y-5 text-xs">
                  {/* Name */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Nama Program Kerja
                    </label>
                    <input
                      type="text"
                      placeholder="Nama program kerja..."
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20"
                      required
                    />
                  </div>

                  {/* Division */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Divisi Penyelenggara
                    </label>
                    <select
                      value={programDivision}
                      onChange={(e) => setProgramDivision(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="Kaderisasi & PSDM" className="bg-[#070b13] text-white">Kaderisasi & PSDM</option>
                      <option value="Kajian Keagamaan" className="bg-[#070b13] text-white">Kajian Keagamaan</option>
                      <option value="Pengabdian Masyarakat" className="bg-[#070b13] text-white">Pengabdian Masyarakat</option>
                      <option value="Minat & Bakat (Olahraga)" className="bg-[#070b13] text-white">Minat & Bakat (Olahraga)</option>
                      <option value="Komunikasi & Media" className="bg-[#070b13] text-white">Komunikasi & Media</option>
                    </select>
                  </div>

                  {/* Target Timeline */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Target Pelaksanaan (Timeline)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Triwulan I, Agustus 2026, Bulanan"
                      value={programTimeline}
                      onChange={(e) => setProgramTimeline(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20"
                      required
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Status Pelaksanaan
                    </label>
                    <select
                      value={programStatus}
                      onChange={(e) => setProgramStatus(e.target.value as Program["status"])}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="Terencana" className="bg-[#070b13] text-white">Terencana</option>
                      <option value="Berjalan" className="bg-[#070b13] text-white">Berjalan</option>
                      <option value="Selesai" className="bg-[#070b13] text-white">Selesai</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Deskripsi Ringkas Program
                    </label>
                    <textarea
                      placeholder="Jelaskan secara ringkas mengenai tujuan dan bentuk program kerja ini..."
                      value={programDescription}
                      onChange={(e) => setProgramDescription(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all font-sans text-white focus:ring-1 focus:ring-primary/20 resize-y"
                      required
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(185, 28, 28, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 mt-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-primary hover:bg-primary-glow transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0 0 10px_rgba(185, 28, 28, 0.2)]"
                  >
                    {submitting ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Plus size={12} />
                        <span>{isEditProgramMode ? "Simpan Perubahan" : "Terbitkan Sekarang"}</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </section>
          </div>
        )}

        {/* ── TAB: Tentang Kami (Site Content) ── */}
        {activeTab === "about" && (
          <div className="space-y-8">
            <div>
              <h3 className="font-display font-semibold text-lg text-white">Konten Halaman Tentang</h3>
              <p className="text-xs text-gray-500 mt-1">Edit visi, misi, deskripsi fakultas, dan filosofi logo. Perubahan akan tampil di halaman /about</p>
            </div>
            {loadingAbout ? (
              <div className="py-12 text-center"><span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin inline-block" /></div>
            ) : (
              <div className="space-y-6">
                {([
                  { key: "visi", label: "Visi Organisasi", rows: 3 },
                  { key: "misi", label: "Misi Organisasi (gunakan angka + titik + enter untuk list)", rows: 7 },
                  { key: "deskripsi", label: "Deskripsi Fakultas", rows: 5 },
                  { key: "filosofi_logo", label: "Filosofi Logo", rows: 4 },
                ] as const).map(({ key, label, rows }) => (
                  <div key={key} className="glass rounded-2xl border border-white/5 p-6 space-y-3">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">{label}</label>
                    <textarea
                      rows={rows}
                      value={aboutContent[key as keyof typeof aboutContent]}
                      onChange={(e) => setAboutContent((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-all duration-200 font-sans resize-none"
                    />
                  </div>
                ))}
                <button
                  onClick={handleSaveAbout}
                  disabled={savingAbout}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-glow transition-all cursor-pointer disabled:opacity-60"
                >
                  {savingAbout ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle2 size={14} />}
                  Simpan Semua Perubahan
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: Kemenbirsan ── */}
        {activeTab === "kemenbirsan" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* List */}
            <section className="lg:col-span-2 flex flex-col gap-4">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Daftar Pimpinan BEM</h3>
                <p className="text-xs text-gray-500 mt-1">Presiden, Wakil Presiden, dan pengurus inti Kemenbirsan</p>
              </div>
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                {loadingMembers ? (
                  <div className="py-12 text-center"><span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin inline-block" /></div>
                ) : members.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-sm">Belum ada data. Tambahkan via form.</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-[#180208]/40 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        <th className="py-4 px-6">Nama & Jabatan</th>
                        <th className="py-4 px-6">Urutan</th>
                        <th className="py-4 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs font-sans text-gray-300">
                      {members.map((m) => (
                        <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6">
                            <p className="font-semibold text-white text-sm">{m.name}</p>
                            <p className="text-primary text-[10px] uppercase tracking-wider mt-0.5">{m.role}</p>
                            {m.description && <p className="text-gray-500 text-[10px] mt-1 max-w-xs line-clamp-1">{m.description}</p>}
                          </td>
                          <td className="py-4 px-6 text-gray-400">{m.sort_order}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => handleEditMember(m)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"><Edit size={13} /></button>
                              <button onClick={() => handleDeleteMember(m.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
            {/* Form */}
            <section className="flex flex-col gap-4">
              <div className="glass p-6 rounded-2xl border border-primary/10 space-y-4">
                <h4 className="font-display font-semibold text-base text-white">{editingMember ? "Edit Anggota" : "Tambah Anggota Baru"}</h4>
                <form onSubmit={handleMemberSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                    <input value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="e.g. Muhammad Fauzan" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Jabatan</label>
                    <select value={memberRole} onChange={(e) => setMemberRole(e.target.value)} className="w-full bg-[#180208] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all">
                      <option>Presiden BEM</option>
                      <option>Wakil Presiden BEM</option>
                      <option>Sekretaris Umum</option>
                      <option>Bendahara Umum</option>
                      <option>Ketua Divisi</option>
                      <option value={memberRole}>{memberRole}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Foto Anggota</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMemberPhotoChange}
                        className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      />
                      {memberPhoto && (
                        <div className="relative w-24 h-28 rounded-xl overflow-hidden border border-white/10 bg-[#070b13]/60">
                          <Image src={memberPhoto} alt="Foto preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deskripsi Singkat</label>
                    <textarea rows={3} value={memberDesc} onChange={(e) => setMemberDesc(e.target.value)} placeholder="Prodi, angkatan, minat..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Urutan Tampil</label>
                    <input type="number" value={memberSortOrder} onChange={(e) => setMemberSortOrder(parseInt(e.target.value) || 0)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-glow transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2">
                      {submitting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={12} />}
                      {editingMember ? "Simpan" : "Tambah"}
                    </button>
                    {editingMember && <button type="button" onClick={resetMemberForm} className="px-4 py-3 rounded-xl border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer">Batal</button>}
                  </div>
                </form>
              </div>
            </section>
          </div>
        )}

        {/* ── TAB: Sponsor ── */}
        {activeTab === "sponsors" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* List */}
            <section className="lg:col-span-2 flex flex-col gap-4">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Daftar Sponsor & Mitra</h3>
                <p className="text-xs text-gray-500 mt-1">Ditampilkan di bagian bawah halaman Beranda</p>
              </div>
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                {loadingSponsors ? (
                  <div className="py-12 text-center"><span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin inline-block" /></div>
                ) : sponsors.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-sm">Belum ada sponsor. Tambahkan via form.</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-[#180208]/40 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        <th className="py-4 px-6">Nama Sponsor</th>
                        <th className="py-4 px-6">Website</th>
                        <th className="py-4 px-6">Urutan</th>
                        <th className="py-4 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs font-sans text-gray-300">
                      {sponsors.map((s) => (
                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6">
                            <p className="font-semibold text-white">{s.name}</p>
                            {s.logo_url && <p className="text-gray-500 text-[10px] mt-0.5 truncate max-w-[200px]">{s.logo_url}</p>}
                          </td>
                          <td className="py-4 px-6 text-gray-400">{s.website_url || "—"}</td>
                          <td className="py-4 px-6 text-gray-400">{s.sort_order}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => handleEditSponsor(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"><Edit size={13} /></button>
                              <button onClick={() => handleDeleteSponsor(s.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
            {/* Form */}
            <section className="flex flex-col gap-4">
              <div className="glass p-6 rounded-2xl border border-primary/10 space-y-4">
                <h4 className="font-display font-semibold text-base text-white">{editingSponsor ? "Edit Sponsor" : "Tambah Sponsor Baru"}</h4>
                <form onSubmit={handleSponsorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nama Sponsor</label>
                    <input value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} placeholder="e.g. UNWAHA Jombang" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Logo Sponsor</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSponsorLogoChange}
                        className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      />
                      {sponsorLogo && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-[#070b13]/60 flex items-center justify-center p-1">
                          <Image src={sponsorLogo} alt="Logo preview" fill className="object-contain p-1" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Website (opsional)</label>
                    <input value={sponsorWebsite} onChange={(e) => setSponsorWebsite(e.target.value)} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Urutan Tampil</label>
                    <input type="number" value={sponsorSortOrder} onChange={(e) => setSponsorSortOrder(parseInt(e.target.value) || 0)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={submitting} className="flex-1 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-glow transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2">
                      {submitting ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={12} />}
                      {editingSponsor ? "Simpan" : "Tambah"}
                    </button>
                    {editingSponsor && <button type="button" onClick={resetSponsorForm} className="px-4 py-3 rounded-xl border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer">Batal</button>}
                  </div>
                </form>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal for Articles */}
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

      {/* Delete Confirmation Modal for Programs */}
      <ConfirmDeleteModal
        isOpen={isDeleteProgramModalOpen}
        onClose={() => {
          setIsDeleteProgramModalOpen(false);
          setDeletingProgram(null);
        }}
        onConfirm={confirmDeleteProgram}
        title="Konfirmasi Penghapusan Program Kerja"
        articleTitle={deletingProgram?.name}
        isDeleting={isDeletingProgram}
      />
    </div>
  );
}
