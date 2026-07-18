import { createClient } from "@supabase/supabase-js";
import { Article, DbArticleInsert, DbArticleUpdate } from "../types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage Mock Database Implementation for fallback
const LOCAL_STORAGE_KEY = "bem_fai_articles";
const AUTH_SESSION_KEY = "bem_fai_session";

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
  }
];

// Helper to initialize local storage
const initializeLocalStorage = () => {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
  }
};

export const db = {
  // Articles CRUD
  async getArticles(): Promise<Article[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      initializeLocalStorage();
      if (typeof window === "undefined") return DEFAULT_ARTICLES;
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Article[] = data ? JSON.parse(data) : DEFAULT_ARTICLES;
      // Return sorted by date descending
      return [...parsed].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  },

  async createArticle(article: DbArticleInsert): Promise<Article> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("articles")
        .insert([article])
        .select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal membuat artikel");
      return data[0];
    } else {
      initializeLocalStorage();
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Article[] = data ? JSON.parse(data) : [];
      const newArticle: Article = {
        ...article,
        id: Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
      };
      parsed.push(newArticle);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      return newArticle;
    }
  },

  async updateArticle(id: string, article: DbArticleUpdate): Promise<Article> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("articles")
        .update(article)
        .eq("id", id)
        .select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Gagal mengupdate artikel");
      return data[0];
    } else {
      initializeLocalStorage();
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Article[] = data ? JSON.parse(data) : [];
      const index = parsed.findIndex((a) => a.id === id);
      if (index === -1) throw new Error("Artikel tidak ditemukan");
      const updatedArticle = {
        ...parsed[index],
        ...article,
      };
      parsed[index] = updatedArticle;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      return updatedArticle;
    }
  },

  async deleteArticle(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    } else {
      initializeLocalStorage();
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: Article[] = data ? JSON.parse(data) : [];
      const filtered = parsed.filter((a) => a.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  },

  // Auth Operations
  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } else {
      // Mock Sandbox Login credentials: admin@fai.unwaha.ac.id / admin123
      if (email === "admin@fai.unwaha.ac.id" && password === "admin123") {
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ email, authenticated: true }));
        }
        return { success: true };
      } else {
        return { success: false, error: "Kredensial salah! Gunakan admin@fai.unwaha.ac.id dan password: admin123 untuk sandbox admin." };
      }
    }
  },

  async logout(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_SESSION_KEY);
      }
    }
  },

  async checkSession(): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.auth.getSession();
      return !!data.session;
    } else {
      if (typeof window === "undefined") return false;
      const session = localStorage.getItem(AUTH_SESSION_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return !!parsed.authenticated;
    }
  }
};
