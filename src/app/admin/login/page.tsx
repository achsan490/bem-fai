"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, LogIn, ArrowLeft, AlertCircle, Database, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { db, isSupabaseConfigured } from "../../../lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    async function checkAuth() {
      const authenticated = await db.checkSession();
      if (authenticated) {
        router.push("/admin/dashboard");
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan Password wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await db.login(email, password);
      
      if (res.success) {
        router.push("/admin/dashboard");
      } else {
        setError(res.error || "Gagal masuk. Silakan coba lagi.");
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan koneksi database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-6 bg-[#FDF8F8] overflow-hidden">
      {/* Background ambient glowing nodes */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-[#800020]/15 via-[#A0203F]/10 to-transparent rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-br from-[#800020]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,0,32,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,0,32,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#500014] via-[#800020] via-[#A0203F] to-[#800020]" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors duration-200 mb-6 group cursor-pointer font-sans">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#26040A]/90 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl border border-white/20 bg-gradient-to-br from-[#6A0D18] to-[#250309] flex items-center justify-center p-3 mb-4 shadow-xl">
              <Image
                src="/assets/logo.png"
                alt="Logo BEM FAI"
                width={50}
                height={50}
                className="object-contain filter drop-shadow(0 0 4px rgba(255,255,255,0.4))"
              />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Admin <span className="text-amber-400 font-bold">Portal</span>
            </h2>
            <p className="text-xs text-slate-300 font-sans mt-2 tracking-wide">
              Masuk untuk mengelola publikasi artikel & kegiatan BEM FAI
            </p>
          </div>

          {/* Database Mode Status Badge */}
          <div className="mb-6 flex justify-center">
            {isSupabaseConfigured ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-400/30 bg-amber-400/10 uppercase tracking-wider">
                <ShieldCheck size={12} />
                Live Supabase DB
              </span>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-amber-400 border border-amber-400/30 bg-amber-400/10 uppercase tracking-wider">
                  <Database size={12} />
                  Offline Sandbox Mode
                </span>
                <p className="text-[10px] text-slate-300 max-w-xs text-center leading-normal mt-1 font-sans">
                  Gunakan email <span className="text-amber-300 font-mono font-semibold">admin@fai.unwaha.ac.id</span> & password <span className="text-amber-300 font-mono font-semibold">admin123</span>
                </p>
              </div>
            )}
          </div>

          {/* Alert Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 rounded-xl border border-red-400/30 bg-red-500/10 text-xs text-red-300 font-sans flex items-start gap-2.5"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@fai.unwaha.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/15 bg-black/40 focus:bg-black/60 focus:border-amber-400 focus:outline-none transition-all duration-300 text-sm font-sans text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/15 bg-black/40 focus:bg-black/60 focus:border-amber-400 focus:outline-none transition-all duration-300 text-sm font-sans text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={14} />
                  <span>Autentikasi Akun</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

