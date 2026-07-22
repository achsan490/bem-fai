import Link from "next/link";
import { Mail, MapPin, Globe, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#191621] border-t border-primary/20 py-12 relative overflow-hidden">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#800020] via-[#A0203F] to-transparent" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[300px] h-[200px] bg-gradient-to-br from-[#800020]/15 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Brand */}
        <div className="space-y-4">
          <p className="font-display font-bold text-lg leading-tight tracking-wider text-white">
            BEM <span className="bg-gradient-to-r from-[#800020] via-[#B8284F] to-[#A0203F] bg-clip-text text-transparent font-extrabold">FAI UNWAHA</span>
          </p>
          <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
            Badan Eksekutif Mahasiswa Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah. Wadah kolaborasi kepemimpinan kemahasiswaan berbasis moral islami dan kesiapan teknologi era global.
          </p>
          {/* Social Media Icons */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://www.instagram.com/bemfaiunwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
              aria-label="Instagram BEM FAI UNWAHA"
            >
              {/* Instagram SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@bemfaiunwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
              aria-label="YouTube BEM FAI UNWAHA"
            >
              {/* YouTube SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-white">Navigasi</h5>
          <ul className="space-y-2 text-xs text-slate-400 font-sans">
            <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
            <li><Link href="/kemenbirsan" className="hover:text-primary transition-colors">Kemenbirsan</Link></li>
            <li><Link href="/news" className="hover:text-primary transition-colors">Berita & Artikel</Link></li>
            <li className="pt-2 border-t border-slate-800">
              <Link href="/admin/dashboard" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5">
                <Lock size={10} className="text-primary" />
                <span>Portal Administrasi</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-white">Hubungi Kami</h5>
          <ul className="space-y-2 text-xs text-slate-400 font-sans">
            <li className="flex items-start gap-2">
              <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
              <span>Gedung C Lantai 1, Jl. Garuda No. 09, Tambakberas, Jombang, Jawa Timur</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={12} className="text-primary shrink-0" />
              <a
                href="mailto:bem@fai.unwaha.ac.id"
                className="hover:text-primary transition-colors"
              >
                bem@fai.unwaha.ac.id
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={12} className="text-primary shrink-0" />
              <a
                href="https://fai.unwaha.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                fai.unwaha.ac.id
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[10px] text-slate-500 tracking-wider">
        <p>Â© 2026 BEM FAI UNWAHA Jombang. Hak Cipta Dilindungi Undang-Undang.</p>
        <p className="font-sans flex items-center gap-1.5">
          Designed for <span className="text-primary font-bold">UNWAHA Islamic Tech Campus</span>
        </p>
      </div>
    </footer>
  );
}

