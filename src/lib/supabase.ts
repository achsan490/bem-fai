import { createClient } from "@supabase/supabase-js";
import {
  Article, DbArticleInsert, DbArticleUpdate,
  Program, DbProgramInsert, DbProgramUpdate,
  SiteContent,
  Sponsor, DbSponsorInsert, DbSponsorUpdate,
  KemenbirsanMember, DbMemberInsert, DbMemberUpdate,
} from "../types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ─── LocalStorage Keys ────────────────────────────────────────────────────────
const LOCAL_STORAGE_KEY    = "bem_fai_articles";
const PROGRAM_STORAGE_KEY  = "bem_fai_programs";
const CONTENT_STORAGE_KEY  = "bem_fai_site_content";
const SPONSOR_STORAGE_KEY  = "bem_fai_sponsors";
const MEMBER_STORAGE_KEY   = "bem_fai_kemenbirsan";
const AUTH_SESSION_KEY     = "bem_fai_session";

// ─── Default / Seed Data ──────────────────────────────────────────────────────
const DEFAULT_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Integrasi AI dalam Hukum Islam: Peluang dan Tantangan di UNWAHA",
    category: "Teknologi & Syariah",
    content: "Perkembangan kecerdasan buatan (Artificial Intelligence) telah merambah ke berbagai aspek kehidupan. Di dunia akademik keislaman FAI UNWAHA, integrasi AI menawarkan kemudahan dalam analisis teks fiqh klasik secara digital. Namun, bagaimana hukum Islam memandang fatwa yang dianalisis oleh algoritma? Artikel ini membahas batas-batas metodologis penalaran hukum (ijtihad) dan peran kecerdasan buatan sebagai instrumen pembantu bagi para ulama kontemporer.",
    image_url: "/assets/gedung1.png",
    created_at: new Date("2026-07-10T10:00:00Z").toISOString(),
  },
  {
    id: "2",
    title: "Transformasi Digital Dakwah Kampus Era Metaverse",
    category: "Kajian Digital",
    content: "Dakwah di era digital tidak lagi sebatas memposting teks atau poster di media sosial. Konsep Metaverse membuka dimensi baru bagi interaksi keagamaan mahasiswa UNWAHA. Melalui ruang virtual 3D, pengajian, mentoring, dan diskusi keagamaan dapat dilangsungkan secara imersif. BEM FAI memelopori adaptasi teknologi ini untuk merangkul generasi milenial dan gen Z dalam pembelajaran agama yang interaktif.",
    image_url: "/assets/gedung2.png",
    created_at: new Date("2026-07-12T14:30:00Z").toISOString(),
  },
  {
    id: "3",
    title: "Peluncuran Portal Utama BEM FAI UNWAHA: Satu Data untuk Semua Layanan",
    category: "Kegiatan BEM",
    content: "BEM FAI UNWAHA resmi merilis platform digital terpadu untuk memudahkan pelayanan mahasiswa. Portal ini mengintegrasikan pengajuan surat menyurat, pendaftaran beasiswa internal, dan repositori karya ilmiah mahasiswa. Rilisnya platform ini adalah perwujudan visi \"Islamic Tech Campus\" yang mengedepankan efisiensi birokrasi berlandaskan etika profesionalisme.",
    image_url: "/assets/logo.jpg",
    created_at: new Date("2026-07-14T09:15:00Z").toISOString(),
  },
  {
    id: "4",
    title: "Etika Fintech Syariah: Menavigasi Kripto dan Web3",
    category: "Opini Mahasiswa",
    content: "Web3 dan teknologi blockchain membawa disrupsi besar di dunia finansial global. Bagi umat Islam, menelaah keabsahan transaksi digital ini merupakan prioritas penting. Melalui tulisan ini, mahasiswa FAI UNWAHA membedah konsep kepemilikan aset digital (NFT/Tokens) berdasarkan maqashid syariah (tujuan hukum Islam) untuk menjaga maslahat ekonomi umat.",
    image_url: "/assets/gedung1.png",
    created_at: new Date("2026-07-16T16:45:00Z").toISOString(),
  },
];

