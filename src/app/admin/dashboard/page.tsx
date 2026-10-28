"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  FileText,
  Calendar,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { db } from "../../../lib/supabase";
import {
  KemenbirsanMember,
  Article,
  Program,
  SiteContent,
} from "../../../types/database.types";

const ROLE_OPTIONS = [
  "Gubernur BEM",
  "Wakil Gubernur BEM",
  "Sekretaris Jenderal",
  "Wakil Sekretaris",
  "Bendahara Umum",
  "Wakil Bendahara",
  "Menteri Agama & Dakwah",
  "Menteri Kominfo & Siber",
  "Menteri PSDM",
  "Menteri Luar Negeri & Jaringan",
  "Anggota",
];

const DIVISION_OPTIONS = [
  "BPH",
  "Kementerian Agama & Dakwah",
  "Kementerian Kominfo & Siber",
  "Kementerian PSDM",
  "Kementerian Luar Negeri",
  "Lainnya",
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"members" | "articles" | "programs" | "content">("members");
  const [loading, setLoading] = useState(true);

  const [members, setMembers] = useState<KemenbirsanMember[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<KemenbirsanMember | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "Gubernur BEM",
    photo_url: "",
    description: "",
    sort_order: 1,
  });

  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programForm, setProgramForm] = useState<{
    name: string;
    description: string;
    division: string;
    target_timeline: string;
    status: Program["status"];
  }>({
    name: "",
    description: "",
    division: "BPH",
    target_timeline: "Semester Ganjil 2026",
    status: "Terencana",
  });

  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Pendidikan & Dakwah",
    content: "",
    image_url: "",
  });

  const [contentForm, setContentForm] = useState({
    visi: "",
    misi: "",
    deskripsi: "",
    filosofi_logo: "",
  });

  useEffect(() => {
    async function init() {
      const isAuth = await db.checkSession();
      if (!isAuth) {
        router.push("/admin/login");
        return;
      }
      await refreshAllData();
      setLoading(false);
    }
    init();
  }, [router]);

  const refreshAllData = async () => {
    try {
      const [m, a, p, c] = await Promise.all([
        db.getMembers(),
        db.getArticles(),
        db.getPrograms(),
        db.getSiteContent(),
      ]);
      setMembers(m);
      setArticles(a);
      setPrograms(p);
      setSiteContent(c);

      const v = c.find((x) => x.key === "visi")?.value || "";
      const mi = c.find((x) => x.key === "misi")?.value || "";
      const d = c.find((x) => x.key === "deskripsi")?.value || "";
      const f = c.find((x) => x.key === "filosofi_logo")?.value || "";
      setContentForm({ visi: v, misi: mi, deskripsi: d, filosofi_logo: f });
    } catch (e) {
      console.error("Gagal mengambil data:", e);
    }
  };

  const handleLogout = async () => {
    await db.logout();
    router.push("/admin/login");
  };

  const openMemberModal = (member?: KemenbirsanMember) => {
    if (member) {
      setEditingMember(member);
      setMemberForm({
        name: member.name,
        role: member.role,
        photo_url: member.photo_url || "",
        description: member.description || "",
        sort_order: member.sort_order,
      });
    } else {
      setEditingMember(null);
      setMemberForm({
        name: "",
        role: "Gubernur BEM",
        photo_url: "",
        description: "",
        sort_order: members.length + 1,
      });
    }
    setMemberModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await db.updateMember(editingMember.id, {
          name: memberForm.name,
          role: memberForm.role,
          photo_url: memberForm.photo_url || null,
          description: memberForm.description || null,
          sort_order: Number(memberForm.sort_order),
        });
      } else {
        await db.createMember({
          name: memberForm.name,
          role: memberForm.role,
          photo_url: memberForm.photo_url || null,
          description: memberForm.description || null,
          sort_order: Number(memberForm.sort_order),
        });
      }
      setMemberModalOpen(false);
      await refreshAllData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan data pengurus");
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus pengurus "${name}"?`)) {
      await db.deleteMember(id);
      await refreshAllData();
    }
  };

  const openProgramModal = (prog?: Program) => {
    if (prog) {
      setEditingProgram(prog);
      setProgramForm({
        name: prog.name,
        description: prog.description,
        division: prog.division,
        target_timeline: prog.target_timeline,
        status: prog.status,
      });
    } else {
      setEditingProgram(null);
      setProgramForm({
        name: "",
        description: "",
        division: "BPH",
        target_timeline: "Semester Ganjil 2026",
        status: "Terencana",
      });
    }
    setProgramModalOpen(true);
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProgram) {
        await db.updateProgram(editingProgram.id, programForm);
      } else {
        await db.createProgram(programForm);
      }
      setProgramModalOpen(false);
      await refreshAllData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan program");
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (confirm("Hapus program kerja ini?")) {
      await db.deleteProgram(id);
      await refreshAllData();
    }
  };

  const openArticleModal = (art?: Article) => {
    if (art) {
      setEditingArticle(art);
      setArticleForm({
        title: art.title,
        category: art.category,
        content: art.content,
        image_url: art.image_url || "",
      });
    } else {
      setEditingArticle(null);
      setArticleForm({
        title: "",
        category: "Pendidikan & Dakwah",
        content: "",
        image_url: "/assets/gedung1.webp",
      });
    }
    setArticleModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await db.updateArticle(editingArticle.id, {
          title: articleForm.title,
          category: articleForm.category,
          content: articleForm.content,
          image_url: articleForm.image_url || null,
        });
      } else {
        await db.createArticle({
          title: articleForm.title,
          category: articleForm.category,
          content: articleForm.content,
          image_url: articleForm.image_url || null,
        });
      }
      setArticleModalOpen(false);
      await refreshAllData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan artikel");
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm("Hapus artikel ini?")) {
      await db.deleteArticle(id);
      await refreshAllData();
    }
  };

  const handleSaveContent = async (key: string, val: string) => {
    try {
      await db.updateSiteContent(key, val);
      alert("Konten berhasil diperbarui!");
      await refreshAllData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan konten");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#180206] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#A81B30] border-t-amber-400 rounded-full animate-spin" />
          <p className="text-sm font-display text-white/80">Memuat Portal Administrasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#180206] text-[#FDF7F8] flex flex-col font-sans selection:bg-[#A81B30] selection:text-white">
      <div className="h-[3px] bg-gradient-to-r from-[#460511] via-[#A81B30] via-[#FF5533] to-[#A81B30] w-full sticky top-0 z-50" />

      <header className="bg-[#240309]/90 border-b border-white/10 backdrop-blur-md sticky top-[3px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6A0D18] to-[#3B0611] border border-white/20 flex items-center justify-center p-1.5 shadow-md">
              <Image src="/assets/logo.webp" alt="Logo BEM FAI" width={32} height={32} className="object-contain filter drop-shadow(0 0 3px rgba(255,255,255,0.4))" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-base sm:text-lg text-white leading-tight">
                  BEM <span className="text-amber-400 font-extrabold">FAI UNWAHA</span>
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#A81B30]/40 text-amber-300 border border-[#A81B30] px-2 py-0.5 rounded-full">
                  Portal Admin
                </span>
              </div>
              <p className="text-xs text-white/60">Sistem Manajemen Konten & Organisasi</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="text-xs font-medium text-white/80 hover:text-white px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1.5"
            >
              <ExternalLink size={14} className="text-amber-400" />
              <span>Lihat Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-red-200 hover:text-white px-3.5 py-2 rounded-xl bg-[#520613]/80 hover:bg-[#7F0E1E] border border-red-800/40 transition flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "members"
                ? "bg-gradient-to-r from-[#A81B30] to-[#6A0D18] text-white shadow-lg shadow-[#A81B30]/40 border border-white/20"
                : "bg-[#2E050D]/60 text-white/70 hover:text-white hover:bg-[#3B0611] border border-white/5"
            }`}
          >
            <Users size={16} className={activeTab === "members" ? "text-amber-300" : "text-white/60"} />
            <span>Pengurus (Kemenbirsan)</span>
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "articles"
                ? "bg-gradient-to-r from-[#A81B30] to-[#6A0D18] text-white shadow-lg shadow-[#A81B30]/40 border border-white/20"
                : "bg-[#2E050D]/60 text-white/70 hover:text-white hover:bg-[#3B0611] border border-white/5"
            }`}
          >
            <FileText size={16} className={activeTab === "articles" ? "text-amber-300" : "text-white/60"} />
            <span>Artikel & Berita</span>
          </button>
          <button
            onClick={() => setActiveTab("programs")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "programs"
                ? "bg-gradient-to-r from-[#A81B30] to-[#6A0D18] text-white shadow-lg shadow-[#A81B30]/40 border border-white/20"
                : "bg-[#2E050D]/60 text-white/70 hover:text-white hover:bg-[#3B0611] border border-white/5"
            }`}
          >
            <Calendar size={16} className={activeTab === "programs" ? "text-amber-300" : "text-white/60"} />
            <span>Program Kerja</span>
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "content"
                ? "bg-gradient-to-r from-[#A81B30] to-[#6A0D18] text-white shadow-lg shadow-[#A81B30]/40 border border-white/20"
                : "bg-[#2E050D]/60 text-white/70 hover:text-white hover:bg-[#3B0611] border border-white/5"
            }`}
          >
            <Settings size={16} className={activeTab === "content" ? "text-amber-300" : "text-white/60"} />
            <span>Informasi & Visi Misi</span>
          </button>
        </div>

        {activeTab === "members" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white tracking-wide">
                  Struktur Pengurus & Anggota BEM
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Kelola profil <b>Gubernur BEM</b>, <b>Wakil Gubernur BEM</b>, jajaran kementerian, dan anggota kabinet.
                </p>
              </div>
              <button
                onClick={() => openMemberModal()}
                className="bg-gradient-to-r from-[#A81B30] via-[#C4263E] to-[#8E1624] hover:brightness-110 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-lg shadow-[#A81B30]/30 border border-white/20 flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <Plus size={16} className="text-amber-300" />
                <span>Tambah Pengurus</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#26030A]/80 border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-all flex flex-col justify-between shadow-xl backdrop-blur-sm group"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-[#3B0611] border border-white/20 flex items-center justify-center font-bold text-xl text-amber-400 overflow-hidden shrink-0 shadow-md">
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-white text-sm sm:text-base truncate">
                          {member.name}
                        </h3>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {member.role}
                        </span>
                      </div>
                    </div>
                    {member.description && (
                      <p className="text-xs text-white/70 line-clamp-3 mb-4 leading-relaxed font-light">
                        {member.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-white/10 text-xs">
                    <span className="text-white/40 text-[11px] font-mono">Urutan #{member.sort_order}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openMemberModal(member)}
                        className="text-white/80 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1"
                      >
                        <Edit2 size={12} className="text-amber-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id, member.name)}
                        className="text-red-300 hover:text-white px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/80 border border-red-800/40 transition flex items-center gap-1"
                      >
                        <Trash2 size={12} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {members.length === 0 && (
              <div className="text-center py-16 text-white/50 text-sm bg-[#240309]/50 rounded-2xl border border-dashed border-white/10">
                Belum ada data pengurus yang tersimpan. Klik tombol "+ Tambah Pengurus" di atas untuk menambahkan.
              </div>
            )}
          </div>
        )}

        {activeTab === "articles" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white tracking-wide">Artikel & Berita</h2>
                <p className="text-xs text-white/60 mt-1">Kelola publikasi dakwah, kajian kontemporer, dan informasi fakultas.</p>
              </div>
              <button
                onClick={() => openArticleModal()}
                className="bg-gradient-to-r from-[#A81B30] via-[#C4263E] to-[#8E1624] hover:brightness-110 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-lg shadow-[#A81B30]/30 border border-white/20 flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <Plus size={16} className="text-amber-300" />
                <span>Tulis Artikel Baru</span>
              </button>
            </div>

            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-[#26030A]/80 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/20 transition shadow-lg"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                      {art.category}
                    </span>
                    <h3 className="font-display font-bold text-white text-base truncate mt-1">{art.title}</h3>
                    <p className="text-xs text-white/60 truncate mt-0.5 font-light">{art.content}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openArticleModal(art)}
                      className="text-xs text-white/80 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1"
                    >
                      <Edit2 size={12} className="text-amber-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="text-xs text-red-300 hover:text-white px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/80 border border-red-800/40 transition flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white tracking-wide">Program Kerja (Proker)</h2>
                <p className="text-xs text-white/60 mt-1">Daftar agenda kegiatan strategis kabinet BEM FAI UNWAHA.</p>
              </div>
              <button
                onClick={() => openProgramModal()}
                className="bg-gradient-to-r from-[#A81B30] via-[#C4263E] to-[#8E1624] hover:brightness-110 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-lg shadow-[#A81B30]/30 border border-white/20 flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <Plus size={16} className="text-amber-300" />
                <span>Tambah Proker</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {programs.map((p) => (
                <div key={p.id} className="bg-[#26030A]/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#3B0611] text-amber-300 border border-white/10">
                        {p.division}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wide">
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-white text-base">{p.name}</h3>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed font-light">{p.description}</p>
                    <p className="text-xs text-amber-400/90 mt-2 font-mono">⏳ Target: {p.target_timeline}</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-4 border-t border-white/10 mt-4">
                    <button
                      onClick={() => openProgramModal(p)}
                      className="text-xs text-white/80 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1"
                    >
                      <Edit2 size={12} className="text-amber-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProgram(p.id)}
                      className="text-xs text-red-300 hover:text-white px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/80 border border-red-800/40 transition flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="font-display text-2xl font-bold text-white tracking-wide">Visi, Misi & Profil</h2>
              <p className="text-xs text-white/60 mt-1">Perbarui narasi visi, misi, dan identitas kelembagaan BEM FAI.</p>
            </div>

            <div className="bg-[#26030A]/80 border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl backdrop-blur-sm">
              <div>
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Visi Organisasi
                </label>
                <textarea
                  rows={3}
                  value={contentForm.visi}
                  onChange={(e) => setContentForm({ ...contentForm, visi: e.target.value })}
                  className="w-full bg-[#180206] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#A81B30] focus:ring-1 focus:ring-[#A81B30]"
                />
                <button
                  onClick={() => handleSaveContent("visi", contentForm.visi)}
                  className="mt-2.5 text-xs bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] hover:brightness-110 text-white font-semibold px-4 py-2 rounded-xl transition shadow"
                >
                  Simpan Visi
                </button>
              </div>

              <div className="pt-5 border-t border-white/10">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Misi Organisasi
                </label>
                <textarea
                  rows={5}
                  value={contentForm.misi}
                  onChange={(e) => setContentForm({ ...contentForm, misi: e.target.value })}
                  className="w-full bg-[#180206] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#A81B30] focus:ring-1 focus:ring-[#A81B30]"
                />
                <button
                  onClick={() => handleSaveContent("misi", contentForm.misi)}
                  className="mt-2.5 text-xs bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] hover:brightness-110 text-white font-semibold px-4 py-2 rounded-xl transition shadow"
                >
                  Simpan Misi
                </button>
              </div>

              <div className="pt-5 border-t border-white/10">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Deskripsi Profil FAI UNWAHA
                </label>
                <textarea
                  rows={4}
                  value={contentForm.deskripsi}
                  onChange={(e) => setContentForm({ ...contentForm, deskripsi: e.target.value })}
                  className="w-full bg-[#180206] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#A81B30] focus:ring-1 focus:ring-[#A81B30]"
                />
                <button
                  onClick={() => handleSaveContent("deskripsi", contentForm.deskripsi)}
                  className="mt-2.5 text-xs bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] hover:brightness-110 text-white font-semibold px-4 py-2 rounded-xl transition shadow"
                >
                  Simpan Deskripsi
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {memberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#240309] border border-white/20 rounded-2xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <span>{editingMember ? "Edit Data Pengurus" : "Tambah Pengurus Baru"}</span>
              </h3>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  placeholder="Contoh: Muhammad Fauzan Al-Hakim"
                  required
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#A81B30] focus:ring-1 focus:ring-[#A81B30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  Jabatan / Posisi
                </label>
                <select
                  value={memberForm.role}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  required
                  className="w-full bg-[#180206] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#240309] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-white/50 mt-1">
                  Pilihan utama menggunakan <b>Gubernur BEM</b> & <b>Wakil Gubernur BEM</b>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  URL Foto Profil (Opsional)
                </label>
                <input
                  type="text"
                  value={memberForm.photo_url}
                  onChange={(e) => setMemberForm({ ...memberForm, photo_url: e.target.value })}
                  placeholder="https://... atau /assets/foto.jpg"
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Nomor Urut Tampilan di Website
                </label>
                <input
                  type="number"
                  value={memberForm.sort_order}
                  onChange={(e) => setMemberForm({ ...memberForm, sort_order: Number(e.target.value) })}
                  required
                  min={1}
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Deskripsi / Profil Singkat
                </label>
                <textarea
                  rows={3}
                  value={memberForm.description}
                  onChange={(e) => setMemberForm({ ...memberForm, description: e.target.value })}
                  placeholder="Contoh: Mahasiswa Hukum Ekonomi Syariah angkatan 2023..."
                  className="w-full bg-[#180206] border border-white/15 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10 mt-2">
                <button
                  type="button"
                  onClick={() => setMemberModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-medium text-white/70 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] hover:brightness-110 shadow-lg shadow-[#A81B30]/40 transition"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {programModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#240309] border border-white/20 rounded-2xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              {editingProgram ? "Edit Program Kerja" : "Tambah Program Kerja Baru"}
            </h3>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">Nama Program</label>
                <input
                  type="text"
                  value={programForm.name}
                  onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                  placeholder="Contoh: Seminar Nasional AI & Syariah"
                  required
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">Divisi</label>
                  <select
                    value={programForm.division}
                    onChange={(e) => setProgramForm({ ...programForm, division: e.target.value })}
                    className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                  >
                    {DIVISION_OPTIONS.map((d) => (
                      <option key={d} value={d} className="bg-[#240309] text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">Status</label>
                  <select
                    value={programForm.status}
                    onChange={(e) => setProgramForm({ ...programForm, status: e.target.value as Program["status"] })}
                    className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                  >
                    <option value="Terencana" className="bg-[#240309]">Terencana</option>
                    <option value="Berjalan" className="bg-[#240309]">Berjalan</option>
                    <option value="Selesai" className="bg-[#240309]">Selesai</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">Target Waktu</label>
                <input
                  type="text"
                  value={programForm.target_timeline}
                  onChange={(e) => setProgramForm({ ...programForm, target_timeline: e.target.value })}
                  placeholder="Contoh: Oktober 2026"
                  required
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">Deskripsi</label>
                <textarea
                  rows={3}
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  required
                  className="w-full bg-[#180206] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setProgramModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-medium text-white/70 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] hover:brightness-110 shadow-lg shadow-[#A81B30]/40 transition"
                >
                  Simpan Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {articleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#240309] border border-white/20 rounded-2xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              {editingArticle ? "Edit Artikel" : "Tulis Artikel Baru"}
            </h3>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">Judul Artikel</label>
                <input
                  type="text"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  required
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">Kategori</label>
                <input
                  type="text"
                  value={articleForm.category}
                  onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                  placeholder="Kajian Fiqh / Dakwah / Info Kampus"
                  required
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">URL Gambar</label>
                <input
                  type="text"
                  value={articleForm.image_url}
                  onChange={(e) => setArticleForm({ ...articleForm, image_url: e.target.value })}
                  placeholder="/assets/gedung1.webp"
                  className="w-full bg-[#180206] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">Konten Artikel</label>
                <textarea
                  rows={5}
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  required
                  className="w-full bg-[#180206] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#A81B30]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-medium text-white/70 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#A81B30] to-[#7F0E1E] hover:brightness-110 shadow-lg shadow-[#A81B30]/40 transition"
                >
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
