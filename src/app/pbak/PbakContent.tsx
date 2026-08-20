"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Shirt,
  Download,
  Sparkles,
  Copy,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
  FileText,
  BookOpen,
  Award,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Users,
  Building2,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Timeline Rundown Data
const RUNDOWN_DATA = [
  {
    day: "Pra-PBAK",
    date: "Sabtu, 29 Agustus 2026",
    title: "Technical Meeting & Pembagian Gugus",
    events: [
      {
        time: "07.30 - 08.30",
        title: "Registrasi Ulang & Presensi Mahasiswa Baru",
        location: "Plaza Utama FAI UNWAHA",
        desc: "Pengecekan bukti registrasi PMB dan presensi kehadiran per gugus/kelompok.",
      },
      {
        time: "08.30 - 10.00",
        title: "Sosialisasi Teknis & Tata Tertib PBAK 2026",
        location: "Auditorium KH. Wahab Hasbullah",
        desc: "Pemaparan peraturan, atribut wajib, mekanisme perizinan, dan kriteria kelulusan sertifikat PBAK.",
      },
      {
        time: "10.00 - 11.30",
        title: "Pengarahan Penugasan & Twibbon Maba",
        location: "Auditorium KH. Wahab Hasbullah",
        desc: "Penjelasan tugas esai, video perkenalan, serta panduan upload media sosial.",
      },
      {
        time: "11.30 - 12.30",
        title: "Temu Pendamping Gugus & Latihan Yel-Yel",
        location: "Area Kelas FAI Terpadu",
        desc: "Perkenalan dengan kakak pendamping BEM/DEMA dan pembagian struktur koordinator gugus.",
      },
    ],
  },
  {
    day: "Hari Ke-1",
    date: "Senin, 31 Agustus 2026",
    title: "Pembukaan Resmi & Stadium General",
    events: [
      {
        time: "06.30 - 07.30",
        title: "Penyambutan Mahasiswa Baru & Cek Atribut",
        location: "Gerbang Utama Kampus FAI",
        desc: "Pemeriksaan kelengkapan dress code, name tag, dan kerapian peserta oleh tim kedisiplinan.",
      },
      {
        time: "07.30 - 09.30",
        title: "Upacara Pembukaan & Sidang Senat Terbuka",
        location: "Auditorium Utama UNWAHA",
        desc: "Pembukaan resmi oleh Rektor UNWAHA dan Dekan FAI serta penyematan tanda peserta mahasiswa baru.",
      },
      {
        time: "09.30 - 11.30",
        title: "Stadium General: Integrasi AI & Peradaban Qur'ani",
        location: "Auditorium Utama UNWAHA",
        desc: "Kuliah umum bersama narasumber nasional mengenai peran akademisi muslim di era disrupsi teknologi.",
      },
      {
        time: "11.30 - 13.00",
        title: "Ishoma (Salat Dhuhur Berjamaah & Kultum)",
        location: "Masjid Kampus UNWAHA",
        desc: "Kultum keislaman oleh dosen pembina rohis dan istirahat siang bersama.",
      },
      {
        time: "13.00 - 15.00",
        title: "Wawasan Kebangsaan & Nilai Aswaja An-Nahdliyah",
        location: "Auditorium Utama UNWAHA",
        desc: "Materi sejarah perjuangan KH. A. Wahab Hasbullah dan moderasi beragama.",
      },
    ],
  },
  {
    day: "Hari Ke-2",
    date: "Selasa, 1 September 2026",
    title: "Pengenalan Fakultas, Jurusan & SIAKAD",
    events: [
      {
        time: "07.00 - 08.00",
        title: "Apel Pagi & Senam Santri Bahagia",
        location: "Halaman Kampus Terpadu",
        desc: "Peregangan fisik dan penyemangat pagi bersama seluruh jajaran panitia.",
      },
      {
        time: "08.00 - 10.30",
        title: "Bedah Visi-Misi FAI & Sistem Akademik (SIAKAD)",
        location: "Auditorium KH. Wahab Hasbullah",
        desc: "Bimbingan teknis pemrograman KRS online, kurikulum OBE, dan etika komunikasi dengan dosen.",
      },
      {
        time: "10.30 - 12.00",
        title: "Temu Program Studi (PAI, PBA, PGMI, ES, MPI/HES)",
        location: "Ruang Jurusan Masing-Masing",
        desc: "Diskusi akrab bersama Ketua Program Studi, Dosen Wali, serta Himpunan Mahasiswa Jurusan (HMJ).",
      },
      {
        time: "12.00 - 13.00",
        title: "Ishoma & Khatmil Qur'an Mahasiswa Baru",
        location: "Masjid Kampus UNWAHA",
        desc: "Doa bersama untuk kelancaran masa studi dan keberkahan ilmu.",
      },
      {
        time: "13.00 - 15.30",
        title: "Sosialisasi Perpustakaan & Laboratorium FAI",
        location: "Gedung Riset & Digital Library",
        desc: "Tour literasi digital, aktivasi akun jurnal ilmiah e-library, dan pengenalan lab dakwah.",
      },
    ],
  },
  {
    day: "Hari Ke-3",
    date: "Rabu, 2 September 2026",
    title: "Expo Ormawa, Inagurasi & Penutupan",
    events: [
      {
        time: "07.30 - 10.00",
        title: "Parade & Expo Organisasi Kemahasiswaan (Ormawa)",
        location: "Plaza BEM FAI & Lapangan Kampus",
        desc: "Pameran stan BEM, DEMA, HMJ, UKM Seni Hadrah, Kaligrafi, Olahraga, Pers Kampus, dan Pecinta Alam.",
      },
      {
        time: "10.00 - 12.00",
        title: "Pentas Kreasi & Unjuk Bakat Mahasiswa Baru",
        location: "Panggung Utama Plaza BEM",
        desc: "Penampilan karya seni per kelompok gugus mahasiswa baru yang kreatif dan bernuansa islami.",
      },
      {
        time: "12.00 - 13.00",
        title: "Ishoma & Makan Bersama (Tradisi Tasyakuran)",
        location: "Masjid & Area Terbuka Kampus",
        desc: "Makan bersama menjalin silaturahmi dan kekeluargaan antar angkatan.",
      },
      {
        time: "13.00 - 15.30",
        title: "Penganugerahan Gugus Terbaik & Deklarasi Maba",
        location: "Auditorium KH. Wahab Hasbullah",
        desc: "Pengumuman pemenang video terfavorit, peserta terbaik, ikrar mahasiswa FAI, dan penutupan resmi.",
      },
    ],
  },
];

