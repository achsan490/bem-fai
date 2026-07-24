"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Crown, ChevronRight, Star } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db } from "../../lib/supabase";
import { KemenbirsanMember } from "../../types/database.types";

const ROLE_ICON: Record<string, React.ReactNode> = {
  "Presiden BEM": <Crown size={16} className="text-amber-500 animate-pulse" />,
  default: <Star size={16} className="text-primary" />,
};

function getRoleIcon(role: string) {
  return ROLE_ICON[role] ?? ROLE_ICON["default"];
}

const cardVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      delay: index * 0.08,
      delayChildren: 0.15,
      staggerChildren: 0.07
    }
  })
};

const childVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const
    }
  }
};

function MemberCard({ member, index }: { member: KemenbirsanMember; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="bg-[#26040A]/85 backdrop-blur-md rounded-3xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 group overflow-hidden shadow-xl"
    >
      {/* Photo */}
      <motion.div variants={childVariants} className="relative w-full aspect-[4/5] bg-black/40 flex items-center justify-center overflow-hidden">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
            <User size={64} className="text-amber-400" />
            <span className="text-xs text-slate-300 font-mono">Foto belum tersedia</span>
          </div>
        )}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Role badge pinned at bottom of image */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/30 bg-black/70 backdrop-blur-md shadow-md whitespace-nowrap">
            {getRoleIcon(member.role)}
            {member.role}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <motion.h3 variants={childVariants} className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors duration-300 leading-tight">
          {member.name}
        </motion.h3>
        {member.description && (
          <motion.p variants={childVariants} className="text-sm text-slate-200 font-sans leading-relaxed">
            {member.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default function KemenbirsanContent() {
  const [members, setMembers] = useState<KemenbirsanMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getMembers()
      .then(setMembers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <main className="flex-grow">
        {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF5533]/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-3 font-mono"
            >
              <ChevronRight size={10} />
              Kementerian Birokrasi & Administrasi
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-6xl text-white leading-tight"
            >
              Pimpinan <span className="text-amber-400 font-extrabold">BEM FAI UNWAHA</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 font-sans text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
            >
              Mengenal sosok Presiden dan Wakil Presiden BEM FAI UNWAHA yang memimpin organisasi kemahasiswaan dengan visi islami dan progresif.
            </motion.p>
          </div>
        </section>

        {/* Member Cards */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-[#26040A]/85 border border-white/10 rounded-3xl overflow-hidden shadow-xl animate-pulse">
                    <div className="aspect-[4/5] bg-white/10 animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-white/10 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-white/10 rounded animate-pulse" />
                      <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-24">
                <User size={56} className="text-amber-400/40 mx-auto mb-4 animate-pulse" />
                <h3 className="font-display font-bold text-xl text-white mb-2">Belum Ada Data Pimpinan</h3>
                <p className="text-sm text-slate-300">Data pimpinan dapat ditambahkan melalui Portal Administrasi.</p>
              </div>
            ) : (
              <div className={`grid gap-8 justify-center ${
                members.length === 1
                  ? "grid-cols-1 max-w-sm mx-auto"
                  : members.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}>
                {members.map((member, i) => (
                  <MemberCard key={member.id} member={member} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* â”€â”€ Decorative Divider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="py-16 border-t border-white/10 bg-transparent">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-slate-200 font-sans text-sm md:text-base italic leading-relaxed">
              &ldquo;Kepemimpinan yang baik berakar pada akhlak mulia, ilmu yang bermanfaat, dan tekad untuk mengabdi kepada umat.&rdquo;
            </p>
            <p className="text-amber-400 font-bold text-xs font-mono mt-3 tracking-widest uppercase">— BEM FAI UNWAHA</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

