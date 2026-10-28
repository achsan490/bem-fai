"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const SLOGANS = [
  "Selamat Datang di BEM FAI UNWAHA",
  "Mewujudkan UNWAHA Islamic Tech Campus",
  "Membentuk Pemimpin Berkarakter Qur'ani",
  "Kabinet Perunggu: Sinergi & Prestasi"
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(SLOGANS[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Delay first typing cycle slightly so initial page load/LCP is not blocked
    const initTimer = setTimeout(() => {
      setHasStarted(true);
      setIsDeleting(true);
    }, 2800);
    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let timer: NodeJS.Timeout;
    const fullText = SLOGANS[wordIndex];

    const type = () => {
      if (!isDeleting) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
        if (displayText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2800);
          return;
        }
      } else {
        setDisplayText(fullText.slice(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % SLOGANS.length);
          return;
        }
      }

      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, isDeleting ? 40 : 90);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, hasStarted]);

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent"
    >
      {/* Background Soft Glows (Optimized Blur for GPU) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-[#FF5533]/20 via-[#A81B30]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-b from-[#A81B30]/10 via-[#FF5533]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5533]/40 to-transparent pointer-events-none" />

      {/* Subtle Floating Ambient Dots (Lightweight, No Backdrop Filter) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-400/15"
            style={{
              width: `${(i + 1) * 8}px`,
              height: `${(i + 1) * 8}px`,
              left: `${18 + i * 16}%`,
              top: `${25 + (i % 3) * 20}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-black/40 text-xs font-bold text-amber-300 uppercase tracking-widest cursor-default shadow-lg backdrop-blur-md mb-6">
          <Sparkles size={12} className="text-amber-400 animate-pulse" />
          <span>Kabinet Perunggu — BEM FAI 2026</span>
        </div>

        {/* Hero Title & Subtitles */}
        <div className="space-y-4 w-full flex flex-col items-center">
          <p className="text-xs md:text-sm text-amber-400 uppercase tracking-widest font-bold font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Laman Resmi Badan Eksekutif Mahasiswa
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            Fakultas Agama Islam <span className="text-amber-400 font-black block sm:inline drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">UNWAHA</span>
          </h1>
          <p className="text-lg md:text-xl text-white font-semibold font-sans tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Universitas KH. A. Wahab Hasbullah Jombang
          </p>

          {/* Typewriter Text Container */}
          <div className="h-8 flex items-center justify-center pt-2">
            <p className="text-sm md:text-base text-amber-300 font-sans tracking-wider font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {displayText}
              <span className="inline-block w-[2px] h-4 ml-1 bg-amber-400 animate-pulse" />
            </p>
          </div>

          <p className="max-w-3xl text-sm md:text-base text-slate-100 font-sans leading-relaxed pt-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            <strong className="text-amber-300 font-bold">PERUNGGU (Peradaban Unggul)</strong> adalah simbol gerakan mahasiswa yang bertumbuh melalui proses, ketekunan, dan kolaborasi untuk menciptakan perubahan yang bermakna. Berlandaskan kepedulian, pemikiran kritis, dan semangat inovasi. Kabinet Perunggu hadir sebagai wadah lahirnya generasi yang progresif, dan berdampak bagi kampus maupun masyarakat. Bukan tentang menjadi yang paling tinggi, melainkan tentang menjadi yang paling bermanfaat dalam membangun peradaban yang unggul.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-6 justify-center flex-wrap">
          <Link
            href="/pbak"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-[#A81B30] via-[#FF5533] to-[#7F0E1E] hover:from-[#7F0E1E] hover:to-[#FF5533] transition-all duration-300 shadow-[0_6px_25px_rgba(255,85,51,0.4)] border border-amber-400/40 cursor-pointer active:scale-98"
          >
            <Sparkles size={14} className="text-amber-300" />
            <span>Info PBAK 2026</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="#proker"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-slate-200 border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer active:scale-98"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>Program Kerja</span>
          </Link>

          <Link
            href="#artikel"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-extrabold tracking-wider uppercase text-slate-200 border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer active:scale-98"
          >
            <BookOpen size={14} />
            <span>Artikel Terbaru</span>
          </Link>
        </div>

        {/* Large Centered Building Photo (LCP Optimized - Rendered Instantly Without Motion Delay) */}
        <div className="relative w-full max-w-5xl h-[300px] sm:h-[450px] md:h-[500px] mt-12 flex items-center justify-center">
          {/* Subtle background glow */}
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#A81B30]/15 blur-3xl pointer-events-none" />

          <Image
            src="/assets/gedung1.webp"
            alt="Gedung FAI UNWAHA"
            fill
            className="object-contain"
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
      </div>
    </section>
  );
}


