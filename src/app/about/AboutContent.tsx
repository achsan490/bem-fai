"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Target, BookOpen, Sparkles, ChevronRight } from "lucide-react";
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
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
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
    <div className="min-h-screen flex flex-col bg-[#180208]">
      <Navbar />

      <main className="flex-grow">
        {/* ── Page Hero ─────────────────────────────────────────── */}
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
              className="font-display font-bold text-4xl md:text-6xl text-white leading-tight max-w-3xl"
            >
              Mengenal{" "}
              <span className="text-primary neon-text-maroon">BEM FAI UNWAHA</span>
            </motion.h1>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-gray-400 font-sans text-base md:text-lg mt-4 max-w-2xl leading-relaxed"
            >
              Visi, Misi, dan Filosofi Organisasi Kemahasiswaan Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah.
            </motion.p>
          </div>
        </section>

        {/* ── Deskripsi Fakultas ────────────────────────────────── */}
        <section className="py-16 border-t border-white/5">
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
                <div className="relative w-56 h-56 rounded-3xl overflow-hidden border border-primary/20 bg-[#100105] p-4 shadow-[0_0_60px_rgba(185,28,28,0.1)]">
                  <Image
                    src="/assets/logo.jpg"
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
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
                  Tentang FAI UNWAHA
                </h2>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${[100, 90, 95, 70][i]}%` }} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300 font-sans leading-relaxed text-sm md:text-base">
                    {content.deskripsi}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Visi & Misi ──────────────────────────────────────── */}
        <section className="py-20 bg-[#070103] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2 font-mono">
                <Sparkles size={10} />
                Landasan Organisasi
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Visi &amp; <span className="text-primary neon-text-maroon">Misi</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visi */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <Eye size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-primary transition-colors">
                  Visi
                </h3>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />)}
                  </div>
                ) : (
                  <p className="text-gray-300 font-sans text-sm leading-relaxed">{content.visi}</p>
                )}
              </motion.div>

              {/* Misi */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <Target size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-primary transition-colors">
                  Misi
                </h3>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />)}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {content.misi.split("\n").filter(Boolean).map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 font-sans text-sm leading-relaxed">
                        <span className="text-primary font-bold mt-0.5 shrink-0">
                          {line.match(/^\d+\./) ? "" : "✦"}
                        </span>
                        <span>{line.replace(/^\d+\.\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Filosofi Logo ─────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-10 rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-transparent"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5 mb-4 font-mono">
                <Sparkles size={10} />
                Filosofi Logo
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">
                Makna Lambang BEM FAI UNWAHA
              </h2>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />)}
                </div>
              ) : (
                <p className="text-gray-300 font-sans leading-relaxed text-sm md:text-base">
                  {content.filosofi_logo}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Proker Section ────────────────────────────────────── */}
        <ProgramSection />
      </main>

      <Footer />
    </div>
  );
}
