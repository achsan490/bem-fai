import Link from "next/link";
import { Mail, MapPin, Globe, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A0207]/95 border-t border-white/10 py-12 relative overflow-hidden backdrop-blur-md">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5533] via-[#A81B30] to-transparent" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[300px] h-[200px] bg-gradient-to-br from-[#FF5533]/15 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Brand */}
        <div className="space-y-4">
          <p className="font-display font-bold text-lg leading-tight tracking-wider text-white">
            BEM <span className="text-amber-400 font-extrabold">FAI UNWAHA</span>
          </p>
          <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-sm">
            Badan Eksekutif Mahasiswa Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah. Program DIKTISAINTEK BERDAMPAK — Wadah kolaborasi kepemimpinan kemahasiswaan berbasis moral islami dan kesiapan teknologi.
          </p>

          {/* Social Media Links Pills (as shown in reference image footer) */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bemfai_unwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/20 transition-all duration-200 shadow-sm"
              aria-label="Instagram bemfai_unwaha"
            >
              <div className="w-5 h-5 rounded-full bg-[#E1306C] flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <span className="font-mono text-[11px] font-semibold">bemfai_unwaha</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@Bemfai_unwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/20 transition-all duration-200 shadow-sm"
              aria-label="TikTok Bemfai_unwaha"
            >
              <div className="w-5 h-5 rounded-full bg-black border border-white/20 flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 1.94 6.341 6.341 0 0 0 4.316 10.655 6.35 6.35 0 0 0 6.543-6.326V8.675a8.236 8.236 0 0 0 4.77 1.488V6.718a4.82 4.82 0 0 1-1.000-.032z"/>
                </svg>
              </div>
              <span className="font-mono text-[11px] font-semibold">Bemfai_unwaha</span>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/Bemfai_Unwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/20 transition-all duration-200 shadow-sm"
              aria-label="X Bemfai_Unwaha"
            >
              <div className="w-5 h-5 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
              </div>
              <span className="font-mono text-[11px] font-semibold">Bemfai_Unwaha</span>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-white">Navigasi</h5>
          <ul className="space-y-2 text-xs text-slate-300 font-sans">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Beranda</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">Tentang Kami</Link></li>
            <li><Link href="/kemenbirsan" className="hover:text-amber-400 transition-colors">Kemenbirsan</Link></li>
            <li><Link href="/news" className="hover:text-amber-400 transition-colors">Berita & Artikel</Link></li>
            <li className="pt-2 border-t border-white/10">
              <Link href="/admin/dashboard" className="text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <Lock size={10} className="text-amber-400" />
                <span>Portal Administrasi</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Hubungi Kami */}
        <div className="space-y-3">
          <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-white">Hubungi Kami</h5>
          <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
            <li className="flex items-start gap-2">
              <MapPin size={13} className="text-amber-400 shrink-0 mt-0.5" />
              <span>Gedung C Lantai 1, Jl. Garuda No. 09, Tambakberas, Jombang, Jawa Timur</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={13} className="text-amber-400 shrink-0" />
              <a
                href="mailto:bem@fai.unwaha.ac.id"
                className="hover:text-amber-400 transition-colors"
              >
                bem@fai.unwaha.ac.id
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={13} className="text-amber-400 shrink-0" />
              <a
                href="https://fai.unwaha.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                fai.unwaha.ac.id
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[10px] text-slate-200 tracking-wider">
        <p>© 2026 BEM FAI UNWAHA Jombang. Hak Cipta Dilindungi Undang-Undang.</p>
        <p className="font-sans flex items-center gap-1.5">
          Designed for <span className="text-amber-400 font-bold">UNWAHA Islamic Tech Campus</span>
        </p>
      </div>
    </footer>
  );
}

