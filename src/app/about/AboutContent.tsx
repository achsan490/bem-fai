"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Compass, Target, Award, ShieldCheck } from "lucide-react";
import { db } from "../../lib/supabase";
import CampusSection from "../../components/CampusSection";
import SponsorsSection from "../../components/SponsorsSection";

export default function AboutContent() {
  const [content, setContent] = useState({
    visi: "Menjadi Badan Eksekutif Mahasiswa yang progresif, berintegritas, dan berlandaskan nilai-nilai Islam Ahlussunnah Wal Jamaah An-Nahdliyah dalam mewujudkan mahasiswa FAI UNWAHA yang berdaya saing global.",
    misi: "1. Menyelenggarakan kegiatan akademik dan non-akademik yang berkualitas dan bermutu.\n2. Meningkatkan kapasitas kepemimpinan dan kewirausahaan mahasiswa FAI.\n3. Memperkuat sinergi antar mahasiswa, dosen, dan civitas akademika FAI UNWAHA.\n4. Mengembangkan dakwah digital yang kreatif dan inklusif.\n5. Membangun jaringan alumni yang solid dan saling mendukung.",
    deskripsi: "Fakultas Agama Islam (FAI) Universitas KH. A. Wahab Hasbullah (UNWAHA) Jombang merupakan fakultas unggulan yang mengintegrasikan ilmu keislaman klasik dengan keilmuan kontemporer berbasis pesantren Tambakberas.",
    filosofi_logo: "Logo BEM FAI UNWAHA merupakan perpaduan simbol bintang sembilan yang melambangkan para wali penyebar Islam di Nusantara, dipadukan dengan siluet kitab terbuka dan nuansa merah marun yang melambangkan keberanian dan integritas.",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await db.getSiteContent();
        const v = data.find((x) => x.key === "visi")?.value;
        const m = data.find((x) => x.key === "misi")?.value;
        const d = data.find((x) => x.key === "deskripsi")?.value;
        const f = data.find((x) => x.key === "filosofi_logo")?.value;
        setContent((prev) => ({
          visi: v || prev.visi,
          misi: m || prev.misi,
          deskripsi: d || prev.deskripsi,
          filosofi_logo: f || prev.filosofi_logo,
        }));
      } catch (e) {
        console.error("Gagal memuat konten profil:", e);
      }
    }
    loadData();
  }, []);

  const misiList = content.misi
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <div className="py-20">
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-300 border border-amber-400/30 bg-amber-400/10 mb-4 font-mono">
          <Sparkles size={12} className="text-amber-400" />
          Profil &amp; Identitas
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
          Tentang <span className="text-amber-400">BEM FAI UNWAHA</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
          Wadah representasi, kreativitas, dan advokasi mahasiswa Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah Tambakberas Jombang.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#26030A]/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Kilasan Kelembagaan
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
              Dedikasi Moral, Intelektual, dan Pengabdian Santri
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              {content.deskripsi}
            </p>
            <div className="pt-2">
              <h3 className="text-sm font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Award size={16} />
                Filosofi Lambang
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                {content.filosofi_logo}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-br from-[#6A0D18] to-[#3B0611] border border-white/20 p-8 shadow-2xl flex items-center justify-center">
              <Image
                src="/assets/logo.webp"
                alt="Logo BEM FAI UNWAHA"
                width={220}
                height={220}
                className="object-contain filter drop-shadow(0 0 15px rgba(255,85,51,0.3))"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#26030A]/80 border border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Compass size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Arah Strategis
              </span>
              <h2 className="font-display text-2xl font-bold text-white mt-1 mb-4">Visi BEM FAI</h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light italic">
                &ldquo;{content.visi}&rdquo;
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>Berlandaskan Ahlussunnah Wal Jamaah An-Nahdliyah</span>
            </div>
          </div>

          <div className="bg-[#26030A]/80 border border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
              <Target size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
              Langkah Nyata
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1 mb-4">Misi Organisasi</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              {misiList.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#A81B30]/40 text-amber-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{m.replace(/^\d+[\.\)]\s*/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CampusSection />
      <SponsorsSection />
    </div>
  );
}
