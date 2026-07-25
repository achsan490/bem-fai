"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/about" },
  { name: "Kemenbirsan", href: "/kemenbirsan" },
  { name: "Berita", href: "/news" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-[#240309]/90 backdrop-blur-md border-b border-white/10 shadow-lg" : "py-4 sm:py-5 bg-transparent"
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#460511] via-[#A81B30] via-[#FF5533] to-[#A81B30]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-w-0 w-full">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-[#6A0D18] to-[#3B0611] flex items-center justify-center p-1.5 shadow-md transition-transform group-hover:scale-105 shrink-0">
            <Image
              src="/assets/logo.png"
              alt="BEM FAI UNWAHA Logo HD"
              width={36}
              height={36}
              className="object-contain filter drop-shadow(0 0 3px rgba(255,255,255,0.4))"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm sm:text-base md:text-lg leading-tight tracking-wider text-white flex items-center gap-1.5 truncate">
              BEM <span className="text-amber-400 font-extrabold">FAI UNWAHA</span>
            </p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-300 tracking-wider uppercase font-sans font-medium truncate">
              Univ. KH. A. Wahab Hasbullah
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 tracking-wide font-sans group ${isActive
                    ? "text-amber-400 bg-white/10 border border-white/20 shadow-sm"
                    : "text-slate-200 hover:text-amber-400 hover:bg-white/5"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden shrink-0 ml-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl text-amber-300 border border-white/15 bg-black/40 hover:bg-black/60 hover:border-amber-400/40 transition-all duration-200 cursor-pointer shadow-md backdrop-blur-md flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <motion.div
              key={isMobileMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={20} className="text-amber-400" /> : <Menu size={20} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#1B0207]/95 backdrop-blur-xl border-b border-white/15 shadow-2xl overflow-hidden relative"
          >
            {/* Ambient Background Glow inside Drawer */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary/15 rounded-full blur-2xl pointer-events-none" />

            <div className="px-5 py-6 flex flex-col gap-2.5 relative z-10">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "text-amber-300 bg-amber-400/10 border border-amber-400/30 shadow-md backdrop-blur-md"
                          : "text-slate-200 hover:text-amber-300 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${isActive ? "bg-amber-400 animate-pulse" : "bg-white/20"}`} />
                        {link.name}
                      </span>
                      <ChevronRight size={14} className={isActive ? "text-amber-400" : "opacity-40"} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

