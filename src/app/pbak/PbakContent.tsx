"use client";

import { Calendar, GraduationCap } from "lucide-react";
import PbakSection from "../../components/PbakSection";
import SponsorsSection from "../../components/SponsorsSection";

export default function PbakContent() {
  return (
    <div className="py-20">
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-300 border border-amber-400/30 bg-amber-400/10 mb-4 font-mono">
          <GraduationCap size={14} className="text-amber-400" />
          PBAK FAI UNWAHA 2026
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
          Portal Resmi <span className="text-amber-400">PBAK / PKKMB</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
          Panduan lengkap, tata tertib, rundown, dan informasi registrasi Pengenalan Budaya Akademik dan Kemahasiswaan Fakultas Agama Islam UNWAHA.
        </p>
      </section>

      <PbakSection />

      <section id="jadwal" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#26030A]/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                Rundown Kegiatan PBAK
              </h2>
              <p className="text-xs text-white/60">Jadwal pelaksanaan tahapan mahasiswa baru</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#180206] border border-white/10">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">Hari ke-1</span>
              <h3 className="font-display font-bold text-white text-base mt-1">Pembukaan &amp; Stadium General</h3>
              <p className="text-xs text-white/70 mt-2 font-light leading-relaxed">
                Upacara penyambutan resmi oleh Dekanat FAI UNWAHA, materi kebangsaan dan wawasan keislaman Aswaja.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#180206] border border-white/10">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">Hari ke-2</span>
              <h3 className="font-display font-bold text-white text-base mt-1">Pengenalan Jurusan &amp; Prodi</h3>
              <p className="text-xs text-white/70 mt-2 font-light leading-relaxed">
                Sosialisasi kurikulum prodi (PAI, HES, MPI), pengisian KRS perdana, dan diskusi akademik bersama dosen pembimbing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#180206] border border-white/10">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">Hari ke-3</span>
              <h3 className="font-display font-bold text-white text-base mt-1">Inagurasi &amp; Budaya Santri</h3>
              <p className="text-xs text-white/70 mt-2 font-light leading-relaxed">
                Malam pentas seni budaya mahasiswa, pelantikan anggota muda BEM FAI, dan penutupan simbolik.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SponsorsSection />
    </div>
  );
}