// Dresscode Requirements
const DRESSCODE_PUTRA = [
  "Peci hitam nasional polos tanpa motif (tinggi 9 atau 10)",
  "Kemeja putih polos lengan panjang (berkerah, bukan kaos)",
  "Dasi hitam panjang formal",
  "Celana panjang kain warna hitam formal (bukan jeans / pensil / jogger)",
  "Ikat pinggang hitam dengan gesper standar",
  "Kaos kaki putih polos di atas mata kaki",
  "Sepatu formal warna dominan hitam tertutup",
  "Jas Almamater Hijau UNWAHA (dibawa/dikenakan sesuai instruksi)",
  "Name Tag resmi PBAK yang sudah dicetak & dikalungkan",
  "Pita pita marun di lengan kiri (tanda pengenal FAI)",
];

const DRESSCODE_PUTRI = [
  "Jilbab segi empat warna putih polos menutup dada (bukan pashmina/bergo)",
  "Ciput/inner jilbab warna senada dan rapi",
  "Kemeja putih polos lengan panjang (tidak transparan, longgar)",
  "Rok panjang kain warna hitam model A-line / rempel (bukan span / berbelah)",
  "Kaos kaki putih panjang polos",
  "Sepatu formal warna dominan hitam tertutup",
  "Jas Almamater Hijau UNWAHA (dibawa/dikenakan sesuai instruksi)",
  "Name Tag resmi PBAK yang sudah dicetak & dikalungkan",
  "Pita pita marun di lengan kiri (tanda pengenal FAI)",
  "Riasan wajah natural dan bersahaja (tidak berlebihan)",
];

// Mandatory Item Checklist
const WAJIB_BAWA = [
  "Buku Panduan PBAK 2026 (versi cetak / digital)",
  "Buku catatan & alat tulis lengkap (pulpen, pensil, map)",
  "Alat salat pribadi (sajadah, sarung untuk putra / mukena untuk putri)",
  "Al-Qur'an terjemah saku / aplikasi mushaf",
  "Tumbler air minum & bekal makan siang higienis",
  "Obat-obatan pribadi bagi yang memiliki riwayat sakit khusus",
  "Hand sanitizer & masker cadangan",
  "Kantong plastik kresek hitam untuk tempat sepatu saat ke masjid",
];

