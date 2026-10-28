"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { db } from "../../../lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@fai.unwaha.ac.id");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await db.login(email, password);
      if (res.success) {
        router.push("/admin/dashboard");
      } else {
        setError(res.error || "Gagal masuk. Periksa kembali email dan password.");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Terjadi kesalahan sistem.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#180206] text-[#FDF7F8] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#460511] via-[#A81B30] via-[#FF5533] to-[#A81B30]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A81B30]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#240309]/90 border border-white/15 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#6A0D18] to-[#3B0611] border border-white/20 mb-4 shadow-xl">
            <Image
              src="/assets/logo.webp"
              alt="Logo BEM FAI"
              width={56}
              height={56}
              className="drop-shadow filter drop-shadow(0 0 5px rgba(255,255,255,0.4))"
            />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            BEM <span className="text-amber-400 font-extrabold">FAI UNWAHA</span>
          </h1>
          <p className="text-xs text-white/60 mt-1 uppercase tracking-widest font-semibold">
            Portal Administrasi
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5">
            <span className="text-red-400 font-bold">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-amber-300/90 mb-1.5 uppercase tracking-wider">
              Email Administrator
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fai.unwaha.ac.id"
                required
                className="w-full bg-[#180206] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#A81B30] focus:ring-1 focus:ring-[#A81B30] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-300/90 mb-1.5 uppercase tracking-wider">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#180206] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#A81B30] focus:ring-1 focus:ring-[#A81B30] transition-all"
              />
            </div>
          </div>

          <div className="bg-[#3B0611]/80 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300/90 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-300">
              <ShieldCheck size={14} />
              <span>Kredensial Default (Sandbox):</span>
            </div>
            Email: <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded font-mono">admin@fai.unwaha.ac.id</code><br />
            Sandi: <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded font-mono">admin123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#A81B30] via-[#C4263E] to-[#7F0E1E] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#FF5533] shadow-lg shadow-[#A81B30]/40 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Kembali ke Website Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
