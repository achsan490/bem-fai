"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  FileText,
  Sparkles,
  ArrowRight,
  Shirt,
  Download,
  HelpCircle,
  Clock,
  Compass,
  CheckCircle2,
  ChevronRight,
  Flame,
} from "lucide-react";

const quickCards = [
  {
    icon: <Calendar size={22} className="text-amber-400" />,
    badge: "Agenda & Jadwal",
    title: "Rundown & Timeline",
    description: "Rangkaian acara Pra-PBAK, Stadium General, Pengenalan Jurusan, hingga Inagurasi Budaya Mahasiswa.",
    linkText: "Lihat Jadwal",
    href: "/pbak#jadwal",
  },
  {
    icon: <Shirt size={22} className="text-rose-400" />,
    badge: "Tata Tertib",
    title: "Ketentuan Dress Code & Atribut",
    description: "Standar seragam resmi kemeja putih, almamater, pita fakultas, dan atribut kelengkapan maba putra & putri.",
    linkText: "Cek Atribut",
    href: "/pbak#dresscode",
  },
  {
    icon: <FileText size={22} className="text-amber-400" />,
    badge: "Dokumen Resmi",
    title: "Buku Panduan & Penugasan",
    description: "Unduh modul panduan PBAK 2026, lembar tugas esai, serta link pemasangan twibbon resmi mahasiswa baru.",
    linkText: "Unduh Modul",
    href: "/pbak#panduan",
  },
  {
    icon: <HelpCircle size={22} className="text-emerald-400" />,
    badge: "Bantuan & FAQ",
    title: "Narahubung & Tanya Jawab",
    description: "Pusat bantuan panitia PBAK BEM FAI melalui WhatsApp Helpdesk untuk kendala registrasi dan perlengkapan.",
    linkText: "Tanya Panitia",
    href: "/pbak#faq",
  },
];

const cardVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      delay: (index % 4) * 0.08,
    },
  }),
};

export default function PbakSection() {
  return (
    <section id="pbak" className="py-24 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#FF5533]/20 via-[#A81B30]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid line accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Banner Card Header */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-[#2B040B]/90 via-[#1C0207]/90 to-[#35060F]/90 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden mb-12">
          {/* Subtle top border glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5533] via-amber-400 to-[#A81B30]" />

          {/* Floating Decorative Elements */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-black/50 backdrop-blur-md text-[11px] font-bold text-amber-300 uppercase tracking-widest shadow-md">
            <Flame size={14} className="text-amber-400 animate-pulse" />
            <span>Mahasiswa Baru 2026</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider"
            >
              <GraduationCap size={14} className="text-amber-400" />
              <span>Portal Resmi PBAK / PKKMB FAI UNWAHA</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
            >
              Selamat Datang Mahasiswa Baru di{" "}
              <span className="text-amber-400 block sm:inline">PBAK FAI UNWAHA 2026</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-200 font-sans text-sm md:text-base leading-relaxed"
            >
              Pengenalan Budaya Akademik dan Kemahasiswaan (PBAK) adalah gerbang awal transformasi intelektual dan spiritual menuju mahasiswa Fakultas Agama Islam UNWAHA yang berakhlak mulia, kritis, inovatif, dan berwawasan global.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4 flex flex-wrap gap-4 items-center"
            >
              <Link href="/pbak">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-[#A81B30] via-[#FF5533] to-[#7F0E1E] hover:from-[#7F0E1E] hover:to-[#FF5533] transition-all duration-300 shadow-[0_6px_25px_rgba(255,85,51,0.4)] border border-amber-400/40 cursor-pointer"
                >
                  <Sparkles size={14} className="text-amber-300" />
                  <span>Buka Portal Lengkap PBAK</span>
                  <ArrowRight size={14} />
                </motion.button>
              </Link>

              <Link href="/pbak#panduan">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-slate-200 border border-white/20 bg-black/40 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer"
                >
                  <Download size={14} className="text-amber-400" />
                  <span>Unduh Panduan Maba</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 4 Feature Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickCards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
              whileHover={{
                boxShadow: "0 16px 35px rgba(0, 0, 0, 0.45)",
                borderColor: "rgba(251, 191, 36, 0.35)",
                y: -6,
              }}
              className="bg-[#240309]/85 backdrop-blur-md p-6 rounded-2xl border border-white/15 transition-all duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                    {card.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300/80 font-mono">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors leading-snug mb-2.5">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={card.href}
                  className="text-[11px] font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-all duration-200 group-hover:translate-x-1"
                >
                  <span>{card.linkText}</span>
                  <ChevronRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
