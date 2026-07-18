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
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#180208]"
    >
      {/* Background Neon Glows - Multi-layered for premium feel */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/15 rounded-full blur-[110px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-950/20 rounded-full blur-[180px] pointer-events-none" />

      {/* Grid Pattern Overlay with customized opacity and glow lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

      {/* Floating high-tech circles/particles (Micro-animations) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm"
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-semibold text-primary uppercase tracking-widest cursor-default shadow-[0_0_15px_rgba(185,28,28,0.1)]"
        >
          <Sparkles size={12} className="text-gold animate-pulse" />
          <span>Kabinet Perunggu UNWAHA Jombang</span>
        </motion.div>

        {/* Central Logo with Neon Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-40 h-40 md:w-48 md:h-48 mb-8 flex items-center justify-center rounded-3xl p-3 border border-primary/20 bg-background/30 backdrop-blur-xl shadow-[0_0_50px_rgba(185,28,28,0.15)] group hover:border-primary/45 hover:shadow-[0_0_60px_rgba(185,28,28,0.35)] transition-all duration-500"
        >
          {/* External decorative futuristic lines */}
          <div className="absolute -inset-2 border border-dashed border-white/10 rounded-[2.5rem] pointer-events-none group-hover:border-primary/25 transition-colors duration-500 animate-[spin_40s_linear_infinite]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-12 h-2 bg-primary rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-12 h-2 bg-gold rounded-full" />

          <Image
            src="/assets/logo.jpg"
            alt="Logo BEM FAI UNWAHA"
            width={160}
            height={160}
            className="object-contain filter drop-shadow-[0_0_10px_rgba(185,28,28,0.4)]"
            priority
          />
        </motion.div>

        {/* Hero Title & Slogans with Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white leading-none tracking-tight">
            Kabinet <span className="text-primary neon-text-maroon">Perunggu</span> <br className="sm:hidden" />
            <span className="text-gold neon-text-gold font-sans font-medium">BEM FAI</span>
          </h2>

          {/* Typewriter Text Container */}
          <div className="h-12 flex items-center justify-center">
            <p className="text-lg md:text-2xl text-gray-300 font-sans tracking-wide">
              {displayText}
              <span className="inline-block w-[3px] h-5 ml-1 bg-primary animate-pulse" />
            </p>
          </div>

          <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-400 font-sans leading-relaxed pt-2">
            <strong>PERUNGGU (Peradaban Unggul)</strong> adalah simbol gerakan mahasiswa yang bertumbuh melalui proses, ketekunan, dan kolaborasi untuk menciptakan perubahan yang bermakna. Berlandaskan kepedulian, pemikiran kritis, dan semangat inovasi. Kabinet Perunggu hadir sebagai wadah lahirnya generasi yang progresif, dan berdampak bagi kampus maupun masyarakat. Bukan tentang menjadi yang paling tinggi, melainkan tentang menjadi yang paling bermanfaat dalam membangun peradaban yang unggul.
          </p>
        </motion.div>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
        >
          <Link href="#kampus" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase text-white bg-primary hover:bg-[#991b1b] transition-all duration-300 shadow-[0_0_20px_rgba(185,28,28,0.3)] hover:shadow-[0_0_30px_rgba(185,28,28,0.5)] border border-primary/20 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Jelajahi Fasilitas</span>
              <ArrowRight size={16} />
            </motion.button>
          </Link>

          <Link href="#artikel" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <BookOpen size={16} />
              <span>Artikel Terbaru</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

