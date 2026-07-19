import Link from "next/link";
import { Mail, MapPin, Globe, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#100105] border-t border-white/5 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Brand */}
        <div className="space-y-4">
          <p className="font-display font-bold text-lg leading-tight tracking-wider text-white">
            BEM <span className="text-primary neon-text-maroon">FAI UNWAHA</span>
          </p>
          <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-sm">
            Badan Eksekutif Mahasiswa Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah. Wadah kolaborasi kepemimpinan kemahasiswaan berbasis moral islami dan kesiapan teknologi era global.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-white">Navigasi</h5>
          <ul className="space-y-2 text-xs text-gray-400 font-sans">
            <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
            <li><Link href="/kemenbirsan" className="hover:text-primary transition-colors">Kemenbirsan</Link></li>
            <li><Link href="/news" className="hover:text-primary transition-colors">Berita & Artikel</Link></li>
            <li className="pt-2 border-t border-white/5">
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5">
                <Lock size={10} className="text-primary" />
                <span>Portal Administrasi</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-white">Hubungi Kami</h5>
          <ul className="space-y-2 text-xs text-gray-400 font-sans">
            <li className="flex items-start gap-2">
              <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
              <span>Gedung C Lantai 1, Jl. Garuda No. 09, Tambakberas, Jombang, Jawa Timur</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={12} className="text-primary shrink-0" />
              <span>bem@fai.unwaha.ac.id</span>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={12} className="text-primary shrink-0" />
              <span>fai.unwaha.ac.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[10px] text-gray-500 tracking-wider">
        <p>© 2026 BEM FAI UNWAHA Jombang. Hak Cipta Dilindungi Undang-Undang.</p>
        <p className="font-sans flex items-center gap-1.5">
          Designed for <span className="text-primary font-bold">UNWAHA Islamic Tech Campus</span>
        </p>
      </div>
    </footer>
  );
}
