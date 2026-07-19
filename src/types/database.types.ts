// ─── Articles ────────────────────────────────────────────────────────────────
export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export type DbArticleInsert = Omit<Article, 'id' | 'created_at'>;
export type DbArticleUpdate = Partial<DbArticleInsert>;

// ─── Programs (Proker) ───────────────────────────────────────────────────────
export interface Program {
  id: string;
  name: string;
  description: string;
  division: string;
  target_timeline: string;
  status: 'Terencana' | 'Berjalan' | 'Selesai';
  created_at: string;
}

export type DbProgramInsert = Omit<Program, 'id' | 'created_at'>;
export type DbProgramUpdate = Partial<DbProgramInsert>;

// ─── Site Content (About Page) ───────────────────────────────────────────────
export interface SiteContent {
  key: string;   // 'visi' | 'misi' | 'deskripsi' | 'filosofi_logo'
  value: string;
  updated_at: string;
}

// ─── Sponsors ────────────────────────────────────────────────────────────────
export interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  created_at: string;
}

export type DbSponsorInsert = Omit<Sponsor, 'id' | 'created_at'>;
export type DbSponsorUpdate = Partial<DbSponsorInsert>;

// ─── Kemenbirsan Members ─────────────────────────────────────────────────────
export interface KemenbirsanMember {
  id: string;
  name: string;
  role: string;        // e.g. 'Presiden BEM', 'Wakil Presiden BEM'
  photo_url: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export type DbMemberInsert = Omit<KemenbirsanMember, 'id' | 'created_at'>;
export type DbMemberUpdate = Partial<DbMemberInsert>;
