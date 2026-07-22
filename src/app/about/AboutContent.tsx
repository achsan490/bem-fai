"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Eye, Target, BookOpen, Sparkles, ChevronRight, Hand } from "lucide-react";
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

// Sandbox seed elements
const SANDBOX_ITEMS = [
  { id: 1, label: "ðŸ‘‘ Presiden BEM", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { id: 2, label: "âœ¨ Wakil Presiden BEM", color: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  { id: 3, label: "ðŸ“ Birokrasi & Administrasi", color: "bg-purple-100 text-purple-800 border-purple-300" },
  { id: 4, label: "ðŸ“š Kajian Keagamaan & Syariah", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { id: 5, label: "ðŸ¤ Pengabdian Masyarakat", color: "bg-rose-100 text-rose-800 border-rose-300" },
  { id: 6, label: "ðŸ† Minat & Bakat (Olahraga)", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: 7, label: "ðŸ“¢ Komunikasi & Media Publikasi", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { id: 8, label: "ðŸš€ Visi Progresif & Islami", color: "bg-teal-100 text-teal-800 border-teal-300" },
  { id: 9, label: "ðŸ’¼ Sinergi Alumni", color: "bg-cyan-100 text-cyan-800 border-cyan-300" },
];

export default function AboutContent() {
  const [content, setContent] = useState<ContentMap>({
    visi: "",
    misi: "",
    deskripsi: "",
    filosofi_logo: "",
  });
  const [loading, setLoading] = useState(true);
  const sandboxRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen flex flex-col bg-[#F9F8FD]">
      <Navbar />

      <main className="flex-grow">
        {/* â”€â”€ Page Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.span
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5 mb-3 font-mono"
            >
              <ChevronRight size={10} />
              Tentang Kami
            </motion.span>
            <motion.h1
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-display font-bold text-4xl md:text-6xl text-slate-800 leading-tight max-w-3xl"
            >
              Mengenal <span className="text-primary font-extrabold">BEM FAI UNWAHA</span>
            </motion.h1>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-slate-600 font-sans text-base md:text-lg mt-4 max-w-2xl leading-relaxed"
            >
              Visi, Misi, dan Filosofi Organisasi Kemahasiswaan Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah.
            </motion.p>
          </div>
        </section>

        {/* â”€â”€ Deskripsi Fakultas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-16 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Logo / Image Side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-56 h-56 rounded-3xl overflow-hidden border border-primary/10 bg-white p-4 shadow-[0_8px_30px_rgba(128,0,32,0.06)]">
                  <Image
                    src="/assets/logo.png"
                    alt="Logo BEM FAI UNWAHA"
                    fill
                    className="object-contain p-4"
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
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5 font-mono">
                  <BookOpen size={10} />
                  Deskripsi Fakultas
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-800">
                  Tentang FAI UNWAHA
                </h2>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" style={{ width: `${[100, 90, 95, 70][i]}%` }} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 font-sans leading-relaxed text-sm md:text-base">
                    {content.deskripsi}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Visi & Misi â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2 font-mono">
                <Sparkles size={10} />
                Landasan Organisasi
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-800">
                Visi &amp; <span className="text-primary font-extrabold">Misi</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visi */}
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-[#F8E8EB] p-8 rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_25px_rgba(128,0,32,0.10)] hover:shadow-[0_16px_35px_rgba(128,0,32,0.18)] group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-5">
                    <Eye size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-800 mb-4 group-hover:text-primary transition-colors">
                    Visi
                  </h3>
                  {loading ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => <div key={i} className="h-4 bg-slate-200 rounded animate-pulse" />)}
                    </div>
                  ) : (
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">{content.visi}</p>
                  )}
                </div>
              </motion.div>

              {/* Misi */}
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.15 }}
                className="bg-[#F8E8EB] p-8 rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_25px_rgba(128,0,32,0.10)] hover:shadow-[0_16px_35px_rgba(128,0,32,0.18)] group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-5">
                    <Target size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-800 mb-4 group-hover:text-primary transition-colors">
                    Misi
                  </h3>
                  {loading ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-slate-200 rounded animate-pulse" />)}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {content.misi.split("\n").filter(Boolean).map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 font-sans text-sm leading-relaxed">
                          <span className="text-primary font-bold mt-0.5 shrink-0">
                            {line.match(/^\d+\./) ? "" : "âœ¦"}
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

        {/* â”€â”€ Filosofi Logo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-20 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-[#F8E8EB] p-10 rounded-3xl border border-primary/20 shadow-[0_10px_25px_rgba(128,0,32,0.10)] bg-gradient-to-br from-primary/10 to-transparent"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5 mb-4 font-mono">
                <Sparkles size={10} />
                Filosofi Logo
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-800 mb-6">
                Makna Lambang BEM FAI UNWAHA
              </h2>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-slate-100 rounded animate-pulse" />)}
                </div>
              ) : (
                <p className="text-slate-600 font-sans leading-relaxed text-sm md:text-base">
                  {content.filosofi_logo}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* â”€â”€ Interactive Sandbox Area â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2 font-mono">
                <Hand size={10} />
                Eksplorasi Interaktif
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-800">
                Kabinet Sandbox
              </h2>
              <p className="text-slate-500 font-sans text-xs md:text-sm mt-2 leading-relaxed">
                Tekan dan geser kartu-kartu struktur BEM FAI UNWAHA di bawah ini untuk membuat visualisasi susunan organisasi Anda!
              </p>
            </div>

            <div 
              ref={sandboxRef}
              className="relative w-full h-[400px] overflow-hidden bg-[#F5F4FA] border border-dashed border-primary/20 rounded-3xl p-4 flex flex-wrap gap-3 items-center justify-center select-none shadow-inner"
            >
              {SANDBOX_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  drag
                  dragConstraints={sandboxRef}
                  whileDrag={{ scale: 1.08, zIndex: 50, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" }}
                  className={`px-4 py-2.5 rounded-xl border text-xs md:text-sm font-semibold tracking-wide cursor-grab active:cursor-grabbing shadow-sm flex items-center gap-2 ${item.color}`}
                  style={{
                    position: "relative",
                  }}
                  initial={{
                    x: Math.round(Math.sin(idx) * 20),
                    y: Math.round(Math.cos(idx) * 20),
                  }}
                >
                  {item.label}
                </motion.div>
              ))}
              <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-400 pointer-events-none flex items-center gap-1">
                <span>Drag area sandbox</span>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Proker Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <ProgramSection />
      </main>

      <Footer />
    </div>
  );
}