// FAQ Items
const FAQ_ITEMS = [
  {
    q: "Apakah kegiatan PBAK wajib diikuti oleh seluruh mahasiswa baru FAI UNWAHA?",
    a: "Ya, PBAK (Pengenalan Budaya Akademik dan Kemahasiswaan) bersifat WAJIB bagi seluruh mahasiswa baru program sarjana FAI UNWAHA. Sertifikat kelulusan PBAK merupakan salah satu syarat wajib pengajuan ujian skripsi dan SKPI (Surat Keterangan Pendamping Ijazah).",
  },
  {
    q: "Bagaimana jika saya berhalangan hadir karena sakit atau urusan mendesak?",
    a: "Peserta yang berhalangan hadir wajib melampirkan surat keterangan dokter resmi (jika sakit) atau surat izin bermaterai dari orang tua/wali ke Helpdesk Panitia PBAK maksimal H-1 atau pada hari H sebelum acara dimulai. Peserta berhalangan akan diberikan tugas pengganti resmi oleh panitia.",
  },
  {
    q: "Kapan dan di mana saya bisa mengambil jas almamater dan name tag?",
    a: "Jas almamater dapat diambil di Biro Administrasi Akademik & Kemahasiswaan (BAAK) lantai 1 sesuai jadwal antrean pendaftaran. Template Name Tag resmi dapat diunduh gratis pada bagian 'Buku Panduan & Dokumen' di laman ini dan dicetak mandiri oleh peserta.",
  },
  {
    q: "Bagaimana cara mengetahui nomor kelompok gugus dan kakak pendamping saya?",
    a: "Daftar pembagian kelompok gugus akan diumumkan pada H-3 pelaksanaan PBAK melalui grup WhatsApp resmi Mahasiswa Baru FAI UNWAHA 2026 dan diperbaharui di kanal Instagram @bemfai_unwaha.",
  },
  {
    q: "Apakah ada biaya tambahan untuk mengikuti rangkaian kegiatan PBAK?",
    a: "Tidak ada biaya tambahan. Seluruh rangkaian PBAK FAI UNWAHA sudah terintegrasi dengan biaya kemahasiswaan saat registrasi awal di PMB UNWAHA.",
  },
];

