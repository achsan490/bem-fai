"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F8FD] relative overflow-hidden px-6">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,0,32,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,0,32,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 60 }}
          className="mb-6"
        >
          <span className="font-display font-extrabold text-[120px] md:text-[160px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/70 to-primary/30 select-none">
            404
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Search size={28} className="text-primary" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-bold text-2xl md:text-3xl text-slate-800 mb-3"
        >
          Halaman Tidak Ditemukan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 font-sans text-sm md:text-base leading-relaxed mb-8"
        >
          Maaf, halaman yang kamu cari tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda BEM FAI UNWAHA.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold tracking-wide shadow-[0_4px_14px_rgba(128,0,32,0.25)] hover:bg-[#600018] transition-all duration-300 cursor-pointer"
            >
              <Home size={16} />
              Kembali ke Beranda
            </motion.button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/5 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Halaman Sebelumnya
          </button>
        </motion.div>

        {/* Branding */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-[10px] text-slate-400 font-mono tracking-widest uppercase"
        >
          BEM FAI UNWAHA â€” Kabinet Perunggu
        </motion.p>
      </motion.div>
    </div>
  );
}

