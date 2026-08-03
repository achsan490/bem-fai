"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Target, BookOpen, Sparkles, ChevronRight, Users, ShieldCheck, HeartHandshake, Trophy, Megaphone, Layers } from "lucide-react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgramSection from "../../components/ProgramSection";
import { db } from "../../lib/supabase";

interface ContentMap {
  visi: string;
  misi: string;
  deskripsi: string;
  filosofi_logo: string;
}

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function AboutContent() {
  const [content, setContent] = useState<ContentMap>({
    visi: "",
    misi: "",
    deskripsi: "",
    filosofi_logo: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getSiteContent()
      .then((items) => {
        const map: Partial<ContentMap> = {};
        items.forEach((item) => {
          (map as Record<string, string>)[item.key] = item.value;
        });
        setContent((prev) => ({ ...prev, ...map }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <main className="flex-grow">
        {/* —————————————————————————————————————————————————————————— */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.span
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 mb-3 font-mono"
            >
              <ChevronRight size={10} />
              Tentang Kami
            </motion.span>
            <motion.h1
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-display font-bold text-4xl md:text-6xl text-white leading-tight max-w-3xl"
            >
              Mengenal <span className="text-amber-400 font-extrabold">BEM FAI UNWAHA</span>
            </motion.h1>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-slate-300 font-sans text-base md:text-lg mt-4 max-w-2xl leading-relaxed"
            >
              Visi, Misi, dan Filosofi Organisasi Kemahasiswaan Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah.
            </motion.p>
          </div>
        </section>

        {/* ——— Deskripsi Fakultas ——————————————————————————————————————————— */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Logo / Image Side (Fixed dark crimson bg so white logo mark pops!) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-56 h-56 rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-[#6A0D18] to-[#250309] p-6 shadow-2xl flex items-center justify-center">
                  <Image
                    src="/assets/logo.png"
                    alt="Logo BEM FAI UNWAHA"
                    fill
                    className="object-contain p-6 filter drop-shadow(0 0 8px rgba(255,255,255,0.4))"
                  />
                </div>
              </motion.div>

              {/* Deskripsi Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 font-mono">
                  <BookOpen size={10} />
                  Deskripsi Fakultas
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                  Tentang FAI UNWAHA
                </h2>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" style={{ width: `${[100, 90, 95, 70][i]}%` }} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-300 font-sans leading-relaxed text-sm md:text-base">
                    {content.deskripsi}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ——— Visi & Misi ——————————————————————————————————————————— */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-2 font-mono">
                <Sparkles size={10} />
                Landasan Organisasi
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Visi &amp; <span className="text-amber-400 font-extrabold">Misi</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visi */}
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-[#26040A]/85 backdrop-blur-md p-8 rounded-2xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-5">
                    <Eye size={22} className="text-amber-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-amber-400 transition-colors">
                    Visi
                  </h3>
                  {loading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => <div key={i} className="h-4 bg-slate-200 rounded animate-pulse" />)}
                    </div>
                  ) : (
                    <p className="text-slate-300 font-sans text-sm leading-relaxed">{content.visi}</p>
                  )}
                </div>
              </motion.div>

              {/* Misi */}
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.15 }}
                className="bg-[#26040A]/85 backdrop-blur-md p-8 rounded-2xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-5">
                    <Target size={22} className="text-amber-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-amber-400 transition-colors">
                    Misi
                  </h3>
                  {loading ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-slate-200 rounded animate-pulse" />)}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {content.misi.split("\n").filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 font-sans text-sm leading-relaxed">
                          <span className="text-amber-400 font-bold mt-0.5 shrink-0">
                            {line.match(/^\d+\./) ? "" : "✦"}
                          </span>
                          <span>{line.replace(/^\d+\.\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Dark Velvet Section Wrapper --- */}
        <div className="bg-[#1A0307]">
          {/* ——— Filosofi Logo ———————————————————————————— */}
          <section className="py-20 border-t border-white/10">
            <div className="max-w-5xl mx-auto px-6">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-[#26040A]/85 backdrop-blur-md p-10 rounded-3xl border border-white/15 shadow-xl bg-gradient-to-br from-[#6A0D18]/30 to-transparent"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 mb-4 font-mono">
                  <Sparkles size={10} />
                  Filosofi Logo
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">
                  Makna Lambang BEM FAI UNWAHA
                </h2>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />)}
                  </div>
                ) : (
                  <p className="text-slate-200 font-sans leading-relaxed text-sm md:text-base">
                    {content.filosofi_logo}
                  </p>
                )}
              </motion.div>
            </div>
          </section>

          {/* Pilar & Departemen Kepengurusan */}
          <section className="py-20 bg-transparent border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-14">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-2 font-mono">
                  <Layers size={10} />
                  Struktur &amp; Pilar Organisasi
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                  Kementerian &amp; <span className="text-amber-400 font-extrabold">Divisi BEM FAI</span>
                </h2>
                <p className="text-slate-300 font-sans text-xs md:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                  Mengenal 5 bidang kementerian dan pilar kerja utama yang menggerakkan roda organisasi BEM FAI UNWAHA secara progresif dan islami.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Divisi 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-[#26040A]/85 backdrop-blur-md p-7 rounded-3xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Users size={22} className="text-amber-400" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                      Kaderisasi &amp; PSDM
                    </h3>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                      Pengembangan Sumber Daya Mahasiswa melatih jiwa kepemimpinan (LKMM), kaderisasi mahasiswa baru, dan potensi intelektual FAI.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#Kepemimpinan</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#LKMM</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#PSDM</span>
                  </div>
                </motion.div>

                {/* Divisi 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#26040A]/85 backdrop-blur-md p-7 rounded-3xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={22} className="text-amber-400" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                      Kajian Keagamaan &amp; Syariah
                    </h3>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                      Penyelenggara kajian rutin keislaman, diskusi isu syariah kontemporer, serta penguat nilai keagamaan civitas akademika.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#KajianSyariah</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#SyiarIslam</span>
                  </div>
                </motion.div>

                {/* Divisi 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#26040A]/85 backdrop-blur-md p-7 rounded-3xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <HeartHandshake size={22} className="text-amber-400" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                      Pengabdian Masyarakat (Pengmas)
                    </h3>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                      Pelaksana bakti sosial kemanusiaan, program desa binaan, serta aksi peduli masyarakat di wilayah Jombang dan sekitarnya.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#BaktiSosial</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#DesaBinaan</span>
                  </div>
                </motion.div>

                {/* Divisi 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-[#26040A]/85 backdrop-blur-md p-7 rounded-3xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Trophy size={22} className="text-amber-400" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                      Minat, Bakat &amp; Seni Olahraga
                    </h3>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                      Wadah apresiasi bakti seni, kejuaraan kompetisi olahraga antar prodi, dan ruang ekspresi minat mahasiswa FAI.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#PekanOlahraga</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#SeniKreatif</span>
                  </div>
                </motion.div>

                {/* Divisi 5 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-[#26040A]/85 backdrop-blur-md p-7 rounded-3xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 shadow-xl group flex flex-col justify-between md:col-span-2 lg:col-span-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Megaphone size={22} className="text-amber-400" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                      Komunikasi &amp; Media Publikasi
                    </h3>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                      Pengelolaan informasi publikasi digital, branding visual organisasi, jurnalisme kampus, dan layanan humas BEM FAI.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#MediaDigital</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20">#PublikasiFAI</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* â”€â”€ Proker Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <ProgramSection />
      </main>

      <Footer />
    </div>
  );
}

