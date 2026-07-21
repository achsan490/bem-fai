"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Beranda",     href: "/" },
  { name: "Tentang",     href: "/about" },
  { name: "Kemenbirsan", href: "/kemenbirsan" },
  { name: "Berita",      href: "/news" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md border-b border-primary/10 shadow-sm" : "py-4 sm:py-5 bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-w-0 w-full">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-lg border border-primary/10 bg-white flex items-center justify-center p-1 transition-transform group-hover:scale-105 shrink-0">
            <Image
              src="/assets/logo.png"
              alt="BEM FAI UNWAHA Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm sm:text-base md:text-lg leading-tight tracking-wider text-slate-800 flex items-center gap-1.5 truncate">
              BEM <span className="text-primary font-extrabold">FAI UNWAHA</span>
            </p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-500 tracking-wider uppercase font-sans font-medium truncate">
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
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 tracking-wide font-sans group ${
                  isActive
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-slate-600 hover:text-primary hover:bg-primary/5"
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
            className="p-2 rounded-xl text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-primary/10 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-slate-600 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
