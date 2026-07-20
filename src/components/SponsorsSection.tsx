"use client";

import { useState, useEffect } from "react";
import Link from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { db } from "../lib/supabase";
import { Sponsor } from "../types/database.types";

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getSponsors()
      .then(setSponsors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || sponsors.length === 0) return null;

  return (
    <section className="py-20 bg-[#F9F8FD] border-t border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2 font-mono"
          >
            <ChevronRight size={10} />
            Didukung Oleh
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-2xl md:text-3xl text-slate-800"
          >
            Mitra &amp; <span className="text-primary font-extrabold">Sponsor</span>
          </motion.h3>
        </div>

        {/* Sponsor Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.id}
              initial={{ scale: 0.75 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: i * 0.1 }}
            >
              {sponsor.website_url ? (
                <a
                  href={sponsor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 px-8 py-5 bg-white rounded-2xl border border-slate-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(127,84,164,0.06)] min-w-[160px] shadow-[0_4px_20px_rgba(0,0,0,0.015)]"
                >
                  <SponsorLogo sponsor={sponsor} />
                  <span className="text-xs text-slate-500 font-semibold text-center group-hover:text-primary transition-colors flex items-center gap-1">
                    {sponsor.name}
                    <ExternalLink size={9} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center gap-3 px-8 py-5 bg-white rounded-2xl border border-slate-100 min-w-[160px] shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
                  <SponsorLogo sponsor={sponsor} />
                  <span className="text-xs text-slate-500 font-semibold text-center">
                    {sponsor.name}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  if (sponsor.logo_url) {
    return (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <img
          src={sponsor.logo_url}
          alt={sponsor.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }
  // Placeholder — initials in a styled circle
  const initials = sponsor.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
      <span className="text-primary font-display font-bold text-lg">{initials}</span>
    </div>
  );
}