const DEFAULT_PROGRAMS: Program[] = [
  {
    id: "p1",
    name: "Latihan Keterampilan Manajemen Mahasiswa (LKMM-TD)",
    description: "Pelatihan kepemimpinan tingkat dasar untuk membekali mahasiswa FAI dengan kemampuan organisasi, manajemen kegiatan, serta kode etik kepemimpinan berbasis moral islami.",
    division: "Kaderisasi & PSDM",
    target_timeline: "Triwulan I",
    status: "Selesai",
    created_at: new Date("2026-07-01T08:00:00Z").toISOString(),
  },
  {
    id: "p2",
    name: "Kajian Syariah & Teknologi (Tech-Fiqh Series)",
    description: "Forum kajian bulanan kolaboratif yang membedah integrasi hukum Islam kontemporer dengan isu sains digital, seperti AI, cryptocurrency, dan Web3.",
    division: "Kajian Keagamaan",
    target_timeline: "Bulanan (Jumat Kliwon)",
    status: "Berjalan",
    created_at: new Date("2026-07-03T13:00:00Z").toISOString(),
  },
  {
    id: "p3",
    name: "BEM FAI Peduli Desa (Bakti Sosial Terpadu)",
    description: "Pengabdian masyarakat berupa pengajaran di TPQ, pendampingan sertifikasi produk halal bagi UMKM desa binaan, dan bakti sosial kesehatan gratis.",
    division: "Pengabdian Masyarakat",
    target_timeline: "Triwulan II",
    status: "Terencana",
    created_at: new Date("2026-07-05T09:00:00Z").toISOString(),
  },
  {
    id: "p4",
    name: "Festival Seni & Olahraga Islami (FASOI Jombang)",
    description: "Kompetisi antar program studi dan SMA sederajat se-Jombang yang mempertandingkan kesenian hadrah, kaligrafi digital, musabaqah tilawatil quran, serta badminton.",
    division: "Minat & Bakat (Olahraga)",
    target_timeline: "Triwulan III",
    status: "Terencana",
    created_at: new Date("2026-07-07T10:00:00Z").toISOString(),
  },
  {
    id: "p5",
    name: "Pojok Literasi & Publikasi Media",
    description: "Penyediaan sarana mading digital kampus, pendampingan penulisan jurnal ilmiah mahasiswa FAI, dan pengelolaan portal website informasi terpadu.",
    division: "Komunikasi & Media",
    target_timeline: "Berkelanjutan",
    status: "Berjalan",
    created_at: new Date("2026-07-09T15:00:00Z").toISOString(),
  },
];

