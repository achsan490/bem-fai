"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Info, MapPin } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface Hotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  description: string;
}

const GEDUNG_1_HOTSPOTS: Hotspot[] = [
  {
    id: "g1-h1",
    top: "25%",
    left: "45%",
    title: "Dekanat FAI UNWAHA",
    description: "Kantor pimpinan Fakultas Agama Islam UNWAHA, ruang administrasi terpadu, serta ruang dosen utama.",
  },
  {
    id: "g1-h2",
    top: "65%",
    left: "25%",
    title: "Laboratorium Keagamaan",
    description: "Fasilitas simulasi praktikum ibadah, bimbingan syariah, dakwah virtual, serta kajian manuskrip pesantren.",
  },
  {
    id: "g1-h3",
    top: "70%",
    left: "70%",
    title: "Perpustakaan Kiai Wahab",
    description: "Akses digital ke ribuan jurnal keislaman, kitab kontemporer, serta koleksi naskah pemikiran K.H. A. Wahab Hasbullah.",
  },
];

const GEDUNG_2_HOTSPOTS: Hotspot[] = [
  {
    id: "g2-h1",
    top: "30%",
    left: "50%",
    title: "Auditorium KH. Wahab Hasbullah",
    description: "Aula besar tempat berkumpulnya civitas akademika UNWAHA untuk seminar nasional, konferensi, dan wisuda.",
  },
  {
    id: "g2-h2",
    top: "55%",
    left: "30%",
    title: "Plaza BEM FAI",
    description: "Ruang terbuka hijau tempat sekretariat BEM FAI UNWAHA, diskusi organisasi, dan panggung kreativitas seni islami.",
  },
  {
    id: "g2-h3",
    top: "68%",
    left: "75%",
    title: "Pusat Kajian & Halal",
    description: "Pusat penelitian keagamaan, sertifikasi produk halal, serta inkubator sosiopreneur syariah mahasiswa UNWAHA.",
  },
];

function ParallaxCard({
  imageSrc,
  alt,
  hotspots,
  title,
  subtitle,
}: {
  imageSrc: string;
  alt: string;
  hotspots: Hotspot[];
  title: string;
  subtitle: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Motion values for tracking mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 15 });

  // Translation values for 3D card depth
  const translateZImage = useTransform(rotateX, [10, -10], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized mouse coordinates between -0.5 and 0.5
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setActiveHotspot(null);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl transition-all duration-300 hover:border-primary/30"
    >
      {/* 3D Depth Image Wrap */}
      <motion.div style={{ translateZ: translateZImage }} className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover opacity-85 hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

      {/* Campus Info Header overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1">
          <MapPin size={10} />
          {subtitle}
        </span>
        <h4 className="font-display font-bold text-lg text-white mt-1">{title}</h4>
      </div>

      {/* Hotspots */}
      <div className="absolute inset-0 w-full h-full z-20" style={{ transformStyle: "preserve-3d" }}>
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            className="absolute"
            style={{
              top: spot.top,
              left: spot.left,
              transform: "translate(-50%, -50%) translateZ(40px)", // Float above the image in 3D
            }}
          >
            {/* Glowing hotspot dot */}
            <button
              onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              className="relative w-7 h-7 flex items-center justify-center rounded-full bg-primary/20 border border-primary text-white cursor-pointer hover:bg-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.5)] group"
            >
              {/* Hotspot Pulse effect */}
              <span className="absolute -inset-1 rounded-full bg-primary/40 animate-ping opacity-75" />
              <Info size={12} className="text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Glassmorphic Tooltip */}
            <AnimatePresence>
              {activeHotspot === spot.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 glass-emerald p-4 rounded-xl shadow-xl z-30 pointer-events-auto text-left"
                >
                  <h5 className="font-display font-semibold text-sm text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {spot.title}
                  </h5>
                  <p className="text-xs text-gray-300 mt-1.5 leading-relaxed font-sans">
                    {spot.description}
                  </p>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-primary/20 bg-[#180208]/90" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CampusSection() {
  return (
    <section id="kampus" className="py-24 bg-[#180208] border-t border-white/5 relative">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl md:text-4xl text-white"
          >
            Fasilitas Kampus <span className="text-primary neon-text-emerald">UNWAHA Jombang</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-sans text-sm md:text-base mt-4 leading-relaxed"
          >
            Jelajahi setiap sudut infrastruktur Fakultas Agama Islam Universitas KH. A. Wahab Hasbullah (UNWAHA) melalui peta interaktif kami. Arahkan kursor ke titik-titik hotspot untuk mempelajari fasilitas unggulan kami secara real-time.
          </motion.p>
        </div>

        {/* Parallax Card Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ParallaxCard
              imageSrc="/assets/gedung1.png"
              alt="Gedung FAI Utama"
              subtitle="Zona Akademik & Administrasi"
              title="Gedung FAI Terpadu (A)"
              hotspots={GEDUNG_1_HOTSPOTS}
            />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ParallaxCard
              imageSrc="/assets/gedung2.png"
              alt="Auditorium & Plaza Mahasiswa"
              subtitle="Zona Kegiatan & Riset Sosial"
              title="Pusat Kegiatan Kemahasiswaan (B)"
              hotspots={GEDUNG_2_HOTSPOTS}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
