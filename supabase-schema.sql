-- ============================================================
-- Supabase Database Schema for BEM FAI UNWAHA Website
-- ============================================================

-- ── Table: articles ───────────────────────────────────────────
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table articles enable row level security;

drop policy if exists "articles_public_read" on articles;
drop policy if exists "articles_admin_insert" on articles;
drop policy if exists "articles_admin_update" on articles;
drop policy if exists "articles_admin_delete" on articles;

create policy "articles_public_read" on articles for select using (true);
create policy "articles_admin_insert" on articles for insert with check (auth.role() = 'authenticated');
create policy "articles_admin_update" on articles for update using (auth.role() = 'authenticated');
create policy "articles_admin_delete" on articles for delete using (auth.role() = 'authenticated');

-- Seed dynamic articles only if empty
insert into articles (title, category, content, image_url) 
select 'Integrasi AI dalam Hukum Islam: Peluang dan Tantangan Kontemporer', 'Teknologi & Syariah', 'Perkembangan kecerdasan buatan (Artificial Intelligence) telah merambah ke berbagai aspek kehidupan. Di dunia akademik keislaman, integrasi AI menawarkan kemudahan dalam analisis teks fiqh klasik secara digital.', '/assets/gedung1.png'
where not exists (select 1 from articles limit 1);

insert into articles (title, category, content, image_url) 
select 'Transformasi Digital Dakwah Kampus Era Metaverse', 'Kajian Digital', 'Dakwah di era digital tidak lagi sebatas memposting teks atau poster di media sosial. Konsep Metaverse membuka dimensi baru bagi interaksi keagamaan mahasiswa.', '/assets/gedung2.png'
where not exists (select 1 from articles offset 1 limit 1);


-- ── Table: programs (Proker BEM) ──────────────────────────────
create table if not exists programs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  division text not null,
  target_timeline text not null,
  status text not null default 'Terencana',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table programs enable row level security;

drop policy if exists "programs_public_read" on programs;
drop policy if exists "programs_admin_insert" on programs;
drop policy if exists "programs_admin_update" on programs;
drop policy if exists "programs_admin_delete" on programs;

create policy "programs_public_read" on programs for select using (true);
create policy "programs_admin_insert" on programs for insert with check (auth.role() = 'authenticated');
create policy "programs_admin_update" on programs for update using (auth.role() = 'authenticated');
create policy "programs_admin_delete" on programs for delete using (auth.role() = 'authenticated');