const DEFAULT_SITE_CONTENT: SiteContent[] = [
  {
    key: "visi",
    value: "Menjadi Badan Eksekutif Mahasiswa yang progresif, berintegritas, dan berlandaskan nilai-nilai Islam Ahlussunnah Wal Jamaah An-Nahdliyah dalam mewujudkan mahasiswa FAI UNWAHA yang berdaya saing global.",
    updated_at: new Date().toISOString(),
  },
  {
    key: "misi",
    value: "1. Menyelenggarakan kegiatan akademik dan non-akademik yang berkualitas dan bermutu.\n2. Meningkatkan kapasitas kepemimpinan dan kewirausahaan mahasiswa FAI.\n3. Memperkuat sinergi antar mahasiswa, dosen, dan civitas akademika FAI UNWAHA.\n4. Mengembangkan dakwah digital yang kreatif dan inklusif.\n5. Membangun jaringan alumni yang solid dan saling mendukung.",
    updated_at: new Date().toISOString(),
  },
  {
    key: "deskripsi",
    value: "Fakultas Agama Islam (FAI) Universitas KH. A. Wahab Hasbullah (UNWAHA) Jombang merupakan salah satu fakultas unggulan yang mengintegrasikan ilmu keislaman klasik dengan pengetahuan modern. Berlokasi di Tambakberas, Jombang — pesantren terbesar di Indonesia — FAI UNWAHA mengemban misi mencetak generasi ulama yang cakap di bidang teknologi dan akademik. BEM FAI adalah wadah mahasiswa untuk berkreasi, berorganisasi, dan mengabdi kepada masyarakat.",
    updated_at: new Date().toISOString(),
  },
  {
    key: "filosofi_logo",
    value: "Logo BEM FAI UNWAHA merupakan perpaduan simbol bintang sembilan (bintang nahdlatul ulama) yang melambangkan sembilan wali penyebar Islam di Nusantara, dikombinasikan dengan siluet buku terbuka sebagai simbol ilmu pengetahuan. Warna merah marun mencerminkan keberanian dan semangat juang, sementara warna putih menggambarkan kesucian niat dan kejujuran dalam berorganisasi.",
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_SPONSORS: Sponsor[] = [
  {
    id: "s1",
    name: "UNWAHA Jombang",
    logo_url: "/assets/logo.jpg",
    website_url: "https://unwaha.ac.id",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "s2",
    name: "Pesantren Bahrul Ulum Tambakberas",
    logo_url: null,
    website_url: null,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "s3",
    name: "Dinas Pendidikan Kab. Jombang",
    logo_url: null,
    website_url: null,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_MEMBERS: KemenbirsanMember[] = [
  {
    id: "m1",
    name: "Muhammad Fauzan Al-Hakim",
    role: "Presiden BEM",
    photo_url: null,
    description: "Mahasiswa Hukum Ekonomi Syariah angkatan 2023. Berpengalaman di bidang organisasi kampus dan kajian keislaman kontemporer.",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "m2",
    name: "Siti Nur Aisyah Rahmawati",
    role: "Wakil Presiden BEM",
    photo_url: null,
    description: "Mahasiswi Pendidikan Agama Islam angkatan 2023. Aktif dalam kegiatan dakwah kampus dan pemberdayaan perempuan berbasis nilai keislaman.",
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
];

// ─── Local Storage Initializer ────────────────────────────────────────────────
const initializeLocalStorage = () => {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(LOCAL_STORAGE_KEY))
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
  if (!localStorage.getItem(PROGRAM_STORAGE_KEY))
    localStorage.setItem(PROGRAM_STORAGE_KEY, JSON.stringify(DEFAULT_PROGRAMS));
  if (!localStorage.getItem(CONTENT_STORAGE_KEY))
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONTENT));
  if (!localStorage.getItem(SPONSOR_STORAGE_KEY))
    localStorage.setItem(SPONSOR_STORAGE_KEY, JSON.stringify(DEFAULT_SPONSORS));
  if (!localStorage.getItem(MEMBER_STORAGE_KEY))
    localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(DEFAULT_MEMBERS));
};

// ─── DB Object ────────────────────────────────────────────────────────────────
export const db = {

  // ── Articles ──────────────────────────────────────────────────────────────
  async getArticles(): Promise<Article[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("articles").select("*").order("created_at", { ascending: false });
      if (error) {
        console.warn("[DB] getArticles Supabase error (falling back to localStorage):", error.message);
      } else {
        return data || [];
      }
    }
    // localStorage fallback
    initializeLocalStorage();
    if (typeof window === "undefined") return DEFAULT_ARTICLES;
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed: Article[] = raw ? JSON.parse(raw) : DEFAULT_ARTICLES;
    return [...parsed].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createArticle(article: DbArticleInsert): Promise<Article> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("articles").insert([article]).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal membuat artikel");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Article[] = raw ? JSON.parse(raw) : [];
      const newItem: Article = { ...article, id: Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
      parsed.push(newItem);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      return newItem;
    }
  },

  async updateArticle(id: string, article: DbArticleUpdate): Promise<Article> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("articles").update(article).eq("id", id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal mengupdate artikel");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Article[] = raw ? JSON.parse(raw) : [];
      const idx = parsed.findIndex((a) => a.id === id);
      if (idx === -1) throw new Error("Artikel tidak ditemukan");
      parsed[idx] = { ...parsed[idx], ...article };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      return parsed[idx];
    }
  },

  async deleteArticle(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Article[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed.filter((a) => a.id !== id)));
    }
  },

  // ── Programs (Proker) ─────────────────────────────────────────────────────
  async getPrograms(): Promise<Program[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: true });
      if (error) {
        console.warn("[DB] getPrograms Supabase error (falling back to localStorage):", error.message);
      } else {
        return data || [];
      }
    }
    // localStorage fallback
    initializeLocalStorage();
    if (typeof window === "undefined") return DEFAULT_PROGRAMS;
    const raw = localStorage.getItem(PROGRAM_STORAGE_KEY);
    const parsed: Program[] = raw ? JSON.parse(raw) : DEFAULT_PROGRAMS;
    return [...parsed].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  },

  async createProgram(program: DbProgramInsert): Promise<Program> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("programs").insert([program]).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal membuat program");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(PROGRAM_STORAGE_KEY);
      const parsed: Program[] = raw ? JSON.parse(raw) : [];
      const newItem: Program = { ...program, id: "p-" + Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
      parsed.push(newItem);
      localStorage.setItem(PROGRAM_STORAGE_KEY, JSON.stringify(parsed));
      return newItem;
    }
  },

  async updateProgram(id: string, program: DbProgramUpdate): Promise<Program> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("programs").update(program).eq("id", id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal mengupdate program");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(PROGRAM_STORAGE_KEY);
      const parsed: Program[] = raw ? JSON.parse(raw) : [];
      const idx = parsed.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error("Program tidak ditemukan");
      parsed[idx] = { ...parsed[idx], ...program };
      localStorage.setItem(PROGRAM_STORAGE_KEY, JSON.stringify(parsed));
      return parsed[idx];
    }
  },

  async deleteProgram(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("programs").delete().eq("id", id);
      if (error) throw error;
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(PROGRAM_STORAGE_KEY);
      const parsed: Program[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(PROGRAM_STORAGE_KEY, JSON.stringify(parsed.filter((p) => p.id !== id)));
    }
  },

  // ── Site Content (About Page) ─────────────────────────────────────────────
  async getSiteContent(): Promise<SiteContent[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) {
        console.warn("[DB] getSiteContent Supabase error (falling back to localStorage):", error.message);
      } else {
        return data || [];
      }
    }
    // localStorage fallback
    initializeLocalStorage();
    if (typeof window === "undefined") return DEFAULT_SITE_CONTENT;
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_SITE_CONTENT;
  },

  async getSiteContentByKey(key: string): Promise<string> {
    const all = await db.getSiteContent();
    return all.find((c) => c.key === key)?.value ?? "";
  },

  async updateSiteContent(key: string, value: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) throw error;
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
      const parsed: SiteContent[] = raw ? JSON.parse(raw) : DEFAULT_SITE_CONTENT;
      const idx = parsed.findIndex((c) => c.key === key);
      const updated = { key, value, updated_at: new Date().toISOString() };
      if (idx === -1) parsed.push(updated);
      else parsed[idx] = updated;
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(parsed));
    }
  },

  // ── Sponsors ──────────────────────────────────────────────────────────────
  async getSponsors(): Promise<Sponsor[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("sponsors").select("*").order("sort_order", { ascending: true });
      if (error) {
        console.warn("[DB] getSponsors Supabase error (falling back to localStorage):", error.message);
      } else {
        return data || [];
      }
    }
    // localStorage fallback
    initializeLocalStorage();
    if (typeof window === "undefined") return DEFAULT_SPONSORS;
    const raw = localStorage.getItem(SPONSOR_STORAGE_KEY);
    const parsed: Sponsor[] = raw ? JSON.parse(raw) : DEFAULT_SPONSORS;
    return [...parsed].sort((a, b) => a.sort_order - b.sort_order);
  },

  async createSponsor(sponsor: DbSponsorInsert): Promise<Sponsor> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("sponsors").insert([sponsor]).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal membuat sponsor");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(SPONSOR_STORAGE_KEY);
      const parsed: Sponsor[] = raw ? JSON.parse(raw) : [];
      const newItem: Sponsor = { ...sponsor, id: "sp-" + Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
      parsed.push(newItem);
      localStorage.setItem(SPONSOR_STORAGE_KEY, JSON.stringify(parsed));
      return newItem;
    }
  },

  async updateSponsor(id: string, sponsor: DbSponsorUpdate): Promise<Sponsor> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("sponsors").update(sponsor).eq("id", id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal mengupdate sponsor");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(SPONSOR_STORAGE_KEY);
      const parsed: Sponsor[] = raw ? JSON.parse(raw) : [];
      const idx = parsed.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error("Sponsor tidak ditemukan");
      parsed[idx] = { ...parsed[idx], ...sponsor };
      localStorage.setItem(SPONSOR_STORAGE_KEY, JSON.stringify(parsed));
      return parsed[idx];
    }
  },

  async deleteSponsor(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("sponsors").delete().eq("id", id);
      if (error) throw error;
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(SPONSOR_STORAGE_KEY);
      const parsed: Sponsor[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(SPONSOR_STORAGE_KEY, JSON.stringify(parsed.filter((s) => s.id !== id)));
    }
  },

  // ── Kemenbirsan Members ───────────────────────────────────────────────────
  async getMembers(): Promise<KemenbirsanMember[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("kemenbirsan_members").select("*").order("sort_order", { ascending: true });
      if (error) {
        console.warn("[DB] getMembers Supabase error (falling back to localStorage):", error.message);
      } else {
        return data || [];
      }
    }
    // localStorage fallback
    initializeLocalStorage();
    if (typeof window === "undefined") return DEFAULT_MEMBERS;
    const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
    const parsed: KemenbirsanMember[] = raw ? JSON.parse(raw) : DEFAULT_MEMBERS;
    return [...parsed].sort((a, b) => a.sort_order - b.sort_order);
  },

  async createMember(member: DbMemberInsert): Promise<KemenbirsanMember> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("kemenbirsan_members").insert([member]).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal membuat anggota");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
      const parsed: KemenbirsanMember[] = raw ? JSON.parse(raw) : [];
      const newItem: KemenbirsanMember = { ...member, id: "m-" + Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString() };
      parsed.push(newItem);
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(parsed));
      return newItem;
    }
  },

  async updateMember(id: string, member: DbMemberUpdate): Promise<KemenbirsanMember> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("kemenbirsan_members").update(member).eq("id", id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal mengupdate anggota");
      return data[0];
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
      const parsed: KemenbirsanMember[] = raw ? JSON.parse(raw) : [];
      const idx = parsed.findIndex((m) => m.id === id);
      if (idx === -1) throw new Error("Anggota tidak ditemukan");
      parsed[idx] = { ...parsed[idx], ...member };
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(parsed));
      return parsed[idx];
    }
  },

  async deleteMember(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("kemenbirsan_members").delete().eq("id", id);
      if (error) throw error;
    } else {
      initializeLocalStorage();
      const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
      const parsed: KemenbirsanMember[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(parsed.filter((m) => m.id !== id)));
    }
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } else {
      if (email === "admin@fai.unwaha.ac.id" && password === "admin123") {
        if (typeof window !== "undefined")
          localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ email, authenticated: true }));
        return { success: true };
      }
      return { success: false, error: "Kredensial salah! Gunakan admin@fai.unwaha.ac.id / admin123 untuk sandbox." };
    }
  },

  async logout(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      if (typeof window !== "undefined") localStorage.removeItem(AUTH_SESSION_KEY);
    }
  },

  async checkSession(): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.auth.getSession();
      return !!data.session;
    } else {
      if (typeof window === "undefined") return false;
      const raw = localStorage.getItem(AUTH_SESSION_KEY);
      if (!raw) return false;
      return !!JSON.parse(raw).authenticated;
    }
  },
};
