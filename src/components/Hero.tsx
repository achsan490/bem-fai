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
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = SLOGANS[wordIndex];

    const type = () => {
      if (!isDeleting) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
        if (displayText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500); // Wait before backspacing
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
      
      const speed = isDeleting ? 30 : 60;
      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, isDeleting ? 20 : 80);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#F9F8FD]"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[110px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(127,84,164,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,84,164,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm"
            style={{
              width: `${(i + 1) * 15}px`,
              height: `${(i + 1) * 15}px`,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 22}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary uppercase tracking-widest cursor-default shadow-[0_4px_15px_rgba(127,84,164,0.05)] mb-6"
        >
          <Sparkles size={12} className="text-amber-600 animate-pulse" />
          <span>Kabinet Perunggu — BEM FAI 2026</span>
        </motion.div>

        {/* Hero Title & Subtitles */}
        <div className="space-y-4 w-full flex flex-col items-center">
          <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold font-mono">
            Laman Resmi Badan Eksekutif Mahasiswa
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-800 leading-tight tracking-tight">
            Fakultas Agama Islam
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-sans tracking-wide">
            Universitas KH. A. Wahab Hasbullah Jombang
          </p>

          {/* Typewriter Text Container */}
          <div className="h-8 flex items-center justify-center pt-2">
            <p className="text-sm md:text-base text-slate-700 font-sans tracking-wider font-semibold">
              {displayText}
              <span className="inline-block w-[2px] h-4 ml-1 bg-primary animate-pulse" />
            </p>
          </div>

          <p className="max-w-3xl text-sm md:text-base text-slate-600 font-sans leading-relaxed pt-2">
            <strong>PERUNGGU (Peradaban Unggul)</strong> adalah simbol gerakan mahasiswa yang bertumbuh melalui proses, ketekunan, dan kolaborasi untuk menciptakan perubahan yang bermakna. Berlandaskan kepedulian, pemikiran kritis, dan semangat inovasi. Kabinet Perunggu hadir sebagai wadah lahirnya generasi yang progresif, dan berdampak bagi kampus maupun masyarakat. Bukan tentang menjadi yang paling tinggi, melainkan tentang menjadi yang paling bermanfaat dalam membangun peradaban yang unggul.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6 justify-center">
          <Link href="#proker" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-primary hover:bg-[#6c4391] transition-all duration-300 shadow-[0_4px_14px_rgba(127,84,164,0.25)] border border-primary/20 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Program Kerja</span>
              <ArrowRight size={14} />
            </motion.button>
          </Link>

          <Link href="#artikel" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-slate-700 border border-primary/20 bg-white hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-pointer"
            >
              <BookOpen size={14} />
              <span>Artikel Terbaru</span>
            </motion.button>
          </Link>
        </div>

        {/* Large Centered Building Photo (Flat & Big) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-5xl h-[300px] sm:h-[450px] md:h-[500px] mt-12 flex items-center justify-center"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <Image
            src="/assets/gedung1.png"
            alt="Gedung FAI UNWAHA"
            fill
            className="object-contain"
            style={{
              filter: "drop-shadow(1px 0px 0px rgba(127, 84, 164, 0.35)) drop-shadow(-1px 0px 0px rgba(127, 84, 164, 0.35)) drop-shadow(0px 1px 0px rgba(127, 84, 164, 0.35)) drop-shadow(0px -1px 0px rgba(127, 84, 164, 0.35)) drop-shadow(0 15px 30px rgba(127, 84, 164, 0.08))"
            }}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </motion.div>
      </div>
    </section>
  );
}