-- ── Table: site_content (About page dynamic content) ──────────
create table if not exists site_content (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table site_content enable row level security;

drop policy if exists "site_content_public_read" on site_content;
drop policy if exists "site_content_admin_upsert" on site_content;
drop policy if exists "site_content_admin_update" on site_content;

create policy "site_content_public_read" on site_content for select using (true);
create policy "site_content_admin_upsert" on site_content for insert with check (auth.role() = 'authenticated');
create policy "site_content_admin_update" on site_content for update using (auth.role() = 'authenticated');

insert into site_content (key, value) values
('visi', 'Menjadi Badan Eksekutif Mahasiswa yang progresif, berintegritas, dan berlandaskan nilai-nilai Islam Ahlussunnah Wal Jamaah An-Nahdliyah dalam mewujudkan mahasiswa FAI UNWAHA yang berdaya saing global.')
on conflict (key) do update set value = excluded.value;

insert into site_content (key, value) values
('misi', '1. Menyelenggarakan kegiatan akademik dan non-akademik yang berkualitas dan bermutu.
2. Meningkatkan kapasitas kepemimpinan dan kewirausahaan mahasiswa FAI.
3. Memperkuat sinergi antar mahasiswa, dosen, dan civitas akademika FAI UNWAHA.
4. Mengembangkan dakwah digital yang kreatif dan inklusif.
5. Membangun jaringan alumni yang solid dan saling mendukung.')
on conflict (key) do update set value = excluded.value;

insert into site_content (key, value) values
('deskripsi', 'Fakultas Agama Islam (FAI) Universitas KH. A. Wahab Hasbullah (UNWAHA) Jombang merupakan salah satu fakultas unggulan yang mengintegrasikan ilmu keislaman klasik dengan pengetahuan modern. Berlokasi di Tambakberas, Jombang — pesantren terbesar di Indonesia — FAI UNWAHA mengemban misi mencetak generasi ulama yang cakap di bidang teknologi dan akademik.')
on conflict (key) do update set value = excluded.value;

insert into site_content (key, value) values
('filosofi_logo', 'Logo BEM FAI UNWAHA merupakan perpaduan simbol bintang sembilan yang melambangkan sembilan wali penyebar Islam di Nusantara, dikombinasikan dengan siluet buku terbuka sebagai simbol ilmu pengetahuan. Warna merah marun mencerminkan keberanian dan semangat juang, sementara warna putih menggambarkan kesucian niat dan kejujuran dalam berorganisasi.')
on conflict (key) do update set value = excluded.value;


-- ── Table: sponsors ───────────────────────────────────────────
create table if not exists sponsors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text,
  website_url text,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table sponsors enable row level security;

drop policy if exists "sponsors_public_read" on sponsors;
drop policy if exists "sponsors_admin_insert" on sponsors;
drop policy if exists "sponsors_admin_update" on sponsors;
drop policy if exists "sponsors_admin_delete" on sponsors;

create policy "sponsors_public_read" on sponsors for select using (true);
create policy "sponsors_admin_insert" on sponsors for insert with check (auth.role() = 'authenticated');
create policy "sponsors_admin_update" on sponsors for update using (auth.role() = 'authenticated');
create policy "sponsors_admin_delete" on sponsors for delete using (auth.role() = 'authenticated');

insert into sponsors (name, logo_url, website_url, sort_order) 
select 'UNWAHA Jombang', '/assets/logo.jpg', 'https://unwaha.ac.id', 1
where not exists (select 1 from sponsors limit 1);


-- ── Table: kemenbirsan_members ────────────────────────────────
create table if not exists kemenbirsan_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  photo_url text,
  description text,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table kemenbirsan_members enable row level security;

drop policy if exists "members_public_read" on kemenbirsan_members;
drop policy if exists "members_admin_insert" on kemenbirsan_members;
drop policy if exists "members_admin_update" on kemenbirsan_members;
drop policy if exists "members_admin_delete" on kemenbirsan_members;

create policy "members_public_read" on kemenbirsan_members for select using (true);
create policy "members_admin_insert" on kemenbirsan_members for insert with check (auth.role() = 'authenticated');
create policy "members_admin_update" on kemenbirsan_members for update using (auth.role() = 'authenticated');
create policy "members_admin_delete" on kemenbirsan_members for delete using (auth.role() = 'authenticated');

insert into kemenbirsan_members (name, role, photo_url, description, sort_order)
select 'Muhammad Fauzan Al-Hakim', 'Presiden BEM', null, 'Mahasiswa Hukum Ekonomi Syariah angkatan 2023. Berpengalaman di bidang organisasi kampus dan kajian keislaman kontemporer.', 1
where not exists (select 1 from kemenbirsan_members limit 1);

insert into kemenbirsan_members (name, role, photo_url, description, sort_order)
select 'Siti Nur Aisyah Rahmawati', 'Wakil Presiden BEM', null, 'Mahasiswi Pendidikan Agama Islam angkatan 2023. Aktif dalam kegiatan dakwah kampus dan pemberdayaan perempuan berbasis nilai keislaman.', 2
where not exists (select 1 from kemenbirsan_members offset 1 limit 1);


-- ── Storage: article-covers bucket ───────────────────────────
insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

drop policy if exists "covers_public_read" on storage.objects;
drop policy if exists "covers_admin_upload" on storage.objects;
drop policy if exists "covers_admin_delete" on storage.objects;

create policy "covers_public_read" on storage.objects for select using (bucket_id = 'article-covers');
create policy "covers_admin_upload" on storage.objects for insert with check (bucket_id = 'article-covers' and auth.role() = 'authenticated');
create policy "covers_admin_delete" on storage.objects for delete using (bucket_id = 'article-covers' and auth.role() = 'authenticated');
