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
    <div className="min-h-screen flex items-center justify-center relative p-6 bg-[#100105] overflow-hidden">
      {/* Background ambient glowing nodes */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-primary transition-colors duration-200 mb-6 group cursor-pointer">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass p-8 rounded-3xl border border-white/10 shadow-2xl relative bg-[#180208]/65 backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl border border-primary/20 bg-background/50 flex items-center justify-center p-2 mb-4 shadow-[0_0_20px_rgba(185,28,28,0.1)]">
              <Image
                src="/assets/logo.jpg"
                alt="Logo BEM FAI"
                width={50}
                height={50}
                className="object-contain filter drop-shadow-[0_0_5px_rgba(185,28,28,0.2)]"
              />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Admin <span className="text-primary neon-text-maroon">Portal</span>
            </h2>
            <p className="text-xs text-gray-400 font-sans mt-2 tracking-wide">
              Masuk untuk mengelola publikasi artikel & kegiatan BEM FAI
            </p>
          </div>

          {/* Database Mode Status Badge */}
          <div className="mb-6 flex justify-center">
            {isSupabaseConfigured ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-primary border border-primary/20 bg-primary/5 uppercase tracking-wider">
                <ShieldCheck size={12} />
                Live Supabase DB
              </span>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-gold border border-gold/20 bg-gold/5 uppercase tracking-wider">
                  <Database size={12} />
                  Offline Sandbox Mode
                </span>
                <p className="text-[10px] text-gray-500 max-w-xs text-center leading-normal mt-1">
                  Gunakan email <span className="text-white font-mono">admin@fai.unwaha.ac.id</span> & password <span className="text-white font-mono">admin123</span>
                </p>
              </div>
            )}
          </div>

          {/* Alert Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 font-sans flex items-start gap-2.5"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@fai.unwaha.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all duration-300 text-sm font-sans text-white focus:ring-1 focus:ring-primary/30"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/5 bg-[#070b13]/60 focus:bg-[#070b13]/90 focus:border-primary/50 focus:outline-none transition-all duration-300 text-sm font-sans text-white focus:ring-1 focus:ring-primary/30"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-primary hover:bg-[#059669] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
