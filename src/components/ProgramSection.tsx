"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Compass,
  Heart,
  Trophy,
  Megaphone,
  ChevronLeft,
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
    return <Users className="text-primary" size={20} />;
  }
  if (divLower.includes("keagamaan") || divLower.includes("syariah") || divLower.includes("kajian")) {
    return <Compass className="text-amber-600" size={20} />;
  }
  if (divLower.includes("pengabdian") || divLower.includes("masyarakat") || divLower.includes("sosial")) {
    return <Heart className="text-rose-500" size={20} />;
  }
  if (divLower.includes("minat") || divLower.includes("bakat") || divLower.includes("olahraga") || divLower.includes("seni")) {
    return <Trophy className="text-blue-500" size={20} />;
  }
  if (divLower.includes("komunikasi") || divLower.includes("media") || divLower.includes("publikasi")) {
    return <Megaphone className="text-emerald-600" size={20} />;
  }
  return <Activity className="text-slate-400" size={20} />;
};

const getStatusBadge = (status: Program["status"]) => {
  switch (status) {
    case "Selesai":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Selesai
        </span>
      );
    case "Berjalan":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-amber-600 border border-amber-200 bg-amber-50 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Berjalan
        </span>
      );
    case "Terencana":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200 bg-slate-50 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Terencana
        </span>
      );
  }
};

const cardVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      delay: index * 0.08,
      delayChildren: 0.15,
      staggerChildren: 0.07
    }
  })
};

const childVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const
    }
  }
};

export default function ProgramSection({ previewMode = false }: Props) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft } = containerRef.current;
    const children = containerRef.current.children;
    if (children.length === 0) return;
    const cardWidth = (children[0] as HTMLElement).offsetWidth + 24; // 24px is gap-6
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    if (children.length === 0) return;
    const cardWidth = (children[0] as HTMLElement).offsetWidth + 24;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollTo = (index: number) => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    if (children.length === 0) return;
    const cardWidth = (children[0] as HTMLElement).offsetWidth + 24;
    containerRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

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
      <section className="py-20 bg-transparent text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">Memuat Program Kerja BEM...</p>
        </div>
      </section>
    );
  }

  if (programs.length === 0) return null;

  return (
    <section id="proker" className="py-24 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Background Smooth Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#2B050D]/90 via-[#2B050D]/40 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-2.5 font-mono"
          >
            <ChevronRight size={12} className="text-amber-400" />
            Program Kerja Unggulan
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight"
          >
            Aksi Nyata BEM <span className="text-amber-400 font-black">FAI UNWAHA</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 font-sans text-sm md:text-base mt-4 leading-relaxed max-w-2xl mx-auto"
          >
            Rangkaian inisiatif dan program strategis yang dirancang untuk memberdayakan mahasiswa FAI UNWAHA, menciptakan kontribusi sosial, dan memperkuat kepemimpinan Qur'ani.
          </motion.p>
        </div>

        {/* Carousel Slider */}
        <div className="relative group/carousel">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between pointer-events-none px-2 md:-mx-8">
            <button
              onClick={() => scroll("left")}
              className={`pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-[#250309]/90 text-white shadow-md flex items-center justify-center hover:bg-[#3E0610] hover:text-amber-400 transition-all duration-200 cursor-pointer ${
                activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 shadow-lg"
              }`}
              disabled={activeIndex === 0}
              aria-label="Previous programs"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-[#250309]/90 text-white shadow-md flex items-center justify-center hover:bg-[#3E0610] hover:text-amber-400 transition-all duration-200 cursor-pointer ${
                activeIndex >= programs.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 shadow-lg"
              }`}
              disabled={activeIndex >= programs.length - 1}
              aria-label="Next programs"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carousel Slider Track */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-6 pt-2 px-1"
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                whileHover={{
                  boxShadow: "0 16px 35px rgba(0, 0, 0, 0.4)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  y: -6
                }}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] bg-[#26040A]/85 backdrop-blur-md p-6 rounded-2xl border border-white/15 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Header row: Division icon + status badge */}
                <motion.div variants={childVariants} className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    {getDivisionIcon(program.division)}
                  </div>
                  {getStatusBadge(program.status)}
                </motion.div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-start">
                  <motion.span variants={childVariants} className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase mb-1.5">
                    {program.division}
                  </motion.span>
                  <motion.h4 variants={childVariants} className="font-display font-bold text-base text-white leading-snug hover:text-amber-400 transition-colors mb-2.5">
                    {program.name}
                  </motion.h4>
                  <motion.p variants={childVariants} className="text-xs text-slate-300 font-sans leading-relaxed">
                    {program.description}
                  </motion.p>
                </div>

                {/* Footer timeline row */}
                <motion.div variants={childVariants} className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-200 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-200" />
                    Target: {program.target_timeline}
                  </span>
                  <span className="text-amber-400 font-bold">BEM FAI</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Morphing Dots Indicators */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {programs.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? "w-8 bg-amber-400"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
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
              href="/about#proker"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-amber-400/40 text-amber-300 bg-black/50 hover:bg-black/70 hover:text-amber-200 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xl backdrop-blur-md cursor-pointer"
            >
              <span>Lihat Semua Program Kerja</span>
              <ArrowRight size={14} className="text-amber-400" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

