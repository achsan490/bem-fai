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

            {/* Threads */}
            <a
              href="https://www.threads.net/@bemfai_unwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/20 transition-all duration-200 shadow-sm"
              aria-label="Threads bemfai_unwaha"
            >
              <div className="w-5 h-5 rounded-full bg-black border border-white/20 flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.75c-5.38 0-9.75-4.37-9.75-9.75S6.62 2.25 12 2.25s9.75 4.37 9.75 9.75c0 3.8-2.17 6.78-5.38 7.42-2.18.43-4.22-.38-5.06-2.02-.45-.88-.5-1.98-.5-3.4 0-1.7.46-2.6 1.48-3.08.68-.32 1.56-.37 2.62-.37h1.09v-1.1c0-1.46-.86-2.31-2.35-2.31-1.41 0-2.2.82-2.32 2.01h-2.16c.14-2.32 1.87-3.95 4.48-3.95 2.76 0 4.51 1.63 4.51 4.25v5.33c0 1.05.34 1.7 1.15 1.7.67 0 1.56-.56 1.94-1.63.38-1.07.49-2.58.49-4.88 0-4.31-3.32-7.85-7.75-7.85-4.43 0-7.75 3.54-7.75 7.85 0 4.31 3.32 7.85 7.75 7.85 2.04 0 3.97-.75 5.43-2.12l1.38 1.42C17.3 20.73 14.77 21.75 12 21.75zm1.09-8.4h-.94c-.65 0-1.12.04-1.45.22-.44.24-.65.68-.65 1.34 0 .76.38 1.25 1.04 1.25.59 0 1.15-.36 1.54-.95.32-.49.46-1.11.46-1.86v-.001z"/>
                </svg>
              </div>
              <span className="font-mono text-[11px] font-semibold">bemfai_unwaha</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@bemfaiunwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/20 transition-all duration-200 shadow-sm"
              aria-label="YouTube bemfaiunwaha"
            >
              <div className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="font-mono text-[11px] font-semibold">bemfaiunwaha</span>
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

