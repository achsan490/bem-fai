"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { db } from "../../lib/supabase";
import { KemenbirsanMember } from "../../types/database.types";

export default function KemenbirsanContent() {
  const [members, setMembers] = useState<KemenbirsanMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await db.getMembers();
        setMembers(data);
      } catch (e) {
        console.error("Gagal memuat anggota:", e);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF5533]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-3 font-mono">
            <ChevronRight size={10} />
            Kementerian Birokrasi &amp; Administrasi
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight">
            Pimpinan <span className="text-white font-extrabold">BEM FAI UNWAHA</span>
          </h1>
          <p className="text-slate-300 font-sans text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Mengenal sosok Gubernur dan Wakil Gubernur BEM FAI UNWAHA yang memimpin organisasi kemahasiswaan dengan visi islami dan progresif.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {[1, 2].map((n) => (
                <div key={n} className="bg-[#26040A]/85 border border-white/10 rounded-3xl overflow-hidden shadow-xl animate-pulse">
                  <div className="aspect-[4/5] bg-white/10 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-white/10 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded animate-pulse" />
                    <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#26040A]/85 border border-white/15 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:border-amber-400/40 hover:-translate-y-1 group"
                >
                  <div className="aspect-[4/5] relative w-full bg-black/40 overflow-hidden">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#3B0611] to-[#180206] text-amber-400 font-display font-bold text-5xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26040A] via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                      {member.role}
                    </span>
                    <h2 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                      {member.name}
                    </h2>
                    {member.description && (
                      <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1 font-light">
                        {member.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="py-16 border-t border-white/10 bg-transparent">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-slate-200 font-sans text-sm md:text-base italic leading-relaxed">
            &ldquo;Kepemimpinan yang baik berakar pada akhlak mulia, ilmu yang bermanfaat, dan tekad untuk mengabdi kepada umat.&rdquo;
          </p>
          <p className="text-amber-400 font-bold text-xs font-mono mt-3 tracking-widest uppercase">
            — BEM FAI UNWAHA
          </p>
        </div>
      </div>
    </>
  );
}