export default function PbakContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const captionText = `[SAYA SIAP MENGIKUTI PBAK FAI UNWAHA 2026] 🎓✨

"Menuntut ilmu adalah jalan jihad, dan adab adalah lentera peradabannya."

Halo Civitas Akademika!
Saya [Nama Lengkap], Mahasiswa Baru Program Studi [Nama Prodi], Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah Jombang angkatan 2026 bangga dan siap berkontribusi dalam PBAK FAI UNWAHA 2026!

Bersama Kabinet Perunggu, mari wujudkan generasi cendekiawan muslim yang berakhlak karimah, kritis, dan berdaya saing di era digital.

📍 Fakultas Agama Islam - UNWAHA Jombang
#PBAKFAIUNWAHA2026 #MabaUNWAHA2026 #BEMFAIUNWAHA #KabinetPerunggu #UNWAHAIslamicTechCampus #TambakberasJombang`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(captionText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <main className="flex-grow">
        {/* ─── Hero Section ────────────────────────────────────────── */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF5533]/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#A81B30]/25 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            {/* Top Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-black/50 backdrop-blur-md text-xs font-bold text-amber-300 uppercase tracking-widest mb-4 shadow-lg"
            >
              <Sparkles size={13} className="text-amber-400 animate-pulse" />
              <span>Official Portal — PBAK / PKKMB 2026</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight max-w-4xl mx-auto"
            >
              Pengenalan Budaya Akademik & Kemahasiswaan{" "}
              <span className="text-amber-400 block sm:inline drop-shadow-[0_4px_16px_rgba(217,119,6,0.5)]">
                FAI UNWAHA
              </span>
            </motion.h1>

            {/* Theme Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-3xl mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <p className="text-xs uppercase font-mono tracking-widest text-amber-300 font-bold mb-1">
                Tema PBAK 2026:
              </p>
              <p className="text-slate-100 font-display font-medium text-base md:text-lg italic">
                &ldquo;Membentuk Cendekiawan Muslim Berkarakter Qur&apos;ani, Berintegritas Ilmiah, dan Berdaya Saing Global di Era Digital&rdquo;
              </p>
            </motion.div>

            {/* Quick Fast Numbers / Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10"
            >
              <div className="p-4 rounded-2xl bg-[#240309]/80 border border-white/10 backdrop-blur-md shadow-lg text-center">
                <GraduationCap className="text-amber-400 mx-auto mb-2" size={24} />
                <p className="font-display font-bold text-2xl text-white">5 Prodi</p>
                <p className="text-[11px] text-slate-300 font-sans">Unggulan Keislaman</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#240309]/80 border border-white/10 backdrop-blur-md shadow-lg text-center">
                <Calendar className="text-rose-400 mx-auto mb-2" size={24} />
                <p className="font-display font-bold text-2xl text-white">3 Hari</p>
                <p className="text-[11px] text-slate-300 font-sans">Rangkaian Acara</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#240309]/80 border border-white/10 backdrop-blur-md shadow-lg text-center">
                <Users className="text-amber-400 mx-auto mb-2" size={24} />
                <p className="font-display font-bold text-2xl text-white">500+</p>
                <p className="text-[11px] text-slate-300 font-sans">Mahasiswa Baru</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#240309]/80 border border-white/10 backdrop-blur-md shadow-lg text-center">
                <Building2 className="text-emerald-400 mx-auto mb-2" size={24} />
                <p className="font-display font-bold text-2xl text-white">10+</p>
                <p className="text-[11px] text-slate-300 font-sans">Ormawa & UKM</p>
              </div>
            </motion.div>

            {/* Quick Action Anchor Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link href="#jadwal">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#A81B30] to-[#FF5533] hover:from-[#7F0E1E] hover:to-[#FF5533] transition-all duration-300 shadow-md border border-amber-400/40 cursor-pointer">
                  <Calendar size={14} />
                  <span>Jadwal & Rundown</span>
                </button>
              </Link>
              <Link href="#dresscode">
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer">
                  <Shirt size={14} className="text-amber-400" />
                  <span>Ketentuan Dresscode</span>
                </button>
              </Link>
              <Link href="#twibbon">
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer">
                  <Sparkles size={14} className="text-amber-300" />
                  <span>Twibbon & Penugasan</span>
                </button>
              </Link>
              <Link href="#panduan">
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer">
                  <Download size={14} className="text-emerald-400" />
                  <span>Unduh Panduan</span>
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── Section: Rundown & Timeline ─────────────────────────── */}
        <section id="jadwal" className="py-20 border-t border-white/10 bg-transparent relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-2 font-mono">
                <Clock size={12} />
                Timeline Acara
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
                Rundown Kegiatan <span className="text-amber-400">PBAK 2026</span>
              </h2>
              <p className="text-slate-300 text-sm mt-3 font-sans">
                Pilih tab di bawah untuk melihat rincian agenda per hari mulai dari Technical Meeting hingga Malam Inagurasi.
              </p>
            </div>

            {/* Day Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {RUNDOWN_DATA.map((item, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={item.day}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#A81B30] to-[#FF5533] text-white border border-amber-400/50 shadow-[0_4px_20px_rgba(255,85,51,0.35)] scale-105"
                        : "bg-[#240309]/80 text-slate-300 border border-white/15 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Calendar size={14} className={isActive ? "text-amber-300" : "text-slate-400"} />
                    <span>{item.day}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Day Content Card */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#240309]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase text-amber-400 tracking-wider">
                    {RUNDOWN_DATA[activeTab].date}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">
                    {RUNDOWN_DATA[activeTab].title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200 w-fit">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Wajib Hadir Tepat Waktu</span>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-white/15">
                {RUNDOWN_DATA[activeTab].events.map((evt, eIdx) => (
                  <div key={eIdx} className="relative pl-10 sm:pl-14 group">
                    {/* Timeline Node Point */}
                    <div className="absolute left-1 sm:left-2.5 top-1.5 w-5 h-5 rounded-full border-2 border-amber-400 bg-[#35060F] flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-white/15 text-[11px] font-mono font-bold text-amber-300">
                          <Clock size={12} className="text-amber-400" />
                          {evt.time} WIB
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-sans">
                          <MapPin size={12} className="text-rose-400" />
                          {evt.location}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                        {evt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 leading-relaxed">
                        {evt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Section: Dresscode & Atribut ────────────────────────── */}
        <section id="dresscode" className="py-20 border-t border-white/10 bg-transparent relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-2 font-mono">
                <Shirt size={12} />
                Tata Tertib Busana
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
                Ketentuan Atribut & <span className="text-amber-400">Dress Code</span>
              </h2>
              <p className="text-slate-300 text-sm mt-3 font-sans">
                Standar kerapian berbusana islami dan formal yang wajib dipatuhi oleh seluruh peserta PBAK FAI UNWAHA 2026.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Card Mahasiswa Putra */}
              <div className="bg-[#240309]/85 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-amber-400 to-transparent" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Shirt size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-white">Mahasiswa Putra</h3>
                        <p className="text-xs text-slate-300 font-sans">Standar Pakaian Formal Ikhwan</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                      Putra
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {DRESSCODE_PUTRA.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <Check size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Mahasiswi Putri */}
              <div className="bg-[#240309]/85 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 via-amber-400 to-transparent" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                        <Shirt size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-white">Mahasiswi Putri</h3>
                        <p className="text-xs text-slate-300 font-sans">Standar Pakaian Syar&apos;i Akhwat</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                      Putri
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {DRESSCODE_PUTRI.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <Check size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Perlengkapan Wajib Card */}
            <div className="bg-gradient-to-r from-[#2F050E] to-[#1C0207] border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={24} className="text-amber-400" />
                <h3 className="font-display font-bold text-xl text-white">
                  Barang & Perlengkapan Wajib yang Harus Dibawa
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {WAJIB_BAWA.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-black/40 border border-white/10">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section: Twibbon & Penugasan ────────────────────────── */}
        <section id="twibbon" className="py-20 border-t border-white/10 bg-transparent relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-2 font-mono">
                <Sparkles size={12} />
                Penugasan Kreatif
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
                Twibbon & <span className="text-amber-400">Penugasan Mahasiswa Baru</span>
              </h2>
              <p className="text-slate-300 text-sm mt-3 font-sans">
                Lengkapi penugasan resmi sebelum pelaksanaan PBAK dan semarakkan lini masa media sosial dengan twibbon kebanggaan FAI UNWAHA.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Twibbon Card */}
              <div className="bg-[#240309]/85 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Twibbon Resmi PBAK 2026</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                    Pasang foto terbaikmu dengan seragam kemeja putih dan unggah ke Instagram feeds dan story dengan menandai akun resmi <strong>@bemfai_unwaha</strong>.
                  </p>
                </div>
                <div className="space-y-3">
                  <a
                    href="https://twibbonize.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#A81B30] to-[#FF5533] hover:from-[#7F0E1E] hover:to-[#FF5533] transition-all shadow-md cursor-pointer"
                  >
                    <span>Pasang di Twibbonize</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Esai & Penugasan Akademik Card */}
              <div className="bg-[#240309]/85 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                    <FileText size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Esai Singkat Mahasiswa Baru</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    Tulis esai reflektif 300–500 kata dengan tema: <em>&ldquo;Peran Mahasiswa Muslim dalam Menjaga Moral & Kemajuan Teknologi di Era AI&rdquo;</em>.
                  </p>
                  <div className="text-[11px] text-amber-300 font-mono bg-black/40 p-3 rounded-xl border border-white/10 space-y-1">
                    <p>• Format: PDF, Font Times New Roman 12pt</p>
                    <p>• Dikumpulkan saat Technical Meeting</p>
                  </div>
                </div>
                <div className="pt-6">
                  <Link href="#panduan">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 border border-white/15 hover:bg-white/20 transition-all cursor-pointer">
                      <span>Cek Lembar Format Esai</span>
                      <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Video Perkenalan Diri Card */}
              <div className="bg-[#240309]/85 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                    <Flame size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Video Perkenalan Kreatif</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    Buat video perkenalan berdurasi 30–60 detik (format reels 9:16). Sebutkan nama, asal daerah, alasan memilih FAI UNWAHA, dan harapan masa depan.
                  </p>
                  <div className="text-[11px] text-amber-300 font-mono bg-black/40 p-3 rounded-xl border border-white/10 space-y-1">
                    <p>• Tag: @bemfai_unwaha</p>
                    <p>• Gunakan caption resmi di bawah</p>
                  </div>
                </div>
                <div className="pt-6">
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/40 hover:bg-amber-400/25 transition-all cursor-pointer"
                  >
                    {copiedCaption ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedCaption ? "Caption Berhasil Disalin!" : "Salin Caption Resmi"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Caption Box */}
            <div className="mt-8 bg-[#1B0207]/90 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText size={14} />
                  Template Teks Caption Media Sosial (Instagram / TikTok)
                </span>
                <button
                  onClick={copyToClipboard}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
                >
                  {copiedCaption ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCaption ? "Tersalin" : "Salin Teks"}</span>
                </button>
              </div>
              <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5 overflow-x-auto">
                {captionText}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── Section: Buku Panduan / Guidebook ───────────────────── */}
        <section id="panduan" className="py-20 border-t border-white/10 bg-transparent relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#2D040D]/90 via-[#1A0207]/90 to-[#3A0612]/90 backdrop-blur-xl p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider">
                  <BookOpen size={14} />
                  <span>Buku Panduan Resmi PBAK 2026</span>
                </div>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight">
                  Download Modul & Petunjuk Teknis PBAK
                </h2>
                <p className="text-slate-200 text-sm leading-relaxed font-sans">
                  Dapatkan dokumen lengkap berisi struktur kepanitiaan, lirik lagu mars UNWAHA & totalitas mahasiswa, panduan tata tertib, format lembar tugas esai, serta peta lokasi gedung kampus.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="/assets/logo.png"
                    download="Buku-Panduan-PBAK-FAI-UNWAHA-2026.png"
                    className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-[#A81B30] via-[#FF5533] to-[#7F0E1E] hover:from-[#7F0E1E] hover:to-[#FF5533] transition-all shadow-[0_6px_25px_rgba(255,85,51,0.4)] border border-amber-400/40 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Guidebook (PDF)</span>
                  </a>
                  <a
                    href="/assets/logo.png"
                    download="Name-Tag-PBAK-FAI-UNWAHA-2026.png"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-slate-200 border border-white/20 bg-black/40 hover:bg-white/10 hover:text-white transition-all shadow-md backdrop-blur-md cursor-pointer"
                  >
                    <FileText size={14} />
                    <span>Template Name Tag</span>
                  </a>
                </div>
              </div>

              {/* Decorative Guidebook Visual */}
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-2xl bg-gradient-to-br from-[#7F0E1E] to-[#2B040B] border-2 border-amber-400/40 p-6 flex flex-col justify-between shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center">
                    <GraduationCap size={18} className="text-amber-400" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-300 uppercase">Edisi 2026</span>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[10px] text-slate-300 uppercase font-mono tracking-widest">Guidebook</p>
                  <p className="font-display font-black text-lg text-white leading-tight">PBAK FAI UNWAHA</p>
                  <p className="text-[9px] text-amber-400 font-sans">Kabinet Perunggu</p>
                </div>
                <div className="text-[8px] text-center text-slate-400 border-t border-white/10 pt-2 font-mono">
                  BEM FAI UNWAHA JOMBANG
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section: FAQ Interaktif ─────────────────────────────── */}
        <section id="faq" className="py-20 border-t border-white/10 bg-transparent relative">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-2 font-mono">
                <HelpCircle size={12} />
                Tanya Jawab
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
                Pertanyaan Umum <span className="text-amber-400">(FAQ)</span>
              </h2>
              <p className="text-slate-300 text-sm mt-3 font-sans">
                Jawaban atas pertanyaan yang sering diajukan oleh calon mahasiswa baru mengenai pelaksanaan PBAK FAI UNWAHA.
              </p>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-[#240309]/85 backdrop-blur-md rounded-2xl border border-white/15 overflow-hidden transition-all duration-200 shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-display font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-amber-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-white/10 pt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Helpdesk Contact Banner */}
            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-white">
                    Masih memiliki pertanyaan atau kendala?
                  </h4>
                  <p className="text-xs text-slate-300 font-sans">
                    Hubungi panitia PBAK BEM FAI melalui layanan WhatsApp Helpdesk resmi.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Panitia%20PBAK%20FAI%20UNWAHA%202026,%20saya%20ingin%20bertanya%20mengenai..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Phone size={14} />
                <span>Chat Helpdesk Panitia</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
