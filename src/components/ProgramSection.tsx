"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Compass,
  Heart,
  Trophy,
  Megaphone,
  ChevronRight,
  ArrowRight,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { db } from "../lib/supabase";
import { Program } from "../types/database.types";

interface Props {
  previewMode?: boolean;
}

const getDivisionIcon = (division: string) => {
  const divLower = division.toLowerCase();
  if (divLower.includes("kaderisasi") || divLower.includes("psdm")) {
    return <Users className="text-[#b91c1c]" size={20} />;
  }
  if (divLower.includes("keagamaan") || divLower.includes("syariah") || divLower.includes("kajian")) {
    return <Compass className="text-amber-500" size={20} />;
  }
  if (divLower.includes("pengabdian") || divLower.includes("masyarakat") || divLower.includes("sosial")) {
    return <Heart className="text-rose-500" size={20} />;
  }
  if (divLower.includes("minat") || divLower.includes("bakat") || divLower.includes("olahraga") || divLower.includes("seni")) {
    return <Trophy className="text-blue-500" size={20} />;
  }
  if (divLower.includes("komunikasi") || divLower.includes("media") || divLower.includes("publikasi")) {
    return <Megaphone className="text-emerald-500" size={20} />;
  }
  return <Activity className="text-gray-400" size={20} />;
};

const getStatusBadge = (status: Program["status"]) => {
  switch (status) {
    case "Selesai":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Selesai
        </span>
      );
    case "Berjalan":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/20 bg-amber-500/5 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Berjalan
        </span>
      );
    case "Terencana":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 border border-white/5 bg-white/5 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
          Terencana
        </span>
      );
  }
};

export default function ProgramSection({ previewMode = false }: Props) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrograms() {
      try {
        setLoading(true);
        const data = await db.getPrograms();
        setPrograms(previewMode ? data.slice(0, 3) : data.slice(0, 5));
      } catch (err) {
        console.error("Failed to load programs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[#070103] text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Memuat Program Kerja BEM...</p>
        </div>
      </section>
    );
  }

  if (programs.length === 0) return null;

  return (
    <section id="proker" className="py-24 bg-[#070103] border-t border-white/5 relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2 font-mono"
          >
            <ChevronRight size={10} className="text-primary" />
            Program Kerja Unggulan
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl md:text-4xl text-white"
          >
            Aksi Nyata BEM <span className="text-primary neon-text-maroon">FAI UNWAHA</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-sans text-sm md:text-base mt-4 leading-relaxed"
          >
            Komitmen kami untuk mewujudkan sinergi akademik, kepemimpinan progresif, serta pengabdian sosial mahasiswa yang inklusif dan berkelanjutan.
          </motion.p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                boxShadow: "0 0 25px rgba(185, 28, 28, 0.05)",
                borderColor: "rgba(185, 28, 28, 0.25)",
                y: -4
              }}
              className="glass p-6 rounded-2xl border border-white/5 bg-[#100105]/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header row: Division icon + status badge */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                  {getDivisionIcon(program.division)}
                </div>
                {getStatusBadge(program.status)}
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col justify-start">
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mb-1.5">
                  {program.division}
                </span>
                <h4 className="font-display font-bold text-base text-white leading-snug hover:text-primary transition-colors mb-2.5">
                  {program.name}
                </h4>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* Footer timeline row */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-gray-600" />
                  Target: {program.target_timeline}
                </span>
                <span className="text-primary font-bold">BEM FAI</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preview Mode — link to full proker section */}
        {previewMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-all duration-200"
            >
              Lihat Semua Program Kerja
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
