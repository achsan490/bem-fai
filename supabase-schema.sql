-- Supabase Database Schema for BEM FAI Website
-- Table: articles

-- Drop table if exists (for reset purposes)
-- drop table if exists articles;

create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table articles enable row level security;

-- POLICIES

-- Policy 1: Allow public read access to articles
create policy "Allow public read access" on articles
  for select using (true);

-- Policy 2: Allow authenticated admins to insert new articles
create policy "Allow authenticated admin insert" on articles
  for insert with check (auth.role() = 'authenticated');

-- Policy 3: Allow authenticated admins to update articles
create policy "Allow authenticated admin update" on articles
  for update using (auth.role() = 'authenticated');

-- Policy 4: Allow authenticated admins to delete articles
create policy "Allow authenticated admin delete" on articles
  for delete using (auth.role() = 'authenticated');


-- SEED DATA (Futuristic & Islamic Tech Articles)
insert into articles (title, category, content, image_url) values
(
  'Integrasi AI dalam Hukum Islam: Peluang dan Tantangan Kontemporer',
  'Teknologi & Syariah',
  'Perkembangan kecerdasan buatan (Artificial Intelligence) telah merambah ke berbagai aspek kehidupan. Di dunia akademik keislaman, integrasi AI menawarkan kemudahan dalam analisis teks fiqh klasik secara digital. Namun, bagaimana hukum Islam memandang fatwa yang dianalisis oleh algoritma? Artikel ini membahas batas-batas metodologis penalaran hukum (ijtihad) dan peran kecerdasan buatan sebagai instrumen pembantu bagi para ulama kontemporer.',
  '/assets/gedung1.png'
),
(
  'Transformasi Digital Dakwah Kampus Era Metaverse',
  'Kajian Digital',
  'Dakwah di era digital tidak lagi sebatas memposting teks atau poster di media sosial. Konsep Metaverse membuka dimensi baru bagi interaksi keagamaan mahasiswa. Melalui ruang virtual 3D, pengajian, mentoring, dan diskusi keagamaan dapat dilangsungkan secara imersif. BEM FAI memelopori adaptasi teknologi ini untuk merangkul generasi milenial dan gen Z dalam pembelajaran agama yang interaktif.',
  '/assets/gedung2.png'
),
(
  'Peluncuran Portal Utama BEM FAI: Satu Data untuk Semua Layanan',
  'Kegiatan BEM',
  'BEM FAI resmi merilis platform digital terpadu untuk memudahkan pelayanan mahasiswa. Portal ini mengintegrasikan pengajuan surat menyurat, pendaftaran beasiswa internal, dan repositori karya ilmiah mahasiswa. Rilisnya platform ini adalah perwujudan visi "Islamic Tech Campus" yang mengedepankan efisiensi birokrasi berlandaskan etika profesionalisme.',
  '/assets/logo.jpg'
),
(
  'Etika Fintech Syariah: Menavigasi Kripto dan Web3',
  'Opini Mahasiswa',
  'Web3 dan teknologi blockchain membawa disrupsi besar di dunia finansial global. Bagi umat Islam, menelaah keabsahan transaksi digital ini merupakan prioritas penting. Melalui tulisan ini, kita membedah konsep kepemilikan aset digital (NFT/Tokens) berdasarkan maqashid syariah (tujuan hukum Islam) untuk menjaga maslahat ekonomi umat.',
  '/assets/gedung1.png'
);


-- STORAGE CONFIGURATION FOR COVERS (Pilih Foto)

-- 1. Create storage bucket named 'article-covers' if it doesn't exist
insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

-- 2. Policy: Allow public read access to covers
create policy "Allow public read access to covers" on storage.objects
  for select using (bucket_id = 'article-covers');

-- 3. Policy: Allow authenticated admins to upload covers
create policy "Allow authenticated admin upload" on storage.objects
  for insert with check (
    bucket_id = 'article-covers' 
    and auth.role() = 'authenticated'
  );

-- 4. Policy: Allow authenticated admins to delete covers
create policy "Allow authenticated admin delete" on storage.objects
  for delete using (
    bucket_id = 'article-covers' 
    and auth.role() = 'authenticated'
  );

