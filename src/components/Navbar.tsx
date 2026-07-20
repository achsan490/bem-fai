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
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md border-b border-primary/10 shadow-sm" : "py-5 bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-primary/10 bg-white flex items-center justify-center p-1 transition-transform group-hover:scale-105">
            <Image
              src="/assets/logo.jpg"
              alt="BEM FAI UNWAHA Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <p className="font-display font-bold text-base md:text-lg leading-tight tracking-wider text-slate-800 flex items-center gap-1.5">
              BEM <span className="text-primary font-extrabold">FAI UNWAHA</span>
            </p>
            <p className="text-[9px] md:text-[10px] text-slate-500 tracking-wider uppercase font-sans font-medium">
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
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
